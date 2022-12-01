


//https://github.com/colbymillerdev/react-native-progress-steps

//This is an example code for NavigationDrawer//
import React, { Component } from 'react';
//import react in our code.
import { StyleSheet, View, Text, ImageBackground,Image, ScrollView,FlatList, TouchableOpacity, SafeAreaView, PermissionsAndroid,
  Platform, } from 'react-native';
// import all basic components

import {Dimensions} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import Geocoder from 'react-native-geocoding';
import Notifications1 from '../Notifications';
var items = [
  {
    id: 1,
    name: 'JavaScript',
  },
  {
    id: 2,
    name: 'Java',
  },
  {
    id: 3,
    name: 'Ruby',
  },
  {
    id: 4,
    name: 'React Native',
  },
  {
    id: 5,
    name: 'PHP',
  },
  {
    id: 6,
    name: 'Python',
  },
  {
    id: 7,
    name: 'Go',
  },
  {
    id: 8,
    name: 'Swift',
  },
];
const SLIDER_WIDTH = Dimensions.get('window').width;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.8);
const ITEM_HEIGHT = Math.round(ITEM_WIDTH * 3 / 4);
const DEMO_OPTIONS_2 = [
  {"name": "Internal", "age": 30},
  {"name": "External", "age": 25},
];
const isPermitted = async () => {
  if (Platform.OS === 'android') {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'External Storage Write Permission',
          message: 'App needs access to Storage data',
        },
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } catch (err) {
      alert('Write permission err', err);
      return false;
    }
  } else {
    return true;
  }
};

const resourceType = 'url';
export default class Home extends Component {
  //Screen1 Component
  
