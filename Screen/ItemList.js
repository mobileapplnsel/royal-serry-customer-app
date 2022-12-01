


//https://github.com/colbymillerdev/react-native-progress-steps

//This is an example code for NavigationDrawer//
import React, { Component } from 'react';
//import react in our code.
import { StyleSheet, View, Text, ImageBackground,Image, ScrollView,FlatList, TouchableOpacity, SafeAreaView, BackHandler, Alert, AsyncStorage } from 'react-native';
// import all basic components
import {Dimensions} from 'react-native';
import StepIndicator from 'react-native-step-indicator';
import UrlUtil from '../Service/UrlUtils';
import Spinner from 'react-native-loading-spinner-overlay';

const SLIDER_WIDTH = Dimensions.get('window').width;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.8);
const ITEM_HEIGHT = Math.round(ITEM_WIDTH * 3 / 4);
const labels = ["Ready For Pickup","Delivery Address","Order Summary","Payment Method","Track"];
const customStyles = {
  stepIndicatorSize: 25,
  currentStepIndicatorSize:30,
  separatorStrokeWidth: 2,
  currentStepStrokeWidth: 3,
  stepStrokeCurrentColor: 'green',
  stepStrokeWidth: 3,
  stepStrokeFinishedColor: 'red',
  stepStrokeUnFinishedColor: '#aaaaaa',
  separatorFinishedColor: 'red',
  separatorUnFinishedColor: '#aaaaaa',
  stepIndicatorFinishedColor: 'red',
  stepIndicatorUnFinishedColor: '#ffffff',
  stepIndicatorCurrentColor: '#ffffff',
  stepIndicatorLabelFontSize: 13,
  currentStepIndicatorLabelFontSize: 13,
  stepIndicatorLabelCurrentColor: 'green',
  stepIndicatorLabelFinishedColor: '#ffffff',
  stepIndicatorLabelUnFinishedColor: '#aaaaaa',
  labelColor: '#999999',
  labelSize: 13,
  currentStepLabelColor: 'green',
  progress: false,
  isListDataAvlble: false,
  
}

export default class Home extends Component {
  //Screen1 Component

  
  constructor(props) {
    super(props);
    this.state = {
      currentPosition: 3,
      lineItemGlaobalArray:  [
        {airlineTicket: '', bluePrint: '',  Passport: '', VOS: '', PYS: false}, {airlineTicket: '', bluePrint: '',  Passport: '', VOS: '', PYS: false}, {airlineTicket: '', bluePrint: '',  Passport: '', VOS: '', PYS: false}, {airlineTicket: '', bluePrint: '',  Passport: '', VOS: '', PYS: false}
      ],
      quoteList: [],
      UserIDString: '',
  }
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
}
  

