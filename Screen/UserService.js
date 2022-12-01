import React,{Component} from 'react';

import { StyleSheet, Image,ImageBackground, View,Text, TextInput, TouchableOpacity, Dimensions, SafeAreaView, ScrollView, Modal, FlatList, Alert, BackHandler, AsyncStorage} from 'react-native';

import {StatusBar} from 'react-native';

import AnimateLoadingButton from 'react-native-animate-loading-button';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import UrlUtil from '../Service/UrlUtils';
var radio_props = [
  {label: 'Normal user', value: 0 },
  {label: 'Business User', value: 1 }
];

var selectedComboFlag = 'country'

export default class Login extends Component{

  constructor(props) {
    super(props);
    this.state = {
      
      
      

      FirstnameString: '',
      LastnameString: '',
      EmailString: '',
      MobileString: '',
      DescriptionString: '',
      UserIDString: ''

    }
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    
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

             <Image style={{ height: 140,
              marginLeft:  0,
            marginTop:0,borderRadius:2,width: Dimensions.get('window').width}}
          source={require('../Images/banner-home.jpg')}>
          </Image> 

 <View style={styles.SubContainer}>
 <ScrollView >
                <Text style={styles.login}>User Service</Text>

                
                <View style={{marginLeft:7,marginTop:20, backgroundColor: 'white', marginRight: 7, borderWidth: 0.5,
        borderColor: 'gray', marginBottom: 20}}>
                <TextInput style={styles.textInput}
                
                placeholder={'First Name'}
                placeholderTextColor={'grey'}
                value = {this.state.FirstnameString}
                onChangeText={(text) => this.setState({ FirstnameString: text})}
                ></TextInput>
               <View style={{marginLeft:7,marginTop:0, backgroundColor: 'gray', marginRight: 7, height: 1,}}></View>
                <TextInput style={styles.textInput}
                placeholder={'Last Name'}
                placeholderTextColor={'grey'}
                value = {this.state.LastnameString}
                onChangeText={(text) => this.setState({ LastnameString: text})}
                ></TextInput>
                <View style={{marginLeft:7,marginTop:0, backgroundColor: 'gray', marginRight: 7, height: 1, marginBottom:5}}></View>
                <TextInput style={styles.textInput}
                placeholder={'Email'}
                autoCapitalize = 'none'
                placeholderTextColor={'grey'}
                value = {this.state.EmailString}
                onChangeText={(text) => this.setState({ EmailString: text})}
                ></TextInput>
                <View style={{marginLeft:7,marginTop:0, backgroundColor: 'gray', marginRight: 7, height: 1, marginBottom:5}}></View>
                <TextInput style={styles.textInput}
                placeholder={'Phone Number'}
                placeholderTextColor={'grey'}
                keyboardType='phone-pad'
                value = {this.state.MobileString}
                onChangeText={(text) => this.setState({ MobileString: text})}
                ></TextInput>
                <View style={{marginLeft:7,marginTop:0, backgroundColor: 'gray', marginRight: 7, height: 1, marginBottom:12}}></View>

                <TextInput style={{
    
    width: null,
    marginLeft: 7,
    borderRadius: 0,
    marginRight: 7,
    backgroundColor: 'white',
    fontSize: 12,
    height: 120,
    color: 'gray',
    shadowColor: 'grey',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 1,
      shadowRadius: 3,
      padding: 5,
      paddingTop: 5,
      
    
    }}
                placeholder={'Description'}
                multiline={true}
     numberOfLines={5}
     textAlignVertical={'top'}
                placeholderTextColor={'grey'}
                value = {this.state.DescriptionString}
                onChangeText={(text) => this.setState({ DescriptionString: text})}
                ></TextInput>
                <View style={{marginLeft:7,marginTop:0, backgroundColor: 'gray', marginRight: 7, height: 0, marginBottom:12}}></View>
                </View>

               

               {/* <TouchableOpacity onPress={this.form_Submit}>
                <LinearGradient style={{height:60,marginRight:0,marginLeft:0,marginTop:50,borderRadius:0}}
                colors={['green', 'green']}>
                    <Text style={{fontSize:20,fontWeight: "bold",alignSelf:'center',color:'white',
                marginTop:14}}>Login</Text>        
        </LinearGradient> 
        </TouchableOpacity> */}
<View style={{marginBottom: 20}}>
        <AnimateLoadingButton
              ref={c => (this.loadingButton1 = c)}
              width={300}
              height={50}
              marginTop={50}
              marginLeft={10}
              marginRight={10}
              title="Submit"
              titleFontSize={16}
              titleColor="rgb(255,255,255)"
              backgroundColor="green"
              borderRadius={4}
              onPress={this._onPressBotton1Handler.bind(this)}
            />
</View>
        
        
       

        

  
</ScrollView>
</View>


            </View>

          
            </SafeAreaView >
      
    );
  }
  async componentDidMount() 
  {

    let user = await AsyncStorage.getItem('userdata');
    let parsed = JSON.parse(user);

    this.setState({
      UserIDString: parsed.user_id,
    });

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
  else if (this.state.EmailString.trim() == '') {
   alert('Please Enter Your Email');
}
else if (this.state.MobileString.trim() == '') {
   alert('Please Enter Your Mobile Number');
}
else if (this.state.DescriptionString.trim() == '') {
 alert('Please Enter Notes');
}
     else {
      let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
      if (reg.test(this.state.EmailString.trim()) === false) {
    
        alert('Email is Not Correct');
        
      }
      else {

        this.loadingButton1.showLoading(true);
         this.customUserServiceClick()
      }
        

       

   }
}
customUserServiceClick = () => {

  
  var params = {}
 


  params = {
    user_id: this.state.UserIDString,
    fname: this.state.FirstnameString,
    lname: this.state.LastnameString,
    email: this.state.EmailString,
    telephone: this.state.MobileString,
    mesg: this.state.DescriptionString,
    
  }


  
const { navigate } = this.props.navigation;

  const url = UrlUtil.BASE_URL + 'api/services_contact';

console.log('customUserServiceClick in param dic => ', params, url);

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
handleBackButtonClick() {
   
   

  this.props.navigation.goBack(null);
  return true;
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
  .catch(error => console.log('error1', error), this.loadingButton1.showLoading(false));
  
    
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
      color: 'red',
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