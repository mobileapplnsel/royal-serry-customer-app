import React,{Component} from 'react';

import { StyleSheet, Image,ImageBackground, View,Text, TextInput, TouchableOpacity, Dimensions, SafeAreaView,
   ScrollView, Modal, FlatList, Alert, BackHandler, AsyncStorage, Linking, PermissionsAndroid,
   Platform,} from 'react-native';
import {StatusBar} from 'react-native';
import {NavigationEvents} from 'react-navigation';
import AnimateLoadingButton from 'react-native-animate-loading-button';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import UrlUtil from '../Service/UrlUtils';
import Spinner from 'react-native-loading-spinner-overlay';
import Geolocation from '@react-native-community/geolocation';
import Geocoder from 'react-native-geocoding';
import CountryPicker, { DARK_THEME } from 'react-native-country-picker-modal'
import KeyboardManager from 'react-native-keyboard-manager';
// import { parse } from '@babel/core';
var radio_props = [
  {label: 'Home Address', value: 0 },
  {label: 'Business Address', value: 1 }
];
var selectedComboFlag = 'country'

export default class Login extends Component{

  constructor(props) {
    super(props);
    this.state = {
      radioValue: 0,
      seachableModalVisible: false,
      data: [],
      dropdownMasterData: [],
      value: '',
      toSelectedCountryID: '',
      toSelectedStateID: '',
      fromSelectedCountryID: '',
      fromSelectedStateID: '',
      fromSelectedCityID: '',
      toSelectedCityID: '',
      CountryStateCityFetchURL: 'https://api.countrystatecity.in/v1/countries',

      FromFirstnameString: '',
      FromLastnameString: '',
      FromAddress1String: '',
      FromAddress2String: '',
      FromCompanyString: '',
      FromCountryString: 'Country',
      FromStateString: 'State',
      FromCityString: 'City',
      FromZipCodeString: '',
      FromEmailString: '',
      FromPhoneString: '',
      FromAddressTypeString: 0,

      ToFirstnameString: '',
      ToLastnameString: '',
      ToAddress1String: '',
      ToAddress2String: '',
      ToCompanyString: '',
      ToCountryString: 'Country',
      ToStateString: 'State',
      ToCityString: 'City',
      ToZipCodeString: '',
      ToEmailString: '',
      ToPhoneString: '',
      ToPhoneString1: '',
      ToAddressTypeString: 0,
      

      fromToLocationFlag: 'from',
      showOrHidePhone2Flag: 'hide',

      fromLocationTextColor : 'grey',
      toLocationTextColor : 'red',
      fromLocationborderwidth : 0,
      toLocationborderwidth: 1,
      progress: false,
      isCheckedFromZip: false,
      isCheckedToZip: false,
      toZipError: '',
      toZipError1: '',
      toZipError2: '',
      fromZipError: '',
      fromZipError1: '',
      fromZipError2: '',
      modalVisibleForZip: false,
      DescriptionString: '',
      gpsLocationData: '',
      countryCodeString : 'IN',
      maxLengthh1: 5000,
      fromLattitude: '',
      fromLogitude: '',

    }
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    this.CallToShowDropDownCombo = this.CallToShowDropDownCombo.bind(this);
    this.callToSetAddress1Value = this.callToSetAddress1Value.bind(this);
    this.TypingToZipCode = this.TypingToZipCode.bind(this);
    this.TypingFromZipCode = this.TypingFromZipCode.bind(this);
}
requestLocationPermission = async () => {

  this.setState({
    progress:true
})

  if (Platform.OS === 'ios') {
    // setLocationStatus('Getting Location ...');
    Geolocation.getCurrentPosition(
      //Will give you the current location
      (position) => {
        console.log('position:  ',position)

//         fetch('https://maps.googleapis.com/maps/api/geocode/json?address=' + position.coords.latitude + ',' + position.coords.longitude + '&key=' + 'AIzaSyDmUohDE70gjqrjgFEbhtyjPOhn9WBghuo')
//         .then((response) => response.json())
//         .then((responseJson) => {
//             console.log('ADDRESS GEOCODE is BACK!! => ' + JSON.stringify(responseJson));
// }).catch(error =>  console.log('error occuredddd'))
    
        Geocoder.from(position.coords.latitude, position.coords.longitude)
        .then(json => {
                var addressComponent = json.results[0].address_components[0];
          console.log('addressComponent', json.results[0].formatted_address);

          var stateName = json.results[0].address_components.filter(x => x.types.filter(t => t == 'administrative_area_level_1').length > 0)[0].long_name
          var CountryName = json.results[0].address_components.filter(x => x.types.filter(t => t == 'country').length > 0)[0].long_name
          console.log('stateName', stateName, CountryName);
         

          
          

this.setState({ FromAddress1String: json.results[0].formatted_address, FromCountryString: CountryName, FromStateString: stateName});
this.copyFetchStateIDCountryID1('state', stateName)




        }).catch(error =>  this.setState({ FromAddress1String: '', FromCountryString: 'Country', FromStateString: 'State', 
            fromSelectedCountryID: '', fromSelectedStateID: '', progress:false}))
      },
      (error) => {
        this.setState({progress: false}),
           Alert.alert(
            'Location Access Required',
            'This App needs to acccess your location to fetch your current location, please go to the Setting and Turn On the Location Manager', // <- this part is optional, you can pass an empty string
            [
               {text: 'OK', onPress: () => {cancelable: true}},
        
            ],
            {cancelable: false},
          );
            console.log('Geolocation error',error.message)
      },
      {
        enableHighAccuracy: false,
        timeout: 30000,
        maximumAge: 1000
      },
    );
  } else {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location Access Required',
          message: 'This App needs to Access your location',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        //To Check, If Permission is granted
        Geolocation.getCurrentPosition(
          //Will give you the current location
          (position) => {
    
            console.log('position:  ',position)
    
            Geocoder.from(position.coords.latitude, position.coords.longitude)
            .then(json => {
                    var addressComponent = json.results[0].address_components[0];
              console.log('addressComponent', json.results[0].formatted_address);

              var stateName = json.results[0].address_components.filter(x => x.types.filter(t => t == 'administrative_area_level_1').length > 0)[0].long_name
              var CountryName = json.results[0].address_components.filter(x => x.types.filter(t => t == 'country').length > 0)[0].long_name
              console.log('stateName', stateName, CountryName);
             

              
              

this.setState({ FromAddress1String: json.results[0].formatted_address, FromCountryString: CountryName, FromStateString: stateName});
this.copyFetchStateIDCountryID1('state', stateName)


            }).catch(error =>  this.setState({ FromAddress1String: '', FromCountryString: 'Country', FromStateString: 'State', 
            fromSelectedCountryID: '', fromSelectedStateID: '', progress:false}))
    
        
          },
          (error) => {
           // Alert('Please Turn On your Location Manager in Settings')
           this.setState({progress: false}),
           Alert.alert(
            'Location Access Required',
            'This App needs to acccess your location to fetch your current location, please go to the Setting and Turn On the Location Manager', // <- this part is optional, you can pass an empty string
            [
               {text: 'OK', onPress: () => {cancelable: true}},
        
            ],
            {cancelable: false},
          );
            console.log('Geolocation error',error.message)
          },
          {
            enableHighAccuracy: false,
            timeout: 30000,
            maximumAge: 1000
          },
        );
       // subscribeLocationLocation();
      } else {
       // setLocationStatus('Permission Denied');
      }
    } catch (err) {
      console.warn(err);
    }
  }
}
callToSetAddress1Value()  
  {

    

// console.log('callToSetAddress1Value called', this.props.navigation.state.params.addressDict.description)
if(this.props.navigation.state.params)
{
  console.log('callToSetAddress1Value called', this.props.navigation.state.params.navigationFlagForAddress1)
if (this.props.navigation.state.params.navigationFlagForAddress1 == 'locationFromAdd11')
    {
if (this.props.navigation.state.params.addressDict.description != undefined)
{
  this.setState({ 
    FromAddress1String: this.props.navigation.state.params.addressDict.description,
    fromLattitude: this.props.navigation.state.params.Lat,
    fromLogitude: this.props.navigation.state.params.Long,
    // FromCountryString: this.props.navigation.state.params.addressCountry,
    // FromStateString: this.props.navigation.state.params.addressState,
    // FromCityString: this.props.navigation.state.params.addressCity,
    // FromZipCodeString: this.props.navigation.state.params.addresszipcode
  })


  if (this.props.navigation.state.params.addressCountry == 'Sierra Leone')
   { 
    this.copyFetchStateIDCountryID('country', this.props.navigation.state.params.addressCountry)
   }
   else if (this.props.navigation.state.params.addressState == undefined)
   {
    this.copyFetchStateIDCountryID('country', this.props.navigation.state.params.addressCountry)
   }
   else if (this.props.navigation.state.params.addressCity == undefined)
   {
    this.copyFetchStateIDCountryID('state', this.props.navigation.state.params.addressState)
    // this.copyFetchStateIDCountryID('state', this.setCharAt(this.props.navigation.state.params.addressState,0,''))
    
   }
   else
   {
    this.copyFetchStateIDCountryID('state', this.props.navigation.state.params.addressState)
   }

}
else
{
  this.setState({
    FromAddress1String: ''
  })
}
     }
     else if (this.props.navigation.state.params.navigationFlagForAddress1 == 'locationToAdd11')
     {
 if (this.props.navigation.state.params.addressDict.description != undefined)
 {
   this.setState({ 
    ToAddress1String: this.props.navigation.state.params.addressDict.description,
    // ToCountryString: this.props.navigation.state.params.addressCountry,
    // ToStateString: this.props.navigation.state.params.addressState,
    // ToCityString: this.props.navigation.state.params.addressCity,
    // ToZipCodeString: this.props.navigation.state.params.addresszipcode
   })
   
   if (this.props.navigation.state.params.addressCountry == 'Sierra Leone')
   { 
    this.copyFetchStateIDCountryID('country', this.props.navigation.state.params.addressCountry)
   }
   else if (this.props.navigation.state.params.addressState == undefined)
   {
    this.copyFetchStateIDCountryID('country', this.props.navigation.state.params.addressCountry)
   }
   else if (this.props.navigation.state.params.addressCity == undefined)
   {
    this.copyFetchStateIDCountryID('state', this.props.navigation.state.params.addressState)
    // this.copyFetchStateIDCountryID('state', this.setCharAt(this.props.navigation.state.params.addressState,0,''))
    
   }
   else
   {
    this.copyFetchStateIDCountryID('state', this.props.navigation.state.params.addressState)
   }

   

 }
 else
 {
   this.setState({
    ToAddress1String: ''
   })
 }
      }
      else if (this.props.navigation.state.params.navigationFlagForAddress1 == 'registrationPicker')
     {
      if (this.props.navigation.state.params.flagtoShow == 'tocountry')
      {
        this.setState({toSelectedCountryID: this.props.navigation.state.params.selectedCountryID, ToCountryString: this.props.navigation.state.params.CountryString
          , countryCodeString: this.props.navigation.state.params.sortname})
      }
      
       if (this.props.navigation.state.params.flagtoShow == 'tostate')
      {
        this.setState({toSelectedStateID: this.props.navigation.state.params.selectedStateID, ToStateString: this.props.navigation.state.params.StateString})
      }
      
      if (this.props.navigation.state.params.flagtoShow == 'tocity') 
      {
        this.setState({ toSelectedCityID: this.props.navigation.state.params.selectedCityID, ToCityString: this.props.navigation.state.params.CityString})
      }

      if (this.props.navigation.state.params.flagtoShow == 'fromcountry')
      {
        this.setState({fromSelectedCountryID: this.props.navigation.state.params.selectedCountryID, FromCountryString: this.props.navigation.state.params.CountryString})
      }
      
       if (this.props.navigation.state.params.flagtoShow == 'fromstate')
      {
        this.setState({fromSelectedStateID: this.props.navigation.state.params.selectedStateID, FromStateString: this.props.navigation.state.params.StateString})
      }
      
      if (this.props.navigation.state.params.flagtoShow == 'fromcity') 
      {
        this.setState({ fromSelectedCityID: this.props.navigation.state.params.selectedCityID, FromCityString: this.props.navigation.state.params.CityString})
      }
     }
     
    }

  }
  copyFetchStateIDCountryID = (flagname, param) => {

    var params = {}
    var url = ''
    // user_id, user_type (BU or NU), firstname, lastname, telephone, email, companyname (for BU), 
    // companydetails (for BU), address, address2, country, state, city, zip
  
     if (flagname == 'country')
      {
        params = {
          key: 'country',
          name: param
        }
      } 
      
      if (flagname == 'state')
      {
       
      params = {
        key: 'state',
        name: param

      }
  
      }

      url = UrlUtil.BASE_URL + 'api/getlocationId';
  
    
  const { navigate } = this.props.navigation;
  
  console.log('Custom sign in param dic => ', params, url);
  
  var formData = new FormData();
  
  for (var k in params) {
    formData.append(k, params[k]);
  }
       
  
  fetch(url, {
      method: 'POST',
  
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    
    body: formData
     
  })
      .then((res) => res.json())
      .then((json) =>
  { 
  
    this.setState({
      progress:false
  })
      let resultJSON = JSON.stringify(json)
      console.log("Result JSON issss == ",resultJSON)
  
  
      if (json.status == 'success')
      {

        if (this.props.navigation.state.params.navigationFlagForAddress1 == 'locationFromAdd11')
        {
    if (this.props.navigation.state.params.addressDict.description != undefined)
    {

      if (flagname == 'country')
      {

        this.setState({ 

        FromCountryString: this.props.navigation.state.params.addressCountry,
        FromStateString: 'State',
        fromSelectedCountryID: json.locatioID.id,
        fromSelectedStateID: '',
        FromCityString: 'City',
        fromSelectedCityID: '',
        countryCodeString: json.locatioID.sortname
         })
        
      } 
      else
      {

if (this.props.navigation.state.params.addresszipcode != '')
{
  this.setState({ 
    FromZipCodeString: this.props.navigation.state.params.addresszipcode,
  })
}

      this.setState({ 
        FromCountryString: this.props.navigation.state.params.addressCountry,
        FromStateString: this.props.navigation.state.params.addressState,
        // FromCityString: this.props.navigation.state.params.addressCity,
        fromSelectedCountryID: json.locatioID.country_id,
        fromSelectedStateID: json.locatioID.id,
        FromCityString: 'City',
        fromSelectedCityID: '',
        countryCodeString: json.locatioID.country_sortname
      })
    
    }
    
    }
    else
    {
      this.setState({
        FromAddress1String: ''
      })
    }
         }
         else if (this.props.navigation.state.params.navigationFlagForAddress1 == 'locationToAdd11')
         {
     if (this.props.navigation.state.params.addressDict.description != undefined)
     {


      console.log('this.props.navigation.state.params.addresszipcode')
      if (this.props.navigation.state.params.addresszipcode != '')
{
  this.setState({ 
    ToZipCodeString: this.props.navigation.state.params.addresszipcode,
  })
}

       this.setState({ 
  
        ToCountryString: this.props.navigation.state.params.addressCountry,
        ToStateString: this.props.navigation.state.params.addressState,
        // ToCityString: this.props.navigation.state.params.addressCity,
        toSelectedCountryID: json.locatioID.country_id,
        toSelectedStateID: json.locatioID.id,
        ToCityString: 'City',
        toSelectedCityID: '',
        countryCodeString: json.locatioID.country_sortname
       })
       

    
     }
     else
     {
       this.setState({
        ToAddress1String: ''
       })
     }
          }
  
      }
      else
      {
        Alert.alert(
          'Failure',
          'We do not cover this area. Kindly enter another lcoation', // <- this part is optional, you can pass an empty string
          [
            {text: 'OK', onPress: () => this.setState({progress:false})},
          ],
          {cancelable: false},
        );
        
      }
  
  
  
    })
    .catch((err) => {
      this.setState({
        progress:false
    })
      alert('error = '+JSON.stringify(err));
    })
      
    }
    copyFetchStateIDCountryID1 = (flagname, param) => {

      var params = {}
      var url = ''
      
       if (flagname == 'country')
        {
          params = {
            key: 'country',
            name: param
          }
        } 
        
        if (flagname == 'state')
        {
         
        params = {
          key: 'state',
          name: param
    
        }
    
        }
    
        url = UrlUtil.BASE_URL + 'api/getlocationId';
    
      
    const { navigate } = this.props.navigation;
    
    console.log('Custom sign in param dic => ', params, url);
    
    var formData = new FormData();
    
    for (var k in params) {
      formData.append(k, params[k]);
    }
         
    
    fetch(url, {
        method: 'POST',
    
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      
      body: formData
       
    })
        .then((res) => res.json())
        .then((json) =>
    { 
    
      this.setState({
        progress:false
    })
        let resultJSON = JSON.stringify(json)
        console.log("Result JSON is1 == ",resultJSON)
    
    
        if (json.status == 'success')
        {
    
        this.setState({
  
          fromSelectedCountryID: json.locatioID.country_id,
          fromSelectedStateID: json.locatioID.id,
          countryCodeString: json.locatioID.country_sortname
        })
      
    
      
      
           
    
        }
        else
        {
          // Alert.alert(
          //   'Failure',
          //   json.message, // <- this part is optional, you can pass an empty string
          //   [
          //     {text: 'OK', onPress: () => this.setState({progress:false})},
          //   ],
          //   {cancelable: false},
          // );
          this.setState({ FromAddress1String: '', FromCountryString: 'Country', FromStateString: 'State', 
            fromSelectedCountryID: '', fromSelectedStateID: '', progress:false})
        }
    
    
    
      })
      .catch((err) => {
        this.setState({ FromAddress1String: '', FromCountryString: 'Country', FromStateString: 'State', 
            fromSelectedCountryID: '', fromSelectedStateID: '', progress:false})
        alert('error = '+JSON.stringify(err));
      })
        
      }
  render(){

    const { navigate } = this.props.navigation;
    return(

<SafeAreaView >
<NavigationEvents onDidFocus={() => this.callToSetAddress1Value()}/>

            <View style={styles.MainContainer}>

            <View style={{backgroundColor: 'rgba(246, 244, 243, 1)', flexDirection:'row', alignItems: 'center'}}>

            <TouchableOpacity onPress={this.handleBackButtonClick}>
        <Text style={{color:'red',fontSize:17, marginLeft: 17, fontWeight: "bold",}}>Back</Text>
        </TouchableOpacity>

       <Image style={{ height: 75,
              marginLeft: Dimensions.get('window').width - 220,
            marginTop:0,borderRadius:2,width: 140, resizeMode: 'contain',
            alignContent: 'center',
            alignItems: 'center',
            }}
          source={require('../Images/logo.png')}>
          </Image> 
          </View> 

             <View style={{height:5,marginLeft:0,marginTop:0, backgroundColor: 'red', width: Dimensions.get('window').width}}></View>

             <Image style={{ height: 140,
              marginLeft:  0,
            marginTop:0,borderRadius:2,width: Dimensions.get('window').width}}
          source={require('../Images/banner-home.jpg')}>
          </Image> 

 <View style={styles.SubContainer}>
 <ScrollView >
                <Text style={styles.login}>Start Shipment</Text>

                <Text style={{fontSize:15,
        color:'red',
        alignSelf:'center',
        marginTop:20,}}>From Location</Text>

<View style={{flexDirection:'row', alignItems: 'center', justifyContent: 'center'}}>
            <View style={{ backgroundColor: null, alignSelf:'center', justifyContent:'space-between', flexDirection:'row'}}>

            <Text style={{fontSize:15,
        color:'green',
        alignSelf:'center',
        marginTop:10, marginRight: 5}}>Step</Text>
                
                <View style={{
width: 30,
height: 30,

borderRadius: 20,
borderWidth: 1,
borderColor: 'green',
borderStyle: 'solid',
backgroundColor: 'green',
alignSelf: 'center',
justifyContent: 'center', marginTop: 11}}>
 <Text style={{fontSize: 15,textAlign: 'center', color: 'white', fontWeight: 'bold'}}>2</Text></View>

 </View>
 </View>       

 
{/* 
 <View style={{flexDirection:'row', alignItems: 'center', justifyContent: 'center',}}>
            <View style={{ backgroundColor: null, alignSelf:'center', justifyContent:'space-between', flexDirection:'row'}}>

 <View style={{ backgroundColor: 'green', height: this.state.fromLocationborderwidth,
marginTop:0,width: 100}}></View>

<View style={{ backgroundColor: 'green', height: this.state.toLocationborderwidth,
 marginLeft:  8,
marginTop:0,borderRadius:2,width: 100}}></View>

 </View>
 </View>  */}
                
 { this.state.fromToLocationFlag == 'from' && <View style={{marginLeft:7,marginTop:20, backgroundColor: 'null', marginRight: 7}}>

<Text style={{fontSize:15,
        color:'black',
        marginLeft: 13,
        marginTop:33,}}>First Name *</Text>

                <TextInput style={styles.textInput}
                placeholder={'First Name'}
                placeholderTextColor={'grey'}
                autoCapitalize = 'words'
      value = {this.state.FromFirstnameString}
      onChangeText={(text) => this.setState({ FromFirstnameString: text})}
                ></TextInput>


<Text style={{fontSize:15,
        color:'black',
        marginLeft: 13,
        marginTop:15,}}>Last Name *</Text>

                <TextInput style={styles.textInput}
                placeholder={'Last Name'}
                placeholderTextColor={'grey'}
                autoCapitalize = 'words'
      value = {this.state.FromLastnameString}
      onChangeText={(text) => this.setState({ FromLastnameString: text})}
                ></TextInput>


<Text style={{fontSize:15,
        color:'black',
        marginLeft: 13,
        marginTop:15,}}>Address Line1 *</Text>

                {/* <TextInput style={styles.textInput}
                placeholder={'Adress Line 1'}
                placeholderTextColor={'grey'}
                value = {this.state.FromAddress1String}
               onChangeText={(text) => this.setState({ FromAddress1String: text})}
      ></TextInput> */}
      {/* <TouchableOpacity onPress={() => navigate('GoogleAddressPage',{
                      navigationFlagForAddress1: 'locationFromAdd1'})}>
                <TextInput style={styles.textInput}
                placeholder={'Address 1'}
                placeholderTextColor={'grey'}
                autoCapitalize = 'none'
                value = {this.state.FromAddress1String}
                editable={false}
                ></TextInput>
                </TouchableOpacity>  */}



                <View style={{flexDirection:'row', marginRight: 13,}}>


                 <TouchableOpacity style={{
    
    width: '84%',
    marginLeft: 7,
    borderRadius: 0,
    marginRight: 13,
    marginLeft: 13,


    }} onPress={() => navigate('GoogleAddressPage',{
                      navigationFlagForAddress1: 'locationFromAdd1'})}> 
<TextInput style={{
    
    width: '100%',
    
    fontSize: 12,
    height: 40,
    color: 'gray',
     borderBottomWidth: 1,
     borderBottomColor: 'grey',

    }}
    pointerEvents="none"
    placeholder={'Address 1'}
    placeholderTextColor={'grey'}
    autoCapitalize = 'none'
    value = {this.state.FromAddress1String}
    editable={false}
    maxLength={47}
                ></TextInput>
 </TouchableOpacity> 
{/* this.setState({showOrHidePhone2Flag: 'show'}) */}

{/* this.refs.radioForm.updateIsActiveIndex(-1) */}

<TouchableOpacity onPress={() => this.requestLocationPermission()}> 

<Image style={{ height: 22, width: 22, marginLeft: 5, marginTop: 10, tintColor: 'red' }}
                source={require('../Images/outline_gps_fixed_black_48.png')}></Image>

             
</TouchableOpacity>

</View>



<Text style={{fontSize:15,
        color:'black',
        marginLeft: 13,
        marginTop:15,}}>Address Line 2</Text>

                <TextInput style={styles.textInput}
                placeholder={'Adress Line 2'}
                placeholderTextColor={'grey'}
                autoCapitalize = 'none'
      value = {this.state.FromAddress2String}
      onChangeText={(text) => this.setState({ FromAddress2String: text})}
                ></TextInput>

<Text style={{fontSize:15,
        color:'black',
        marginLeft: 13,
        marginTop:15,}}>Company (Optional)</Text>

                <TextInput style={styles.textInput}
                placeholder={'Company Name'}
                placeholderTextColor={'grey'}
                autoCapitalize = 'none'
                value = {this.state.FromCompanyString}
                onChangeText={(text) => this.setState({ FromCompanyString: text})}
                ></TextInput>


<Text style={{fontSize:15,
        color:'black',
        marginLeft: 13,
        marginTop:15,}}>Country/Territory *</Text>

<TouchableOpacity onPress={() => this.CallToShowDropDownCombo('fromcountry')}>
<View style={{flexDirection:'row', alignItems: 'center', justifyContent: 'center', height: 40,
      margin: 0,
      marginTop: 0}}>
            <View style={{flex:1, maxWidth: 414, backgroundColor: null, flexDirection:'row', justifyContent:'space-between'}}>
                <Text style={{paddingLeft:13,color: 'gray', fontSize: 12,}}>{this.state.FromCountryString}</Text>
                <View style={{width:15, height:15, justifyContent: 'flex-end', marginRight: 20, marginTop: 6}}>
                  <Image source={require("../Images/down_arrow.png")} style={{width:15, height:15,}} />
                </View>
                
              </View>
              </View>
              </TouchableOpacity>


              <Text style={{fontSize:15,
        color:'black',
        marginLeft: 13,
        marginTop:15,}}>State *</Text>

<TouchableOpacity onPress={() => this.CallToShowDropDownCombo('fromstate')}>
<View style={{flexDirection:'row', alignItems: 'center', justifyContent: 'center', height: 40,
      margin: 0,
      marginTop: 0}}>
            <View style={{flex:1, maxWidth: 414, backgroundColor: null, flexDirection:'row', justifyContent:'space-between'}}>
                <Text style={{paddingLeft:13,color: 'gray', fontSize: 12,}}>{this.state.FromStateString}</Text>
                <View style={{width:15, height:15, justifyContent: 'flex-end', marginRight: 20, marginTop: 6}}>
                  <Image source={require("../Images/down_arrow.png")} style={{width:15, height:15,}} />
                </View>
                
              </View>
              </View>
              </TouchableOpacity>


              <Text style={{fontSize:15,
        color:'black',
        marginLeft: 13,
        marginTop:15,}}>City *</Text>

<TouchableOpacity onPress={() => this.CallToShowDropDownCombo('fromcity')}>
<View style={{flexDirection:'row', alignItems: 'center', justifyContent: 'center', height: 40,
      margin: 0,
      marginTop: 0}}>
            <View style={{flex:1, maxWidth: 414, backgroundColor: null, flexDirection:'row', justifyContent:'space-between'}}>
                <Text style={{paddingLeft:13,color: 'gray', fontSize: 12,}}>{this.state.FromCityString}</Text>
                <View style={{width:15, height:15, justifyContent: 'flex-end', marginRight: 20, marginTop: 6}}>
                  <Image source={require("../Images/down_arrow.png")} style={{width:15, height:15,}} />
                </View>
                
              </View>
              </View>
              </TouchableOpacity>

              <Text style={{fontSize:15,
        color:'black',
        marginLeft: 13,
        marginTop:15,}}>Zip code *</Text> 

                <TextInput style={styles.textInput}
                placeholder={'Zip Code'}
                placeholderTextColor={'grey'}
                autoCapitalize = 'none'
                maxLength={12}
                value = {this.state.FromZipCodeString}
                onChangeText={(text) => this.TypingFromZipCode(text)}//this.setState({ FromZipCodeString: text})}
                ></TextInput>

<View style={styles.itemRow}>
<Text style={styles.errorHint}>{this.state.fromZipError}</Text>
        <TouchableOpacity onPress={() => this.setState({ modalVisibleForZip: true, DescriptionString: '', maxLengthh1: 5000})}>
        <Text style={{color:'green',fontSize:13, marginLeft: 3, fontWeight: "bold", marginTop: -2}}>{this.state.fromZipError1}</Text>
        </TouchableOpacity>
        <Text style={{color: 'red',
          fontSize: 10, marginLeft: 3,}}>{this.state.fromZipError2}</Text>
        </View>

<Text style={{fontSize:15,
        color:'black',
        marginLeft: 13,
        marginTop:15,}}>Email Address</Text>

                <TextInput style={styles.textInput}
                placeholder={'Email Address'}
                placeholderTextColor={'grey'}
                autoCapitalize = 'none'
                value = {this.state.FromEmailString}
                onChangeText={(text) => this.setState({ FromEmailString: text})}
                ></TextInput>

<Text style={{fontSize:15,
        color:'black',
        marginLeft: 13,
        marginTop:15,}}>Phone no *</Text>

                <TextInput style={styles.textInput}
                placeholder={'Mobile Number'}
                placeholderTextColor={'grey'}
                keyboardType='phone-pad'
                value = {this.state.FromPhoneString}
                onChangeText={(text) => this.setState({ FromPhoneString: text})}
                ></TextInput>


<Text style={{fontSize:15,
        color:'black',
        marginLeft: 13,
        marginTop:15,}}>Address Type *</Text>


<View style={{marginLeft:13,marginTop:14, marginBottom: 20, marginRight: 13}}>
                <RadioForm
  radio_props={radio_props}
  style={{
    // alignSelf:'center',
    backgroundColor: 'rgba(246, 244, 243, 1)'
}}

  initial={this.state.FromAddressTypeString}
  formHorizontal={true}
  buttonColor={'rgba(198, 35, 0, 1)'}
  selectedButtonColor={'rgba(198, 35, 0, 1)'}
  
  labelStyle={{fontSize: 11, color: 'gray', marginRight:7}}
  onPress={(value) => {this.switchingBetweenHomeAndBusinessAddress(value)}}
/>
</View>
                
                </View> }



                { this.state.fromToLocationFlag == 'to' && <View style={{marginLeft:7,marginTop:20, backgroundColor: 'null', marginRight: 7}}>

                <Text style={{fontSize:15,
        color:'black',
        marginLeft: 16,
        marginTop:10,}}>First Name *</Text>

                <TextInput style={styles.textInput}
                placeholder={'Enter First Name'}
                placeholderTextColor={'grey'}
                autoCapitalize = 'words'
      value = {this.state.ToFirstnameString}
      onChangeText={(text) => this.setState({ ToFirstnameString: text})}
                ></TextInput>

<View style={{marginLeft:13,marginTop:-4, backgroundColor: 'gray', marginRight: 13, height: 1, marginBottom: 7}}></View>


<Text style={{fontSize:15,
        color:'black',
        marginLeft: 16,
        marginTop:10,}}>Last Name *</Text>

<TextInput style={styles.textInput}
                placeholder={'Enter Last Name'}
                placeholderTextColor={'grey'}
                autoCapitalize = 'words'
      value = {this.state.ToLastnameString}
      onChangeText={(text) => this.setState({ ToLastnameString: text})}
                ></TextInput>


<View style={{marginLeft:13,marginTop:-4, backgroundColor: 'gray', marginRight: 13, height: 1, marginBottom: 7}}></View>


                {/* <TextInput style={styles.textInput}
                placeholder={'Address Line 1'}
                placeholderTextColor={'grey'}
                autoCapitalize = 'none'
      value = {this.state.ToAddress1String}
                ></TextInput> */}

<Text style={{fontSize:15,
        color:'black',
        marginLeft: 16,
        marginTop:10,}}>Address 1 *</Text>

                <TouchableOpacity onPress={() => navigate('GoogleAddressPage',{
                      navigationFlagForAddress1: 'locationToAdd1'})}>
                <TextInput style={styles.textInput}
                placeholder={'Enter Address Line 1'}
                pointerEvents="none"
                placeholderTextColor={'grey'}
                autoCapitalize = 'none'
                value = {this.state.ToAddress1String}
                editable={false}
                ></TextInput>
                </TouchableOpacity> 

<View style={{marginLeft:13,marginTop:-4, backgroundColor: 'gray', marginRight: 13, height: 1, marginBottom: 7}}></View>

<Text style={{fontSize:15,
        color:'black',
        marginLeft: 16,
        marginTop:10,}}>Address 2 </Text>

<TextInput style={styles.textInput}
                placeholder={'Enter Adress Line 2'}
                placeholderTextColor={'grey'}
                autoCapitalize = 'none'
      value = {this.state.ToAddress2String}
      onChangeText={(text) => this.setState({ ToAddress2String: text})}
                ></TextInput>

<View style={{marginLeft:13,marginTop:-4, backgroundColor: 'gray', marginRight: 13, height: 1, marginBottom: 7}}></View>

<Text style={{fontSize:15,
        color:'black',
        marginLeft: 16,
        marginTop:10,}}>Company Name</Text>


<TextInput style={styles.textInput}
                placeholder={'Enter Company Name'}
                placeholderTextColor={'grey'}
                autoCapitalize = 'none'
                value = {this.state.ToCompanyString}
                onChangeText={(text) => this.setState({ ToCompanyString: text})}
                ></TextInput>

<View style={{marginLeft:13,marginTop:-4, backgroundColor: 'gray', marginRight: 13, height: 1, marginBottom: 7}}></View>

<Text style={{fontSize:15,
        color:'black',
        marginLeft: 16,
        marginTop:10,}}>Country *</Text>

<TouchableOpacity onPress={() => this.CallToShowDropDownCombo('tocountry')}>
<View style={{flexDirection:'row', alignItems: 'center', justifyContent: 'center', height: 40,
      margin: 0,
      marginTop: 0}}>
            <View style={{flex:1, maxWidth: 414, backgroundColor: null, flexDirection:'row', justifyContent:'space-between'}}>
                <Text style={{paddingLeft:16,color: 'gray', fontSize: 12,}}>{this.state.ToCountryString}</Text>
                <View style={{width:15, height:15, justifyContent: 'flex-end', marginRight: 20, marginTop: 6}}>
                  <Image source={require("../Images/down_arrow.png")} style={{width:15, height:15,}} />
                </View>
                
              </View>
              </View>
              </TouchableOpacity>


              <View style={{marginLeft:13,marginTop:-4, backgroundColor: 'gray', marginRight: 13, height: 1, marginBottom: 7}}></View>

              <Text style={{fontSize:15,
        color:'black',
        marginLeft: 16,
        marginTop:10,}}>State *</Text>

<TouchableOpacity onPress={() => this.CallToShowDropDownCombo('tostate')}>
<View style={{flexDirection:'row', alignItems: 'center', justifyContent: 'center', height: 40,
      margin: 0,
      marginTop: 0}}>
            <View style={{flex:1, maxWidth: 414, backgroundColor: null, flexDirection:'row', justifyContent:'space-between'}}>
                <Text style={{paddingLeft:16,color: 'gray', fontSize: 12,}}>{this.state.ToStateString}</Text>
                <View style={{width:15, height:15, justifyContent: 'flex-end', marginRight: 20, marginTop: 6}}>
                  <Image source={require("../Images/down_arrow.png")} style={{width:15, height:15,}} />
                </View>
                
              </View>
              </View>
              </TouchableOpacity>


              <View style={{marginLeft:13,marginTop:-4, backgroundColor: 'gray', marginRight: 13, height: 1, marginBottom: 7}}></View>

              <Text style={{fontSize:15,
        color:'black',
        marginLeft: 16,
        marginTop:10,}}>City *</Text>

<TouchableOpacity onPress={() => this.CallToShowDropDownCombo('tocity')}>
<View style={{flexDirection:'row', alignItems: 'center', justifyContent: 'center', height: 40,
      margin: 0,
      marginTop: 0}}>
            <View style={{flex:1, maxWidth: 414, backgroundColor: null, flexDirection:'row', justifyContent:'space-between'}}>
                <Text style={{paddingLeft:16,color: 'gray', fontSize: 12,}}>{this.state.ToCityString}</Text>
                <View style={{width:15, height:15, justifyContent: 'flex-end', marginRight: 20, marginTop: 6}}>
                  <Image source={require("../Images/down_arrow.png")} style={{width:15, height:15,}} />
                </View>
                
              </View>
              </View>
              </TouchableOpacity>

              <View style={{marginLeft:13,marginTop:-4, backgroundColor: 'gray', marginRight: 13, height: 1, marginBottom: 7}}></View>

              <Text style={{fontSize:15,
        color:'black',
        marginLeft: 16,
        marginTop:10,}}>Zip Code *</Text>

              <TextInput style={styles.textInput}
                placeholder={'Enter Zip Code'}
                placeholderTextColor={'grey'}
                autoCapitalize = 'none'
                keyboardType='numbers-and-punctuation'
                value = {this.state.ToZipCodeString}
                maxLength={12}
                onChangeText={(text) => this.TypingToZipCode(text)}//setState({ ToZipCodeString: text})}
                ></TextInput>

<View style={{marginLeft:13,marginTop:-4, backgroundColor: 'gray', marginRight: 13, height: 1, marginBottom: 0}}></View>
<View style={styles.itemRow}>
<Text style={styles.errorHint}>{this.state.toZipError}</Text>
        <TouchableOpacity onPress={() => this.setState({ modalVisibleForZip: true, DescriptionString: ''})}>
        <Text style={{color:'green',fontSize:13, marginLeft: 3, fontWeight: "bold", marginTop: -2}}>{this.state.toZipError1}</Text>
        </TouchableOpacity>
        <Text style={{color: 'red',
          fontSize: 10, marginLeft: 3,}}>{this.state.toZipError2}</Text>
        </View>

        <Text style={{fontSize:15,
        color:'black',
        marginLeft: 16,
        marginTop:10,}}>Email Address *</Text>
 
<TextInput style={styles.textInput}
                placeholder={'Enter Email Address'}
                placeholderTextColor={'grey'}
                autoCapitalize = 'none'
                value = {this.state.ToEmailString}
                onChangeText={(text) => this.setState({ ToEmailString: text})}
                ></TextInput>

<View style={{marginLeft:13,marginTop:-4, backgroundColor: 'gray', marginRight: 13, height: 1, marginBottom: 7}}></View>

<Text style={{fontSize:15,
        color:'black',
        marginLeft: 16,
        marginTop:10,}}>Mobile Number *</Text>

<View style={styles.itemRow2}>
                 <View style={{marginLeft: 13, marginTop:15, bottom:7}}>
                 <CountryPicker countryCode = {this.state.countryCodeString} withCallingCodeButton = 'false'
                withCallingCode = 'true' onSelect={(country) => this.setState({ countryCodeString: country.cca2})}
      />
       </View>
       <TextInput style={styles.textInput2}
                
                placeholder={'Enter Mobile Number'}
                placeholderTextColor={'grey'}
                keyboardType='phone-pad'
                value = {this.state.ToPhoneString}
                onChangeText={(text) => this.setState({ ToPhoneString: text})}></TextInput>

<TouchableOpacity onPress={() => this.setState({showOrHidePhone2Flag: 'show'})}> 
              <Text style={{ marginTop: 7, fontSize:11,fontWeight: "bold",color:'white',
 textAlign: 'center', textAlignVertical: 'center', height: 30,
borderRadius:2,width: 70,
color: 'white', backgroundColor: 'red', padding: 7,}}>
   Add More
</Text> 
</TouchableOpacity>
       
        </View>
        


{ this.state.showOrHidePhone2Flag == 'show' && <View style={{flexDirection:'row', marginRight: 13, marginTop: 10}}>
  
<TextInput style={{
    
    width: '60%',
    marginLeft: 7,
    borderRadius: 0,
    marginRight: 13,
    marginLeft: 13,
    fontSize: 12,
    height: 40,
    color: 'gray',
    borderBottomWidth: 1,
    borderBottomColor: 'grey',

    }}
                placeholder={'Mobile Number (Optional)'}
                placeholderTextColor={'grey'}
                keyboardType='phone-pad'
                value = {this.state.ToPhoneString1}
                onChangeText={(text) => this.setState({ ToPhoneString1: text})}
                ></TextInput>



<TouchableOpacity onPress={() => this.setState({showOrHidePhone2Flag: 'hide'})}>
              <Text style={{ marginTop: 7, fontSize:13,fontWeight: "bold",color:'white',
 textAlign: 'center', textAlignVertical: 'center', height: 30,
borderRadius:2,width: 85,
color: 'white', backgroundColor: 'red', padding: 7, }}>
   Remove
</Text> 
</TouchableOpacity>

</View>
  }


{/* <View style={{marginLeft:13,marginTop:-4, backgroundColor: 'gray', marginRight: 13, height: 1, marginBottom: 7}}></View> */}


<View style={{marginLeft:13,marginTop:14}}>
                <RadioForm
  radio_props={radio_props}
  style={{
    // alignSelf:'center',
    backgroundColor: 'rgba(246, 244, 243, 1)'
}}
  initial={this.state.ToAddressTypeString}
  formHorizontal={true}
  buttonColor={'rgba(198, 35, 0, 1)'}
  selectedButtonColor={'rgba(198, 35, 0, 1)'}
  ref="radioForm"
  labelStyle={{fontSize: 12, color: 'gray', marginRight:7}}
  onPress={(value) => {this.switchingBetweenHomeAndBusinessAddress1(value)}}
/>
</View>
                
                </View> }
               

               
                 <TouchableOpacity style={{ height: 40, marginLeft:  Dimensions.get('window').width - 150,
marginTop:45,borderRadius:2,width: 80, backgroundColor: 'green', marginBottom: 65}} onPress ={() => this.NextButtonCliecked()}>
              <Text style={{  fontSize:20,fontWeight: "bold",color:'white', alignSelf: 'center',
 textAlign: 'center', textAlignVertical: 'center', padding: 5,}}>
   Next
</Text> 
</TouchableOpacity> 
       

        

  
</ScrollView>
</View>
<Spinner
          visible={this.state.progress}
          textContent={'Loading...'}
          textStyle={styles.spinnerTextStyle}
        />
<Modal
                            animationType="slide"
                            transparent={true}
                            visible={this.state.seachableModalVisible}
                        >
                            <View style={{ height: 500, marginTop: 12 }}>
                                <View style={styles.modalStyle}>
        <FlatList
          data={this.state.data}
          renderItem={this.renderSearchableData}
           keyExtractor={item => item.name}
          ItemSeparatorComponent={this.renderSeparator}
          // ListHeaderComponent={this.renderHeader}
        />
     
                                </View>

                                <TouchableOpacity onPress={() => { this.setState({ seachableModalVisible: false }) }}>
                                    <View style={styles.cancelStyle}>
                                        <Text style={{ fontSize: 20, alignSelf: 'center', marginTop: 16, color: 'white' }}>Cancel</Text>
                                    </View>
                                </TouchableOpacity>

                            </View>
                        </Modal>


                        <Modal
                            animationType="slide"
                            transparent={true}
                            visible={this.state.modalVisibleForZip}
                        >
                          
                            <View style={{ height: 300, marginTop: 105, backgroundColor: 'white',  width: 340,
        alignSelf: 'center', }}>
                            
                                <View style={styles.modalStyle1}>
<Text style={{ fontSize: 13, alignSelf: 'flex-start', marginTop: 10, color: 'black', marginLeft: 17, marginBottom: 7, fontWeight: 'bold' }}>Get In Touch</Text>
<TextInput style={{
    
    width: null,
    marginLeft: 17,
    borderRadius: 0,
    marginRight: 17,
    backgroundColor: 'white',
    fontSize: 12,
    height: 80,
    color: 'gray',
   borderColor: 'red',
   borderWidth: 1,
      padding: 5,
      paddingTop: 5,
      
    
    }}
                placeholder={'Description'}
                multiline={true}
     numberOfLines={5}
     textAlignVertical={'top'}
                placeholderTextColor={'grey'}
                value = {this.state.DescriptionString}
                maxLength={5000}
                onChangeText={(text) => this.setState({ DescriptionString: text, maxLengthh1: 5000 - text.length})}
                ></TextInput>
<Text style={{ fontSize: 11, alignSelf: 'flex-start', marginTop: 5, color: 'red', marginLeft: 17, marginBottom: 7, fontWeight: '400' }}>{this.state.maxLengthh1+' Character remaining'}</Text>
<TouchableOpacity style={{  height: 40, alignSelf: 'center',borderRadius:2,width: 140,
 backgroundColor: 'red', marginTop: 20}} onPress ={() => this.authenticateUserNoteToAdminApiCall()}>
              <Text style={{  fontSize:20,fontWeight: "bold",color:'white',
 textAlign: 'center', textAlignVertical: 'center',
color: 'white', padding: 6}}>
   Send
</Text> 
</TouchableOpacity>

<View style={styles.itemRow1}>
<Text style={styles.errorHint}>For more information about our branches</Text>
        <TouchableOpacity onPress={() => Linking.openURL('http://staging-rss.staqo.com/branch-list').catch(err => console.error("Couldn't load page", err))}>
        <Text style={{color:'green',fontSize:11, marginLeft: 3, fontWeight: "bold",}}>Click here</Text>
        </TouchableOpacity>
        
        </View>
                                </View>

                                <TouchableOpacity onPress={() => { this.setState({ modalVisibleForZip: false }) }}>
                                    <View style={styles.cancelStyle1}>
                                        <Text style={{ fontSize: 20, alignSelf: 'center', marginTop: 10, color: 'black' }}>Cancel</Text>
                                    </View>
                                </TouchableOpacity>
                                </View>
                            
                        </Modal>

            </View>

          
            </SafeAreaView >
      
    );
  }
  TypingToZipCode(text)
  {
    // console.log('ToZipCodeString text lenght', text.length)
    this.setState({ ToZipCodeString: text})

    if (text.length > 4)
    {
      this.customZipValidationCheck(text, 'to')
    }
  }
  TypingFromZipCode(text)
  {
    
    if (text.length > 4)
    {
      this.customZipValidationCheck(text, 'from')
    }

    // console.log('FromZipCodeString text lenght', text.length)
    this.setState({ FromZipCodeString: text})
  }
   setCharAt(str,index,chr) {
    if(index > str.length-1) return str;
    return str.substring(0,index) + chr + str.substring(index+1);
}
customZipValidationCheck = (text, flag) => {

        
  var params = {}
  
  params = 
  {

    postal_code: text,

  
  }

  
const { navigate } = this.props.navigation;

  const url = UrlUtil.BASE_URL + 'api/validateTozipcode';

console.log('customZipValidationCheck param dic => ', params, url, flag);

var formData = new FormData();

for (var k in params) {
  formData.append(k, params[k]);
}
     

fetch(url, {
    method: 'POST',

    headers: {
      'Content-Type': 'multipart/form-data',
    },
  
  body: formData
   
})
    .then((res) => res.json())
    .then((json) =>
{ 

  
    let resultJSON = JSON.stringify(json)
    console.log("Result JSON is == ",resultJSON)


    if (json.status == 'success')
    {

      if (flag == 'to')
      {
        this.setState({ isCheckedToZip: true, toZipError: '', toZipError1: '', toZipError2: ''})
      }
      else
      {
        this.setState({ isCheckedFromZip: true, fromZipError: '',  fromZipError1: '', fromZipError2: ''})
      }
      
      
    }
    else
    { 

      if (flag == 'to')
      {
        this.setState({ isCheckedToZip: false, toZipError: 'We do not cover your area!', toZipError1: 'Click here', toZipError2: 'to get in touch'})
      }
      else
      {
        this.setState({ isCheckedToZip: false, fromZipError: 'We do not cover your area!', fromZipError1: 'Click here', fromZipError2: 'to get in touch'})
       
        
      }

     
    }


  })
  .catch((err) => {

    if (flag == 'to')
    {
      this.setState({ isCheckedToZip: false})
    }
    else
    {
      this.setState({ isCheckedToZip: false})
    }
    
    Alert.alert(
      'Error',
      'Please check your network connection', // <- this part is optional, you can pass an empty string
      [
        {text: 'OK', onPress: () => this.setState({progress:false})},
      ],
      {cancelable: false},
    );
  })
       
      
    
       
    
  }
  customZipValidationCheck1 = (text) => {

        
    var params = {}
    
    params = 
    {
  
      postal_code: text,
  
    
    }
  
    
  const { navigate } = this.props.navigation;
  
    const url = UrlUtil.BASE_URL + 'api/validateTozipcode';
  
  console.log('customZipValidationCheck param dic => ', params, url);
  
  var formData = new FormData();
  
  for (var k in params) {
    formData.append(k, params[k]);
  }
       
  
  fetch(url, {
      method: 'POST',
  
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    
    body: formData
     
  })
      .then((res) => res.json())
      .then((json) =>
  { 
  
    
      let resultJSON = JSON.stringify(json)
      console.log("Result JSON is == ",resultJSON)
  
  
      if (json.status == 'success')
      {
  
        
        this.customZipValidationCheck2(this.state.FromZipCodeString)
        
      }
      else
      { 
        
        this.setState({
          toZipError: 'We do not cover your area!',
          toZipError1: 'Click here',
          toZipError2: 'to get in touch'
          //  UserTypeString: 'BU'
         })
        alert('Please enter a valid Zip Code in To Location')
  
       
      }
  
  
    })
    .catch((err) => {
  
      
      Alert.alert(
        'Error',
        'Please check your network connection', // <- this part is optional, you can pass an empty string
        [
          {text: 'OK', onPress: () => this.setState({progress:false})},
        ],
        {cancelable: false},
      );
    })
         
        
      
         
      
    }
    customZipValidationCheck2 = (text) => {

        
      var params = {}
      
      params = 
      {
    
        postal_code: text,
    
      
      }
    
      
    const { navigate } = this.props.navigation;
    
      const url = UrlUtil.BASE_URL + 'api/validateTozipcode';
    
    console.log('customZipValidationCheck param dic => ', params, url);
    
    var formData = new FormData();
    
    for (var k in params) {
      formData.append(k, params[k]);
    }
         
    
    fetch(url, {
        method: 'POST',
    
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      
      body: formData
       
    })
        .then((res) => res.json())
        .then((json) =>
    { 
    
      
        let resultJSON = JSON.stringify(json)
        console.log("Result JSON is == ",resultJSON)
    
    
        if (json.status == 'success')
        {
    
          if (this.state.FromFirstnameString.trim() == '') {
            alert('Please Enter First Name in From Location segment');
        }
        else if (this.state.FromLastnameString.trim() == '') {
            alert('Please Enter Last Name in From Location segment');
        }
        else if (this.state.FromAddress1String.trim() == '') {
         alert('Please Enter Address 1');
      }
      // else if (this.state.FromAddress2String.trim() == '') {
      //    alert('Please Enter Address 2 in From Location segment');
      // }
      else if (this.state.FromCountryString == 'Country') {
       alert('Please Select Your Country in From Location segment');
      }
      else if (this.state.FromStateString == 'State') {
       alert('Please Select Your State in From Location segment');
      }
      else if (this.state.FromCityString == 'City' || this.state.FromCityString == undefined) {
      alert('Please Select Your City in From Location segment');
      }
      else if (this.state.FromZipCodeString.trim() == '') {
      alert('Please Enter Zip Code in From Location segment');
      }
      else if (this.state.FromPhoneString.trim() == '') {
      alert('Please Enter Phone Number in From Location segment');
      }
      else if (this.state.FromEmailString.trim() == '') {
      alert('Please Enter Email in From Location segment');
      }
        else {
      
          let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
  if (reg.test(this.state.FromEmailString.trim()) === false) {

    alert('Email is Not Correct');
    
  }
  else {
      
          var dictionary_main = {};
          dictionary_main['FromFirstnameString'] = this.state.FromFirstnameString
          dictionary_main['FromLastnameString'] = this.state.FromLastnameString
          dictionary_main['FromAddress1String'] = this.state.FromAddress1String
          dictionary_main['FromAddress2String'] = this.state.FromAddress2String
          dictionary_main['FromCompanyString'] = this.state.FromCompanyString
          dictionary_main['FromCountryString'] = this.state.FromCountryString
          dictionary_main['FromStateString'] = this.state.FromStateString
          dictionary_main['FromCityString'] = this.state.FromCityString
          dictionary_main['FromZipCodeString'] = this.state.FromZipCodeString
          dictionary_main['FromEmailString'] = this.state.FromEmailString
          dictionary_main['FromPhoneString'] = this.state.FromPhoneString
          dictionary_main['FromAddressTypeString'] = this.state.FromAddressTypeString
          dictionary_main['fromSelectedCountryID'] = this.state.fromSelectedCountryID
          dictionary_main['fromSelectedStateID'] = this.state.fromSelectedStateID
          dictionary_main['fromSelectedCityID'] = this.state.fromSelectedCityID
          dictionary_main['fromLattitude'] = this.state.fromLattitude
          dictionary_main['fromLogitude'] = this.state.fromLogitude
      
      
      var dictionary_main2 = this.props.navigation.state.params.quoteOrShipmentData
      dictionary_main2['fromUserdata'] = dictionary_main
      
      
      if (this.state.fromSelectedStateID != '')
      {
        AsyncStorage.setItem('selectedStateID', this.state.fromSelectedStateID);
      }
      
      
          this.props.navigation.navigate('ToLocationPage',{
            navigationFlag: this.props.navigation.state.params.navigationFlag,
            quoteOrShipmentData: dictionary_main2
          })
        }
        }
          
          
        }
        else
        { 
    
          this.setState({
            fromZipError: 'We do not cover your area!',
            fromZipError1: 'Click here',
            fromZipError2: 'to get in touch'
          
           })
    alert('Please enter a valid Zip Code in From Location')
         
        }
    
    
      })
      .catch((err) => {
    
    
        
        Alert.alert(
          'Error',
          'Please check your network connection', // <- this part is optional, you can pass an empty string
          [
            {text: 'OK', onPress: () => this.setState({progress:false})},
          ],
          {cancelable: false},
        );
      })
           
          
        
           
        
      }
  async componentDidMount() 
  {
    if (Platform.OS === 'ios') {
      KeyboardManager.setEnable(true);
      KeyboardManager.setKeyboardDistanceFromTextField(5);
      
  }
    console.log('quoteOrShipmentData=> ', this.props.navigation.state.params.quoteOrShipmentData)
   // this.customCountryStateCityApiCall()

   let user = await AsyncStorage.getItem('userdata');
   let parsed = JSON.parse(user);

   console.log('userdata1 => ',parsed)
if (parsed.user_type == 'BU')
{
 this.setState({
  FromAddressTypeString: 1,
  //  UserTypeString: 'BU'
 })
}
else
{
 this.setState({
  FromAddressTypeString: 0,
  //  UserTypeString: 'NU'
 })
}
   

   this.setState({
    FromFirstnameString: parsed.firstname,
    FromLastnameString: parsed.lastname,
    FromAddress1String: parsed.address,
     FromAddress2String: parsed.address2,
     FromCountryString: parsed.country_name,
      FromStateString: parsed.state_name,
      FromCityString: parsed.city_name,
      fromSelectedCountryID: parsed.country,
      fromSelectedStateID: parsed.state,
      fromSelectedCityID: parsed.city,
     FromZipCodeString: parsed.zip,
     FromPhoneString: parsed.telephone,
     FromEmailString: parsed.email,
     UserIDString: parsed.user_id,
     FromCompanyString: parsed.companyname,
     WebsiteString: parsed.companydetails,
     fromLattitude: parsed.latitude,
     fromLogitude: parsed.longitude,

     

    
   });
  // this.setState({progress:false})
 
   Geocoder.init("AIzaSyDmUohDE70gjqrjgFEbhtyjPOhn9WBghuo");
  // this.requestLocationPermission()

  }
  NextButtonCliecked()
  {
    // this.props.navigation.navigate('ParcelDetailsPage',{
    //   navigationFlag: this.props.navigation.state.params.navigationFlag,
    //   quoteOrShipmentData: this.props.navigation.state.params.quoteOrShipmentData
    // })
  
   
    //  this.customZipValidationCheck1(this.state.ToZipCodeString)
     this.customZipValidationCheck2(this.state.FromZipCodeString)
    
    
  }
