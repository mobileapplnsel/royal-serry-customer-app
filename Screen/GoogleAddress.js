import React,{Component} from 'react';

import { StyleSheet, Image,ImageBackground, View,Text, TextInput, TouchableOpacity, Dimensions, SafeAreaView, ScrollView, Modal, FlatList, Alert, BackHandler, AsyncStorage} from 'react-native';
import {StatusBar} from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import AnimateLoadingButton from 'react-native-animate-loading-button';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import UrlUtil from '../Service/UrlUtils';
import KeyboardManager from 'react-native-keyboard-manager';
var radio_props = [
  {label: 'Normal user', value: 0 },
  {label: 'Business User', value: 1 }
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
      // selectedComboFlag: 'country',
      oldPassword: '',
      newPassword: '',
      ConfirmPassword: '',
      oldPasswordStringFromAsyncStorage: '',

     

    }
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    this.CallToShowDropDownCombo = this.CallToShowDropDownCombo.bind(this);
}
compIsType(t, s) { 
  for(let z = 0; z < t.length; ++z) 
     if(t[z] == s)
    return true;

  return false;
}
  render(){

    const { navigate } = this.props.navigation;
    return(

<SafeAreaView >


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
            
            <ScrollView keyboardShouldPersistTaps='always'>
            <GooglePlacesAutocomplete
placeholder='Search Your location'
placeholderTextColor='grey'
minLength={2}
autoFocus = {true}
returnKeyType={'default'}
fetchDetails={true}
query={{
  key: 'AIzaSyDmUohDE70gjqrjgFEbhtyjPOhn9WBghuo',
  language: 'en',
  types: ['(cities)', '(states)', '(countries)'],
}}
onPress={(data, details = null) => {
  // 'details' is provided when fetchDetails = true
  console.log('GooglePlacesAutocomplete=> ',data, details);
  let country = null, state = null, city = null;
  if(details.address_components!==undefined){
    let addrComp = details.address_components;
    for(let i = 0; i < addrComp.length; ++i)
    {
      var typ = addrComp[i].types;
      if(this.compIsType(typ, 'administrative_area_level_1'))
          state = addrComp[i].long_name; //store the state
      else if(this.compIsType(typ, 'locality'))
          city = addrComp[i].long_name; //store the city
      else if(this.compIsType(typ, 'country'))
        country = addrComp[i].long_name; //store the country        
  
      //we can break early if we find all three data
      if(state != null && city != null && country != null) break;
    }
    
    
  console.log('GooglePlacesAutocomplete city and country: ', state, country)
  
  }

  var zipcodeString = ''
  console.log('geometry lat and long: ',details?.geometry?.location.lat);
  for (let i = 0; i < details.address_components.length; i++) {
               
    if (details.address_components[i].types[0] === "postal_code") {
      zipcodeString = details.address_components[i].long_name
        console.log('zipcode: ', details.address_components[i].long_name)
    }

}

// console.log('countrrrr: ', country, state, city)

// if (country == null)
// {
// country = array[length-1]
// }


// if (state == null)
// {
//   state = array[length-2]
// }



 var array = data.description.split(',');
 var length = array.length


console.log('array => ', array[length-1], array[length-2], array[length-3])


  if (this.props.navigation.state.params.navigationFlagForAddress1 == 'registration')
  {
  this.props.navigation.navigate('RegistrationPage',{
    addressDict: data,
    addressDict1: details,
    addressCountry: country,
    addressState: state,
    addressCity: array[length-3],
    addresszipcode: zipcodeString,
    navigationFlagForAddress1: 'registration1',
    Lat: details?.geometry?.location.lat,
      Long: details?.geometry?.location.lng,
});
  } else if (this.props.navigation.state.params.navigationFlagForAddress1 == 'editprofile')
  {
    this.props.navigation.navigate('EditProfilePage',{
      addressDict: data,
      addressDict1: details,
      addressCountry: country,
    addressState: state,
    addressCity: array[length-3],
    addresszipcode: zipcodeString,
      navigationFlagForAddress1: 'EditProfile1',
      Lat: details?.geometry?.location.lat,
      Long: details?.geometry?.location.lng,
  });
  }
  else if (this.props.navigation.state.params.navigationFlagForAddress1 == 'locationFromAdd1')
  {
    console.log('locationFromAdd1e=> ');
    this.props.navigation.navigate('LocationPage',{
      addressDict: data,
      addressDict1: details,
      addressCountry: country,
    addressState: state,
    addressCity: array[length-3],
    addresszipcode: zipcodeString,
      navigationFlagForAddress1: 'locationFromAdd11',
      Lat: details?.geometry?.location.lat,
      Long: details?.geometry?.location.lng,

  });
  }
  else if (this.props.navigation.state.params.navigationFlagForAddress1 == 'locationToAdd1')
  {
    console.log('locationToAdd1=> ');
    this.props.navigation.navigate('ToLocationPage',{
      addressDict: data,
      addressDict1: details,
      addressCountry: country,
    addressState: state,
    addressCity: array[length-3],
    addresszipcode: zipcodeString,
      navigationFlagForAddress1: 'locationToAdd11',
      Lat: details?.geometry?.location.lat,
      Long: details?.geometry?.location.lng,
  });
  }
  else
  {
    this.handleBackButtonClick()
  }

}}
onFail={(console.log('Failllll2222'))}
styles={{
  textInputContainer: {
     backgroundColor: 'white',
    
  },
  textInput: {
    borderRadius: 0,
  marginRight: 7,
   backgroundColor: 'white',
  fontSize: 12,
  height: 44,
  color: 'gray',
  },
  predefinedPlacesDescription: {
    color: '#1faadb',
  },
}}
/>
</ScrollView>
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

   // this.customCountryStateCityApiCall()
   
  }

  _onPressBotton1Handler() {

   

    this.form_Submit()
   
  }
  form_Submit = () => {

    if (this.state.oldPassword.trim() == '') {
        alert('Please Enter Old Password');
    }

    else if (this.state.newPassword.trim() == '') {
        alert('Please Enter New Password');
    }
    else if (this.state.ConfirmPassword.trim() == '') {
        alert('Please Enter Confirm Password');
    }
    else {

      if (this.state.oldPasswordStringFromAsyncStorage != this.state.oldPassword)
      {
        alert('Entered Old Password is wrong');
      }
       else if (this.state.newPassword != this.state.ConfirmPassword) 
      {
        alert('New Password does not match with Confirm Password');
      }
      else
      {
        this.loadingButton1.showLoading(true);
        this.customChangePasswordClick()

      }

       

       

    }
}

handleBackButtonClick() {
   
   

  this.props.navigation.goBack(null);
  return true;
}
customChangePasswordClick = () => {

  var params = {}
  
  params = 
  {

    user_id: this.props.navigation.state.params.userid,
    old_password: this.state.oldPasswordStringFromAsyncStorage,
    new_password: this.state.newPassword
    
  }

console.log('params: ', params)
  
const { navigate } = this.props.navigation;

  const url = UrlUtil.BASE_URL + 'api/user_change_password';

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

      AsyncStorage.setItem('password', this.state.newPassword);

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
      alert(json.message)
    }


  })
  .catch((err) => {
    this.loadingButton1.showLoading(false);
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

  SuccessCountryStateCityApiFetch(result) 
  {
console.log('SuccessCountryStateCityApiFetch: ', result)

    this.setState({data: result, dropdownMasterData: result, seachableModalVisible: true})
  }

  switchingBetweenNormalAndBusinessUser(value) 
  {
    console.log('switchingBetweenNormalAndBusinessUser: ', value)
    this.setState({radioValue: value})
  }

  CallToShowDropDownCombo(selectedFlag) 
  {

    console.log('selectedFlag: ', selectedFlag);


    if (selectedFlag == 'country')
    {

       selectedComboFlag = 'country'
      this.customCountryStateCityApiCall()
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
        this.customCountryStateCityApiCall()
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
          this.customCountryStateCityApiCall()
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
      this.setState({ seachableModalVisible: false, selectedCountryID: item.iso2, CountryString: item.name})
    }
    
     if (selectedComboFlag == 'state')
    {
      this.setState({ seachableModalVisible: false, selectedStateID: item.iso2, StateString: item.name})
    }
    

    if (selectedComboFlag == 'city') 
    {
      this.setState({ seachableModalVisible: false, CityString: item.name})
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
    color: 'gray',
    
    },
    textInput1:{
    
      width: null,
      marginLeft: 7,
      borderRadius: 0,
      marginRight: 7,
      backgroundColor: 'white',
      fontSize: 9,
      height: 25,
      color: 'red'
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
  });