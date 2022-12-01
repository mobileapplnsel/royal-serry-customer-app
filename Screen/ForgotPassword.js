import React,{Component} from 'react';

import { StyleSheet, Image,ImageBackground, View,Text, TextInput, TouchableOpacity, Dimensions, SafeAreaView, ScrollView, BackHandler, Alert} from 'react-native';
import {StatusBar} from 'react-native';

import AnimateLoadingButton from 'react-native-animate-loading-button';
import UrlUtil from '../Service/UrlUtils';
import KeyboardManager from 'react-native-keyboard-manager';
export default class Login extends Component{

  constructor(props) {
    super(props);
    this.state = {
      EmailString: '',

    }
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
}

  render(){

    const { navigate } = this.props.navigation;
    return(

<SafeAreaView >

<ScrollView >
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

             <Image style={{ height: 240,
              marginLeft:  0,
            marginTop:0,borderRadius:2,width: Dimensions.get('window').width}}
          source={require('../Images/banner-home.jpg')}>
          </Image> 

 <View style={styles.SubContainer}>

                <Text style={styles.login}>Forgot Password</Text>

                
                <View style={{marginBottom: 90}}>
                <TextInput style={styles.textInput}
                placeholder={'Email Address'}
                placeholderTextColor={'grey'}
                value = {this.state.EmailString}
                placeholderTextColor={'grey'}
                autoCapitalize = 'none'
                onChangeText={(text) => this.setState({ EmailString: text})}></TextInput>

<Text style={styles.login1}>Please enter your email address and we will send you a link to reset the password.</Text>

</View>

              

        <AnimateLoadingButton
              ref={c => (this.loadingButton1 = c)}
              width={Dimensions.get('window').width - 66}
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

<View style={{marginBottom: 30}}>
        <View style={styles.itemRow}>
        <Text style={{color:'black',fontSize:12,marginLeft: 18, marginBottom: 90}}>Back to the login screen</Text>
        <TouchableOpacity onPress={this.handleBackButtonClick}>
        <Text style={{color:'green',fontSize:12, marginLeft: 7, fontWeight: "bold", }}>Login</Text>
        </TouchableOpacity>
        </View>  
       
        </View>
        

        {/* <TouchableOpacity onPress={() => navigate('RegidtrationPage')}>
        <Text style={{fontSize:20,color:'white',alignSelf:'center',marginTop:20}}>Register Now</Text>
        </TouchableOpacity> */}

        {/* <View style={{width:null, flexDirection: 'row',marginTop:10}}>
            <View style={styles.lineStyle}></View>
            <Text style={{fontSize:24,color:'#7C7EC3',marginRight:5,marginLeft:5}}>Or</Text>
            <View style={styles.lineSecond}></View>
        </View>           
        
        <Text style={{fontSize:20,color:'white',alignSelf:'center',marginTop:10}}>Login with</Text>

        <View style={{width:null,flexDirection:'row',alignSelf:'center',marginTop:25}}>
            <Image style={{height:40,width:40,marginRight:20,alignSelf:'center'}}
            source={require('../Images/gmail.png')}></Image>

            <TouchableOpacity >
            <Image style={{height:40,width:40,marginLeft:20,alignSelf:'center'}}
            source={require('../Images/facebook.png')}></Image>
            </TouchableOpacity>
        </View> */}

</View>

            </View>

           </ScrollView>

            </SafeAreaView >
      
    );
  }
  _onPressBotton1Handler() {

   

    this.form_Submit()
   
  }
  form_Submit = () => {
    this.state.EmailString = this.state.EmailString.replace(/ /g,'')

    if (this.state.EmailString.trim() == '') {
        alert('Please Enter Email'); 
    }
    else {

      let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
      if (reg.test(this.state.EmailString.trim()) === false) {
    
        alert('Email is Not Correct');
        
      }
      else {
    
        this.loadingButton1.showLoading(true);
        this.customLoginClick()
          
        }
       


    }
}
customLoginClick = () => {
  var params = {}
  params = {

    email_id: this.state.EmailString,
    
    
  
  }

  
const { navigate } = this.props.navigation;

  const url = UrlUtil.BASE_URL + 'api/forget_password';

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

      Alert.alert(
        'Success',
        'A reset password link has been sent to your email', // <- this part is optional, you can pass an empty string
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
  handleBackButtonClick() {
   
   

    this.props.navigation.goBack(null);
    return true;
  }
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
    login1:{
      fontSize:17,
      color:'black',
      alignSelf:'center',
      marginTop:10,
      padding: 7
  },
    SigninToContinue:
    {
        fontSize:17,
        color:'grey',
        alignSelf:'center',
        marginTop:10,
    },

    textInput:{
    borderBottomWidth: 1,
    borderBottomColor: 'grey',
    width: null,
    marginTop:35,
    marginLeft: 9,
    borderRadius: 0,
    marginLeft: 0,
    marginRight: 0,
    backgroundColor: 'white',
    fontSize: 16,
    paddingLeft: 13,
    height: 40,
    backgroundColor: 'rgba(246, 244, 243, 1)'
    
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
          marginTop: 14,
          flexDirection: 'row',
        justifyContent: 'flex-start',
        alignContent: 'flex-start',
        alignItems: 'flex-start',
        width: '100%',
        marginBottom: 20
       
        },
  });