handleBackButtonClick() {
  

  this.props.navigation.goBack(null);
  return true;
}
authenticateUserNoteToAdminApiCall = () => {
  if (this.state.DescriptionString.trim() == '')
  {
    Alert.alert(
      'Alert',
      'Please enter notes', // <- this part is optional, you can pass an empty string
      [
        {text: 'OK', onPress: () => this.setState({progress:false})},
      ],
      {cancelable: false},
    );
  }
  else
  {
    this.sendUserNoteToAdminApiCall()
  }

}
sendUserNoteToAdminApiCall = () => {

  var params = {}
  var url = ''
  // user_id, user_type (BU or NU), firstname, lastname, telephone, email, companyname (for BU), 
  // companydetails (for BU), address, address2, country, state, city, zip

  
    url = UrlUtil.BASE_URL + 'api/sendzipcodeQuery';

    params = {
      note: this.state.DescriptionString,
      email: this.state.FromEmailString,

    }

const { navigate } = this.props.navigation;

console.log('Custom sign in param dic => ', url);

var formData = new FormData();

for (var k in params) {
  formData.append(k, params[k]);
}


fetch(url, {
    method: 'POST',

    headers: {
      'Content-Type': 'multipart/form-data',
    },

    body: formData  
  
   
})
    .then((res) => res.json())
    .then((json) =>
{ 

  this.setState({
    progress:false
})
    let resultJSON = JSON.stringify(json)

    console.log("Result JSON for sendUserNoteToAdminApiCall is == ",resultJSON)


    if (json.status == 'success')
    {

      this.setState({ modalVisibleForZip: false})

     Alert.alert(
      'Success',
      'Your Queries has been sent and Royal Serry Shipping Team will contact you soon.', // <- this part is optional, you can pass an empty string
      [
        {text: 'OK', onPress: () => this.setState({progress:false})},
      ],
      {cancelable: false},
    );

    }
    else
    {

      this.setState({ modalVisibleForZip: false})

      Alert.alert(
        'Failure',
        json.message, // <- this part is optional, you can pass an empty string
        [
          {text: 'OK', onPress: () => this.setState({progress:false})},
        ],
        {cancelable: false},
      );
      
    }



  })
  .catch((err) => {
     this.setState({ modalVisibleForZip: false})
    alert('error = '+JSON.stringify(err));
  })
    
  }
