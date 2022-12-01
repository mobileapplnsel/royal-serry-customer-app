import React,{Component} from 'react';

import { StyleSheet, Image,ImageBackground, View,Text, TextInput, TouchableOpacity, Dimensions, SafeAreaView, ScrollView, Modal, FlatList, Alert, BackHandler, 
  AsyncStorage, PermissionsAndroid,
  Platform, Linking} from 'react-native';

import {StatusBar} from 'react-native';
import {NavigationEvents} from 'react-navigation';
import AnimateLoadingButton from 'react-native-animate-loading-button';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import KeyboardManager from 'react-native-keyboard-manager';
import Spinner from 'react-native-loading-spinner-overlay';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import visibility_off from '../Images/visibility_off.png';
import visibility_on from '../Images/visibility_on.png';
import CountryPicker, { DARK_THEME } from 'react-native-country-picker-modal'
var radio_props = [
  {label: 'Normal user', value: 0 },
  {label: 'Business User', value: 1 }
];
import UrlUtil from '../Service/UrlUtils';
import Geolocation from '@react-native-community/geolocation';
import Geocoder from 'react-native-geocoding';
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
      // selectedComboFlag: 'country',
      selectedCountryID: '',
      selectedStateID: '',
      selectedCityID: '',
      CountryStateCityFetchURL: 'https://api.countrystatecity.in/v1/countries',

      FirstnameString: '',
      LastnameString: '',
      CompanyNameString: '',
      WebsiteString: '',
      Address1String: '',
      Address2String: '',
      CountryString: 'Country',
      StateString: 'State',
      CityString: 'City',
      ZipcodeString: '',
      PhoneString: '',
      EmailString: '',
      PasswordString: '',
      ConfirmPasswordString: '',
      token: '',
      progress: false,

      showPassword: true,
      showPassword1: true,
      imgSource: visibility_off,
      imgSource1: visibility_off,
      countryCodeString : 'IN',
      FcmTokenString: '',
      latitude: '',
      longitude: '',


    }
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    this.CallToShowDropDownCombo = this.CallToShowDropDownCombo.bind(this);
    this.callToSetAddress1Value = this.callToSetAddress1Value.bind(this);
}
 requestLocationPermission = async () => {
  if (Platform.OS === 'ios') {
    Geolocation.getCurrentPosition(
      //Will give you the current location
      (position) => {
        console.log('position:  ',position)

                fetch('https://maps.googleapis.com/maps/api/geocode/json?address=' + position.coords.latitude + ',' + position.coords.longitude + '&key=' + 'AIzaSyDmUohDE70gjqrjgFEbhtyjPOhn9WBghuo')
        .then((response) => response.json())
        .then((responseJson) => {
            console.log('ADDRESS GEOCODE is BACK!! => ' + JSON.stringify(responseJson));
}).catch(error =>  console.log('error occuredddd'))
    
//             Geocoder.from(position.coords.latitude, position.coords.longitude)
//             .then(json => {
//                     var addressComponent = json.results[0].address_components[0];
//               console.log('addressComponent', JSON.stringify(json));

//               var stateName = json.results[0].address_components.filter(x => x.types.filter(t => t == 'administrative_area_level_1').length > 0)[0].long_name
//               var CountryName = json.results[0].address_components.filter(x => x.types.filter(t => t == 'country').length > 0)[0].long_name
//               var CountryCode = json.results[0].address_components.filter(x => x.types.filter(t => t == 'country').length > 0)[0].short_name
//               console.log('stateName', stateName, CountryName, CountryCode);
             

//               this.setState({locationEnabled: true}),
              

// this.setState({ Address1String: json.results[0].formatted_address, CountryString: CountryName, StateString: stateName});
// this.copyFetchStateIDCountryID1('state', stateName)


//             }).catch(error => this.setState({ Address1String: '', CountryString: 'Country', StateString: 'State', 
//             selectedCountryID: '', selectedStateID: '', progress:false}))
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
    
            console.log('position1:  ',position)
    
            Geocoder.from(position.coords.latitude, position.coords.longitude)
            .then(json => {
                    var addressComponent = json.results[0].address_components[0];
              console.log('addressComponent', JSON.stringify(json));

              var stateName = json.results[0].address_components.filter(x => x.types.filter(t => t == 'administrative_area_level_1').length > 0)[0].long_name
              var CountryName = json.results[0].address_components.filter(x => x.types.filter(t => t == 'country').length > 0)[0].long_name
              console.log('stateName', stateName, CountryName);
             

              this.setState({locationEnabled: true}),
              

this.setState({ Address1String: json.results[0].formatted_address, CountryString: CountryName, StateString: stateName});
this.copyFetchStateIDCountryID1('state', stateName)


            }).catch(error => this.setState({ Address1String: '', CountryString: 'Country', StateString: 'State', 
            selectedCountryID: '', selectedStateID: '', progress:false}))
    
        
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

if (this.props.navigation.state.params.navigationFlagForAddress1 == 'registration1')
    {
if (this.props.navigation.state.params.addressDict.description != undefined)
{
  this.setState({ 
    Address1String: this.props.navigation.state.params.addressDict.description,
    longitude: this.props.navigation.state.params.Long,
    latitude: this.props.navigation.state.params.Lat
  })

  if (this.props.navigation.state.params.addressCity == undefined)
  {
   this.copyFetchStateIDCountryID('state', this.props.navigation.state.params.addressState)
  }
  else
  {
   this.copyFetchStateIDCountryID('state', this.setCharAt(this.props.navigation.state.params.addressState,0,''))
  }


}
else
{
  this.setState({
    Address1String: ''
  })
}
     }
     else if (this.props.navigation.state.params.navigationFlagForAddress1 == 'registrationPicker')
     {
      if (this.props.navigation.state.params.flagtoShow == 'country')
      {
        this.setState({countryCodeString: this.props.navigation.state.params.sortname, selectedCountryID: this.props.navigation.state.params.selectedCountryID, CountryString: this.props.navigation.state.params.CountryString})
      }
      
       if (this.props.navigation.state.params.flagtoShow == 'state')
      {
        this.setState({selectedStateID: this.props.navigation.state.params.selectedStateID, StateString: this.props.navigation.state.params.StateString})
      }
      
      if (this.props.navigation.state.params.flagtoShow == 'city') 
      {
        this.setState({ CityString: this.props.navigation.state.params.CityString, selectedCityID: this.props.navigation.state.params.selectedCityID})
      }
     }
     else
     {

     }
    }

  }
  setCharAt(str,index,chr) {
    if(index > str.length-1) return str;
    return str.substring(0,index) + chr + str.substring(index+1);
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

 <Spinner
          visible={this.state.progress}
          textContent={'Loading...'}
          textStyle={styles.spinnerTextStyle}
        />
 <ScrollView>
                <Text style={styles.login}>Registration</Text>

                <View style={{marginLeft:7,marginTop:34, marginRight: 7,}}>
                <RadioForm
  radio_props={radio_props}
  style={{
    alignSelf:'center',
    backgroundColor: 'rgba(246, 244, 243, 1)'
}}
  initial={this.state.radioValue}
  formHorizontal={true}
  buttonColor={'rgba(198, 35, 0, 1)'}
  selectedButtonColor={'rgba(198, 35, 0, 1)'}
       //   buttonOuterColor={'rgba(204, 32, 0, 1)'}
  
  labelStyle={{fontSize: 12, color: 'gray', marginRight:7}}
  onPress={(value) => {this.switchingBetweenNormalAndBusinessUser(value)}}
/>
</View>
                <View style={{marginLeft:7,marginTop:20, backgroundColor: 'white', marginRight: 7, borderWidth: 0.5,
        borderColor: 'gray',}}>

<Text style={{fontSize:15,
        color:'black',
        marginLeft: 13,
        marginTop:10,}}>First Name *</Text>

                <TextInput style={styles.textInput}
                
                placeholder={'Enter First Name'}
                placeholderTextColor={'grey'}
                autoCapitalize = 'words'
                value = {this.state.FirstnameString}
                onChangeText={(text) => this.setState({ FirstnameString: text})}></TextInput>
 
               <View style={{marginLeft:7,marginTop:0, backgroundColor: 'gray', marginRight: 7, height: 1}}></View>

               <Text style={{fontSize:15,
        color:'black',
        marginLeft: 13,
        marginTop:10,}}>Last Name *</Text>

                <TextInput style={styles.textInput}
                placeholder={'Enter Last Name'}
                placeholderTextColor={'grey'}
                autoCapitalize = 'words'
                value = {this.state.LastnameString}
                onChangeText={(text) => this.setState({ LastnameString: text})}></TextInput>

<View style={{marginLeft:7,marginTop:0, backgroundColor: 'gray', marginRight: 7, height: 1}}></View>
                {/* </View>

                <View style={{marginLeft:7,marginTop:20, backgroundColor: 'white', marginRight: 7, borderWidth: 0.5,
        borderColor: 'gray', marginTop: 13}}> */}

{ this.state.radioValue == 1 && <Text style={{fontSize:15,
        color:'black',
        marginLeft: 13,
        marginTop:10,}}>Company Name *</Text> }

{ this.state.radioValue == 1 && <TextInput style={styles.textInput}
                placeholder={'Enter Company Name'}
                placeholderTextColor={'grey'}
                autoCapitalize = 'words'
                value = {this.state.CompanyNameString}
                onChangeText={(text) => this.setState({ CompanyNameString: text})}></TextInput>
}
{ this.state.radioValue == 1 && <View style={{marginLeft:7,marginTop:0, backgroundColor: 'gray', marginRight: 7, height: 1}}></View> }
  
{ this.state.radioValue == 1 && <Text style={{fontSize:15,
        color:'black',
        marginLeft: 13,
        marginTop:10,}}>Website</Text> }

{ this.state.radioValue == 1 && <TextInput style={styles.textInput}
                placeholder={'Enter Website'}
                placeholderTextColor={'grey'}
                autoCapitalize = 'none'
                value = {this.state.WebsiteString}
                onChangeText={(text) => this.setState({ WebsiteString: text})}></TextInput>
}
{ this.state.radioValue == 1 && <View style={{marginLeft:7,marginTop:0, backgroundColor: 'gray', marginRight: 7, height: 1}}></View> }

<Text style={{fontSize:15,
        color:'black',
        marginLeft: 13,
        marginTop:10,}}>Address 1 *</Text>

{/* <TouchableOpacity onPress={() => navigate('GoogleAddressPage',{
                      navigationFlagForAddress1: 'registration'})}>
                <TextInput style={styles.textInput}
                placeholder={'Enter Address Line 1'}
                placeholderTextColor={'grey'}
                autoCapitalize = 'none'
                value = {this.state.Address1String}
                pointerEvents="none"
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
     navigationFlagForAddress1: 'registration'})}> 
<TextInput style={{

width: '100%',

fontSize: 12,
height: 40,
color: 'gray',
// borderBottomWidth: 1,
// borderBottomColor: 'grey',

}}
pointerEvents="none"
placeholder={'Address 1'}
placeholderTextColor={'grey'}
autoCapitalize = 'none'
value = {this.state.Address1String}
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

                {/* <Text style={{
    
    width: null,
    marginLeft: 13,
    borderRadius: 0,
    marginRight: 7,
    backgroundColor: 'white',
    fontSize: 12,
    height: 40,
    textAlignVertical: 'center',
    color: 'gray'
    }}>{this.state.Address1String}</Text>
</TouchableOpacity> */}
               <View style={{marginLeft:7,marginTop:0, backgroundColor: 'gray', marginRight: 7, height: 1}}></View>

               <Text style={{fontSize:15,
        color:'black',
        marginLeft: 13,
        marginTop:10,}}>Address 2</Text>

                <TextInput style={styles.textInput}
                placeholder={'Enter Address Line 2'}
                placeholderTextColor={'grey'}
                autoCapitalize = 'none'
                value = {this.state.Address2String}
                onChangeText={(text) => this.setState({ Address2String: text})}></TextInput>

              <View style={{marginLeft:7,marginTop:0, backgroundColor: 'gray', marginRight: 7, height: 1}}></View>


              
{/* <View style={{marginLeft:7,marginTop:0, backgroundColor: 'gray', marginRight: 7, height: 1}}></View> */}

<Text style={{fontSize:15,
        color:'black',
        marginLeft: 13,
        marginTop:10,}}>Country *</Text>

                <TouchableOpacity onPress={() => this.CallToShowDropDownCombo('country')}>
<View style={{flexDirection:'row', alignItems: 'center', justifyContent: 'center', height: 40,
      margin: 0,
      marginTop: 0}}>
            <View style={{flex:1, maxWidth: 414, backgroundColor: null, flexDirection:'row', justifyContent:'space-between'}}>
                <Text style={{paddingLeft:13,color: 'gray', fontSize: 12,}}>{this.state.CountryString}</Text>
                <View style={{width:15, height:15, justifyContent: 'flex-end', marginRight: 20, marginTop: 6}}>
                  <Image source={require("../Images/down_arrow.png")} style={{width:15, height:15,}} />
                </View>
                
              </View>
              </View>
              </TouchableOpacity>

              <View style={{marginLeft:7,marginTop:0, backgroundColor: 'gray', marginRight: 7, height: 1}}></View>

              <Text style={{fontSize:15,
        color:'black',
        marginLeft: 13,
        marginTop:10,}}>State *</Text>

                <TouchableOpacity onPress={() => this.CallToShowDropDownCombo('state')}>
<View style={{flexDirection:'row', alignItems: 'center', justifyContent: 'center', height: 40,
      margin: 0,
      marginTop: 0}}>
            <View style={{flex:1, maxWidth: 414, backgroundColor: null, flexDirection:'row', justifyContent:'space-between'}}>
                <Text style={{paddingLeft:13, color: 'gray', fontSize: 12,}}>{this.state.StateString}</Text>
                <View style={{width:15, height:15, justifyContent: 'flex-end', marginRight: 20, marginTop: 6}}>
                  <Image source={require("../Images/down_arrow.png")} style={{width:15, height:15,}} />
                </View>
                
              </View>
              </View>
              </TouchableOpacity>

              <View style={{marginLeft:7,marginTop:0, backgroundColor: 'gray', marginRight: 7, height: 1}}></View>

              <Text style={{fontSize:15,
        color:'black',
        marginLeft: 13,
        marginTop:10,}}>City *</Text>

                <TouchableOpacity onPress={() => this.CallToShowDropDownCombo('city')}>
<View style={{flexDirection:'row', alignItems: 'center', justifyContent: 'center', height: 40,
      margin: 0,
      marginTop: 0}}>
            <View style={{flex:1, maxWidth: 414, backgroundColor: null, flexDirection:'row', justifyContent:'space-between'}}>
                <Text style={{paddingLeft:13,color: 'gray', fontSize: 12,}}>{this.state.CityString}</Text>
                <View style={{width:15, height:15, justifyContent: 'flex-end', marginRight: 20, marginTop: 6}}>
                  <Image source={require("../Images/down_arrow.png")} style={{width:15, height:15,}} />
                </View>
                
              </View>
              </View>
              </TouchableOpacity>

              <View style={{marginLeft:7,marginTop:0, backgroundColor: 'gray', marginRight: 7, height: 1}}></View>

              <Text style={{fontSize:15,
        color:'black',
        marginLeft: 13,
        marginTop:10,}}>Zip Code *</Text>

<TextInput style={styles.textInput}
placeholder={'Enter Zip Code'}
placeholderTextColor={'grey'}
keyboardType='numbers-and-punctuation'
maxLength={12}
autoCapitalize = 'none'
                value = {this.state.ZipcodeString}
                onChangeText={(text) => this.setState({ ZipcodeString: text})}></TextInput>

<View style={{marginLeft:7,marginTop:0, backgroundColor: 'gray', marginRight: 7, height: 1}}></View>


                </View>

                <View style={{marginLeft:7,marginTop:20, backgroundColor: 'white', marginRight: 7, borderWidth: 0.5,
        borderColor: 'gray',marginBottom: 40}}>

<Text style={{fontSize:15,
        color:'black',
        marginLeft: 13,
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
                value = {this.state.PhoneString}
                onChangeText={(text) => this.setState({ PhoneString: text})}></TextInput>
       
        </View>

               

               <View style={{marginLeft:7,marginTop:0, backgroundColor: 'gray', marginRight: 7, height: 1}}></View>

               <Text style={{fontSize:15,
        color:'black',
        marginLeft: 13,
        marginTop:10,}}>Email *</Text>

                <TextInput style={styles.textInput}
                placeholder={'Enter Email'}
                placeholderTextColor={'grey'}
                autoCapitalize = 'none'
                value = {this.state.EmailString}
                onChangeText={(text) => this.setState({ EmailString: text})}></TextInput>

<View style={{marginLeft:7,marginTop:0, backgroundColor: 'gray', marginRight: 7, height: 1}}></View>
{/* <TextInput style={styles.textInput}
                
                placeholder={'Password'}
                placeholderTextColor={'grey'}
                autoCapitalize = 'none'
                value = {this.state.PasswordString}
                secureTextEntry={true}
                onChangeText={(text) => this.setState({ PasswordString: text})}></TextInput> */}

<Text style={{fontSize:15,
        color:'black',
        marginLeft: 13,
        marginTop:10,}}>Password *</Text>

<View style={{flexDirection:'row', alignItems: 'center', justifyContent: 'center', height: 40,
      margin: 0,
      marginTop: 0}}>
            <View style={{flex:1, maxWidth: 414, backgroundColor: null, flexDirection:'row', justifyContent:'space-between'}}>
                <TextInput style={{paddingLeft:13,color: 'gray', fontSize: 12, height: 40, fontSize: 12, width: '70%'}}
                placeholder={'Enter Password'}
                secureTextEntry={this.state.showPassword}
                autoCapitalize = 'none'
                value = {this.state.PasswordString}
                placeholderTextColor={'grey'}
                onChangeText={(text) => this.setState({ PasswordString: text})}></TextInput>
                <TouchableOpacity onPress={() => this.onCheckClick()}>
                <View style={{width:20, height:20, justifyContent: 'flex-end', marginRight: 20, marginTop: 9}}>
                  <Image source={ this.state.imgSource } style={{width:20, height:20,}} />
                </View>
                </TouchableOpacity>
              </View>
              </View>

               <View style={{marginLeft:7,marginTop:0, backgroundColor: 'gray', marginRight: 7, height: 1}}></View>

               <Text style={{fontSize:15,
        color:'black',
        marginLeft: 13,
        marginTop:10,}}>Confirm Password *</Text>

                {/* <TextInput style={styles.textInput}
                placeholder={'Enter Confirm Password'}
                placeholderTextColor={'grey'}
                autoCapitalize = 'none'
                value = {this.state.ConfirmPasswordString}
                secureTextEntry={true}
                onChangeText={(text) => this.setState({ ConfirmPasswordString: text})}></TextInput> */}

<View style={{flexDirection:'row', alignItems: 'center', justifyContent: 'center', height: 40,
      margin: 0,
      marginTop: 0}}>
            <View style={{flex:1, maxWidth: 414, backgroundColor: null, flexDirection:'row', justifyContent:'space-between'}}>
                <TextInput style={{paddingLeft:13,color: 'gray', fontSize: 12, height: 40, fontSize: 12, width: '70%'}}
                placeholder={'Enter Confirm Password'}
                secureTextEntry={this.state.showPassword1}
                autoCapitalize = 'none'
                value = {this.state.ConfirmPasswordString}
                placeholderTextColor={'grey'}
                onChangeText={(text) => this.setState({ ConfirmPasswordString: text})}></TextInput>
                <TouchableOpacity onPress={() => this.onCheckClick1()}>
                <View style={{width:20, height:20, justifyContent: 'flex-end', marginRight: 20, marginTop: 9}}>
                  <Image source={ this.state.imgSource1 } style={{width:20, height:20,}} />
                </View>
                </TouchableOpacity>
              </View>
              </View>

                </View>

               {/* <TouchableOpacity onPress={this.form_Submit}>
                <LinearGradient style={{height:60,marginRight:0,marginLeft:0,marginTop:50,borderRadius:0}}
                colors={['green', 'green']}>
                    <Text style={{fontSize:20,fontWeight: "bold",alignSelf:'center',color:'white',
                marginTop:14}}>Login</Text>        
        </LinearGradient> 
        </TouchableOpacity> */}
<View style={{marginLeft:13, marginRight: 13}}>
        <AnimateLoadingButton
              ref={c => (this.loadingButton1 = c)}
              width={Dimensions.get('window').width - 66}
              height={50}
              marginTop={50}
              title="Registration"
              titleFontSize={16}
              titleColor="rgb(255,255,255)"
              backgroundColor="green"
              borderRadius={4}
              onPress={this._onPressBotton1Handler.bind(this)}
            />
</View>
        
        <View style={styles.itemRow}>
        <Text style={{color:'black',fontSize:12,marginLeft: 13,}}>Already have an account?</Text>
        <TouchableOpacity onPress={this.handleBackButtonClick}>
        <Text style={{color:'green',fontSize:12, marginLeft: 7, fontWeight: "bold",}}>Login Now</Text>
        </TouchableOpacity>
        </View>  
       

        

  
</ScrollView>
</View>

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
           ListHeaderComponent={this.renderHeader}
        />
     
                                </View>

                                <TouchableOpacity onPress={() => { this.setState({ seachableModalVisible: false }) }}>
                                    <View style={styles.cancelStyle}>
                                        <Text style={{ fontSize: 20, alignSelf: 'center', marginTop: 16, color: 'white' }}>Cancel</Text>
                                    </View>
                                </TouchableOpacity>

                            </View>
                        </Modal>
            </View>

           
            </SafeAreaView >
      
    );
  }
  async componentDidMount() 
  {

    if (Platform.OS === 'ios') {
      KeyboardManager.setEnable(true);
      KeyboardManager.setKeyboardDistanceFromTextField(5);
      
  }

   // KeyboardManager.setEnable(true);
   // this.customCountryStateCityApiCall()

//    this.setState({
//     progress:true
// })

let FcmTokenString = await AsyncStorage.getItem('FcmTokenString');

    this.setState({
      FcmTokenString : FcmTokenString
    })

   Geocoder.init("AIzaSyDmUohDE70gjqrjgFEbhtyjPOhn9WBghuo");
   //this.requestLocationPermission()

  }
  onCheckClick = () => {
    
   
    if (this.state.showPassword == true)
    {
      this.setState({ showPassword: false, imgSource: visibility_on });
    }
    else
    {
      this.setState({ showPassword: true, imgSource:  visibility_off});
    }

    // this.setState({ showPassword: !this.state.showPassword });
}

onCheckClick1 = () => {
    
   
  if (this.state.showPassword1 == true)
  {
    this.setState({ showPassword1: false, imgSource1: visibility_on });
  }
  else
  {
    this.setState({ showPassword1: true, imgSource1:  visibility_off});
  }

  // this.setState({ showPassword: !this.state.showPassword });
}
  _onPressBotton1Handler() {

   

    this.form_Submit()
   
  }
  form_Submit = () => {

     if (this.state.FirstnameString.trim() == '') {
         alert('Please Enter First Name');
     }
     else if (this.state.LastnameString.trim() == '') {
         alert('Please Enter Last Name');
     }
     else if (this.state.Address1String.trim() == '') {
      alert('Please Enter Address 1');
  }
  // else if (this.state.Address2String.trim() == '') {
  //     alert('Please Enter Address 2');
  // }
else if (this.state.CountryString == 'Country') {
    alert('Please Select Your Country');
}
else if (this.state.StateString == 'State') {
    alert('Please Select Your State');
}
else if (this.state.CityString == 'City') {
  alert('Please Select Your City');
}
else if (this.state.ZipcodeString.trim() == '') {
  alert('Please Enter Zip Code');
}
else if (this.state.PhoneString.trim() == '') {
  alert('Please Enter Phone Number');
}
else if (this.state.EmailString.trim() == '') {
  alert('Please Enter Email');
}
else if (this.state.PasswordString.trim() == '') {
alert('Please Enter Password');
}
else if (this.state.ConfirmPasswordString.trim() == '') {
alert('Please Enter Confirm Password');
}
     else {



 let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
  if (reg.test(this.state.EmailString.trim()) === false) {

    alert('Email is Not Correct');
    
  }
  else {

    if (this.state.PasswordString != this.state.ConfirmPasswordString) 
    {
      alert('Password did not match');
    }
    else
    {

if (this.state.radioValue == 1)
{
  if (this.state.CompanyNameString.trim() == '') {
    alert('Please Enter Your Company Name');
}
else
{
  this.loadingButton1.showLoading(true);
  this.customRegistrationClick()
}
}
else
{
  this.loadingButton1.showLoading(true);
  this.customRegistrationClick()
}

    }

   
  }
      

        console.log('country data => ', this.state.data);

       

    }
}
handleBackButtonClick() {
   
   

  this.props.navigation.goBack(null);
  return true;
}
customRegistrationClick = () => {

  
  var params = {}
 

if (this.state.radioValue == 1)
{
  params = {

    user_type: 'BU',
    firstname: this.state.FirstnameString,
    lastname: this.state.LastnameString,
    telephone: this.state.PhoneString,
    email: this.state.EmailString,
    companyname: this.state.CompanyNameString,
    companydetails: this.state.WebsiteString,
    address: this.state.Address1String,
    address2: this.state.Address2String,
    country: this.state.selectedCountryID,
    state: this.state.selectedStateID,
    city: this.state.selectedCityID,
    zip: this.state.ZipcodeString,
    push_token: this.state.FcmTokenString,
    password: this.state.PasswordString,
    latitude: this.state.latitude,
    longitude: this.state.longitude
  }
}
else
{
  params = {

    user_type: 'NU',
    firstname: this.state.FirstnameString,
    lastname: this.state.LastnameString,
    telephone: this.state.PhoneString,
    email: this.state.EmailString,
    address: this.state.Address1String,
    address2: this.state.Address2String,
    country: this.state.selectedCountryID,
    state: this.state.selectedStateID,
    city: this.state.selectedCityID,
    zip: this.state.ZipcodeString,
    push_token: this.state.FcmTokenString,
    password: this.state.PasswordString,
    latitude: this.state.latitude,
    longitude: this.state.longitude
  }
}
  
const { navigate } = this.props.navigation;

  const url = UrlUtil.BASE_URL + 'api/user_registration';

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

  this.loadingButton1.showLoading(false);
    let resultJSON = JSON.stringify(json)
    console.log("Result JSON is == ",resultJSON)


    if (json.message == 'Your registration successfully...Please Login')
    {
     // this.handleBackButtonClick()

     AsyncStorage.setItem('selectedStateID', this.state.selectedStateID);

      Alert.alert(
        'Success',
        'Your registration is successful. Please Login', // <- this part is optional, you can pass an empty string
        [
          {text: 'OK', onPress: () => this.handleBackButtonClick()},
        ],
        {cancelable: false},
      );
    }
    else
    {

 AsyncStorage.setItem('selectedStateID', this.state.selectedStateID);

      Alert.alert(
        'Success',
        json.message, // <- this part is optional, you can pass an empty string
        [
          {text: 'OK', onPress: () => this.handleBackButtonClick()},
        ],
        {cancelable: false},
      );
      
    }



  })
  .catch((err) => {
    this.loadingButton1.showLoading(false);
    alert('error = '+JSON.stringify(err));
  })

    

}
copyFetchStateIDCountryID = (flagname, param) => {

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
    console.log("Result JSON is == ",resultJSON)


    if (json.status == 'success')
    {

      if (this.props.navigation.state.params.navigationFlagForAddress1 == 'registration1')
      {
  if (this.props.navigation.state.params.addressDict.description != undefined)
  {

    if (this.props.navigation.state.params.addresszipcode != '')
    {
      this.setState({ 
        ZipcodeString: this.props.navigation.state.params.addresszipcode,
      })
    }

    this.setState({ 
      CountryString: this.props.navigation.state.params.addressCountry,
      StateString: this.props.navigation.state.params.addressState,
      // CityString: this.props.navigation.state.params.addressCity,
      selectedCountryID: json.locatioID.country_id,
      selectedStateID: json.locatioID.id,
      countryCodeString: json.locatioID.country_sortname
    })
  

  
  }
  else
  {
    
  }
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

        selectedCountryID: json.locatioID.country_id,
        selectedStateID: json.locatioID.id,
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
        this.setState({ Address1String: '', CountryString: 'Country', StateString: 'State', 
            selectedCountryID: '', selectedStateID})
      }
  
  
  
    })
    .catch((err) => {
      this.setState({ Address1String: '', CountryString: 'Country', StateString: 'State', 
            selectedCountryID: '', selectedStateID, progress:false})
      // alert('error = '+JSON.stringify(err));
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

  this.loadingButton1.showLoading(false);
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
    this.loadingButton1.showLoading(false);
    alert('error = '+JSON.stringify(err));
  })






  
    
  }
