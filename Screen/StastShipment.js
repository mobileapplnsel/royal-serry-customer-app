import React,{Component} from 'react';

import { StyleSheet, Image,ImageBackground, View,Text, TextInput, TouchableOpacity, Dimensions, SafeAreaView, ScrollView, Modal, FlatList, Alert, BackHandler} from 'react-native';
import {StatusBar} from 'react-native';

import AnimateLoadingButton from 'react-native-animate-loading-button';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';

var radio_props = [
  {label: 'Normal user', value: 0 },
  {label: 'Business User', value: 1 }
];
const DEMO_OPTIONS_21 = [
  {"name": "Parcel",},
  {"name": "Document",},
];
const DEMO_OPTIONS_22 = [
  {"name": "Domestic",},
  {"name": "International",},
];
var selectedComboFlag = ''

export default class Login extends Component{

  constructor(props) {
    super(props);
    this.state = {
      radioValue: 0,
      seachableModalVisible: false,
      data: [],
      dropdownMasterData: [],
      value: '',
      selectedParcelType: 'Document',
      selectedParcelType2: 'Domestic',


    }
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    this.CallToShowDropDownCombo = this.CallToShowDropDownCombo.bind(this);
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
                <Text style={styles.login}>Start Shipment</Text>

                <Text style={{fontSize:15,
        color:'red',
        alignSelf:'center',
        marginTop:20,}}>General</Text>

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
 <Text style={{fontSize: 15,textAlign: 'center', color: 'white', fontWeight: 'bold'}}>1</Text></View>

 </View>
 </View>       


 {/* <Text style={{fontSize:15,
        color:'black',
        marginLeft: 13,
        marginTop:33,}}>Type of shipment ( Parcel Or Document)</Text>

                
 <TouchableOpacity onPress={() => this.CallToShowDropDownCombo('document')}>
<View style={{flexDirection:'row', alignItems: 'center', justifyContent: 'center', height: 40,
      margin: 0,
      marginTop: 5}}>
            <View style={{flex:1, maxWidth: 414, backgroundColor: null, flexDirection:'row', justifyContent:'space-between'}}>
                <Text style={{paddingLeft:13, marginTop: 4,color: 'gray', fontSize: 12,}}>{this.state.selectedParcelType}</Text>
                <View style={{width:15, height:15, justifyContent: 'flex-end', marginRight: 20, marginTop: 6}}>
                  <Image source={require("../Images/down_arrow.png")} style={{width:15, height:15,}} />
                </View>
                
              </View>
              </View>
              </TouchableOpacity>

              <View style={{marginLeft:13,marginTop:0, backgroundColor: 'gray', marginRight: 13, height: 1}}></View> */}

              <Text style={{fontSize:15,
        color:'black',
        marginLeft: 13,
        marginTop:33,}}>Domestic or International</Text>

                <TouchableOpacity onPress={() => this.CallToShowDropDownCombo('domestic')}>
<View style={{flexDirection:'row', alignItems: 'center', justifyContent: 'center', height: 40,
      margin: 0,
      marginTop: 0}}>
            <View style={{flex:1, maxWidth: 414, backgroundColor: null, flexDirection:'row', justifyContent:'space-between'}}>
                <Text style={{paddingLeft:13, marginTop: 4, color: 'gray', fontSize: 12,}}>{this.state.selectedParcelType2}</Text>
                <View style={{width:15, height:15, justifyContent: 'flex-end', marginRight: 20, marginTop: 6}}>
                  <Image source={require("../Images/down_arrow.png")} style={{width:15, height:15,}} />
                </View>
                
              </View>
              </View>
              </TouchableOpacity>

              <View style={{marginLeft:13,marginTop:0, backgroundColor: 'gray', marginRight: 13, height: 1}}></View>
               

               
              <TouchableOpacity style={{ height: 40,
 marginLeft:  Dimensions.get('window').width - 150,
marginTop:45,borderRadius:2,width: 80, backgroundColor: 'green', marginBottom: 13}} onPress ={() => this.NextButtonCliecked()}>
              <Text style={{  fontSize:20,fontWeight: "bold",color:'white',
 textAlign: 'center', textAlignVertical: 'center',
color: 'white', padding: 7,}}>
   Next
</Text> 
</TouchableOpacity>
       

        

  
</ScrollView>
</View>

<Modal
                            animationType="slide"
                            transparent={true}
                            visible={this.state.seachableModalVisible}
                        >
                            <View style={{ height: 500, marginTop: 112 }}>
                                <View style={styles.modalStyle}>
        <FlatList
          data={this.state.data}
          renderItem={this.renderSearchableData}
           keyExtractor={item => item.name}
          ItemSeparatorComponent={this.renderSeparator}
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
   // this.customCountryStateCityApiCall()
  }
  NextButtonCliecked()
  {

    var dictionary_main = {};
    // dictionary_main['TypeOfShipment'] = this.state.selectedParcelType
    dictionary_main['DomesticOrInternational'] = this.state.selectedParcelType2


    this.props.navigation.navigate('LocationPage',{
      navigationFlag: this.props.navigation.state.params.navigationFlag,
      quoteOrShipmentData: dictionary_main
    })

  }
handleBackButtonClick() {
  

  this.props.navigation.goBack(null);
  return true;
}

  CallToShowDropDownCombo(selectedFlag) 
  {

    console.log('selectedFlag: ', selectedFlag);


    if (selectedFlag == 'document')
    {
      selectedComboFlag = 'document'
      this.setState({ data: DEMO_OPTIONS_21, seachableModalVisible: true})
      
    }
    
     if (selectedFlag == 'domestic')
    {
      selectedComboFlag = 'domestic'
      this.setState({ data: DEMO_OPTIONS_22, seachableModalVisible: true})

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

console.log('selectItemOnDropDown', item)

    if (selectedComboFlag == 'document')
    {
      this.setState({ seachableModalVisible: false, selectedParcelType: item.name,})
    }
    
     if (selectedComboFlag == 'domestic')
    {
      this.setState({ seachableModalVisible: false, selectedParcelType2: item.name,})
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
          height: 80,
          width: '80%',
          alignSelf: 'center',
          marginTop: 100,
          backgroundColor: 'red',
          borderRadius: 6
        },
        cancelStyle: {
          height: 55,
          marginTop: 12,
          backgroundColor: 'red',
          width: '80%',
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
  });