  state = {
    items: [],
    movieData:[],
    watchData:[],
    resultSearchValue: 'select'
  };
  componentDidMount = () => {
    const items = [
     // { key: 'r', imageUrl: "https://www.gstatic.com/webp/gallery/1.jpg" },
    //  { key: 'b', imageUrl: "https://www.gstatic.com/webp/gallery/4.jpg"},
    //  { key: 'j', imageUrl: "https://www.gstatic.com/webp/gallery/5.jpg" },
      { key: 'r', imageUrl: require("../Images/war.jpg")},
      { key: 'b', imageUrl: require("../Images/byom.jpg")},
      { key: 'j', imageUrl: require("../Images/pade.jpg")},
    ];

    const movieData = [
  
       { key: 'r', imageUrl: require("../Images/mangal.jpg")},
       { key: 'b', imageUrl: require("../Images/baghi.jpg")},
       { key: 'j', imageUrl: require("../Images/ban.jpg")},
       { key: 'k', imageUrl: require("../Images/girls.jpg")},

     ];

     const watchData = [
 
      { key: 'k', imageUrl: require("../Images/girls.jpg")},
      { key: 'r', imageUrl: require("../Images/beauty.jpg")},
      { key: 'b', imageUrl: require("../Images/badhi.jpg")},
      { key: 'j', imageUrl: require("../Images/ban.jpg")},
    ];
    this.setState({
      items,
      movieData,
      watchData
      
    });
    
    this.props.navigation.navigate('DrawerClose')

    // fetch('http://ip-api.com/json')
    // .then((response) => response.json())
    // .then((response) => {
    //   console.log('User\'s Location Data is ', response);
    //   console.log('User\'s Country ', response.country);
    // })
    // .catch((error) => {
    //   console.error(error);
    // });

  };

  
  render() {

    const { navigate } = this.props.navigation;

    return (

      <SafeAreaView >
<ScrollView >

            <View style={styles.MainContainer}>

            <View style={{backgroundColor: 'rgba(246, 244, 243, 1)', flexDirection:'row', alignItems: 'center'}}>

<TouchableOpacity onPress={this.handleBackButtonClick}>
<Text style={{color:'red',fontSize:17, marginLeft: 17, fontWeight: "bold",}}>Back</Text>
</TouchableOpacity>

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

 <Image style={{ height: 140,
  marginLeft:  0,
marginTop:0,borderRadius:2,width: Dimensions.get('window').width}}
source={require('../Images/banner-home.jpg')}>
</Image> 

<View style={styles.SubContainer}>

 <TouchableOpacity  style={{marginRight:20,marginLeft:20,marginTop:100, backgroundColor: 'green', height: 60,}} onPress ={() => this.props.navigation.navigate('ItemListPage',{
                      navigationFlag: 'quote'})}>
                
                    <Text style={{fontSize:20,fontWeight: "bold",alignSelf:'center',color:'white', 
                marginTop:14}}>Quotation</Text>        
       
        </TouchableOpacity>

        <TouchableOpacity style={{marginRight:20,marginLeft:20,marginTop:40, height:60,borderRadius:0, backgroundColor: 'green',}} onPress ={() => this.props.navigation.navigate('ShipmentItemListPage',{
                      navigationFlag: 'shipment'})}>
                
                    <Text style={{padding: 5,fontSize:20,fontWeight: "bold",alignSelf:'center',color:'white',
                marginTop:14}}>Shipment Order</Text>        
       
        </TouchableOpacity>
       
          
          
        
        {/* <View style={{marginBottom: 60, height: 400}}>
        <TouchableOpacity onPress={createPDF}>
          <View>
            <Image
              //We are showing the Image from online
              source={{
                uri:
                  'https://raw.githubusercontent.com/AboutReact/sampleresource/master/pdf.png',
              }}
              style={styles.imageStyle}
            />
            <Text style={styles.textStyle}>Create PDF</Text>
          </View>
        </TouchableOpacity>
        <Text style={styles.textStyle}>{filePath1}</Text>
        </View> */}



{/* <PDFView
          fadeInDuration={250.0}
          style={{ flex: 1 }}
          resource={resources[resourceType]}
          resourceType={resourceType}
          onLoad={() => console.log(`PDF rendered from ${resourceType}`)}
          onError={(error) => console.log('Cannot render PDF', error)}
        /> */}

</View>


      
      </View>
      </ScrollView>
      <View style={styles.footer}>
      <View style={{flexDirection:'row', alignItems: 'center', justifyContent: 'center'}}>
            <View style={{flex:1, maxWidth: 414, backgroundColor: null, flexDirection:'row', justifyContent:'space-between'}}>
              
            <TouchableOpacity onPress ={() => this.props.navigation.navigate('TrackAndTracePage')}>
            <View style={{ marginLeft: 0, width: Dimensions.get('window').width/2 - 10, marginTop: 0, height: 80, backgroundColor: 'null'}}>
            <View style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center'}}>
            <Image style={{ height: 50, width: 50,resizeMode: 'contain'}}
                source={require('../Images/map.png')}></Image>
                <Text>Track Shipment</Text>
</View>

            
             </View>
             </TouchableOpacity>

             <View style={{ marginLeft: 0, width: 2, marginTop: 0, height: 80, backgroundColor: 'gray'}}>
               
               </View>

               <TouchableOpacity onPress ={() => this.props.navigation.navigate('ViewProfilePage')}>
                 

            <View style={{ marginLeft: 0, width: Dimensions.get('window').width/2 - 10, marginTop: 0, height: 80}}>
            <View style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center'}}>
            <Image style={{ height: 50, width: 50,resizeMode: 'contain'}}
                source={require('../Images/settings.png')}></Image>
                <Text>Account Settings</Text>
</View>
               </View>
            
            </TouchableOpacity>
  
  
            </View>
            </View>
    </View>

       </SafeAreaView >

  
    );
  }
testnotofications()
{
  ////this.props.navigation.navigate('ViewProfilePage')}>
  console.log('dadasd')
  Notifications1.schduleNotification1(new Date(Date.now()), 'Your order: ' + this.state.orderIDString + ' has been successfully placed');
}
  _dropdown_6_onSelect(idx, value) {
    // this.setState({ [item.fieldlabel]: value.name})
 }

 
  _dropdown_2_renderRow(rowData, rowID, highlighted) {
   
   return (
     
         <Text style={[styles.dropdown_2_text]}>
           {/* {`${rowData.name} (${rowData.age})`} */}
           {`${rowData.name}`}
         </Text>
      
    
   );
 }
  _dropdown_2_renderButtonText(rowData) {
   const {name, age} = rowData;
   // return `${name} - ${age}`;
   return `${name}`;
 }
  


}

const styles = StyleSheet.create({
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
    height:Dimensions.get('window').height - 300,
    backgroundColor: 'rgba(246, 244, 243, 1)',
    shadowColor: 'grey',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 1,
      shadowRadius: 3,
 },

 titleWrapper: {

},
inputWrapper: {

},
contentContainer: {
    flex: 1 // pushes the footer to the end of the screen
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
titleText: {
  fontSize: 22,
  fontWeight: 'bold',
  textAlign: 'center',
  paddingVertical: 20,
},
textStyle: {
  fontSize: 18,
  padding: 10,
  color: 'black',
  textAlign: 'center', 
  marginBottom: 30,
},
imageStyle: {
  width: 150,
  height: 150,
  margin: 5,
  resizeMode: 'stretch',
},

  
});



       