copyCustomCountryStateCityApiCall = () => {

  var params = {}
  var url = ''
  // user_id, user_type (BU or NU), firstname, lastname, telephone, email, companyname (for BU), 
  // companydetails (for BU), address, address2, country, state, city, zip

  if (selectedComboFlag == 'state')
  {
    url = UrlUtil.BASE_URL + 'api/stateListByCountry';
    params = {
      countryID: this.state.selectedCountryID
    }
  } 
  else
  {
    url = UrlUtil.BASE_URL + 'api/cityListBystate';
    params = {
      stateID: this.state.selectedStateID
    }
  } 

  
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

  this.loadingButton1.showLoading(false);
    let resultJSON = JSON.stringify(json)
    console.log("Result JSON is == ",resultJSON)


    if (json.status == 'success')
    {
     // this.handleBackButtonClick()
     if (selectedComboFlag == 'state')
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
    this.loadingButton1.showLoading(false);
    alert('error = '+JSON.stringify(err));
  })






  
    
  }
customCountryStateCityApiCall = () => {

  console.log('selectedComboFlag', selectedComboFlag );

  var url = ''

        
  if (selectedComboFlag == 'country')
  {
    url = 'https://api.countrystatecity.in/v1/countries'
  }
  else if (selectedComboFlag == 'state')
  {
    url = 'https://api.countrystatecity.in/v1/countries/' + this.state.selectedCountryID + '/states'
  } 
  else
  {
    url = 'https://api.countrystatecity.in/v1/countries/'+this.state.selectedCountryID+'/states/'+this.state.selectedStateID+'/cities'
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
  .catch(error => console.log('error1', error), this.setState({progress:false}));
  
    
  }

  SuccessCountryStateCityApiFetch(result) 
  {

console.log('SuccessCountryStateCityApiFetch: ', result)
this.setState({progress:false})
    this.setState({data: result, dropdownMasterData: result, seachableModalVisible: true, value: ''})


// setTimeout(()=>{
//   this.setState({progress:false})
//     this.setState({data: result, dropdownMasterData: result, seachableModalVisible: true, value: ''})
// },2000)
// console.disableYellowBox = true; 

  }

  switchingBetweenNormalAndBusinessUser(value) 
  {
    console.log('switchingBetweenNormalAndBusinessUser: ', value)
    this.setState({radioValue: value})
  }

  CallToShowDropDownCombo(selectedFlag) 
  {

    console.log('selectedFlag: ', selectedFlag);
    
    const { navigate } = this.props.navigation;

    if (selectedFlag == 'country')
    {
   
    selectedComboFlag = 'country'
    navigate('cityStateCountryPickerPage',{
      navigationFlagForAddress1: 'registrationPicker', flagtoShow: 'country'})
      
       
      
    }
    
     if (selectedFlag == 'state')
    {

      if (this.state.CountryString == 'Country')
      {
        alert('Please Select Your Country');
      }
      else
      {
        
         selectedComboFlag = 'state'
         navigate('cityStateCountryPickerPage',{
          navigationFlagForAddress1: 'registrationPicker', flagtoShow: 'state', countryID: this.state.selectedCountryID})
      }

    }
    

    if (selectedFlag == 'city') 
    {
      if (this.state.CountryString == 'Country')
      {
        alert('Please Select Your Country');
      }
      else
      {
        if (this.state.StateString == 'State')
        {
          alert('Please Select Your State');
        }
        else
        {
        
           selectedComboFlag = 'city'
           navigate('cityStateCountryPickerPage',{
            navigationFlagForAddress1: 'registrationPicker', flagtoShow: 'city', stateID: this.state.selectedStateID})
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
    if (selectedComboFlag == 'country')
    {
      this.setState({ seachableModalVisible: false, selectedCountryID: item.id, CountryString: item.name})
    }
    
     if (selectedComboFlag == 'state')
    {
      this.setState({ seachableModalVisible: false, selectedStateID: item.id, StateString: item.name})
    }
    

    if (selectedComboFlag == 'city') 
    {
      this.setState({ seachableModalVisible: false, CityString: item.name, selectedCityID: item.id})
    }


    // console.log('sssselected item on searchable dropdown is ==> ', item, this.state.isdependencypicklist)

    //  this.setState({ seachableModalVisible: false, dropdownheaderTitle: item.optiondisplay, [this.state.dropdownName]: item.optionvalue, })
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
    this.setState({
      value: text
    });
  
    const newData = this.state.dropdownMasterData.filter(item => {
      const itemData = `${item.name.toUpperCase()}`;
      const textData = text.toUpperCase();
      return itemData.includes(textData); // this will return true if our itemData contains the textData
    });
  
    this.setState({
      data: newData
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
        height:Dimensions.get('window').height - 230,
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
    marginRight: 7,
    backgroundColor: 'white',
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
          marginTop: 18,
          flexDirection: 'row',
        justifyContent: 'flex-start',
        alignContent: 'flex-start',
        alignItems: 'flex-start',
        width: '100%',
        marginBottom: 20
       
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
        spinnerTextStyle: {
          color: 'red'
        },
        textInput2:{
          // borderBottomWidth: 1,
          // borderBottomColor: 'grey',
          width: 200,
    marginLeft: 7,
    borderRadius: 0,
    marginRight: 7,
    backgroundColor: 'white',
    fontSize: 12,
    height: 40,
    color: 'gray',
    marginTop: 3
          
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