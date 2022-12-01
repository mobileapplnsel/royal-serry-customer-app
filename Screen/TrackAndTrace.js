import React,{Component} from 'react';

import { StyleSheet, Image,ImageBackground, View,Text, TextInput, TouchableOpacity, Dimensions, SafeAreaView, ScrollView, Modal, FlatList, Alert, BackHandler, AsyncStorage} from 'react-native';
import StepIndicator from 'react-native-step-indicator';
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
import visibility_off from '../Images/visibility_off.png';
import visibility_on from '../Images/visibility_on.png';

import readyForPickup from '../Images/readyForPickup.jpeg';
import pickedUp from '../Images/pickedUp.png';
import wirehouse from '../Images/wirehouse.jpeg';
import InTransit from '../Images/InTransit.png';
import destinationWirehouse from '../Images/destinationWirehouse.png';
import outForDelivery from '../Images/outForDelivery.png';
import Delivered from '../Images/Delivered.png';

var selectedComboFlag = 'country'
const labels = ["Ready For Pickup"];
const customStyles = {
  stepIndicatorSize: 35,
  currentStepIndicatorSize:40,
  separatorStrokeWidth: 1,
  currentStepStrokeWidth: 1,
  stepStrokeCurrentColor: 'green',
  stepStrokeWidth: 1,
  stepStrokeFinishedColor: 'red',
  stepStrokeUnFinishedColor: '#aaaaaa',
  separatorFinishedColor: 'red',
  separatorUnFinishedColor: '#aaaaaa',
  stepIndicatorFinishedColor: 'red',
  stepIndicatorUnFinishedColor: '#ffffff',
  stepIndicatorCurrentColor: '#ffffff',
  stepIndicatorLabelFontSize: 12,
  currentStepIndicatorLabelFontSize: 12,
  stepIndicatorLabelCurrentColor: 'green',
  stepIndicatorLabelFinishedColor: '#ffffff',
  stepIndicatorLabelUnFinishedColor: '#aaaaaa',
  labelColor: '#999999',
  labelSize: 12,
  currentStepLabelColor: 'green',
  
  
}
const icons=[readyForPickup,pickedUp,wirehouse,InTransit,destinationWirehouse,outForDelivery,Delivered,visibility_on,visibility_off,visibility_on,];
export default class Login extends Component{

  constructor(props) {
    super(props);
    this.state = {
      currentPosition: 1,
      trackno: '',
      labels: [],
      showStepProgressBar: false,
      
    }
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
}
callToSetAddress1Value()  
  {



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
 <ScrollView >
                <Text style={styles.login}>Track & Trace</Text>

       
       <View style={{marginTop:30, flexDirection:'row', justifyContent:'space-between', flex:1, marginRight: 10, marginLeft: 10}}>

            <TextInput
                                    autoCapitalize='characters'
                                    style={{height: 40,
                                      paddingLeft: 12,
                                      paddingRight: 12,
                                      width: '60%',           
                                      backgroundColor: 'transparent',
                                      marginBottom: 10,
                                      borderWidth: 1,
                                      borderColor: '#000',
                                      color: '#000', fontSize: 11}}
                                    onChangeText={(text) => this.setState({ trackno: text })}
                                    value={this.state.trackno}
                                    placeholder="Enter Tracking Number"
                                    placeholderTextColor="#000"
                                    maxLength = {20}
                                />
        
               
              
         <TouchableOpacity style={{width: '40%', backgroundColor: 'red',marginRight: 45, height: 40,}} onPress ={() => this.FetchOrder()}>   
        
    <Text style={{textAlign: 'center', textAlignVertical: 'center', 
    color: 'white', fontSize: 11, fontWeight: 'bold', padding: 12}}>
    Track & Trace
    </Text>    
    
    </TouchableOpacity>
              </View>



              { this.state.showStepProgressBar &&  
              <View style={{ height: 370, marginBottom: 20, marginLeft: 13, marginTop: 20}}>
<StepIndicator
         customStyles={customStyles}
         currentPosition={this.state.currentPosition}
         labels={this.state.labels}
         direction="vertical"
         stepCount={this.state.labels.length}
          renderStepIndicator={({position,stepstatus})=>(<Image source={icons[position]} style={{ height: 20,
            width: 20, resizeMode: 'contain',
          alignContent: 'center',
          alignItems: 'center',
          }} />)}
    />
    </View>
     } 
        

  
</ScrollView>
</View>


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
    //this.FetchOrder()
  }


handleBackButtonClick() {
   
   

  this.props.navigation.goBack(null);
  return true;
}
FetchOrder = () => {


if (this.state.trackno.trim() == '')
{
  Alert.alert(
    'Alert',
    'Please enter a tracking number', // <- this part is optional, you can pass an empty string
    [
      {text: 'OK', onPress: () => this.setState({progress:false})},
    ],
    {cancelable: false},
  );
  return
}

        
  var params = {}
  
  

 
  params = 
  {

    order_no: this.state.trackno//'RS-ORD/2021/289'//this.state.trackno//'RS-ORD/2021/289'//this.state.trackno //22 //(RS-ORD/2021/289)
  
  }

  
const { navigate } = this.props.navigation;

  const url = UrlUtil.BASE_URL + 'api/orderTracking';
  

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

  
    let resultJSON = JSON.stringify(json)
    console.log("Result JSON is == ",resultJSON)


    if (json.status == 'success')
    {
     // const labels = ["Ready For Pickup","Delivery Address","Order Summary","Payment Method","Track"];

     var main_arr = json.orderTrackingStatus//.reverse()
     var arr = []
     for(let i = 0; i < main_arr.length; i++)
     { 

var Str = main_arr[i].status_name //json.orderTrackingStatus[i].status_name) - String(json.orderTrackingStatus[i].created_date
var Str1 = main_arr[i].created_date
var Str2 = ''

if (Str1 == '')
{
  Str2 = Str
}
else
{
  Str2 = Str + ' - ' + Str1
}


      arr.push(Str2)

     }

     for(let i = 0; i < main_arr.length; i++)
     {
       if (main_arr[i].created_date == '')
       {
        this.setState({currentPosition: i-1})
        break
       }
       
     }


 console.log('arr=> ', arr)
      this.setState({labels: arr, showStepProgressBar: true})

      
    }
    else
    { 
      alert(json.message)
      this.setState({showStepProgressBar: false})
    }


  })
  .catch((err) => {
    this.setState({showStepProgressBar: false})
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
        textInput: {
          height: 40,
          paddingLeft: 12,
          paddingRight: 12,
          width: '90%',
          marginLeft: '5%',
          marginRight: '5%',
          backgroundColor: 'transparent',
          marginTop: 25,
          marginBottom: 10,
          borderWidth: 1,
          borderColor: '#000',
          color: '#000'
  
      },
  });





