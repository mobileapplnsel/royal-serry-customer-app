import React,{Component, useEffect} from 'react';

import { StyleSheet, Image,ImageBackground, View,Text, TextInput, TouchableOpacity, Dimensions, SafeAreaView, ScrollView, AsyncStorage, Alert, Linking, Platform} from 'react-native';
import {NavigationEvents} from 'react-navigation';
import {StatusBar} from 'react-native';
import UrlUtil from '../Service/UrlUtils';
import AnimateLoadingButton from 'react-native-animate-loading-button';
//import { notifications, NotificationMessage, Android } from 'react-native-firebase-push-notifications'
import visibility_off from '../Images/visibility_off.png';
import visibility_on from '../Images/visibility_on.png';
import CountryPicker, { DARK_THEME } from 'react-native-country-picker-modal'
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import KeyboardManager from 'react-native-keyboard-manager';
var do_you_have_radio_props = [
  {label: 'Email ID', value: 0 },
  {label: 'Mobile No', value: 1 }
];
// import Notifications1 from '../Notifications';
// const setNotification = () => {
//   Notifications1.schduleNotification1(new Date(Date.now()), 'hello');
//}
// setNotification()
export default class Login extends Component{

  constructor(props) {
    super(props);
    this.state = {
       

      EmailPhoneString: '',
      PasswordString: '',
      showPassword: true,
      imgSource: visibility_off,
countryCodeString : 'IN',
radioValueHaveDetails: 0,
placeholderString: 'Enter your Email',
emailkeyboardType: 'numbers-and-punctuation',
FcmTokenString: '',


    }
    this.callToSetAddress1Value = this.callToSetAddress1Value.bind(this);
}
switchingBetweenHaveDetailsOfItem(value) 
  {

    if (value == 0)
    {
      this.setState({ placeholderString: 'Enter your Email', emailkeyboardType: 'numbers-and-punctuation', EmailPhoneString: ''})
    }
    else
    {
      this.setState({ placeholderString: 'Enter your Mobile Number', emailkeyboardType: 'phone-pad', EmailPhoneString: ''})
    }

    console.log('switchingBetweenHaveDetailsOfItem: ', value)
    this.setState({radioValueHaveDetails: value})

  }
  callToSetAddress1Value()  
  {
    this.setState({ EmailPhoneString: '', PasswordString: '' });
    this.getToken()
  }
  render(){

    const { navigate } = this.props.navigation;
    return(

<SafeAreaView >
<NavigationEvents onDidFocus={() => this.callToSetAddress1Value()}/>
<ScrollView >
            <View style={styles.MainContainer}>

            <View style={{backgroundColor: 'rgba(246, 244, 243, 1)'}}>
       <Image style={{ height: 75,
              marginLeft: Dimensions.get('window').width - 170,
            marginTop:0,borderRadius:2,width: 140, resizeMode: 'contain',
            alignContent: 'center',
            alignItems: 'center',
            }}
          source={require('../Images/logo.png')}>
          </Image> 
          </View> 

             <View style={{height:5,marginLeft:0,marginTop:0, backgroundColor: 'red', width: Dimensions.get('window').width}}></View>

             <Image style={{ height: 170,
              marginLeft:  0,
            marginTop:0,borderRadius:2,width: Dimensions.get('window').width}}
          source={require('../Images/banner-home.jpg')}>
          </Image> 

 <View style={styles.SubContainer}>

                <Text style={styles.login}>Customer Login</Text>

                 <Text style={styles.SigninToContinue}>Sign in to continue</Text>

                 <View style={{marginLeft:7,marginTop:25, marginRight: 7,}}>
                <RadioForm
  radio_props={do_you_have_radio_props}
  style={{
    alignSelf:'center',
    backgroundColor: 'rgba(246, 244, 243, 1)'
}}
  initial={this.state.radioValueHaveDetails}
  formHorizontal={true}
  buttonColor={'rgba(198, 35, 0, 1)'}
  selectedButtonColor={'rgba(198, 35, 0, 1)'}
       //   buttonOuterColor={'rgba(204, 32, 0, 1)'}
  
  labelStyle={{fontSize: 12, color: 'gray', marginRight:7}}
  onPress={(value) => {this.switchingBetweenHaveDetailsOfItem(value)}}
/>
</View>  

                 <View style={styles.itemRow1}>
                 { this.state.radioValueHaveDetails == 1 && <View style={{marginLeft: 13, marginTop:35, bottom:7}}>
                 <CountryPicker countryCode = {this.state.countryCodeString} withCallingCodeButton = 'false'
                withCallingCode = 'true' onSelect={(country) => this.setState({ countryCodeString: country.cca2})}
      />
       </View> }
        <TextInput style={styles.textInput2}
                
                placeholder={this.state.placeholderString}
                placeholderTextColor={'grey'}
                value = {this.state.EmailPhoneString}
                placeholderTextColor={'grey'}
                autoCapitalize = 'none'
                keyboardType={this.state.emailkeyboardType}
                onChangeText={(text) => this.setState({ EmailPhoneString: text})}></TextInput>
       
        </View>
                

               

<View style={{marginLeft:13,marginTop:-4, backgroundColor: 'gray', marginRight: 13, height: 1, marginBottom: 7}}></View>

                {/* <TextInput style={styles.textPass}
                placeholder={'Password'}
                secureTextEntry={true}
                autoCapitalize = 'none'
                value = {this.state.PasswordString}
                placeholderTextColor={'grey'}
                onChangeText={(text) => this.setState({ PasswordString: text})}></TextInput> */}

<View style={{flexDirection:'row', alignItems: 'center', justifyContent: 'center', height: 40,
      margin: 0,
      marginTop: 13}}>
            <View style={{flex:1, maxWidth: 414, backgroundColor: null, flexDirection:'row', justifyContent:'space-between'}}>
                <TextInput style={{color: 'black',paddingLeft:13, fontSize: 12, height: 40, fontSize: 16, width: '70%'}}placeholder={'Password'}
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

              <View style={{marginLeft:13,marginTop:-4, backgroundColor: 'gray', marginRight: 13, height: 1, marginBottom: 7}}></View>

                <TouchableOpacity style={{marginLeft: Dimensions.get('window').width - 190,
                marginTop:14, marginBottom: 25,}} onPress ={() => this.props.navigation.navigate('ForgotPasswordPage')}>
                <Text style={{color:'red',fontSize:16}}>Forgot Password?</Text>
               </TouchableOpacity>

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
              // marginLeft={20}
              // marginRight={20}
              height={50}
              marginTop={50}
              title="Login"
              titleFontSize={16}
              titleColor="rgb(255,255,255)"
              backgroundColor="green"
              borderRadius={4}
              onPress={this._onPressBotton1Handler.bind(this)}
            />
</View>
        
        <View style={styles.itemRow}>
        <Text style={{color:'black',fontSize:12,marginLeft: 13,}}>Don't have an account yet?</Text>
        <TouchableOpacity onPress={() => navigate('RegistrationPage')}>
        <Text style={{color:'green',fontSize:12, marginLeft: 7, fontWeight: "bold",}}>Sign Up Now</Text>
        </TouchableOpacity>
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

  componentDidMount() 
  {
 
    if (Platform.OS === 'ios') {
      KeyboardManager.setEnable(true);
      KeyboardManager.setKeyboardDistanceFromTextField(5);
      
  }

    this.setState({ EmailPhoneString: '', PasswordString: '' });
      this.getToken()
      
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
  _onPressBotton1Handler() {

    

     this.form_Submit()
   
  }
  form_Submit = () => {

    if (this.state.EmailPhoneString.trim() == '') 
    {
      if (this.state.radioValueHaveDetails == 0)
    {
        alert('Please enter Email Id');
    }
    else
    {
      alert('Please enter Mobile Number');
    }
    }
    else if (this.state.PasswordString.trim() == '') {
        alert('Please Enter Password');
    }
    else {


    if (this.state.radioValueHaveDetails == 0)
    {
      let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
  if (reg.test(this.state.EmailPhoneString.trim()) === false) {

    alert('Provided Email is Not Correct');
    
  }
  else
  {
    this.loadingButton1.showLoading(true);
      this.customLoginClick()
  }
    }
    else
    {
      this.loadingButton1.showLoading(true);
      this.customLoginClick()
    }

   }
  
}
async customLoginClick(){

        
  var params = {}
  var emailOrPhoneFlag = ''
  let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
  

  if (reg.test(this.state.EmailPhoneString.trim()) === true) {
    emailOrPhoneFlag = 'email'
  params = 
  {

    email: this.state.EmailPhoneString,
    password: this.state.PasswordString,
    push_token: this.state.FcmTokenString

  
  }
}
else
{
  emailOrPhoneFlag = 'telephone'
  params = {

    telephone: this.state.EmailPhoneString,
    password: this.state.PasswordString,
    push_token: this.state.FcmTokenString
  
  }
}
  
const { navigate } = this.props.navigation;

  const url = UrlUtil.BASE_URL + 'api/user_login';

console.log('Custom sign in param dic => ', params, url);

var formData = new FormData();

for (var k in params) {
  formData.append(k, params[k]);
}
const requestInfo = {
  method: 'POST',
  headers: {
    'Content-Type': 'multipart/form-data',
  },
  body: formData,
};   

await fetchWithTimeout(url, requestInfo, 3000)
    .then((res) => res.json())
    .then((json) =>
{ 

  this.loadingButton1.showLoading(false);
    let resultJSON = JSON.stringify(json)
    console.log("Result JSON is == ",resultJSON)


    if (json.status == 'success')
    {

      AsyncStorage.setItem('emailOrPhoneFlag', emailOrPhoneFlag);
      AsyncStorage.setItem('password', this.state.PasswordString);
      AsyncStorage.setItem('userdata', JSON.stringify(json.userdata));

      AsyncStorage.setItem('userLoggedInOrNotFlag', 'yes');
      AsyncStorage.setItem('selectedStateID', json.userdata.state);


      this.props.navigation.navigate('DashPage',{
        userdata: json.userdata})

      
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

  getToken = async () => {
    //get the messeging token
    //const token = await notifications.getToken()
    //you can also call messages.getToken() (does the same thing)
    console.log("FcmToken123=="+token)
    this.setState({FcmTokenString: token})
    AsyncStorage.setItem('FcmTokenString', token);
    this.setState({
        FCMToken: token,
          })
          // Alert.alert(
          //   'FCM Token',
          //   token, // <- this part is optional, you can pass an empty string
          //   [
          //     {text: 'OK', onPress: () => this.setState({progress:false})},
          //     {text: 'Copy To Clipboard', onPress: () =>Clipboard.setString(token)},
          //   ],
          //   {cancelable: false},
          // );
    return token
  }
  getInitialNotification = async () => {
    //get the initial token (triggered when app opens from a closed state)
    //const notification = await notifications.getInitialNotification()
    //console.log("getInitialNotification", notification)
   // return notification
  }

  onNotificationOpenedListener = () => {
    //remember to remove the listener on un mount
    //this gets triggered when the application is in the background
   // this.removeOnNotificationOpened = notifications.onNotificationOpened(
      notification => {
        console.log("onNotificationOpened", notification)
        //do something with the notification
      }
    //)
  }

  onNotificationListener = () => {
    console.log("onNotificationListener called")
    
    //remember to remove the listener on un mount
    //this gets triggered when the application is in the forground/runnning
    //for android make sure you manifest is setup - else this wont work
    //Android will not have any info set on the notification properties (title, subtitle, etc..), but _data will still contain information
   // this.removeOnNotification = notifications.onNotification(notification => {
      //do something with the notification
     // console.log("onNotification", notification)
    //})
  }

  onTokenRefreshListener = () => {
    //remember to remove the listener on un mount
    //this gets triggered when a new token is generated for the user
   // this.removeonTokenRefresh = messages.onTokenRefresh(token => {
      //do something with the new token
    //})
  }
  setBadge = async number => {
    //only works on iOS and some Android Devices
   // return await notifications.setBadge(number)
  }

  getBadge = async () => {
    //only works on iOS and some Android Devices
    //return await notifications.getBadge()
  }

  hasPermission = async () => {
    //only works on iOS
   // return await notifications.hasPermission()
    //or     return await messages.hasPermission()
  }

  requestPermission = async () => {
    //only works on iOS
   // return await notifications.requestPermission()
    //or     return await messages.requestPermission()
  }


localNotification = async () => {
  //required for Android

  console.log('localNotification called')

  // const channel = new Android.Channel(
  //   "test-channel",
  //   "Test Channel",
  //   Android.Importance.Max
  // ).setDescription("My apps test channel")

  // for android create the channel
  //notifications.android().createChannel(channel)
  // await notifications.displayNotification(
  //   new NotificationMessage()
  //     .setNotificationId("notification-id")
  //     .setTitle("Notification title")
  //     .setBody("Notification body")
  //     .setData({
  //       key1: "key1",
  //       key2: "key2",
  //     })
  //     .android.setChannelId("test-channel") //required for android
  // )
}


    componentWillUnmount() {
    //remove the listener on unmount
    // if (this.removeOnNotificationOpened) {
    //   this.removeOnNotificationOpened()
    // }
    // if (this.removeOnNotification) {
    //   this.removeOnNotification()
    // }

    // if (this.removeonTokenRefresh) {
    //   this.removeonTokenRefresh()
    // }
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
    SigninToContinue:
    {
        fontSize:17,
        color:'grey',
        alignSelf:'center',
        marginTop:10,
    },

    textInput:{
    // borderBottomWidth: 1,
    // borderBottomColor: 'grey',
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
    textInput2:{
      // borderBottomWidth: 1,
      // borderBottomColor: 'grey',
      width: '80%',
      marginTop:23,
      marginLeft: 2,
      borderRadius: 0,
      marginLeft: 0,
      marginRight: 0,
      backgroundColor: 'white',
      fontSize: 16,
      paddingLeft: 13,
      height: 40,
      backgroundColor: 'rgba(246, 244, 243, 1)',
      color: 'black'
     // backgroundColor: 'red'
      
      },
    textPass:{
        // borderBottomWidth: 1,
        // borderBottomColor: 'grey',
        width: null,
        marginTop:17,
        borderRadius: 0,
        marginLeft: 0,
        marginRight: 0,
        backgroundColor: 'white',
        fontSize: 16,
        paddingLeft: 13,
        height: 40,
        backgroundColor: 'rgba(246, 244, 243, 1)',
        color: 'black'
        
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
       
        },
        itemRow1:{
          marginTop: 0,
          flexDirection: 'row',
        justifyContent: 'flex-start',
        alignContent: 'flex-start',
        alignItems: 'flex-start',
        width: '100%',
       
        },
  });
  export async function fetchWithTimeout(url, options, timeout = 5000) {
    return Promise.race([
        fetch(url, options),
        new Promise((_, reject) => setTimeout(() => reject(new Error('timeout')), timeout))
    ]);
}