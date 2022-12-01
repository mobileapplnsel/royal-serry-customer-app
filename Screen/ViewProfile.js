import React,{Component} from 'react';

import { StyleSheet, Image,ImageBackground, View,Text, TextInput, TouchableOpacity, Dimensions, SafeAreaView, ScrollView, Modal, FlatList, Alert, BackHandler, AsyncStorage} from 'react-native';
import {StatusBar} from 'react-native';
import {NavigationEvents} from 'react-navigation';
import AnimateLoadingButton from 'react-native-animate-loading-button';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import KeyboardManager from 'react-native-keyboard-manager';
import Spinner from 'react-native-loading-spinner-overlay';
var radio_props = [
  {label: 'Normal user', value: 0 },
  {label: 'Business User', value: 1 }
];
import UrlUtil from '../Service/UrlUtils';
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
      UserTypeString: '',
      UserIDString: '',
      token: '',
      progress: false,
      emailOrPhoneFlag : ''


    }
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    this.CallToShowDropDownCombo = this.CallToShowDropDownCombo.bind(this);
    this.callToSetAddress1Value = this.callToSetAddress1Value.bind(this);
}
async callToSetAddress1Value()  
  {
// console.log('callToSetAddress1Value called', this.props.navigation.state.params.addressDict.description)
if(this.props.navigation.state.params)
{

if (this.props.navigation.state.params.navigationFlagForAddress1 == 'EditProfile1')
    {
if (this.props.navigation.state.params.addressDict.description != undefined)
{
  this.setState({ 
    Address1String: this.props.navigation.state.params.addressDict.description
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
    }
console.log('callToSetAddress1Value called1')

    let user = await AsyncStorage.getItem('userdata');
    let parsed = JSON.parse(user);

    let emailOrPhoneFlagString = await AsyncStorage.getItem('emailOrPhoneFlag');

    this.setState({
      emailOrPhoneFlag : emailOrPhoneFlagString
    })

    console.log('userdata => ',parsed)
if (parsed.user_type == 'BU')
{
  this.setState({
    radioValue: 1,
    UserTypeString: 'BU'
  })
}
else
{
  this.setState({
    radioValue: 0,
    UserTypeString: 'NU'
  })
}
    


    this.setState({
      FirstnameString: parsed.firstname,
      LastnameString: parsed.lastname,
      Address1String: parsed.address,
      Address2String: parsed.address2,
      CountryString: parsed.country_name,
      StateString: parsed.state_name,
      CityString: parsed.city_name,
      selectedCountryID: parsed.country,
      selectedStateID: parsed.state,
      selectedCityID: parsed.city,
      ZipcodeString: parsed.zip,
      PhoneString: parsed.telephone,
      EmailString: parsed.email,
      UserIDString: parsed.user_id,
      CompanyNameString: parsed.companyname,
      WebsiteString: parsed.companydetails,
      
     
    });

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
            <TouchableOpacity style={{width: '50%'}} onPress={this.handleBackButtonClick}>
<View> 

<Text style={{color:'red',fontSize:17, marginLeft: 17, fontWeight: "bold",}}>Back</Text>


   <Text style={{fontSize:15,
        color:'black',
        marginLeft: 16,
        marginTop:5,}}>{this.state.FirstnameString + ' ' + this.state.LastnameString}</Text> 
</View>
</TouchableOpacity>

<View style={{width: '50%',}}>
<Image style={{ height: 75,
  marginRight: 17,
marginTop:0,borderRadius:2,width: 140, resizeMode: 'contain', alignSelf: 'flex-end'

}}
source={require('../Images/logo.png')}>
</Image> 
</View>
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
 <ScrollView >
                <Text style={styles.login}>Account Details</Text>

                <View style={{
        flexDirection: "row",
        justifyContent: "flex-end",
        
      }}
    >
      <TouchableOpacity style={{marginRight: 35, marginTop: -25,}} onPress ={() => this.props.navigation.navigate('EditProfilePage')}>
      <Text style={{fontSize:15,
        color:'red', fontWeight: 'bold'
        }}>Edit</Text>
    {/* <Image style={{ height: 35, width: 35, tintColor: 'red',}}
                source={require('../Images/outline_edit_note_black_48.png')}></Image> */}
                </TouchableOpacity>
    </View>
                
               
                <View style={{marginLeft:7,marginTop:23, backgroundColor: 'white', marginRight: 7, borderWidth: 0.5,
        borderColor: 'gray',}}>

<Text style={{fontSize:15,
        color:'black',
        marginLeft: 13,
        marginTop:10,}}>First Name *</Text>

                <TextInput style={styles.textInput}
                
                placeholder={'First Name'}
                placeholderTextColor={'grey'}
                autoCapitalize = 'words'
                value = {this.state.FirstnameString}
                editable={false}
                onChangeText={(text) => this.setState({ FirstnameString: text})}></TextInput>
 
               <View style={{marginLeft:7,marginTop:0, backgroundColor: 'gray', marginRight: 7, height: 1}}></View>

               <Text style={{fontSize:15,
        color:'black',
        marginLeft: 13,
        marginTop:10,}}>Last Name *</Text>

                <TextInput style={styles.textInput}
                placeholder={'Last Name'}
                placeholderTextColor={'grey'}
                autoCapitalize = 'words'
                value = {this.state.LastnameString}
                editable={false}
                onChangeText={(text) => this.setState({ LastnameString: text})}></TextInput>

<View style={{marginLeft:7,marginTop:0, backgroundColor: 'gray', marginRight: 7, height: 1}}></View>
                {/* </View>

                <View style={{marginLeft:7,marginTop:20, backgroundColor: 'white', marginRight: 7, borderWidth: 0.5,
        borderColor: 'gray', marginTop: 13}}> */}

{ this.state.radioValue == 1 && <Text style={{fontSize:15,
        color:'black',
        marginLeft: 13,
        marginTop:10,}}>Company Name</Text> }


{ this.state.radioValue == 1 && 



<TextInput style={styles.textInput}
                placeholder={'Company Name'}
                placeholderTextColor={'grey'}
                autoCapitalize = 'words'
                value = {this.state.CompanyNameString}
                editable={false}
                onChangeText={(text) => this.setState({ CompanyNameString: text})}></TextInput>
}
{ this.state.radioValue == 1 && <View style={{marginLeft:7,marginTop:0, backgroundColor: 'gray', marginRight: 7, height: 1}}></View> }
  
{ this.state.radioValue == 1 && <Text style={{fontSize:15,
        color:'black',
        marginLeft: 13,
        marginTop:10,}}>Website</Text>}

{ this.state.radioValue == 1 && <TextInput style={styles.textInput}
                placeholder={'Website'}
                placeholderTextColor={'grey'}
                autoCapitalize = 'none'
                value = {this.state.WebsiteString}
                editable={false}
                onChangeText={(text) => this.setState({ WebsiteString: text})}></TextInput>
}
{ this.state.radioValue == 1 && <View style={{marginLeft:7,marginTop:0, backgroundColor: 'gray', marginRight: 7, height: 1}}></View> }
                {/* <TextInput style={styles.textInput}
                placeholder={'Address 1'}
                placeholderTextColor={'grey'}
                autoCapitalize = 'none'
                value = {this.state.Address1String}
                onChangeText={(text) => this.setState({ Address1String: text})}></TextInput> */}

<Text style={{fontSize:15,
        color:'black',
        marginLeft: 13,
        marginTop:10,}}>Address 1 *</Text>


                <TextInput style={styles.textInput}
                placeholder={'Address 1'}
                placeholderTextColor={'grey'}
                autoCapitalize = 'none'
                value = {this.state.Address1String}
                editable={false}
                ></TextInput>
               

               <View style={{marginLeft:7,marginTop:0, backgroundColor: 'gray', marginRight: 7, height: 1}}></View>

               <Text style={{fontSize:15,
        color:'black',
        marginLeft: 13,
        marginTop:10,}}>Address 2</Text>

                <TextInput style={styles.textInput}
                placeholder={'Address 2'}
                placeholderTextColor={'grey'}
                autoCapitalize = 'none'
                value = {this.state.Address2String}
                editable={false}
                onChangeText={(text) => this.setState({ Address2String: text})}></TextInput>

              <View style={{marginLeft:7,marginTop:0, backgroundColor: 'gray', marginRight: 7, height: 1}}></View>

              <Text style={{fontSize:15,
        color:'black',
        marginLeft: 13,
        marginTop:10,}}>Country *</Text>

<TextInput style={styles.textInput}
              
                placeholderTextColor={'grey'}
                autoCapitalize = 'none'
                value = {this.state.CountryString}
                editable={false}></TextInput>

                

              <View style={{marginLeft:7,marginTop:0, backgroundColor: 'gray', marginRight: 7, height: 1}}></View>


              <Text style={{fontSize:15,
        color:'black',
        marginLeft: 13,
        marginTop:10,}}>State *</Text>

               

              <TextInput style={styles.textInput}
              
                placeholderTextColor={'grey'}
                autoCapitalize = 'none'
                value = {this.state.StateString}
                editable={false}></TextInput>

              <View style={{marginLeft:7,marginTop:0, backgroundColor: 'gray', marginRight: 7, height: 1}}></View>

              <Text style={{fontSize:15,
        color:'black',
        marginLeft: 13,
        marginTop:10,}}>City *</Text>

                

              <TextInput style={styles.textInput}
              
              placeholderTextColor={'grey'}
              autoCapitalize = 'none'
              value = {this.state.CityString}
              editable={false}></TextInput>

              <View style={{marginLeft:7,marginTop:0, backgroundColor: 'gray', marginRight: 7, height: 1}}></View>

              <Text style={{fontSize:15,
        color:'black',
        marginLeft: 13,
        marginTop:10,}}>Zip Code *</Text>

<TextInput style={styles.textInput}
placeholder={'Zip Code'}
placeholderTextColor={'grey'}
keyboardType='numbers-and-punctuation'
autoCapitalize = 'none'
                value = {this.state.ZipcodeString}
                editable={false}
                onChangeText={(text) => this.setState({ ZipcodeString: text})}></TextInput>

<View style={{marginLeft:7,marginTop:0, backgroundColor: 'gray', marginRight: 7, height: 1}}></View>


                </View>

                <TouchableOpacity style={{marginLeft: Dimensions.get('window').width - 190,
                marginTop:15, marginBottom: 20,}} onPress ={() => this.props.navigation.navigate('ChangePasswordPage',{
                      userid: this.state.UserIDString})}>
                <Text style={{color:'red',fontSize:16}}>Change Password</Text>
               </TouchableOpacity>

                {/* <View style={{marginLeft:7,marginTop:20, backgroundColor: 'white', marginRight: 7, borderWidth: 0.5,
        borderColor: 'gray',marginBottom: 20}}>
             { this.state.emailOrPhoneFlag != 'telephone' &&  <TextInput style={styles.textInput}
                
                placeholder={'Phone'}
                placeholderTextColor={'grey'}
                keyboardType='phone-pad'
                value = {this.state.PhoneString}
                onChangeText={(text) => this.setState({ PhoneString: text})}></TextInput> }

{ this.state.emailOrPhoneFlag != 'telephone' &&  <View style={{marginLeft:7,marginTop:0, backgroundColor: 'gray', marginRight: 7, height: 1}}></View> }

{ this.state.emailOrPhoneFlag != 'email' &&  <TextInput style={styles.textInput}
                placeholder={'Email'}
                placeholderTextColor={'grey'}
                autoCapitalize = 'none'
                value = {this.state.EmailString}
                onChangeText={(text) => this.setState({ EmailString: text})}></TextInput> }

                </View> */}
                
                

               {/* <TouchableOpacity onPress={this.form_Submit}>
                <LinearGradient style={{height:60,marginRight:0,marginLeft:0,marginTop:50,borderRadius:0}}
                colors={['green', 'green']}>
                    <Text style={{fontSize:20,fontWeight: "bold",alignSelf:'center',color:'white',
                marginTop:14}}>Login</Text>        
        </LinearGradient> 
        </TouchableOpacity> */}

        

        
        <View style={styles.itemRow}>
        
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
            </View>

           
            </SafeAreaView >
      
    );
  }
  async componentDidMount() 
  {
// console.log('dsadadad dadasdsa1')
//     let user = await AsyncStorage.getItem('userdata');
//     let parsed = JSON.parse(user);

//     let emailOrPhoneFlagString = await AsyncStorage.getItem('emailOrPhoneFlag');

//     this.setState({
//       emailOrPhoneFlag : emailOrPhoneFlagString
//     })

//     console.log('userdata => ',parsed)
// if (parsed.user_type == 'BU')
// {
//   this.setState({
//     radioValue: 1,
//     UserTypeString: 'BU'
//   })
// }
// else
// {
//   this.setState({
//     radioValue: 0,
//     UserTypeString: 'NU'
//   })
// }
    


//     this.setState({
//       FirstnameString: parsed.firstname,
//       LastnameString: parsed.lastname,
//       Address1String: parsed.address,
//       Address2String: parsed.address2,
//       CountryString: parsed.country_name,
//       StateString: parsed.state_name,
//       CityString: parsed.city_name,
//       selectedCountryID: parsed.country,
//       selectedStateID: parsed.state,
//       selectedCityID: parsed.city,
//       ZipcodeString: parsed.zip,
//       PhoneString: parsed.telephone,
//       EmailString: parsed.email,
//       UserIDString: parsed.user_id,
//       CompanyNameString: parsed.companyname,
//       WebsiteString: parsed.companydetails,
      
     
//     });

    // KeyboardManager.setEnable(true);
   // this.customCountryStateCityApiCall()
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
  else if (this.state.Address2String.trim() == '') {
      alert('Please Enter Address 2');
  }
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
     else {




  

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
handleBackButtonClick() {
   
   

  this.props.navigation.goBack(null);
  return true;
}
customRegistrationClick = () => {

  
  var params = {}
  // user_id, user_type (BU or NU), firstname, lastname, telephone, email, companyname (for BU), 
  // companydetails (for BU), address, address2, country, state, city, zip

if (this.state.radioValue == 1)
{
  params = {

    user_type: 'BU',
    firstname: this.state.FirstnameString,
    lastname: this.state.LastnameString,
    companyname: this.state.CompanyNameString,
    companydetails: this.state.WebsiteString,
    address: this.state.Address1String,
    address2: this.state.Address2String,
    country: this.state.selectedCountryID,
    state: this.state.selectedStateID,
    city: this.state.selectedCityID,
    zip: this.state.ZipcodeString,
    user_id: this.state.UserIDString,
    UserTypeString: this.state.UserTypeString,
    email: this.state.EmailString,
    telephone: this.state.PhoneString,
  
  }
}
else
{
  params = {

    user_type: 'NU',
    firstname: this.state.FirstnameString,
    lastname: this.state.LastnameString,
    address: this.state.Address1String,
    address2: this.state.Address2String,
    country: this.state.selectedCountryID,
    state: this.state.selectedStateID,
    city: this.state.selectedCityID,
    zip: this.state.ZipcodeString,
    user_id: this.state.UserIDString,
    UserTypeString: this.state.UserTypeString,
    email: this.state.EmailString,
    telephone: this.state.PhoneString,
  
  }
}
  
const { navigate } = this.props.navigation;

  const url = UrlUtil.BASE_URL + 'api/edit_profile';

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

     AsyncStorage.setItem('userdata', JSON.stringify(json.userdata));
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

      if (this.props.navigation.state.params.navigationFlagForAddress1 == 'EditProfile1')
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
      selectedStateID: json.locatioID.id
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

    console.log('selectedFlag: ', this.state.selectedCountryID, this.state.selectedStateID);
    

    if (selectedFlag == 'country')
    {
      this.setState({
        progress:true
    })
    selectedComboFlag = 'country'
    this.copyCustomCountryApiCall()

      
       
      
    }
    

     if (selectedFlag == 'state')
    {

      if (this.state.CountryString == 'Country')
      {
        alert('Please Select Your Country');
      }
      else
      {
        if (this.state.selectedCountryID != '')
{
        this.setState({
          progress:true
      })
         selectedComboFlag = 'state'
        this.copyCustomCountryStateCityApiCall()
    }
    else
    {
      alert('Please deselct Country once before selecting State')
    }
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
          if (this.state.selectedCountryID != '' || this.state.selectedStateID != '')
          {

          this.setState({
            progress:true
        })
           selectedComboFlag = 'city'
          this.copyCustomCountryStateCityApiCall()
      }
       else
   {
     alert('Please deselct Country and State once before selecting City')
   }
        }
        
      }
    }

  // }
  // else
  // {
  //   alert('Please deselct Country and State once before selecting City')
  // }
    
  



    
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
  });