  render() {

    const { navigate } = this.props.navigation;

    return (

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

<Text style={styles.login}>Quote List</Text>

<TouchableOpacity style={{  marginTop: 20, height: 40, marginLeft:  13,
borderRadius:2, backgroundColor: 'green', width: 170, marginBottom: 25, alignSelf: 'center'}} onPress ={() => this.props.navigation.navigate('StastShipmentPage',{
                      navigationFlag: this.props.navigation.state.params.navigationFlag})}>
              <Text style={{ fontSize:15,fontWeight: "bold",color:'white',
 textAlign: 'center', textAlignVertical: 'center', padding: 10,
color: 'white', alignSelf: 'center'}}>
   Create Quote
</Text> 
</TouchableOpacity>

{ this.state.isListDataAvlble == false && <Image style={{ height: 96,
  width:  96,
marginTop:60,borderRadius:2,alignSelf: 'center', tintColor: 'red'}}
source={require('../Images/icons8-no-data-availible-96.png')}>
</Image>

}

{ this.state.isListDataAvlble == false && <Text style={{
      fontSize:16,
      color:'red',
      alignSelf:'center',
      marginTop:13,}}>No quote Found</Text>

}

<View style={{ marginTop: 0 }}>

<FlatList
     keyboardDismissMode="none"
      keyboardShouldPersistTaps='handled'
     
      
                        data={this.state.quoteList}
                        renderItem={this.renderHorizontalItem}
                        keyExtractor={(item, index) => index}
                    /> 
</View>
</ScrollView>
</View>




      
      </View>
      <Spinner
          visible={this.state.progress}
          textContent={'Loading...'}
          textStyle={styles.spinnerTextStyle}
        />
      
      {/* <View style={styles.footer}>
      <View style={{flexDirection:'row', alignItems: 'center', justifyContent: 'center'}}>
            <View style={{flex:1, maxWidth: 414, backgroundColor: null, flexDirection:'row', justifyContent:'space-between'}}>
  
            <View style={{ marginLeft: 0, width: Dimensions.get('window').width/2 - 10, marginTop: 0, height: 80, backgroundColor: 'null'}}>
            <View style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center'}}>
            <Image style={{ height: 50, width: 50,resizeMode: 'contain'}}
                source={require('../Images/map.png')}></Image>
                <Text>Track Shipment</Text>
</View>
            
             </View>

             <View style={{ marginLeft: 0, width: 2, marginTop: 0, height: 80, backgroundColor: 'gray'}}>
               
               </View>

            <TouchableOpacity onPress={this.logoutApi}>

            <View style={{ marginLeft: 0, width: Dimensions.get('window').width/2 - 10, marginTop: 0, height: 80, backgroundColor: 'null'}}>
            <View style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center'}}>
            <Image style={{ height: 50, width: 50,resizeMode: 'contain'}}
                source={require('../Images/settings.png')}></Image>
                <Text>Account Settings</Text>
</View>
               </View>
            
            </TouchableOpacity>
  
  
            </View>
            </View>
    </View> */}

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
    
    this.FetchQuoteList()
  }
  renderHorizontalItem = ({ item, index }) => {

    return (
  
  <View style={styles.itemRow1}>

<View style={{flexDirection:'row', alignItems: 'center', justifyContent: 'center', marginTop: 0}}>
            <View style={{flex:1, maxWidth: 414, backgroundColor: null, flexDirection:'row', justifyContent:'space-between'}}>
  
            <View>
              <Text style={{ fontSize: 13, color: 'grey', marginLeft: 13, marginBottom: 10, fontWeight: "bold" }}>Quote Number</Text>
              <Text style={{ fontSize: 13, color: 'grey', marginLeft: 13, marginTop: 10, marginBottom: 10, fontWeight: "bold" }}>Date Of Order</Text>
              <Text style={{ fontSize: 13, color: 'grey', marginLeft: 13, marginTop: 10, marginBottom: 10, fontWeight: "bold" }}>Status</Text>
              
              </View>
           
            <View style={{ width: null, justifyContent: 'flex-end', flexDirection: 'row', marginRight: 25, marginBottom: 20 }}>
            <View>
              <Text style={{ fontSize: 13, color: 'grey', marginBottom: 10 }}>{item.quote_no}</Text>
              <Text style={{ fontSize: 13, color: 'grey', marginTop: 10, marginBottom: 10 }}>{item.created_date}</Text>
              <Text style={{ fontSize: 13, color: 'grey', marginTop: 10, marginBottom: 10 }}>{item.quote_type}</Text>
             
              </View>
            </View>
          
            
  
            </View>
            </View>

            <TouchableOpacity style={{ height: 40, marginLeft:  13,
marginTop:0,borderRadius:2,width: 80, backgroundColor: 'green', width: 170, marginBottom: 25,}} onPress ={() => this.props.navigation.navigate('ItemDetailsPage',{
                      quote_id: item.id, quote_status: item.quote_type})}>
              <Text style={{  fontSize:15,fontWeight: "bold",color:'white',
 textAlign: 'center', textAlignVertical: 'center', padding: 10,
color: 'white', textAlignVertical: 'center'}}>
   View Details
</Text> 
</TouchableOpacity>

</View>
     )}

     FetchQuoteList = () => {

      this.setState({progress:true})
      var params = {}
      
      
    
     
      params = 
      {
    
        user_id: this.state.UserIDString//'22'//'84' //22
      
      }
    
      
    const { navigate } = this.props.navigation;
    
      // const url = UrlUtil.BASE_URL + 'api/quoteList';
      const url = UrlUtil.BASE_URL + 'api/quoteList';
      
    
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
    
          this.setState({quoteList: json.quoteList, isListDataAvlble: true})
          this.setState({progress:false})
          
        }
        else
        { 
          this.setState({progress:false, isListDataAvlble: false})
         // alert(json.message)
        }
    
    
      })
      .catch((err) => {
        Alert.alert(
          'Error',
          'Please check your network connection', // <- this part is optional, you can pass an empty string
          [
            {text: 'OK', onPress: () => this.setState({progress:false, isListDataAvlble: false})},
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

const styles = StyleSheet.create({
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
        height: 80,
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
      cardBox2New:{
        backgroundColor:'rgba(246, 244, 243, 1)',
        padding:10,
        flexDirection:'column',
        borderRadius:3,
        paddingTop: 15,
        shadowColor: '#efefef',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 1,
        shadowRadius: 3,
        marginTop: 30,
        elevation: 3,
        position: 'relative',
        justifyContent:'space-between',
        paddingTop:20,
        marginVertical:5,
      },
      dtlsHead:{
        backgroundColor:'red',
        padding: 8,
        borderRadius:4,
        position: 'absolute',
        zIndex:1,
        top:-20,
        left:10,
      },
      itemBox:{
        padding:10,
        borderWidth:1,
        borderColor:'#ddd',
        marginTop:5,
       marginRight:10,
       backgroundColor: 'rgba(246, 244, 243, 1)'
      },
      footer: {
        position: 'absolute',
        height: 80,
        left: 0, 
        top: Dimensions.get('window').height - 100, 
        width: Dimensions.get('window').width,
        backgroundColor: 'white',
        flexDirection: 'row',
              justifyContent: 'flex-start',
              alignContent: 'flex-start',
              alignItems: 'flex-start',
              shadowColor: 'grey',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 1,
      shadowRadius: 3,
      },
      itemRow1:{
        flex:1, marginTop: 1, backgroundColor:'#fff',
        padding:1,
        borderRadius:3,
        paddingTop: 1,
        shadowColor: '#efefef',
        shadowOffset: { width: 0, height: 23 },
        shadowOpacity: 1,
        shadowRadius: 3,
        marginTop: 1,
        elevation: 3,
        paddingTop:20,
        marginVertical:5,
        marginLeft: 5,
        marginRight: 5,
     
      },
      spinnerTextStyle: {
        color: 'red'
      },
  
});

       