copyCustomCountryApiCall = () => {

  var params = {}
  var url = ''
  // user_id, user_type (BU or NU), firstname, lastname, telephone, email, companyname (for BU), 
  // companydetails (for BU), address, address2, country, state, city, zip

  
    url = UrlUtil.BASE_URL + 'api/countryList';

const { navigate } = this.props.navigation;

console.log('Custom sign in param dic => ', url);

     

fetch(url, {
    method: 'GET',

    headers: {
      'Content-Type': 'multipart/form-data',
    },
  
   
})
    .then((res) => res.json())
    .then((json) =>
{ 

  this.setState({
    progress:false
})
    let resultJSON = JSON.stringify(json)
    console.log("Result JSON is == ",resultJSON)


    if (json.status == 'success')
    {
     // this.handleBackButtonClick()

     this.SuccessCountryStateCityApiFetch(json.countryList)

    }
    else
    {
      Alert.alert(
        'Failure',
        json.message, // <- this part is optional, you can pass an empty string
        [
          {text: 'OK', onPress: () => this.setState({progress:false})},
        ],
        {cancelable: false},
      );
      
    }



  })
  .catch((err) => {
    this.setState({
      progress:false
  })
    alert('error = '+JSON.stringify(err));
  })
    
  }
  
copyCustomCountryStateCityApiCall = () => {

  var params = {}
  var url = ''
  // user_id, user_type (BU or NU), firstname, lastname, telephone, email, companyname (for BU), 
  // companydetails (for BU), address, address2, country, state, city, zip

   if (selectedComboFlag == 'fromstate')
    {
      url = UrlUtil.BASE_URL + 'api/stateListByCountry';
      params = {
        countryID: this.state.fromSelectedCountryID
      }
    } 
    else if (selectedComboFlag == 'fromcity')
    {
      url = UrlUtil.BASE_URL + 'api/cityListBystate';
    params = {
      stateID: this.state.fromSelectedStateID
    }

    }
    else if (selectedComboFlag == 'tostate')
    {
      url = UrlUtil.BASE_URL + 'api/stateListByCountry';
    params = {
      countryID: this.state.toSelectedCountryID
    }
    } 
    else 
    {
      url = UrlUtil.BASE_URL + 'api/cityListBystate';
    params = {
      stateID: this.state.toSelectedStateID
    }
    } 


  // if (selectedComboFlag == 'state')
  // {
  //   url = UrlUtil.BASE_URL + 'api/stateListByCountry';
  //   params = {
  //     countryID: this.state.selectedCountryID
  //   }
  // } 
  // else
  // {
  //   url = UrlUtil.BASE_URL + 'api/cityListBystate';
  //   params = {
  //     stateID: this.state.selectedStateID
  //   }
  // } 

  
const { navigate } = this.props.navigation;

console.log('Custom sign in param dic => ', params, url);

var formData = new FormData();

for (var k in params) {
  formData.append(k, params[k]);
}
     

fetch(url, {
    method: 'POST',

    headers: {
      'Content-Type': 'multipart/form-data',
    },
  
  body: formData
   
})
    .then((res) => res.json())
    .then((json) =>
{ 

  this.setState({
    progress:false
})
    let resultJSON = JSON.stringify(json)
    console.log("Result JSON is == ",resultJSON)


    if (json.status == 'success')
    {
     // this.handleBackButtonClick()
     if (selectedComboFlag == 'fromstate' || selectedComboFlag == 'tostate')
     {
     this.SuccessCountryStateCityApiFetch(json.stateList)
     }
     else
     {
      this.SuccessCountryStateCityApiFetch(json.cityList)
     }

    }
    else
    {
      Alert.alert(
        'Failure',
        json.message, // <- this part is optional, you can pass an empty string
        [
          {text: 'OK', onPress: () => this.setState({progress:false})},
        ],
        {cancelable: false},
      );
      
    }



  })
  .catch((err) => {
    this.setState({
      progress:false
  })
    alert('error = '+JSON.stringify(err));
  })
    
  }
 customCountryStateCityApiCall = () => {

    console.log('selectedComboFlag', selectedComboFlag );
  
    var url = ''

    if (selectedComboFlag == 'fromcountry')
    {
      url = 'https://api.countrystatecity.in/v1/countries'
    }
    else if (selectedComboFlag == 'fromstate')
    {
      url = 'https://api.countrystatecity.in/v1/countries/' + this.state.fromSelectedCountryID + '/states'
    } 
    else if (selectedComboFlag == 'fromcity')
    {
      url = 'https://api.countrystatecity.in/v1/countries/'+this.state.fromSelectedCountryID+'/states/'+this.state.fromSelectedStateID+'/cities'

    } else if (selectedComboFlag == 'tocountry')
    {
      url = 'https://api.countrystatecity.in/v1/countries'
    }
    else if (selectedComboFlag == 'tostate')
    {
      url = 'https://api.countrystatecity.in/v1/countries/' + this.state.toSelectedCountryID + '/states'
    } 
    else 
    {
      url = 'https://api.countrystatecity.in/v1/countries/'+this.state.toSelectedCountryID+'/states/'+this.state.toSelectedStateID+'/cities'
    } 
         
         console.log('Country State City fetch urlll => ',url)
  
         const { navigate } = this.props.navigation;
      
         var headers = new Headers();
  headers.append("X-CSCAPI-KEY", "SW4wb044dGxDcHZtc1BwREl2SElZMW1SVTdzNGRzYkVleHkzcTdIWA==");
  
  var requestOptions = {
    method: 'GET',
    headers: headers,
    redirect: 'follow'
  };
  
  fetch(url, requestOptions)
    .then(response => response.json())
    .then(result =>  this.SuccessCountryStateCityApiFetch(result))
    .catch(error => console.log('error1', error),);
    
      
    }

    
  
    SuccessCountryStateCityApiFetch(result) 
    {
  console.log('SuccessCountryStateCityApiFetch: ', result)
  
      this.setState({data: result, dropdownMasterData: result, seachableModalVisible: true, value: ''})
    }
  
    switchingBetweenHomeAndBusinessAddress(value) 
    {
      console.log('switchingBetweenHomeAndBusinessAddress: ', value)
      this.setState({FromAddressTypeString: value})
    }
    switchingBetweenHomeAndBusinessAddress1(value) 
    {
      console.log('switchingBetweenHomeAndBusinessAddress: ', value)
      this.setState({ToAddressTypeString: value})
    }
  
    CallToShowDropDownCombo(selectedFlag) 
    {
      
      const { navigate } = this.props.navigation;

      console.log('selectedFlag: ', selectedFlag);
      if (this.state.fromToLocationFlag == 'to')
      {
  
      if (selectedFlag == 'tocountry')
      {
       
         selectedComboFlag = 'tocountry'
       // this.copyCustomCountryApiCall()
    navigate('cityStateCountryPickerPage',{
      navigationFlagForAddress1: 'locationPicker', flagtoShow: 'tocountry'})
      }
      
       if (selectedFlag == 'tostate')
      {
  
        if (this.state.ToCountryString == 'Country')
        {
          alert('Please Select Your Country');
        }
        else
        {


if (this.state.toSelectedCountryID != '')
{
  
   selectedComboFlag = 'tostate'
  // this.copyCustomCountryStateCityApiCall()
  navigate('cityStateCountryPickerPage',{
    navigationFlagForAddress1: 'locationPicker', flagtoShow: 'tostate', countryID: this.state.toSelectedCountryID})
    }
    else
    {
      alert('Please deselct Country once before selecting State')
    }


         
        }
  
      }
      
  
      if (selectedFlag == 'tocity') 
      {
        if (this.state.ToCountryString == 'Country')
        {
          alert('Please Select Your Country');
        }
        else
        {
          if (this.state.ToStateString == 'State')
          {
            alert('Please Select Your State');
          }
          else
          {


            if (this.state.toSelectedStateID != '')
{
  
   selectedComboFlag = 'tocity'
  // this.copyCustomCountryStateCityApiCall()
  navigate('cityStateCountryPickerPage',{
    navigationFlagForAddress1: 'locationPicker', flagtoShow: 'tocity', stateID: this.state.toSelectedStateID})
    }
    else
    {
      alert('Please deselct Country and State once before selecting City')
    }


            
          }
          
        }
      }
  
    }
    else
    {
      if (selectedFlag == 'fromcountry')
      {
      //   this.setState({
      //     progress:true
      // })
         selectedComboFlag = 'fromcountry'
        // this.copyCustomCountryApiCall()
        navigate('cityStateCountryPickerPage',{
          navigationFlagForAddress1: 'locationPicker', flagtoShow: 'fromcountry'})
      }
      
       if (selectedFlag == 'fromstate')
      {
  
        if (this.state.FromCountryString == 'Country')
        {
          alert('Please Select Your Country');
        }
        else
        {

          if (this.state.fromSelectedCountryID != '')
          {
          //   this.setState({
          //     progress:true
          // })
             selectedComboFlag = 'fromstate'
            // this.copyCustomCountryStateCityApiCall()
            navigate('cityStateCountryPickerPage',{
              navigationFlagForAddress1: 'locationPicker', flagtoShow: 'fromstate', countryID: this.state.fromSelectedCountryID})
              }
              else
              {
                alert('Please deselct Country once before selecting State')
              }

          
        }
  
      }
      
  
      if (selectedFlag == 'fromcity') 
      {
        if (this.state.FromCountryString == 'Country')
        {
          alert('Please Select Your Country');
        }
        else
        {
          if (this.state.FromStateString == 'State')
          {
            alert('Please Select Your State');
          }
          else
          {

            if (this.state.fromSelectedStateID != '')
            {
            //   this.setState({
            //     progress:true
            // })
               selectedComboFlag = 'fromcity'
              // this.copyCustomCountryStateCityApiCall()
              navigate('cityStateCountryPickerPage',{
                navigationFlagForAddress1: 'locationPicker', flagtoShow: 'fromcity', stateID: this.state.fromSelectedStateID})
                }
                else
                {
                  alert('Please deselct Country and State once before selecting City')
                }

            
          }
          
        }
      }
    }
      
    
  
  
  
      
    }
    renderSearchableData = ({ item, index }) => {
      //console.log('renderSearchableData ==> ', item)
      return (
        <View>
          <TouchableOpacity onPress={() => this.selectItemOnDropDown(item)}>
          <Text style={{ padding: 10, color: 'white' }}>{item.name} </Text>
          </TouchableOpacity>
        </View>
      );
     }
    selectItemOnDropDown = (item) => 
    {

if (this.state.fromToLocationFlag == 'to')
{
  if (selectedComboFlag == 'tocountry')
  {
    this.setState({ seachableModalVisible: false, toSelectedCountryID: item.id, ToCountryString: item.name})
  }
  
   if (selectedComboFlag == 'tostate')
  {
    this.setState({ seachableModalVisible: false, toSelectedStateID: item.id, ToStateString: item.name})
  }
  

  if (selectedComboFlag == 'tocity') 
  {
    this.setState({ seachableModalVisible: false, ToCityString: item.name, toSelectedCityID: item.id})
  }
}
else
{
  if (selectedComboFlag == 'fromcountry')
  {
    this.setState({ seachableModalVisible: false, fromSelectedCountryID: item.id, FromCountryString: item.name})
  }
  
   if (selectedComboFlag == 'fromstate')
  {
    this.setState({ seachableModalVisible: false, fromSelectedStateID: item.id, FromStateString: item.name})
  }
  

  if (selectedComboFlag == 'fromcity') 
  {
    this.setState({ seachableModalVisible: false, FromCityString: item.name, fromSelectedCityID: item.id})
  }
}

      
  
  
      
    }
    renderSeparator = () => {
      return (
        <View
          style={{
            height: 1,
            width: '100%',
            backgroundColor: 'white',
          }}
        />
      );
    };
    searchItems = text => {
      const newData = this.state.dropdownMasterData.filter(item => {
        const itemData = `${item.name.toUpperCase()}`;
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      this.setState({
        data: newData,
        value: text,
      });
    };
  
    renderHeader = () => {
      return (
        <View
          style={{ borderColor: 'white', borderWidth: 1 }}>
        <TextInput
          style={{ height: 60, color: 'white', padding: 5, placeholderTextColor: 'white' }}
          placeholder="Type Here...Key word"
          onChangeText={text => this.searchItems(text)}
          value={this.state.value}
        />
        </View>
      );
    };
  
}

var styles = StyleSheet.create({
    container: {
      flex: 1,
      // remove width and height to override fixed static size
      width: null,
      height: null,
      resizeMode:'contain'
    },
    MainContainer:{
        width:null,
        height:null,
        backgroundColor: 'white',
    },
    SubContainer:
    {
        marginLeft: 20,
        marginTop: -25,
        width:Dimensions.get('window').width - 40,
        height:Dimensions.get('window').height - 210,
        backgroundColor: 'rgba(246, 244, 243, 1)',
        shadowColor: 'grey',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 1,
      shadowRadius: 3,
     },
    login:{
        fontSize:22,
        color:'black',
        alignSelf:'center',
        marginTop:20,
    },
    SigninToContinue:
    {
        fontSize:17,
        color:'grey',
        alignSelf:'center',
        marginTop:10,
    },

    textInput:{
    
    width: null,
    marginLeft: 7,
    borderRadius: 0,
    marginRight: 13,
    marginLeft: 13,
    fontSize: 12,
    height: 40,
    color: 'gray'
    },
    textPass:{
        borderBottomWidth: 2,
        borderBottomColor: 'grey',
        width: null,
        marginTop:20,
        borderRadius: 0,
        marginLeft: 0,
        marginRight: 0,
        backgroundColor: 'white',
        fontSize: 16,
        paddingLeft: 13,
        height: 40,
        backgroundColor: 'rgba(246, 244, 243, 1)'
        
        },
        lineStyle:{
            height:1,
            width:140,
            backgroundColor:'#1F203E',
            marginLeft:50,
            alignSelf:'center'
        },
        lineSecond:{
            height:1,
            width:140,
            backgroundColor:'#1F203E',
            alignSelf:'center',
            marginTop:2
        },
        itemRow:{
          marginTop: 3,
          flexDirection: 'row',
        justifyContent: 'flex-start',
        alignContent: 'flex-start',
        alignItems: 'flex-start',
        width: '100%',
       
        },
        itemRow1:{
          marginTop: 16,
          flexDirection: 'row',
        justifyContent: 'flex-start',
        alignContent: 'flex-start',
        alignItems: 'flex-start',
        width: '100%',
        marginLeft: 5
       
        },
        modalStyle: {
          height: 330,
          width: 340,
          alignSelf: 'center',
          marginTop: 100,
          backgroundColor: 'red',
          borderRadius: 6
        },
        cancelStyle: {
          height: 55,
          marginTop: 12,
          backgroundColor: 'red',
          width: 340,
          alignSelf: 'center',
          borderRadius: 6
        },

        dropdown_2: {
          height: 40,
            margin: 0,
            marginTop: 10,
          borderWidth: 1,
          borderRadius: 3,
          backgroundColor: 'white',
          borderColor:'#ccc',
        },
        dropdown_2_text: {
          marginVertical: 10,
          marginHorizontal: 6,
          fontSize: 18,
          color: 'black',
          textAlign: 'center',
          textAlignVertical: 'center',
        },
        dropdown_3_text: {
          marginVertical: 10,
          marginHorizontal: 6,
          fontSize: 15,
          color: 'black',
          textAlign: 'center',
          textAlignVertical: 'center',
        },
        dropdown_2_dropdown: {
          width: 150,
          height: 120,
          borderColor: 'cornflowerblue',
          borderWidth: 2,
          borderRadius: 3,
        },
        spinnerTextStyle: {
          color: 'red'
        },
        errorHint: {
          color: 'red',
          fontSize: 10,
          marginBottom: -10,
          marginLeft: 13,
      },
      modalStyle1: {
        height: 240,
        width: 340,
        alignSelf: 'center',
        marginTop: 0,
        backgroundColor: 'white',//'#0da2c3',
        borderRadius: 6,
        borderColor:'red',
        borderWidth:1,
    },
    cancelStyle1: {
        height: 45,
        marginTop: 7,
        backgroundColor: 'white',//'#0da2c3',
        width: 340,
        alignSelf: 'center',
        borderRadius: 6,
        borderColor:'red',
        borderWidth:1,
    },
    textInput2:{
      // borderBottomWidth: 1,
      // borderBottomColor: 'grey',
      width: 145,
marginLeft: 7,
borderRadius: 0,
marginRight: 7,
// backgroundColor: 'white',
fontSize: 12,
height: 40,
color: 'gray',
marginTop: 3,
borderBottomWidth: 1,
    borderBottomColor: 'grey',
      
      },
      itemRow2:{
        // marginTop: 18,
        flexDirection: 'row',
      justifyContent: 'flex-start',
      alignContent: 'flex-start',
      alignItems: 'flex-start',
      width: '100%',
      // marginBottom: 20
     
      },
  });