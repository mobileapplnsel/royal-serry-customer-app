import React,{Component} from 'react';

import { StyleSheet, Image,ImageBackground, View,Text, TextInput, TouchableOpacity, Dimensions, SafeAreaView, ScrollView, Modal, FlatList, Alert, BackHandler, AsyncStorage} from 'react-native';

import {StatusBar} from 'react-native';
import {NavigationEvents} from 'react-navigation';
import AnimateLoadingButton from 'react-native-animate-loading-button';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import CheckBox from '@react-native-community/checkbox'; 
import UrlUtil from '../Service/UrlUtils';
import Spinner from 'react-native-loading-spinner-overlay';
import KeyboardManager from 'react-native-keyboard-manager';
var radio_props = [
  {label: 'For Documents', value: 0 },
  {label: 'For Package', value: 1 }
];

var prohibittedModeArray = [
  {label: 'For Documents', value: 0 },
  {label: 'For Package', value: 1 }
];

var radio_propsForSpeedRate = [
  {label: 'By Road', value: 0 },
  {label: 'By Rail', value: 1 },
  {label: 'By Air', value: 2 },
  {label: 'By Ship', value: 3 }
];

var do_you_have_radio_props = [
  {label: 'Yes', value: 0 },
  {label: 'No', value: 1 }
];

var selectedComboFlag = 'country'

var documentsData = [
  
];
var selectedComboFlagForDimension = ''
var exstngItemIndxAftrdlte = 0

const lengthDimensionArr = [
  {"name": "cm",},
  {"name": "inc",},
];
const weightDimensionArr = [
  {"name": "kg",},
  {"name": "pound",},
];
var totalPrice1 = 0
export default class Login extends Component{

  constructor(props) {
    super(props);
    this.state = {
      radioValue0: 0,
      radioValueIndex: 0,
      radioValueHaveDetails: 0,
      seachableModalVisible: false,
      seachableModalVisible1: false,
      data: [],
      data1: [],
      dropdownMasterData: [],
      value: '',
      selectedCountryID: '',
      selectedStateID: '',
      CountryStateCityFetchURL: 'https://api.countrystatecity.in/v1/countries',

      FromFirstnameString: '',
      FromLastnameString: '',
      FromAddress1String: '',
      FromAddress2String: '',
      FromCompanyString: '',
      FromCountryString: 'Country',
      FromStateString: 'State',
      FromCityString: 'City',
      FromZipCodeString: '',
      FromEmailString: '',
      FromPhoneString: '',
      FromAddressTypeString: 1,

      ToFirstnameString: '',
      ToLastnameString: '',
      ToAddress1String: '',
      ToAddress2String: '',
      ToCompanyString: '',
      ToCountryString: 'Country',
      ToStateString: 'State',
      ToCityString: 'City',
      ToZipCodeString: '',
      ToEmailString: '',
      ToPhoneString: '',
      ToPhoneString1: '',
      ToAddressTypeString: 0,
      radioValueSpeedRate: 0,
      

      fromToLocationFlag: 'to',
      showOrHidePhone2Flag: 'hide',

      fromLocationTextColor : 'grey',
      toLocationTextColor : 'red',
      fromLocationborderwidth : 0,
      toLocationborderwidth: 1,

      lengthType: 'cm',
      breadthType: 'cm',
      heightType: 'cm',
      WeightType: 'kg',

      isSelected: true,
      documentsData1: [
        {radioValuee : 0}
      ],


    selectedFlagForCombo: '',
    progress: false,
    selecteditem_cat_id: '',
    selectedindex: '0',
    selectedIndexForDimension: '0',

    documentGlobalArray: [],
    packageGlobalArray: [],
    documentAddMoreIndex: 1,
    packageAddMoreIndex: 1,

    shippingModeArray: [],
    deliveryModeArray: [],
    

    priceList: [],

    seachableModalVisible2: false,
    initialIndex: 100,
    rateFactorValue: 1,
    DocumentYourCharges: '0.00',
    DeliveryModeSelectedValue: undefined,
    chargesModeID: '-1',
    insuranceRate: '0',
    UserIDString: '',
    prohibited_document: [],
    prohibited_parcel: [],
    prohibitedData: [],
    prohibitedData1: {},
    prohibitedModalVisible: false,
  
    

    }
    this.callToSetCatSubcatValue = this.callToSetCatSubcatValue.bind(this);
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    this.CallToShowDropDownCombo = this.CallToShowDropDownCombo.bind(this);
}
onSelect = data => {
  console.log('onSelect data: ', data)

  

      this.setState({ [data.selectedFlagForCombo]: data.category_name,
         [data.selectedFlagForCombo+'ID']: data.cat_id})
      if (data.selectedFlagForCombo.includes("documentCategory") || data.selectedFlagForCombo.includes("packageCategory"))
      {
      this.setState({['item_cat_id'+data.index]: data.cat_id, initialIndex: 100, DocumentYourCharges: '0.00',})
      }

      this.refs.radioForm.updateIsActiveIndex(-1)
  for(let i = 0; i < this.state.documentsData1.length; i++)
    {
  
      this.setState({DocumentYourCharges: String(0.00), 
      DeliveryModeSelectedValue: String(0.00), ['DocumentYourCharges'+String(i)]: String(0.00)
      })
      

    }

};
callToSetCatSubcatValue()  
  {

if(this.props.navigation.state.params)
{
  console.log('callToSetAddress1Value called', this.props.navigation.state.params.navigationFlag1)
if (this.props.navigation.state.params.navigationFlag1 == 'categoryPicker')
    {
      console.log('selectItemOnDropDown ==> ', this.props.navigation.state.params.index, 
      this.props.navigation.state.params.selectedFlagForCombo+'ID')

      this.setState({ [this.props.navigation.state.params.selectedFlagForCombo]: this.props.navigation.state.params.category_name,
         [this.props.navigation.state.params.selectedFlagForCombo+'ID']: this.props.navigation.state.params.cat_id})
      if (this.props.navigation.state.params.selectedFlagForCombo.includes("documentCategory") || this.props.navigation.state.params.selectedFlagForCombo.includes("packageCategory"))
      {
      this.setState({['item_cat_id'+this.props.navigation.state.params.index]: this.props.navigation.state.params.cat_id, initialIndex: 100, DocumentYourCharges: '0.00',})
      }

      this.refs.radioForm.updateIsActiveIndex(-1)
  for(let i = 0; i < this.state.documentsData1.length; i++)
    {
  
      this.setState({DocumentYourCharges: String(0.00), 
      DeliveryModeSelectedValue: String(0.00), ['DocumentYourCharges'+String(i)]: String(0.00)
      })
      

    }
    }
  }

  }
  render(){

    const { navigate } = this.props.navigation;
    return(

<SafeAreaView >

{/* <NavigationEvents onDidFocus={() => this.callToSetCatSubcatValue()}/> */}
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
 <ScrollView>
                <Text style={styles.login}>Start Shipment</Text>

                <Text style={{fontSize:15,
        color:'red',
        alignSelf:'center',
        marginTop:20,}}>Parcel Details</Text>

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
 <Text style={{fontSize: 15,textAlign: 'center', color: 'white', fontWeight: 'bold'}}>3</Text></View>

 </View>
 </View>   


 <Text style={{fontSize:15,
        color:'black',
        alignSelf:'center',
        marginTop:20,}}>Do you have the all details of the item ?</Text>

 <View style={{marginLeft:7,marginTop:10, marginRight: 7,}}>
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
<TouchableOpacity style={{ alignSelf: 'center', marginTop: 18}} onPress ={() => this.setState({prohibitedModalVisible: true, prohibitedData: this.state.prohibitedData1['prohibited_document']})}>
<Text style={{fontSize:15,
        color:'grey', fontWeight: 'bold'}}>List of Prohibited Items</Text>
        </TouchableOpacity>
{/* { this.state.radioValueHaveDetails == 0 && <View style={{marginLeft:7,marginTop:34, marginRight: 7,}}>
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
  onPress={(value) => {this.switchingBetweenDocumentsAndPackage(value)}}
/>
</View>  } */}



 
{ this.state.radioValueHaveDetails == 0 && <View style={{ marginTop: 30 }}>
<FlatList
     keyboardDismissMode="none"
      keyboardShouldPersistTaps='handled'
     
      
                        data={this.state.documentsData1}
                        renderItem={this.renderHorizontalItem}
                        keyExtractor={(item, index) => index}
                    /> 
           </View>    }


           {/* { this.state.radioValueHaveDetails == 1 && <View style={{ marginTop: 30 }}>

           <TouchableOpacity onPress ={() => this.quotationButtonClicked()}>
              <Text style={{  fontSize:20,fontWeight: "bold",color:'white',
 textAlign: 'center', textAlignVertical: 'center', height: 40,
marginTop:3,borderRadius:2,width: 80,
color: 'white', backgroundColor: 'green', alignSelf: 'center', width: 150, marginBottom: 20, padding: 7}}>
   Quotation
</Text> 
</TouchableOpacity>
           </View>    } */}
          

           { this.state.radioValueHaveDetails == 0 && <View>
              <TouchableOpacity style={{ height: 40, marginTop: 13, marginBottom: 13,
              marginLeft: 5, borderRadius:2, width: 130, backgroundColor: 'red', padding: 9
            }} onPress ={() => this.AddMoreAction()}>
           <Text style={{ textAlign: 'center', textAlignVertical: 'center', color: 'white', fontWeight: 'bold', fontSize: 14, paddingTop: 3
            }}>+ ADD MORE</Text> 
            </TouchableOpacity> 
            </View> }

           { this.state.radioValueHaveDetails == 0 &&  <Text style={{fontSize:16,
        color:'grey',
        
        marginLeft:13, fontWeight: 'bold', marginTop: 13}}>Your Charges (Excluding Insurance)</Text> }

<Text style={{fontSize:13,
        color:'grey',
        
        marginLeft:13, marginTop: 13, fontWeight: 'bold'}}>Speed Rate:</Text>

<TouchableOpacity onPress={() => this.selectShipmentCategory('documentSpeedRate')}>
<View style={{flexDirection:'row', alignItems: 'center', justifyContent: 'center', height: 40,
      margin: 0,
      marginTop: 13}}>
            <View style={{flex:1, maxWidth: 414, backgroundColor: null, flexDirection:'row', justifyContent:'space-between'}}>
                <Text style={{paddingLeft:13,color: 'gray', fontSize: 12,}}>{this.state['documentSpeedRate'] ?? 'Select Shipping mode'}</Text>
                <View style={{width:15, height:15, justifyContent: 'flex-end', marginRight: 20, marginTop: 6}}>
                  <Image source={require("../Images/down_arrow.png")} style={{width:15, height:15,}} />
                </View>
                
              </View>
              </View>
              </TouchableOpacity>

              <View style={{marginLeft:13,marginTop:-4, backgroundColor: 'gray', marginRight: 13, height: 1, marginBottom: 7}}></View>



           <View style={{marginLeft:13,marginTop:13, marginRight: 7, width: '40%', marginBottom: 10}}>
                <RadioForm
  radio_props={this.state.shippingModeArray}
  style={{
    backgroundColor: 'rgba(246, 244, 243, 1)'
}}
  initial={this.state.initialIndex}
  formHorizontal={false}
  buttonColor={'rgba(198, 35, 0, 1)'}
  selectedButtonColor={'rgba(198, 35, 0, 1)'}
       //   buttonOuterColor={'rgba(204, 32, 0, 1)'}
       ref="radioForm"
  labelStyle={{fontSize: 12, color: 'gray', marginRight:7, marginBottom:20, marginTop: 4}}
  onPress={(value) => {this.switchingBetweenSpeedRate(value)}}
  
/>
</View> 



{ this.state.radioValueHaveDetails == 1 && <View style={{ marginTop: 10, marginBottom: 30 }}>

<TouchableOpacity onPress ={() => this.quotationButtonClicked()}>
   <Text style={{  fontSize:20,fontWeight: "bold",color:'white',
textAlign: 'center', textAlignVertical: 'center', height: 50,
marginTop:3,borderRadius:2,width: 140,
color: 'white', backgroundColor: 'green', alignSelf: 'center', width: 170, marginBottom: 20, padding: 7}}>
Request Quote
</Text> 
</TouchableOpacity>
</View>    }

{ this.state.radioValueHaveDetails == 0 &&
           <View>
<View style={{ alignSelf: 'flex-end', width: null, flexDirection: 'row', marginRight: 0, marginTop: 15, marginBottom: 10}}>
             <Text style={{
        marginTop: 6,
        color: 'red',
        fontSize: 14
    }}>Your Charges</Text>
    <Text style={{
      marginLeft: 3,
        marginTop: 6,
        color: 'grey',
        fontSize: 15,
        marginRight: 7,
    }}>$</Text>
    <TextInput style={{
    width: 120,
    marginLeft: 0,
    borderRadius: 0,
    marginRight: 13,
    fontSize: 14,
    height: 40,
    color: 'grey',
    backgroundColor: 'white',
    marginTop: -4,
    fontWeight: 'bold',
    paddingLeft: 4,
    }}
                placeholder={''}
                placeholderTextColor={'grey'}
                autoCapitalize = 'words'
                value =  {this.state.DocumentYourCharges ?? '0.00'}
                editable={false}
                ></TextInput>
             </View>  

           {/* <View style={{ width: null, justifyContent: 'flex-start', flexDirection: 'row', marginTop: 0, width: '50%'}}>
              
              
              <TouchableOpacity onPress ={() => this.AddMoreAction()}>
              <Text style={{  fontSize:15,
        color:'grey',
        alignSelf:'flex-start',
        marginTop:20, marginLeft: 13, fontWeight: 'bold', textAlignVertical: 'center', textAlign: 'center', height: 30}}>
   + Add More
</Text> 
</TouchableOpacity>

             </View> */}

            
             
             {/* <View style={{ alignSelf: 'flex-end', width: null, flexDirection: 'row', marginRight: 0, marginTop: 15, }}>
             <Text style={{
        marginTop: 6,
        color: 'red',
        fontSize: 14
    }}>Your Charges</Text>
    <Text style={{
      marginLeft: 3,
        marginTop: 6,
        color: 'grey',
        fontSize: 15,
        marginRight: 7,
    }}>$</Text>
    <TextInput style={{
    width: 120,
    marginLeft: 0,
    borderRadius: 0,
    marginRight: 13,
    fontSize: 12,
    height: 40,
    color: 'grey',
    backgroundColor: 'white',
    marginTop: 0,
    
    }}
                placeholder={''}
                placeholderTextColor={'grey'}
                autoCapitalize = 'words'
      value = {this.state.FromLastnameString}
      onChangeText={(text) => this.setState({ FromLastnameString: text})}
                ></TextInput>
             </View>
 */}



               
              <TouchableOpacity style={{ height: 40, marginLeft:  Dimensions.get('window').width - 150,
marginTop:45,borderRadius:2,width: 80, backgroundColor: 'green', marginBottom: 65, padding: 6}} onPress ={() => this.NextButtonCliecked()}>
              <Text style={{  fontSize:20,fontWeight: "bold",color:'white',
 textAlign: 'center', textAlignVertical: 'center',
color: 'white'}}>
   Next
</Text> 
</TouchableOpacity>
       
</View> }
        

  
</ScrollView>
</View>
<Spinner
          visible={this.state.progress}
          textContent={'Loading...'}
          textStyle={styles.spinnerTextStyle}
        />

<Modal
                            animationType="slide"
                            transparent={false}
                            visible={this.state.prohibitedModalVisible}
                        >
                            <View style={{ height: 500, marginTop: 12 }}>
                                <View style={styles.modalStyle}>

                                <RadioForm
  radio_props={prohibittedModeArray}
  style={{
    backgroundColor: 'red',
    alignSelf: 'center',
    marginTop: 13
}}
  initial={0}
  formHorizontal={true}
  buttonColor={'white'}
  selectedButtonColor={'white'}
       //   buttonOuterColor={'rgba(204, 32, 0, 1)'}
      //  ref="radioForm"
  labelStyle={{fontSize: 14, color: 'white', marginRight:7, marginBottom:20, marginTop: 4}}
  onPress={(value) => {this.switchingBetweenProhibitedDocOrPackage(value)}}
  
/>

        <FlatList
          data={this.state.prohibitedData}
          renderItem={this.renderProhibittedData}
           keyExtractor={item => item.name}
          ItemSeparatorComponent={this.renderSeparator}
        />
     
                                </View>

                                <TouchableOpacity onPress={() => { this.setState({ prohibitedModalVisible: false }) }}>
                                    <View style={styles.cancelStyle}>
                                        <Text style={{ fontSize: 20, alignSelf: 'center', marginTop: 14, color: 'white' }}>Dismiss</Text>
                                    </View>
                                </TouchableOpacity>

                            </View>
                        </Modal>

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
           keyExtractor={item => item.category_name}
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

                        <Modal
                            animationType="slide"
                            transparent={false}
                            visible={this.state.seachableModalVisible1}
                        >
                            <View style={{ height: 500, marginTop: 112 }}>
                                <View style={styles.modalStyle1}>
        <FlatList
          data={this.state.data1}
          renderItem={this.renderSearchableData1}
           keyExtractor={item => item.name}
          ItemSeparatorComponent={this.renderSeparator1}
        />
     
                                </View>

                                <TouchableOpacity onPress={() => { this.setState({ seachableModalVisible1: false }) }}>
                                    <View style={styles.cancelStyle}>
                                        <Text style={{ fontSize: 20, alignSelf: 'center', marginTop: 16, color: 'white' }}>Cancel</Text>
                                    </View>
                                </TouchableOpacity>

                            </View>
                        </Modal>

                        <Modal
                            animationType="slide"
                            // animationType='fade'
                            transparent={false}
                            visible={this.state.seachableModalVisible2}
                        >
                            <View style={{ height: 500, marginTop: 12 }}>
                                <View style={styles.modalStyle}>
        <FlatList
          data={this.state.deliveryModeArray}
          renderItem={this.renderSearchableData2}
           keyExtractor={item => item.category_name}
          ItemSeparatorComponent={this.renderSeparator}
        />
     
                                </View>

                                <TouchableOpacity onPress={() => { this.setState({ seachableModalVisible2: false }) }}>
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

    let user = await AsyncStorage.getItem('userdata');
    let parsed = JSON.parse(user);

    this.setState({
      UserIDString: parsed.user_id,
    });

    // Alert.alert(
    //   'Confirm',
    //   'Do you have the all details of the item ?', // <- this part is optional, you can pass an empty string
    //   [
    //     {text: 'No', onPress: () => this.LogoutClicked()},
    //     {text: 'Yes', onPress: () => console.log('cancelled')},
    //   ],
    //   {cancelable: false},
    // )

  
    this.transportationApiCall()
    this.rateFactorApiCall()
   this.deliveryModeFetchApi()
   this.fetchAllProhibitedItemsApiCall()
   //console.log('componentDidMount called',  this.props.navigation.state.params.quoteOrShipmentData)

  }
  NextButtonCliecked()
  {

    console.log("this.state.chargesModeID: ",this.state.chargesModeID)

if (this.state['documentSpeedRateID'] == undefined)
{
  Alert.alert(
    'Alert',
    'Please select shipping mode before you proceed to create a quotation.', // <- this part is optional, you can pass an empty string
    [
      {text: 'OK', onPress: () =>  {cancelable: false}},
      
    ],
    {cancelable: false},
  )
}
   else if (this.state.chargesModeID == undefined || this.state.chargesModeID == -1)
    {
      Alert.alert(
        'Alert',
        'Please select delivery mode before you proceed to create a quotation.', // <- this part is optional, you can pass an empty string
        [
          {text: 'OK', onPress: () =>  {cancelable: false}},
          
        ],
        {cancelable: false},
      )
    }
else if (this.state.DocumentYourCharges == '0.00' || this.state.DocumentYourCharges == '0')
    {
      Alert.alert(
        'Alert!',
        'Charges should be greater than 0.00 to be proceeded. Please contact your nearest branch',
        [
          {text: 'OK', onPress: () => this.setState({progress:false})},
        ],
        {cancelable: false},
      );
    }
    else
    {

console.log('documentdata2 arr:', this.state.documentsData1, this.state['packageCategory'+String(0)+'ID'])

var insuranceFlagCount = 0;

var totalPrice1 = 0
    var Document_array = [];
    var Package_array = [];
    var totalPricee = 0
   var totalPriceWithInsaurance = 0
   var OnlyPriceOfInsaurance = 0

    var DocumentAndPackage_array = [];
    for(let i = 0; i < this.state.documentsData1.length; i++)
    {

      if (this.state.documentsData1[i].radioValuee == 0 && this.state['isDeleted'+String(i)] != 'deleted')
      {
        var dictionary_main = {};
        dictionary_main['documentCategory'] = this.state['documentCategory'+String(i)]
        dictionary_main['documentSubCategory'] = this.state['documentSubCategory'+String(i)]
        dictionary_main['documentItem'] = this.state['documentItem'+String(i)]
        dictionary_main['documentCategoryID'] = String(this.state['documentCategory'+String(i)+'ID'])
        dictionary_main['documentSubCategoryID'] = String(this.state['documentSubCategory'+String(i)+'ID'])
        dictionary_main['documentItemID'] =String( this.state['documentItem'+String(i)+'ID'])
        dictionary_main['documentvalueOfShipment'] = this.state['documentvalueOfShipment'+String(i)]
        dictionary_main['documentOrPackage'] = 'document'
        dictionary_main['documentRates'] = this.state['DocumentYourCharges'+String(i)]
        dictionary_main['documentInsurance'] = this.state['InsauranceString'+String(i)]


       
  
  if (this.state['documentprotectShipment'+String(i)] == undefined)
  {
    dictionary_main['documentprotectShipment'] = false
  }
  else
  {
    if (this.state['documentprotectShipment'+String(i)] == true)
    {
      // ['InsauranceString'+String(index)]
      totalPriceWithInsaurance = totalPriceWithInsaurance + parseFloat(this.state['DocumentYourCharges'+String(i)]) + 
      parseFloat(this.state['InsauranceString'+String(i)])
      OnlyPriceOfInsaurance = OnlyPriceOfInsaurance + parseFloat(this.state['InsauranceString'+String(i)])
      insuranceFlagCount = insuranceFlagCount + 1
      // totalPricee = totalPricee + 
    }
    dictionary_main['documentprotectShipment'] = this.state['documentprotectShipment'+String(i)]
  }
  // var totalPrice1 = 0
  // if (this.state['DocumentYourCharges'+String(i)] != undefined)
  //       {
  //         totalPrice1 = totalPrice1 + parseInt(this.state['DocumentYourCharges'+String(i)] , 10)
  //       }
        
        Document_array.push(dictionary_main)
        DocumentAndPackage_array.push(dictionary_main)
      }

      if (this.state.documentsData1[i].radioValuee == 1 && this.state['isDeleted'+String(i)] != 'deleted')
      {
        var dictionary_main1 = {}
        
        dictionary_main1['packageCategory'] = this.state['packageCategory'+String(i)]
        dictionary_main1['packageSubCategory'] = this.state['packageSubCategory'+String(i)]
        dictionary_main1['packageItem'] = this.state['packageItem'+String(i)]
        dictionary_main1['packageDescribeShipment'] = this.state['packageDescribeShipment'+String(i)]
        dictionary_main1['packageCategoryID'] = this.state['packageCategory'+String(i)+'ID']
        dictionary_main1['packageSubCategoryID'] = this.state['packageSubCategory'+String(i)+'ID']
        dictionary_main1['packageItemID'] = this.state['packageItem'+String(i)+'ID']
  
        dictionary_main1['packageReference'] = this.state['packageReference'+String(i)]
        dictionary_main1['packagevalueOfShipment'] = this.state['packagevalueOfShipment'+String(i)]
        dictionary_main1['packageQuantity'] = this.state['packageQuantity'+String(i)]

        dictionary_main1['packageLength'] = this.state['packageLength'+String(i)]
       
        dictionary_main1['packageBreadth'] = this.state['packageBreadth'+String(i)]
        
        dictionary_main1['packageHeight'] = this.state['packageHeight'+String(i)]
        
        dictionary_main1['packageWeight'] = this.state['packageWeight'+String(i)]
        dictionary_main1['packageRates'] = this.state['DocumentYourCharges'+String(i)]
        dictionary_main1['packageInsurance'] = this.state['InsauranceString'+String(i)]
        
  
        if (this.state['lengthType'+String(i)] != undefined)
        {
          dictionary_main1['lengthType'] = this.state['lengthType'+String(i)]
        }
        else
        {
          dictionary_main1['lengthType'] = 'cm'
        }
  
        if (this.state['breadthType'+String(i)] != undefined)
        {
          dictionary_main1['breadthType'] = this.state['breadthType'+String(i)]
        }
        else
        {
          dictionary_main1['breadthType'] = 'cm'
        }
  
        if (this.state['heightType'+String(i)] != undefined)
        {
          dictionary_main1['heightType'] = this.state['heightType'+String(i)]
        }
        else
        {
          dictionary_main1['heightType'] = 'cm'
        }
  
        if (this.state['WeightType'+String(i)] != undefined)
        {
          dictionary_main1['WeightType'] = this.state['WeightType'+String(i)]
        }
        else
        {
          dictionary_main1['WeightType'] = 'kg'
        }
  
        // if (this.state['PackageYourCharges'+String(i)] != undefined)
        // {
        //   totalPrice1 = totalPrice1 + parseInt(this.state['PackageYourCharges'+String(i)] , 10)
        // }
  
        dictionary_main1['documentOrPackage'] = 'package'
  
  if (this.state['packageprotectShipment'+String(i)] == undefined)
  {
    dictionary_main1['packageprotectShipment'] = false

  }
  else
  {

    if (this.state['packageprotectShipment'+String(i)] == true)
    {
      if (parseInt(this.state['packageQuantity'+String(i)] , 10) >= 1)
      {
        insuranceFlagCount = insuranceFlagCount + parseInt(this.state['packageQuantity'+String(i)] , 10)
        totalPriceWithInsaurance = totalPriceWithInsaurance + (parseInt(this.state['packageQuantity'+String(i)] , 10) * (parseFloat(this.state['DocumentYourCharges'+String(i)]) + 
      parseFloat(this.state['InsauranceString'+String(i)])))

      OnlyPriceOfInsaurance = OnlyPriceOfInsaurance + (parseInt(this.state['packageQuantity'+String(i)] , 10) *
      parseFloat(this.state['InsauranceString'+String(i)]))
      }
      else
      {
        insuranceFlagCount = insuranceFlagCount + 1
      }

      
    }

    dictionary_main1['packageprotectShipment'] = this.state['packageprotectShipment'+String(i)]
  }
  
  console.log('dictionary_main1',  dictionary_main1)   
  Package_array.push(dictionary_main1)
  DocumentAndPackage_array.push(dictionary_main1)
      }

      }


    console.log('Document_array=> ', Document_array)
    console.log('Package_array=> ', Package_array, totalPrice1)
    console.log('insuranceFlagCount=> ', insuranceFlagCount, this.state.insuranceRate, this.state.DocumentYourCharges)

    var totalPricee = parseFloat(this.state.DocumentYourCharges) + (insuranceFlagCount*parseFloat(this.state.insuranceRate))
    
   

    var dictionary_main2 = this.props.navigation.state.params.quoteOrShipmentData
dictionary_main2['Document_array'] = Document_array
dictionary_main2['Package_array'] = Package_array
dictionary_main2['ShippingMode'] = this.state['documentSpeedRate']
dictionary_main2['DeliveryMode'] = this.state.DeliveryModeSelectedValue
dictionary_main2['DeliveryModeID'] = this.state['documentSpeedRateID']
dictionary_main2['chargesModeID'] = this.state.chargesModeID
dictionary_main2['insurance'] = this.state.insuranceRate
dictionary_main2['TotalPrice'] = totalPriceWithInsaurance
dictionary_main2['OnlyPrice'] = parseFloat(this.state.DocumentYourCharges)
dictionary_main2['TotalInsurance'] = OnlyPriceOfInsaurance
dictionary_main2['DocumentAndPackage_array'] = DocumentAndPackage_array


    this.props.navigation.navigate('PricePage',{
      navigationFlag: this.props.navigation.state.params.navigationFlag,
      quoteOrShipmentData: dictionary_main2,
      totalPrice: totalPrice1
    })
  }


  }
  quotationButtonClicked()
  { 

    console.log('charges_final and delivery_speed ', this.state.chargesModeID, this.state['documentSpeedRateID'])

   
    var dictionary_main = {};

    if (this.props.navigation.state.params.quoteOrShipmentData.DomesticOrInternational == 'Domestic')
    {
      dictionary_main['location_type'] = '1'
  
    }
    else
    {
      dictionary_main['location_type'] = '2'
      
    }
   
    dictionary_main['delivery_speed'] = this.state['documentSpeedRateID']
    dictionary_main['charges_final'] = this.state.chargesModeID
   
    dictionary_main['customer_id'] = this.state.UserIDString
    dictionary_main['user_id'] = this.state.UserIDString
    
    
    

    dictionary_main['firstname'] = this.props.navigation.state.params.quoteOrShipmentData.fromUserdata.FromFirstnameString
    dictionary_main['lastname'] = this.props.navigation.state.params.quoteOrShipmentData.fromUserdata.FromLastnameString
    dictionary_main['address_from'] = this.props.navigation.state.params.quoteOrShipmentData.fromUserdata.FromAddress1String
    dictionary_main['address2'] = this.props.navigation.state.params.quoteOrShipmentData.fromUserdata.FromAddress2String
    dictionary_main['company_name'] = this.props.navigation.state.params.quoteOrShipmentData.fromUserdata.FromCompanyString
    dictionary_main['country'] = this.props.navigation.state.params.quoteOrShipmentData.fromUserdata.fromSelectedCountryID
    dictionary_main['state'] = this.props.navigation.state.params.quoteOrShipmentData.fromUserdata.fromSelectedStateID
    dictionary_main['city'] = this.props.navigation.state.params.quoteOrShipmentData.fromUserdata.fromSelectedCityID
    dictionary_main['zip'] = this.props.navigation.state.params.quoteOrShipmentData.fromUserdata.FromZipCodeString
    dictionary_main['email'] = this.props.navigation.state.params.quoteOrShipmentData.fromUserdata.FromEmailString
    dictionary_main['telephone'] = this.props.navigation.state.params.quoteOrShipmentData.fromUserdata.FromPhoneString
    dictionary_main['address_type'] = this.props.navigation.state.params.quoteOrShipmentData.fromUserdata.FromAddressTypeString
    dictionary_main['latitude_from'] = this.props.navigation.state.params.quoteOrShipmentData.fromUserdata.fromLattitude
    dictionary_main['longitude_from'] = this.props.navigation.state.params.quoteOrShipmentData.fromUserdata.fromLogitude

    dictionary_main['firstname_to'] = this.props.navigation.state.params.quoteOrShipmentData.toUserdata.ToFirstnameString
    dictionary_main['lastname_to'] = this.props.navigation.state.params.quoteOrShipmentData.toUserdata.ToLastnameString
    dictionary_main['address_to'] = this.props.navigation.state.params.quoteOrShipmentData.toUserdata.ToAddress1String
    dictionary_main['address2_to'] = this.props.navigation.state.params.quoteOrShipmentData.toUserdata.ToAddress2String
    dictionary_main['company_name_to'] = this.props.navigation.state.params.quoteOrShipmentData.toUserdata.ToCompanyString
    dictionary_main['country_to'] = this.props.navigation.state.params.quoteOrShipmentData.toUserdata.toSelectedCountryID
    dictionary_main['state_to'] = this.props.navigation.state.params.quoteOrShipmentData.toUserdata.toSelectedStateID
    dictionary_main['city_to'] = this.props.navigation.state.params.quoteOrShipmentData.toUserdata.toSelectedCityID
    dictionary_main['zip_to'] = this.props.navigation.state.params.quoteOrShipmentData.toUserdata.ToZipCodeString
    dictionary_main['email_to'] = this.props.navigation.state.params.quoteOrShipmentData.toUserdata.ToEmailString
    dictionary_main['telephone_to'] = this.props.navigation.state.params.quoteOrShipmentData.toUserdata.ToPhoneString
    dictionary_main['address_type_to'] = this.props.navigation.state.params.quoteOrShipmentData.toUserdata.ToAddressTypeString
    dictionary_main['latitude_to'] = this.props.navigation.state.params.quoteOrShipmentData.toUserdata.toLattitude
    dictionary_main['longitude_to'] = this.props.navigation.state.params.quoteOrShipmentData.toUserdata.toLogitude

if (this.state['documentSpeedRateID'] == undefined)
{
  Alert.alert(
    'Alert',
    'Please select shipping mode before you proceed to create a quotation.', // <- this part is optional, you can pass an empty string
    [
      {text: 'OK', onPress: () =>  {cancelable: false}},
      
    ],
    {cancelable: false},
  )
}
else
{
  if (this.state.chargesModeID == undefined || this.state.chargesModeID == -1)
{
  Alert.alert(
    'Alert',
    'Please select delivery mode before you proceed to create a quotation.', // <- this part is optional, you can pass an empty string
    [
      {text: 'OK', onPress: () =>  {cancelable: false}},
      
    ],
    {cancelable: false},
  )
}
else
{
  this.setState({progress:true})
  this.uploadQuotationDetailsToCloudApiCall(dictionary_main)

}

}
    

   
  //  console.log('dictionary_main=>', dictionary_main)
  }
  uploadQuotationDetailsToCloudApiCall = (dictionary_main) => {

    console.log('uploadQuotationDetailsToCloudApiCall called=>')

    var params = {}
    var url = ''
    
    
      url = UrlUtil.BASE_URL + 'api/creatQuoteRequest';
      params = dictionary_main
  
    
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
  
    
      let resultJSON = JSON.stringify(json)
      console.log("Result JSON is == ",resultJSON)
  
  
      if (json.status == 'success')
      {
        // user_id, quote_id, payment_mode, credit_outstanding_amount, subtotal, discount, ga_percentage, 
        // ga_tax_amt, ra_percentage, ra_tax_amt, grand_total
        this.setState({progress:false})
        Alert.alert(
          'Success',
          'Quotation request submitted successfully, PD Boy will contact you soon.', // <- this part is optional, you can pass an empty string
          [
            {text: 'OK', onPress: () => this.props.navigation.navigate('DashPage')},
           // {text: 'OK', onPress: () =>  {cancelable: false}},
            
          ],
          {cancelable: false},
        )
       
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
      this.setState({progress:false})
      alert('error = '+JSON.stringify(err));
    })
      
    }
  AddMoreAction() 
  {
    
    console.log('documentAddMoreIndex & packageAddMoreIndex  => ', this.state.documentsData1)
var documentsData1Length = this.state.documentsData1.length

    if (this.state.documentsData1[documentsData1Length-1].radioValuee == 0 && this.state['isDeleted'+String(documentsData1Length-1)] != 'deleted')
    {
      if (this.state['documentCategory'+String(documentsData1Length-1)] != undefined 
      && this.state['documentSubCategory'+String(documentsData1Length-1)] != undefined
      && this.state['documentItem'+String(documentsData1Length-1)] != undefined )
      {
        const newIds = this.state.documentsData1.slice() //copy the array
        newIds.push( {radioValuee : 0})
        this.setState({documentsData1: newIds})
      }
      else
      {
      alert('Please fill all the values for Document')
      }
    
    }
    

    if (this.state.documentsData1[documentsData1Length-1].radioValuee == 1 && this.state['isDeleted'+String(documentsData1Length-1)] != 'deleted')
    {
      if (this.state['packageCategory'+String(documentsData1Length-1)] != undefined 
   && this.state['packageSubCategory'+String(documentsData1Length-1)] != undefined
   && this.state['packageItem'+String(documentsData1Length-1)] != undefined 
   && this.state['packageDescribeShipment'+String(documentsData1Length-1)] != undefined 
   && this.state['packageReference'+String(documentsData1Length-1)] != undefined 
   && this.state['packageQuantity'+String(documentsData1Length-1)] != undefined 
   && this.state['packageLength'+String(documentsData1Length-1)] != undefined 
   && this.state['packageBreadth'+String(documentsData1Length-1)] != undefined 
   && this.state['packageHeight'+String(documentsData1Length-1)] != undefined 
   && this.state['packageWeight'+String(documentsData1Length-1)] != undefined)
   {
    const newIds = this.state.documentsData1.slice() //copy the array
    newIds.push( {radioValuee : 0})
    this.setState({documentsData1: newIds})
   }
      else
      {
      alert('Please fill all the values for Package')
      }
    }

if (this.state['isDeleted'+String(documentsData1Length-1)] == 'deleted')
{
  const newIds = this.state.documentsData1.slice() //copy the array
  newIds.push( {radioValuee : 0})
  this.setState({documentsData1: newIds})
}
    
    

     
     
for(let i = 0; i < this.state.documentsData1.length; i++)
{

  if (this.state['isDeleted'+String(documentsData1Length-1)] != 'deleted')
  {
    exstngItemIndxAftrdlte = exstngItemIndxAftrdlte + 1
  }
}
    

    

    
  }

    transportationApiCall = () => {
      
      var url = ''
      
        url = UrlUtil.BASE_URL + 'api/shipping_mode_list';
  
      
    const { navigate } = this.props.navigation;  
         
    
    fetch(url, {
        method: 'GET',
    
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      
       
    })
        .then((res) => res.json())
        .then((json) =>
    { 
    
      
        let resultJSON = JSON.stringify(json)
        console.log("Result JSON is == ",resultJSON)
    
    
        if (json.status == 'success')
        {
         // this.handleBackButtonClick()
    

        //  this.setState({shippingModeArray: json.shippingmodeList})

         var arr = [];
         for(let i = 0; i < json.shippingmodeList.length; i++)
    {
      var dictionary_main = {};
      dictionary_main['label'] = json.shippingmodeList[i].name
      dictionary_main['value'] = json.shippingmodeList[i].id
      arr.push(dictionary_main)
    }

    this.setState({shippingModeArray: arr})

         


    
        }
        else
        {

          

         
          
        }
    
    
    
      })
      .catch((err) => {

       

       
      })
        
      }
      deliveryModeFetchApi = () =>{
        console.log("hello deliveryModeFetchApi")

        var url = ''
        
          url = UrlUtil.BASE_URL + 'api/delivery_mode_list';
    
        
      const { navigate } = this.props.navigation;  
           
      
      fetch(url, {
          method: 'GET',
      
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        
         
      })
          .then((res) => res.json())
          .then((json) =>
      { 
      
        
          let resultJSON = JSON.stringify(json)
          console.log("Result JSON is == ",resultJSON)
      
      
          if (json.status == 'success')
          {
           // this.handleBackButtonClick()
      
           this.setState({deliveryModeArray: json.deliverymodeList})
      
          }
          else
          {
            
            
          }
      
      
      
        })
        .catch((err) => {
         
        })
          
        }
        rateFactorApiCall = () => {
      
          var url = ''
          
            url = UrlUtil.BASE_URL + 'api/rate_factor';
      
          
        const { navigate } = this.props.navigation;  
             
        
        fetch(url, {
            method: 'GET',
        
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          
           
        })
            .then((res) => res.json())
            .then((json) =>
        { 
        
          
            let resultJSON = JSON.stringify(json)
            console.log("Rate Factor Result JSON is == ",resultJSON)
        
        
            if (json.status == 'success')
            {
             
    
         this.setState({rateFactorValue: parseFloat(json.rateFactor[0].amount)})
    console.log('parseInt(json.rateFactor.amount , 10)', parseFloat(json.rateFactor[0].amount))
             
    
        
            }
            else
            {
    
              
              
            }
        
        
        
          })
          .catch((err) => {
    
        
    
            
          })
      }

      fetchAllProhibitedItemsApiCall = () => {
      
        var url = ''
    
          url = UrlUtil.BASE_URL + 'api/getProhibitedItems';
    
        
      const { navigate } = this.props.navigation;  
           
      
      fetch(url, {
          method: 'GET',
      
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        
         
      })
          .then((res) => res.json())
          .then((json) =>
      { 
      
        
          let resultJSON = JSON.stringify(json)
          console.log("fetchAllProhibitedItemsApiCall Result JSON is == ",resultJSON)
      
    
          if (json.status == 'success')
          {
           
  
       this.setState({prohibitedData1: json.respData})
  
           
  
      
          }
          else
          {
  
            
            
          }
      
      
      
        })
        .catch((err) => {
  
      
  
          
        })
    }
     
        
         
  renderHorizontalItem = ({ item, index }) => {
    
    console.log('item:', item)

    return ( 
  
  <View>

{ this.state['isDeleted'+String(index)] != 'deleted' && item.radioValuee == 0 && <View style={styles.itemRow1}>


   <View style={{marginLeft:7,marginTop:5, marginRight: 7, marginBottom: 20}}>
                <RadioForm
  radio_props={radio_props}
  style={{
    alignSelf:'center',
    backgroundColor: 'white'//'rgba(246, 244, 243, 1)'
}}
  initial={item.radioValuee}
  formHorizontal={true}
  buttonColor={'rgba(198, 35, 0, 1)'}
  selectedButtonColor={'rgba(198, 35, 0, 1)'}
       //   buttonOuterColor={'rgba(204, 32, 0, 1)'}
  
  labelStyle={{fontSize: 12, color: 'gray', marginRight:7}}
  onPress={(value) => {this.switchingBetweenDocumentsAndPackage(value, index)}}
/>
</View>  




<Text style={{fontSize:13,
        color:'black',
        marginLeft: 13,
        marginTop:14,}}>Document Category *</Text>

<TouchableOpacity onPress={() => this.selectDocumentOrPackageCategory('documentCategory'+String(index), index)}>
<View style={{flexDirection:'row', alignItems: 'center', justifyContent: 'center', height: 40,
      margin: 0,
      marginTop: 0}}>
            <View style={{flex:1, maxWidth: 414, backgroundColor: null, flexDirection:'row', justifyContent:'space-between'}}>
                <Text style={{paddingLeft:13,color: 'gray', fontSize: 12,}}>{this.state['documentCategory'+String(index)] ?? 'Select Document Category'}</Text>
                <View style={{width:15, height:15, justifyContent: 'flex-end', marginRight: 20, marginTop: 6}}>
                  <Image source={require("../Images/down_arrow.png")} style={{width:15, height:15,}} />
                </View>
                
              </View>
              </View>
              </TouchableOpacity>


              <View style={{marginLeft:13,marginTop:-4, backgroundColor: 'gray', marginRight: 13, height: 1, marginBottom: 7}}></View>

              <Text style={{fontSize:13,
        color:'black',
        marginLeft: 13,
        marginTop:14,}}>Document Sub Category *</Text>

<TouchableOpacity onPress={() => this.selectDocumentOrPackageCategory('documentSubCategory'+String(index), index)}>
<View style={{flexDirection:'row', alignItems: 'center', justifyContent: 'center', height: 40,
      margin: 0,
      marginTop: 0}}>
            <View style={{flex:1, maxWidth: 414, backgroundColor: null, flexDirection:'row', justifyContent:'space-between'}}>
                <Text style={{paddingLeft:13,color: 'gray', fontSize: 12,}}>{this.state['documentSubCategory'+String(index)] ?? 'Select Sub Category'}</Text>
                <View style={{width:15, height:15, justifyContent: 'flex-end', marginRight: 20, marginTop: 6}}>
                  <Image source={require("../Images/down_arrow.png")} style={{width:15, height:15,}} />
                </View>
                
              </View>
              </View>
              </TouchableOpacity>
              
              <View style={{marginLeft:13,marginTop:-4, backgroundColor: 'gray', marginRight: 13, height: 1, marginBottom: 7}}></View>

              <Text style={{fontSize:13,
        color:'black',
        marginLeft: 13,
        marginTop:14,}}>Document Item *</Text>

<TouchableOpacity onPress={() => this.selectDocumentOrPackageCategory('documentItem'+String(index), index)}>
<View style={{flexDirection:'row', alignItems: 'center', justifyContent: 'center', height: 40,
      margin: 0,
      marginTop: 0}}>
            <View style={{flex:1, maxWidth: 414, backgroundColor: null, flexDirection:'row', justifyContent:'space-between'}}>
                <Text style={{paddingLeft:13,color: 'gray', fontSize: 12,}}>{this.state['documentItem'+String(index)] ?? 'Select Item'}</Text>
                <View style={{width:15, height:15, justifyContent: 'flex-end', marginRight: 20, marginTop: 6}}>
                  <Image source={require("../Images/down_arrow.png")} style={{width:15, height:15,}} />
                </View>
                
              </View>
              </View>
              </TouchableOpacity>

              <View style={{marginLeft:13,marginTop:-4, backgroundColor: 'gray', marginRight: 13, height: 1, marginBottom: 7}}></View>

              <Text style={{fontSize:15,
        color:'grey',
        alignSelf:'flex-start',
        marginTop:20, marginLeft: 13}}>Value Of your Shipment</Text>

<View style={{flexDirection:'row', alignItems: 'center', justifyContent: 'center', marginBottom: 20}}>
            <View style={{flex:1, maxWidth: 414, backgroundColor: null, flexDirection:'row', justifyContent:'space-between'}}>

            <View style={{ width: null, justifyContent: 'flex-start', flexDirection: 'row', marginTop: 0, width: '50%'}}>

            <Text style={{fontSize:15,
        color:'grey',
        alignSelf:'flex-start',
        marginTop:20, marginLeft: 13,}}>$</Text>
              
              
              <TextInput style={{
    width: 100,
    marginLeft: 0,
    borderRadius: 0,
    marginRight: 13,
    marginLeft: 13,
    fontSize: 12,
    height: 40,
    color: 'gray',
    backgroundColor: 'rgba(246, 244, 243, 1)',
    marginTop: 12,
    padding: 8,
    }}
                placeholder={''}
                placeholderTextColor={'grey'}
                keyboardType = 'phone-pad'
      value =  {this.state['documentvalueOfShipment'+String(index)] ?? ''}
      onChangeText={(text) => this.setState({ ['documentvalueOfShipment'+String(index)]: text})}
                ></TextInput>

             </View>
            
             
            <View style={{ width: null, justifyContent: 'flex-end', flexDirection: 'row', marginRight: 13, marginTop: 15, width: '50%', marginLeft:1}}>
            <View style={styles.checboxkView}>
                                <CheckBox
                                    value={this.state['documentprotectShipment'+String(index)] ?? false}
                                    boxType = 'square'
                                    // onValueChange={()=>this.setSelection()}
                                    style={styles.checkbox}
                                    tintColors={{ true: 'red)', false: 'red' }}
                                    onFillColor={'white'}
                                    onTintColor={'red'}
                                    onCheckColor={'red'}
                                  //  onClick={() => this.onCheckClick()}
                                    onValueChange={(newValue) => this.onCheckClick(index)}
                                />
                                <Text style={{
        margin: 7,
        marginTop: 3,
        color: 'grey',
        fontSize: 11, marginBottom: 10
    }}>Protect shipment</Text>

                            </View>




              {/* <Text style={{ fontSize: 16, color: '#ac4175' }}>Protect your shipment</Text> */}
            </View>
            

            </View>
</View>

              
              <View style={{ alignSelf: 'flex-end', width: null, flexDirection: 'row', marginRight: 0, marginTop: 0, marginBottom: 10}}>
              <Text style={{
         marginTop: 6,
         color: 'red',
         fontSize: 14
     }}>Charges</Text>
     <Text style={{
       marginLeft: 3,
         marginTop: 6,
         color: 'grey',
         fontSize: 15,
         marginRight: 7,
     }}>$</Text>
     <TextInput style={{
     width: 100,
     marginLeft: 0,
     borderRadius: 0,
     marginRight: 13,
     fontSize: 14,
     height: 40,
     color: 'grey',
     backgroundColor: 'rgba(246, 244, 243, 1)',
     marginTop: 0,
     fontWeight: 'bold',
     padding: 5,
     }}
                 placeholder={''}
                 placeholderTextColor={'grey'}
                 autoCapitalize = 'words'
                 value =  {this.state['DocumentYourCharges'+String(index)] ?? '0.00'}
                 editable={false}
                 ></TextInput>
              </View> 

              <View style={{ alignSelf: 'flex-start', width: null, flexDirection: 'row', marginRight: 0, marginTop: 0, marginBottom: 10}}>
              <View style={{ alignSelf: 'flex-start', width: '50%'}}>
              
            </View>

            <View style={{  width: '50%'}}>
            { index != 0 &&
            <TouchableOpacity onPress ={() =>  Alert.alert(
                'Confirm',
                'This item will be deleted immediately. You can’t undo this action.', // <- this part is optional, you can pass an empty string
                [
                  {text: 'OK', onPress: () => this.deleteClicked(String(index))},
                  {text: 'Cancel', onPress: () => console.log('cancelled')},
                ],
                {cancelable: false},
              )}>
           
           <Text style={{ height: 40, alignSelf: 'flex-end', backgroundColor: 'red',
              marginRight: 13, textAlign: 'center', textAlignVertical: 'center',
            borderRadius:2,width: 100, color: 'white', fontWeight: 'bold',
            }}>DELETE</Text> 
            </TouchableOpacity> }
            </View>
             </View>

</View>
}
 
{ this.state['isDeleted'+String(index)] != 'deleted' && item.radioValuee == 1 && <View style={styles.itemRow1}>

  <View style={{marginLeft:7,marginTop:5, marginRight: 7, marginBottom: 20}}>
                <RadioForm
  radio_props={radio_props}
  style={{
    alignSelf:'center',
    backgroundColor: 'white'//'rgba(246, 244, 243, 1)'
}}
  initial={item.radioValuee}
  formHorizontal={true}
  buttonColor={'rgba(198, 35, 0, 1)'}
  selectedButtonColor={'rgba(198, 35, 0, 1)'}
       //   buttonOuterColor={'rgba(204, 32, 0, 1)'}
  
  labelStyle={{fontSize: 12, color: 'gray', marginRight:7}}
  onPress={(value) => {this.switchingBetweenDocumentsAndPackage(value, index)}}
/>
</View>

<Text style={{fontSize:15,
        color:'grey',
        marginLeft:13, fontWeight: 'bold',}}>List of Prohibited Items</Text>


<Text style={{fontSize:13,
        color:'black',
        marginLeft: 13,
        marginTop:14,}}>Package Category *</Text>

<TouchableOpacity onPress={() => this.selectDocumentOrPackageCategory('packageCategory'+String(index), index)}>
<View style={{flexDirection:'row', alignItems: 'center', justifyContent: 'center', height: 40,
      margin: 0,
      marginTop: 0}}>
            <View style={{flex:1, maxWidth: 414, backgroundColor: null, flexDirection:'row', justifyContent:'space-between'}}>
                <Text style={{paddingLeft:13,color: 'gray', fontSize: 12,}}>{this.state['packageCategory'+String(index)] ?? 'Select Package Category'}</Text>
                <View style={{width:15, height:15, justifyContent: 'flex-end', marginRight: 20, marginTop: 6}}>
                  <Image source={require("../Images/down_arrow.png")} style={{width:15, height:15,}} />
                </View>
                
              </View>
              </View>
              </TouchableOpacity>


              <View style={{marginLeft:13,marginTop:-4, backgroundColor: 'gray', marginRight: 13, height: 1, marginBottom: 7}}></View>

              <Text style={{fontSize:13,
        color:'black',
        marginLeft: 13,
        marginTop:14,}}>Package Sub Category *</Text>

<TouchableOpacity onPress={() => this.selectDocumentOrPackageCategory('packageSubCategory'+String(index), index)}>
<View style={{flexDirection:'row', alignItems: 'center', justifyContent: 'center', height: 40,
      margin: 0,
      marginTop: 0}}>
            <View style={{flex:1, maxWidth: 414, backgroundColor: null, flexDirection:'row', justifyContent:'space-between'}}>
                <Text style={{paddingLeft:13,color: 'gray', fontSize: 12,}}>{this.state['packageSubCategory'+String(index)] ?? 'Select Package Sub Category'}</Text>
                <View style={{width:15, height:15, justifyContent: 'flex-end', marginRight: 20, marginTop: 6}}>
                  <Image source={require("../Images/down_arrow.png")} style={{width:15, height:15,}} />
                </View>
                
              </View>
              </View>
              </TouchableOpacity>
              
              <View style={{marginLeft:13,marginTop:-4, backgroundColor: 'gray', marginRight: 13, height: 1, marginBottom: 7}}></View>
              
              <Text style={{fontSize:13,
        color:'black',
        marginLeft: 13,
        marginTop:14,}}>Package Item *</Text>

<TouchableOpacity onPress={() => this.selectDocumentOrPackageCategory('packageItem'+String(index), index)}>
<View style={{flexDirection:'row', alignItems: 'center', justifyContent: 'center', height: 40,
      margin: 0,
      marginTop: 0}}>
            <View style={{flex:1, maxWidth: 414, backgroundColor: null, flexDirection:'row', justifyContent:'space-between'}}>
                <Text style={{paddingLeft:13,color: 'gray', fontSize: 12,}}>{this.state['packageItem'+String(index)] ?? 'Select Package Item'}</Text>
                <View style={{width:15, height:15, justifyContent: 'flex-end', marginRight: 20, marginTop: 6}}>
                  <Image source={require("../Images/down_arrow.png")} style={{width:15, height:15,}} />
                </View>
                
              </View>
              </View>
              </TouchableOpacity>

              <View style={{marginLeft:13,marginTop:-4, backgroundColor: 'gray', marginRight: 13, height: 1, marginBottom: 7}}></View>

              <Text style={{fontSize:13,
        color:'black',
        marginLeft: 16,
        marginTop:14,}}>Shipment Description</Text>

              <TextInput style={styles.textInput}
                placeholder={'Describe your shipment.'}
                placeholderTextColor={'grey'}
                autoCapitalize = 'words'
                value =  {this.state['packageDescribeShipment'+String(index)] ?? ''}
                onChangeText={(text) => this.setState({ ['packageDescribeShipment'+String(index)]: text})}
                ></TextInput>

<View style={{marginLeft:13,marginTop:-4, backgroundColor: 'gray', marginRight: 13, height: 1, marginBottom: 7}}></View>

<Text style={{fontSize:13,
        color:'black',
        marginLeft: 16,
        marginTop:14,}}>Reference</Text>

<TextInput style={styles.textInput}
                placeholder={'Enter Reference'}
                placeholderTextColor={'grey'}
                autoCapitalize = 'words'
                value =  {this.state['packageReference'+String(index)] ?? ''}
                onChangeText={(text) => this.setState({ ['packageReference'+String(index)]: text})}
                ></TextInput>

<View style={{marginLeft:13,marginTop:-4, backgroundColor: 'gray', marginRight: 13, height: 1, marginBottom: 7}}></View>



<Text style={{fontSize:15,
        color:'grey',
        alignSelf:'flex-start',
        marginTop:20, marginLeft: 13}}>Value Of your Shipment</Text>

<View style={{flexDirection:'row', alignItems: 'center', justifyContent: 'center', marginBottom: 20}}>
            <View style={{flex:1, maxWidth: 414, backgroundColor: null, flexDirection:'row', justifyContent:'space-between'}}>

            <View style={{ width: null, justifyContent: 'flex-start', flexDirection: 'row', marginTop: 0, width: '50%'}}>

            <Text style={{fontSize:15,
        color:'grey',
        alignSelf:'flex-start',
        marginTop:20, marginLeft: 13,}}>$</Text>
              
              
              <TextInput style={{
    width: 100,
    marginLeft: 0,
    borderRadius: 0,
    marginRight: 13,
    marginLeft: 13,
    fontSize: 12,
    height: 40,
    color: 'gray',
    backgroundColor: 'rgba(246, 244, 243, 1)',
    marginTop: 12,
    padding: 8,
    }}
                placeholder={''}
                placeholderTextColor={'grey'}
                // autoCapitalize = 'words'
                keyboardType = 'phone-pad'
                value =  {this.state['packagevalueOfShipment'+String(index)] ?? ''}
                onChangeText={(text) => this.setState({ ['packagevalueOfShipment'+String(index)]: text})}
                ></TextInput>

             </View>

             
            <View style={{ width: null, justifyContent: 'flex-end', flexDirection: 'row', marginRight: 13, marginTop: 15, width: '50%', marginLeft: 1}}>
            <View style={styles.checboxkView}>
                                <CheckBox
                                    value={this.state['packageprotectShipment'+String(index)] ?? false}
                                    boxType = 'square'
                                    // onValueChange={()=>this.setSelection()}
                                    style={styles.checkbox}
                                    tintColors={{ true: 'red)', false: 'red' }}
                                    onFillColor={'white'}
                                    onTintColor={'red'}
                                    onCheckColor={'red'}
                                  //  onClick={() => this.onCheckClick()}
                                    onValueChange={(newValue) => this.onCheckClick(index)}
                                />
                                <Text style={{
        margin: 8,
        marginTop: 3,
        color: 'grey',
        fontSize: 11
    }}>Protect shipment</Text>

                            </View>
              {/* <Text style={{ fontSize: 16, color: '#ac4175' }}>Protect your shipment</Text> */}
            </View>
            

            </View>
</View>


<Text style={{fontSize:17,
        color:'grey',
        alignSelf:'flex-start',
        marginTop:10, marginLeft: 13, fontWeight: 'bold', marginBottom: 5}}>Quantity</Text>


<TextInput style={styles.textInput}
                placeholder={'Quantity'}
                placeholderTextColor={'grey'}
                autoCapitalize = 'words'
                keyboardType = 'decimal-pad'
                value =  {this.state['packageQuantity'+String(index)] ?? ''}
                onChangeText={(text) => this.TypingToQuantity(text, index)}
                // onChangeText={(text) => this.setState({ ['packageQuantity'+String(index)]: text})}
                ></TextInput>

<View style={{marginLeft:13,marginTop:-4, backgroundColor: 'gray', marginRight: 13, height: 1, marginBottom: 15}}></View>

            <Text style={{fontSize:15,
        color:'grey',
        alignSelf:'flex-start',
        marginTop:0, marginLeft: 13, fontWeight: 'bold', marginBottom: 10}}>Dimensions</Text>

<View style={{flexDirection:'row', alignItems: 'center', justifyContent: 'center', marginBottom: 20}}>
            <View style={{flex:1, maxWidth: 414, backgroundColor: null, flexDirection:'row', justifyContent:'space-between'}}>

            <View style={{ width: null, justifyContent: 'flex-start', marginTop: 0, width: '50%', flexDirection:'row',}}>
            <View style={{width: '60%',}}>

            <TextInput style={{marginLeft:13, color: 'grey', height: 1, marginBottom: 5,  fontSize: 12,
    height: 40, marginRight: 2}}
                placeholder={'Length'}
                placeholderTextColor={'grey'}
                keyboardType = 'phone-pad'
                value =  {this.state['packageLength'+String(index)] ?? ''}
               // onChangeText={(text) => this.setState({ ['packageLength'+String(index)]: text})}
                onChangeText={(text) => this.TypingToLength(text, index)}
                ></TextInput>


<View style={{marginLeft:13,marginTop:-10, backgroundColor: 'gray', height: 1, marginRight: 2}}></View>


            </View>

            <View style={{width: '40%',}}>
            <TouchableOpacity>
<View style={{flexDirection:'row', alignItems: 'center', justifyContent: 'center', height: 40,
      margin: 0,
      marginTop: 0, }}>
            {/* <View style={{flex:1, maxWidth: 414, backgroundColor: null, flexDirection:'row', justifyContent:'space-between'}}> */}
                <Text style={{alignSelf: 'center',color: 'gray', fontSize: 12, marginBottom: 3, marginTop: 2}}>{this.state['lengthType'+String(index)] ?? 'cm'}</Text>
                {/* <View style={{width:15, height:15, justifyContent: 'flex-end', marginRight: 4, marginTop: 6}}>
                  <Image source={require("../Images/down_arrow.png")} style={{width:15, height:15,}} />
                </View> */}
                
              {/* </View> */}
              </View>
              </TouchableOpacity>
              <View style={{marginLeft:2,marginTop:-5, backgroundColor: 'gray', height: 1, marginRight: 2}}></View>
              </View>
            </View>
            <View style={{ width: null, justifyContent: 'flex-end', marginRight: 13, marginTop: 0, width: '50%', flexDirection:'row'}}>
            <View style={{width: '60%',}}>

<TextInput style={{marginLeft:10, color: 'grey', height: 1, marginBottom: 5,  fontSize: 12,
height: 40, marginRight: 2}}
    placeholder={'Breadth'}
    placeholderTextColor={'grey'}
    keyboardType = 'phone-pad'
    value =  {this.state['packageBreadth'+String(index)] ?? ''}
    // onChangeText={(text) => this.setState({ ['packageBreadth'+String(index)]: text})}
    onChangeText={(text) => this.TypingToBreadth(text, index)}
    ></TextInput>


<View style={{marginLeft:10,marginTop:-10, backgroundColor: 'gray', height: 1, marginRight: 2}}></View>


</View>

<View style={{width: '40%',}}>
<TouchableOpacity>
<View style={{flexDirection:'row', alignItems: 'center', justifyContent: 'center', height: 40,
margin: 0,
marginTop: 0}}>
{/* <View style={{flex:1, maxWidth: 414, backgroundColor: null, flexDirection:'row', justifyContent:'space-between'}}> */}
    <Text style={{paddingLeft:6,color: 'gray', fontSize: 12, marginBottom: 3, marginTop: 2}}>{this.state['breadthType'+String(index)] ?? 'cm'}</Text>
    {/* <View style={{width:15, height:15, justifyContent: 'flex-end', marginRight: 4, marginTop: 6}}>
      <Image source={require("../Images/down_arrow.png")} style={{width:15, height:15,}} />
    </View> */}
    
  {/* </View> */}
  </View>
  </TouchableOpacity>
  <View style={{marginLeft:2,marginTop:-5, backgroundColor: 'gray', height: 1, marginRight: 2}}></View>
  </View>
            </View>
            </View>
            </View>
            

            <View style={{flexDirection:'row', alignItems: 'center', justifyContent: 'center', marginBottom: 20}}>
            <View style={{flex:1, maxWidth: 414, backgroundColor: null, flexDirection:'row', justifyContent:'space-between'}}>

            <View style={{ width: null, justifyContent: 'flex-start', marginTop: 0, width: '50%', flexDirection:'row',}}>
            <View style={{width: '60%',}}>

            <TextInput style={{marginLeft:13, color: 'grey', height: 1, marginBottom: 5,  fontSize: 12,
    height: 40, marginRight: 2}}
                placeholder={'Height'}
                placeholderTextColor={'grey'}
                keyboardType = 'phone-pad'
                onChangeText={(text) => this.TypingToHeight(text, index)}
                value =  {this.state['packageHeight'+String(index)] ?? ''}
                // onChangeText={(text) => this.setState({ ['packageHeight'+String(index)]: text})}
                ></TextInput>


<View style={{marginLeft:13,marginTop:-10, backgroundColor: 'gray', height: 1, marginRight: 2}}></View>


            </View>

            <View style={{width: '40%',}}>
            <TouchableOpacity >
<View style={{flexDirection:'row', alignItems: 'center', justifyContent: 'center', height: 40,
      margin: 0,
      marginTop: 0}}>
            {/* <View style={{flex:1, maxWidth: 414, backgroundColor: null, flexDirection:'row', justifyContent:'space-between'}}> */}
                <Text style={{paddingLeft:6,color: 'gray', fontSize: 12, marginBottom: 3, marginTop: 2}}>{this.state['heightType'+String(index)] ?? 'cm'}</Text>
                {/* <View style={{width:15, height:15, justifyContent: 'flex-end', marginRight: 4, marginTop: 6}}>
                  <Image source={require("../Images/down_arrow.png")} style={{width:15, height:15,}} />
                </View> */}
                
              {/* </View> */}
              </View>
              </TouchableOpacity>
              <View style={{marginLeft:2,marginTop:-5, backgroundColor: 'gray', height: 1, marginRight: 2}}></View>
              </View>
            </View>
            <View style={{ width: null, justifyContent: 'flex-end', marginRight: 13, marginTop: 0, width: '50%', flexDirection:'row'}}>
            <View style={{width: '60%',}}>

<TextInput style={{marginLeft:10, color: 'grey', height: 1, marginBottom: 5,  fontSize: 12,
height: 40, marginRight: 2}}
    placeholder={'Weight'}
    placeholderTextColor={'grey'}
    keyboardType = 'phone-pad'
    value =  {this.state['packageWeight'+String(index)] ?? ''}
    onChangeText={(text) => this.setState({ ['packageWeight'+String(index)]: text})}
    ></TextInput>


<View style={{marginLeft:10,marginTop:-10, backgroundColor: 'gray', height: 1, marginRight: 2}}></View>


</View>

<View style={{width: '40%',}}>
<TouchableOpacity onPress={() => this.CallToShowDropDownComboForDimension('Weight'+String(index), index)}>
<View style={{flexDirection:'row', alignItems: 'center', justifyContent: 'center', height: 40,
margin: 0,
marginTop: 0, alignSelf: 'flex-end',}}>
<View style={{flex:1, maxWidth: 414, backgroundColor: null, flexDirection:'row', justifyContent:'space-between'}}>
    <Text style={{paddingLeft:6,color: 'gray', fontSize: 12, marginBottom: 3, marginTop: 2}}>{this.state['WeightType'+String(index)] ?? 'kg'}</Text>
    <View style={{width:15, height:15, justifyContent: 'flex-end', marginRight: 4, marginTop: 6}}>
      <Image source={require("../Images/down_arrow.png")} style={{width:15, height:15,}} />
    </View>
    
  </View>
  </View>
  </TouchableOpacity>
  <View style={{marginLeft:2,marginTop:-5, backgroundColor: 'gray', height: 1, marginRight: 2}}></View>
  </View>
            </View>
            </View>
            </View>

            

            <View style={{ alignSelf: 'flex-end', width: null, flexDirection: 'row', marginRight: 0, marginTop: 5, marginBottom: 10}}>
             <Text style={{
        marginTop: 6,
        color: 'red',
        fontSize: 14
    }}>Charges</Text>
    <Text style={{
      marginLeft: 3,
        marginTop: 6,
        color: 'grey',
        fontSize: 15,
        marginRight: 7,
    }}>$</Text>
    <TextInput style={{
    width: 120,
    marginLeft: 0,
    borderRadius: 0,
    marginRight: 13,
    fontSize: 14,
    height: 40,
    color: 'grey',
    backgroundColor: 'rgba(246, 244, 243, 1)',
    marginTop: 0,
    fontWeight: 'bold',
    paddingLeft: 4,
    }}
                placeholder={''}
                placeholderTextColor={'grey'}
                autoCapitalize = 'words'
                value =  {this.state['DocumentYourCharges'+String(index)] ?? '0.00'}
                editable={false}
                ></TextInput>
             </View>  

             <View style={{ alignSelf: 'flex-start', width: null, flexDirection: 'row', marginRight: 0, marginTop: 0, marginBottom: 10}}>
              <View style={{ alignSelf: 'flex-start', width: '50%'}}>
             
            </View>

            <View style={{  width: '50%'}}>
            { index != 0 &&
            <TouchableOpacity onPress ={() =>  Alert.alert(
                'Confirm',
                'This item will be deleted immediately. You can’t undo this action.', // <- this part is optional, you can pass an empty string
                [
                  {text: 'OK', onPress: () => this.deleteClicked(String(index))},
                  {text: 'Cancel', onPress: () => console.log('cancelled')},
                ],
                {cancelable: false},
              )}>
           
           <Text style={{ height: 40, alignSelf: 'flex-end', backgroundColor: 'red',
              marginRight: 13, textAlign: 'center', textAlignVertical: 'center',
            borderRadius:2,width: 100, color: 'white', fontWeight: 'bold', paddingTop: 11
            }}>DELETE</Text> 
            </TouchableOpacity> }
            </View>
             </View>
           
</View>   }
    </View>
     )}
     deleteClicked = (index) => {
      this.setState({ ['isDeleted'+String(index)]: 'deleted'})
      this.refs.radioForm.updateIsActiveIndex(-1)
      this.setState({ DocumentYourCharges: String(0.00) }) 
    

  }

     onCheckClick = (index) => {

     if (this.state.documentsData1[index].radioValuee == 0) {
      console.log('documentprotectShipment ==> ', this.state['documentprotectShipment'+String(index)])
      this.setState({ ['documentprotectShipment'+String(index)]: !this.state['documentprotectShipment'+String(index)]})
     }
     else
     {
      console.log('packageprotectShipment ==> ', this.state['packageprotectShipment'+String(index)])
      this.setState({ ['packageprotectShipment'+String(index)]: !this.state['packageprotectShipment'+String(index)]})
     }
  }
  TypingToQuantity(text, index)
  {
    this.refs.radioForm.updateIsActiveIndex(-1)
  for(let i = 0; i < this.state.documentsData1.length; i++)
    {
  
      this.setState({ ['packageQuantity'+String(index)]: text, DocumentYourCharges: String(0.00), 
      DeliveryModeSelectedValue: String(0.00), ['DocumentYourCharges'+String(i)]: String(0.00)
      })
      

    }
  }
  TypingToLength(text, index)
  {

    

    this.refs.radioForm.updateIsActiveIndex(-1)
  for(let i = 0; i < this.state.documentsData1.length; i++)
    {
  
      this.setState({ ['packageLength'+String(index)]: text, DocumentYourCharges: String(0.00), 
      DeliveryModeSelectedValue: String(0.00), ['DocumentYourCharges'+String(i)]: String(0.00)
      })
      

    }
  }
  TypingToBreadth(text, index)
  {

    this.refs.radioForm.updateIsActiveIndex(-1)
  for(let i = 0; i < this.state.documentsData1.length; i++)
    {
  
      this.setState({ ['packageBreadth'+String(index)]: text, DocumentYourCharges: String(0.00), 
      DeliveryModeSelectedValue: String(0.00), ['DocumentYourCharges'+String(i)]: String(0.00)
      })
      

    }
  }
  TypingToHeight(text, index)
  {
    this.refs.radioForm.updateIsActiveIndex(-1)
  for(let i = 0; i < this.state.documentsData1.length; i++)
    {
  
      this.setState({ ['packageHeight'+String(index)]: text, DocumentYourCharges: String(0.00), 
      DeliveryModeSelectedValue: String(0.00), ['DocumentYourCharges'+String(i)]: String(0.00)
      })
      

    }
  }
handleBackButtonClick() {
  console.log("hello")

  this.props.navigation.goBack(null);
  return true;
}
selectShipmentCategory(selectedFlag, index) 
{


  if (selectedFlag.includes("documentSpeedRate"))
    {
      this.setState({ data: this.state.deliveryModeArray, seachableModalVisible2: true,
         selectedFlagForCombo: selectedFlag, selectedindex: String(index)})
    }
    else  if (selectedFlag.includes("packageSpeedRate"))
    {
      this.setState({ data: this.state.deliveryModeArray, seachableModalVisible2: true,
        selectedFlagForCombo: selectedFlag, selectedindex: String(index)})
    }
    else
    {
  
    }

  // var documentsData1Length = this.state.documentsData1.length
  // if (this.state.documentsData1[documentsData1Length-1].radioValuee == 0)
  //   {
  //     if (this.state['documentCategory'+String(documentsData1Length-1)] != undefined 
  //     && this.state['documentSubCategory'+String(documentsData1Length-1)] != undefined
  //     && this.state['documentItem'+String(documentsData1Length-1)] != undefined 
  //     && this.state['documentvalueOfShipment'+String(documentsData1Length-1)] != undefined)
  //     {
  //       if (selectedFlag.includes("documentSpeedRate"))
  // {
  //   this.setState({ data: this.state.deliveryModeArray, seachableModalVisible2: true,
  //      selectedFlagForCombo: selectedFlag, selectedindex: String(index)})
  // }
  // else  if (selectedFlag.includes("packageSpeedRate"))
  // {
  //   this.setState({ data: this.state.deliveryModeArray, seachableModalVisible2: true,
  //     selectedFlagForCombo: selectedFlag, selectedindex: String(index)})
  // }
  // else
  // {

  // }
  //     }
  //     else
  //     {
  //     alert('Please fill all the values for Document')
  //     }
  //   }

  //   if (this.state.documentsData1[documentsData1Length-1].radioValuee == 1)
  //   {
  //     if (this.state['packageCategory'+String(documentsData1Length-1)] != undefined 
  //  && this.state['packageSubCategory'+String(documentsData1Length-1)] != undefined
  //  && this.state['packageItem'+String(documentsData1Length-1)] != undefined 
  //  && this.state['packageDescribeShipment'+String(documentsData1Length-1)] != undefined 
  //  && this.state['packageReference'+String(documentsData1Length-1)] != undefined 
  //  && this.state['packagevalueOfShipment'+String(documentsData1Length-1)] != undefined 
  //  && this.state['packageQuantity'+String(documentsData1Length-1)] != undefined 
  //  && this.state['packageLength'+String(documentsData1Length-1)] != undefined 
  //  && this.state['packageBreadth'+String(documentsData1Length-1)] != undefined 
  //  && this.state['packageHeight'+String(documentsData1Length-1)] != undefined 
  //  && this.state['packageWeight'+String(documentsData1Length-1)] != undefined)
  //  {
    
  //  }
  //     else
  //     {
  //     alert('Please fill all the values for Package')
  //     }
  //   }


  
}
fetchPriceList = (shipping_modeID, index, item_cat_name) => {

console.log('shipping_modeID, index, item_cat_name', shipping_modeID, index, item_cat_name)

this.setState({progress:true})


// ship_cat_id:2
// ship_subcat_id:4
// ship_sub_subcat_id:6
// rate_type:L
// location_from:41
// location_to:10
// delivery_mode_id:1
// ship_mode_id:1
        
  var params = {}

  if (item_cat_name == 'document') {
  params = 
  {
 
    ship_cat_id: '1',
    delivery_mode_id: this.state['documentSpeedRateID'],
    ship_subcat_id: this.state['documentCategory'+index+'ID'],
    ship_sub_subcat_id: this.state['documentSubCategory'+index+'ID'],
    rate_type: 'L',
    location_from: this.props.navigation.state.params.quoteOrShipmentData.fromUserdata.fromSelectedStateID,
    location_to: this.props.navigation.state.params.quoteOrShipmentData.toUserdata.toSelectedStateID,
    ship_mode_id: shipping_modeID,
  
  }

}
else
{
  params = 
  {
  ship_cat_id: '2',
  delivery_mode_id: this.state['documentSpeedRateID'],
  ship_subcat_id: this.state['packageCategory'+index+'ID'],
  ship_sub_subcat_id: this.state['packageSubCategory'+index+'ID'],
  rate_type: 'L',
  location_from: this.props.navigation.state.params.quoteOrShipmentData.fromUserdata.fromSelectedStateID,
  location_to: this.props.navigation.state.params.quoteOrShipmentData.toUserdata.toSelectedStateID,
  ship_mode_id: shipping_modeID,
  }
}
  // ship_cat_id (document/package id), delivery_mode_id (normal/express etc), 
  // ship_subcat_id, ship_sub_subcat_id, rate_type (L), location_from (id), location_to (id)
  
const { navigate } = this.props.navigation;

  const url = UrlUtil.BASE_URL + 'api/ratelist_by_catsubcat';

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

  // this.loadingButton1.showLoading(false);
    let resultJSON = JSON.stringify(json)
    console.log("Result JSON for fetch price rate is == ",resultJSON)


    if (json.status == 'success')
    {

     
      this.setState({
        // priceList:json.rateList
        ['priceList'+index]: json.rateList
    })

    this.setState({chargesModeID: shipping_modeID, insuranceRate: json.rateList[0].insurance, 
      ['InsauranceString'+String(index)]: String(Math.round((parseFloat(json.rateList[0].insurance)) * 100) / 100)})


    if (item_cat_name == 'document') {
      totalPrice1 = totalPrice1 + parseFloat(json.rateList[0].rate)
      this.setState({['DocumentYourCharges'+String(index)]: String(Math.round((parseFloat(json.rateList[0].rate)) * 100) / 100)})
      
    }
    else
    {

      if ( this.state['packageLength'+String(index)] != undefined && this.state['packageBreadth'+String(index)] != undefined
      && this.state['packageHeight'+String(index)] != undefined && this.state['packageQuantity'+String(index)] != undefined)
      {
      var lengthVal = parseInt(this.state['packageLength'+String(index)] , 10)
      var breathVal = parseInt(this.state['packageBreadth'+String(index)] , 10)
      var heightVal = parseInt(this.state['packageHeight'+String(index)] , 10)
      var Quantityval = parseInt(this.state['packageQuantity'+String(index)] , 10)
      // totalPrice1 = totalPrice1 + Quantityval*((lengthVal * breathVal * heightVal)/500 * this.state.rateFactorValue +
      // + (parseInt(json.rateList[0].rate , 10) + parseInt(json.rateList[0].insurance , 10)))

      totalPrice1 = totalPrice1 + Quantityval*((lengthVal * breathVal * heightVal)/5000 * this.state.rateFactorValue +
      + (parseFloat(json.rateList[0].rate)))


      this.setState({['DocumentYourCharges'+String(index)]: String(Math.round(Quantityval*((lengthVal * breathVal * heightVal)/5000 * this.state.rateFactorValue+ (parseFloat(json.rateList[0].rate))) * 100) / 100)})
      }
      else
      {
        this.setState({['DocumentYourCharges'+String(index)]:  String(0)})
      }
    //   totalPrice1 = totalPrice1 + (parseInt(json.rateList[0].rate , 10) + parseInt(json.rateList[0].insurance , 10))*2
     }
    
     
    this.setState({ DocumentYourCharges: String(Math.round(totalPrice1 * 100) / 100), DeliveryModeSelectedValue: String(Math.round(totalPrice1 * 100) / 100), 
      })
      
console.log('totalPrice1=>',totalPrice1)

this.setState({progress:false}) 

      
    }
    else
    { 

      this.setState({progress:false})
    
      totalPrice1 = totalPrice1 + 0
      this.setState({['DocumentYourCharges'+String(index)]: String(0), ['InsauranceString'+String(index)]: String(0)})
    
    this.setState({ DocumentYourCharges: String(Math.round(totalPrice1 * 100) / 100), DeliveryModeSelectedValue: String(Math.round(totalPrice1 * 100) / 100), 
      })
      
console.log('totalPrice1=>',totalPrice1)

this.setState({progress:false}) 

      this.setState({['DocumentYourCharges'+String(index)]: String(0), chargesModeID: 0})
    //  alert(item_cat_name+json.message)
    }


  })
  .catch((err) => {
    this.setState({progress:false})
    Alert.alert(
      'Error',
      'Please check your network connection, and create order again', // <- this part is optional, you can pass an empty string
      [
        {text: 'OK', onPress: () => this.setState({progress:false})},
      ],
      {cancelable: false},
    );
  }) 
  }
renderSearchableData2 = ({ item, index }) => {
  console.log('renderSearchableData ==> ', item)
  return (
    <View>
      <TouchableOpacity onPress={() => this.selectItemOnDropDown2(item, index)}>
      <Text style={{ padding: 10, color: 'white' }}>{item.name} </Text>
      </TouchableOpacity>
    </View>
  );
 }
selectItemOnDropDown2 = (item, index) => 
{

//  console.log('selectItemOnDropDown ==> ', this.state.selectedindex)

  this.setState({ seachableModalVisible2: false})
  
  this.setState({['documentSpeedRate']: item.name, ['documentSpeedRateID']: item.id})
 
  for(let i = 0; i < this.state.documentsData1.length; i++)
    {
  
      this.setState({ DocumentYourCharges: String(0.00), DeliveryModeSelectedValue: String(0.00), ['DocumentYourCharges'+String(i)]: String(0.00)
      })
    

    }
  
    this.refs.radioForm.updateIsActiveIndex(-1)

  // for(let i = 0; i < this.state.documentsData1.length; i++)
  // {

  //   if (this.state.documentsData1[i].radioValuee == 0)
  //     {
  //   this.fetchPriceList(item.id, i, 'document')
  //     }
  //     else
  //     {
  //       this.fetchPriceList(item.id, i, 'package')
  //     }
  // }
  
      
}

selectDocumentOrPackageCategory(selectedFlag, index) 
    {
    //   this.setState({
    //     progress:true
    // })

    const { navigate } = this.props.navigation;


console.log('selectedFlag => ', selectedFlag, this.state['item_cat_id'+String(index)])

      var params = {}
      var subURL = ''
      // documentCategory documentSubCategory documentItem packageCategory packageSubCategory packageItem
    
      if (this.state.documentsData1[index].radioValuee== 0) {


        if (selectedFlag.includes("documentCategory"))
           {
            subURL = 'api/item_cat_list_by_shipping_cat',
            params = 
            {
              
              type: '1',
            
            }

            navigate('categorySubcatPickerPage',{onSelect: this.onSelect, selectedFlagForCombo: selectedFlag,
              navigationFlag1: 'categoryPicker', type: '1', flagtoShow: 'docCat', index: index})

           }
           else if (selectedFlag.includes("documentSubCategory"))
           {
            subURL = 'api/item_subcat_list_by_shipping_cat_itemcat',
            params = 
            {
          
              type: '1',
              item_cat_id: this.state['item_cat_id'+String(index)]
            
            }
            navigate('categorySubcatPickerPage',{ onSelect: this.onSelect, index: index, selectedFlagForCombo: selectedFlag,
              navigationFlag1: 'categoryPicker', type: '1', item_cat_id: this.state['item_cat_id'+String(index)], flagtoShow: 'docSubCat'})

           }
           else if (selectedFlag.includes("documentItem"))
           {
            subURL = 'api/item_list_by_cat_type',
            params = 
            {
          
              type: '1',
              item_cat_id: this.state['item_cat_id'+String(index)]
            
            }
            navigate('categorySubcatPickerPage',{onSelect: this.onSelect,index: index, selectedFlagForCombo: selectedFlag,
              navigationFlag1: 'categoryPicker', type: '1', item_cat_id: this.state['item_cat_id'+String(index)], flagtoShow: 'docItem'})
           }
           else
           {
             return
           }
     
    }
    else
    {
  
      if (selectedFlag.includes("packageCategory"))
      {
        subURL = 'api/item_cat_list_by_shipping_cat',
       params = 
       {
     
         type: '2',
       
       }

       navigate('categorySubcatPickerPage',{onSelect: this.onSelect,index: index, selectedFlagForCombo: selectedFlag,
        navigationFlag1: 'categoryPicker', type: '2', flagtoShow: 'packCat'})

      }
      else if (selectedFlag.includes("packageSubCategory"))
      {
        subURL = 'api/item_subcat_list_by_shipping_cat_itemcat',
        params = 
        {
      
          type: '2',
          item_cat_id: this.state['item_cat_id'+String(index)]
        
        }

        navigate('categorySubcatPickerPage',{onSelect: this.onSelect,index: index, selectedFlagForCombo: selectedFlag,
          navigationFlag1: 'categoryPicker', type: '2', item_cat_id: this.state['item_cat_id'+String(index)], flagtoShow: 'packSubCat'})

      }
      else if (selectedFlag.includes("packageItem"))
      {
        subURL = 'api/item_list_by_cat_type',
        params = 
        {
      
          type: '2',
          item_cat_id: this.state['item_cat_id'+String(index)]
        
        }

        navigate('categorySubcatPickerPage',{onSelect: this.onSelect,index: index, selectedFlagForCombo: selectedFlag,
          navigationFlag1: 'categoryPicker', type: '2', item_cat_id: this.state['item_cat_id'+String(index)], flagtoShow: 'packItem'})

      }
      else
           {
             return
           }
    }
      
    // const { navigate } = this.props.navigation;
    
    //  //const url = UrlUtil.BASE_URL + 'api/item_cat_list_by_shipping_cat';
    //  const url = UrlUtil.BASE_URL + subURL;
    
    // console.log('Custom sign in param dic => ', params, url);
    
    // var formData = new FormData();
    
    // for (var k in params) {
    //   formData.append(k, params[k]);
    // }
         
    
    // fetch(url, {
    //     method: 'POST',
    
    //     headers: {
    //       'Content-Type': 'multipart/form-data',
    //     },
      
    //   body: formData
       
    // })
    //     .then((res) => res.json())
    //     .then((json) =>
    // { 
    
    //     let resultJSON = JSON.stringify(json)
    //     console.log("Result JSON is == ",resultJSON)
    
    
    //     if (json.status == 'success')
    //     {
    //       this.setState({
    //         progress:false
    //     })

       


    //       if (selectedFlag.includes("documentCategory") || selectedFlag.includes("packageCategory"))
    //          {
    //           this.setState({ data: json.ItemCatList, seachableModalVisible: true, selectedFlagForCombo: selectedFlag, selectedindex: String(index)})
    //          }
    //          else if (selectedFlag.includes("documentSubCategory") || selectedFlag.includes("packageSubCategory"))
    //          {
    //           this.setState({ data: json.ItemSubCatList, seachableModalVisible: true, selectedFlagForCombo: selectedFlag, selectedindex: String(index)})
    //          }
    //          else if (selectedFlag.includes("documentItem") || selectedFlag.includes("packageItem"))
    //          {
    //           this.setState({ data: json.ItemList, seachableModalVisible: true, selectedFlagForCombo: selectedFlag, selectedindex: String(index)})
    //          }
    //          else
    //          {
    //            return
    //          }
       
     
         
    
          
    //     }
    //     else
    //     {
    //        this.setState({
    //       progress:false
    //   })
    //       alert(json.message)
    //     }
    
    
    //   })
    //   .catch((err) => {
    //     this.setState({
    //       progress:false
    //   })
    //     Alert.alert(
    //       'Error',
    //       'Please check your network connection', // <- this part is optional, you can pass an empty string
    //       [
    //         {text: 'OK', onPress: () => this.setState({progress:false})},
    //       ],
    //       {cancelable: false},
    //     );
    //   })

    }

switchingBetweenDocumentsAndPackage(value, index) 
  {
    console.log('switchingBetweenDocumentsAndPackage: ', value, index)
    // this.setState({radioValue: value})

    if (value == 0)
    {
      // const newIds = []
      // for(let i = 0; i < this.state.documentAddMoreIndex; i++)
      // {
      //   newIds.push( {airlineTicket: '',})
      // }
      // this.setState({documentsData1: newIds})

     

      const newIds = this.state.documentsData1.slice() //copy the array
      newIds[index] =  {radioValuee : value}//execute the manipulations
      this.setState({documentsData1: newIds})

    }
    else
    {
      // const newIds = []
      // for(let i = 0; i < this.state.packageAddMoreIndex; i++)
      // {
      //   newIds.push( {airlineTicket: '',})
      // }
      // this.setState({documentsData1: newIds})

      const newIds = this.state.documentsData1.slice() //copy the array
      newIds[index] =  {radioValuee : value}//execute the manipulations
      this.setState({documentsData1: newIds})
    }

    

  }
  switchingBetweenHaveDetailsOfItem(value) 
  {
    console.log('switchingBetweenHaveDetailsOfItem: ', value)
    this.setState({radioValueHaveDetails: value})
    this.refs.radioForm.updateIsActiveIndex(-1)

  }
  switchingBetweenProhibitedDocOrPackage(value, index) 
  {
    if (value == 0)
    {
      this.setState({prohibitedData: this.state.prohibitedData1['prohibited_document']})
    }
    else
    {
      this.setState({prohibitedData: this.state.prohibitedData1['prohibited_parcel']})
    }
  }
  switchingBetweenSpeedRate(value, index) 
  {

console.log('switchingBetweenSpeedRate',value, index) 


// if (this.state['documentSpeedRateID'] != undefined)
// {

if (this.state.radioValueHaveDetails == 1)
{
  this.setState({chargesModeID: value})
}
else
{
  if (value != undefined)
  {
    totalPrice1 = 0
    
    for(let i = 0; i < this.state.documentsData1.length; i++)
    {
  
        if (this.state.documentsData1[i].radioValuee == 0 && this.state['isDeleted'+String(i)] != 'deleted')
        {
      this.fetchPriceList(value, i, 'document')
        }
        else if (this.state.documentsData1[i].radioValuee == 1 && this.state['isDeleted'+String(i)] != 'deleted')
        {
          this.fetchPriceList(value, i, 'package')
        }
        else
        {

        }
    }
  }
}



// }
// else
// {
//   // this.refs.radioForm.updateIsActiveIndex(-1)
//   Alert.alert(
//     'Alert',
//     'Please Select Shipping Mode before choosing Delivery mode', // <- this part is optional, you can pass an empty string
//     [
//       {text: 'OK', onPress: () => this.setState({progress:false})},
//     ],
//     {cancelable: false},
//   );
// }



//     var totalPrice1 = 0

//     for(let i = 0; i < this.state.documentsData1.length; i++)
//     {

//       for(let j = 0; j < this.state['priceList'+String(i)].length; j++)
//       {
//         if (String(value) == this.state['priceList'+String(i)][j].ship_mode_id)
//         {
//           totalPrice1 = totalPrice1 + parseInt(this.state['priceList'+String(i)][j].rate , 10) + parseInt(this.state['priceList'+String(i)][j].insurance , 10)
//           this.setState({ ['DocumentYourCharges'+String(i)]: this.state['priceList'+String(i)][j].rate})
          

//         }
//         // else
//         // {
//         //   this.setState({ ['DocumentYourCharges'+String(i)]: '0.00'})
//         // }
//       }

     
//     }
    
//     this.setState({ DocumentYourCharges: String(totalPrice1), DeliveryModeSelectedValue: String(value)})
// console.log('totalPrice1=>',totalPrice1)


    

  }

  
    switchingBetweenHomeAndBusinessAddress(value) 
    {
      console.log('switchingBetweenHomeAndBusinessAddress: ', value)
      this.setState({FromAddressTypeString: value})
    }
  
    CallToShowDropDownCombo(selectedFlag) 
    {
  
    
    }
      
    CallToShowDropDownComboForDimension(selectedFlag, index) 
    {
      if (selectedFlag.includes("Length"))
      {
        selectedComboFlagForDimension = 'Length'
        this.setState({ data1: lengthDimensionArr, seachableModalVisible1: true, selectedIndexForDimension: String(index)})
        
      }
      
       if  (selectedFlag.includes("Breadth"))
      {
        selectedComboFlagForDimension = 'Breadth'
        this.setState({ data1: lengthDimensionArr, seachableModalVisible1: true, selectedIndexForDimension: String(index)})
  
      }

      if  (selectedFlag.includes("Height"))
      {
        selectedComboFlagForDimension = 'Height'
        this.setState({ data1: lengthDimensionArr, seachableModalVisible1: true, selectedIndexForDimension: String(index)})
  
      }

      if (selectedFlag.includes("Weight"))
      {
        selectedComboFlagForDimension = 'Weight'
        this.setState({ data1: weightDimensionArr, seachableModalVisible1: true, selectedIndexForDimension: String(index)})
  
      }
      
      
    }    

    
  
  

    renderSearchableData = ({ item, index }) => {
      console.log('renderSearchableData ==> ', item)
      return (
        <View>
          <TouchableOpacity onPress={() => this.selectItemOnDropDown(item, index)}>
          <Text style={{ padding: 10, color: 'white' }}>{item.category_name} </Text>
          </TouchableOpacity>
        </View>
      );
     }
     renderProhibittedData = ({ item, index }) => {

      return (
        <View>
      
          <Text style={{ padding: 10, color: 'white' }}>{item.name} </Text>
         
        </View>
      );
     }
    selectItemOnDropDown = (item, index) => 
    {
      
      console.log('selectItemOnDropDown ==> ', this.state.selectedindex, this.state.selectedFlagForCombo+'ID')

      this.setState({ seachableModalVisible: false, [this.state.selectedFlagForCombo]: item.category_name, [this.state.selectedFlagForCombo+'ID']: item.cat_id})
      if (this.state.selectedFlagForCombo.includes("documentCategory") || this.state.selectedFlagForCombo.includes("packageCategory"))
      {
      this.setState({['item_cat_id'+this.state.selectedindex]: item.cat_id, initialIndex: 100, DocumentYourCharges: '0.00',})
      }

      this.refs.radioForm.updateIsActiveIndex(-1)
  for(let i = 0; i < this.state.documentsData1.length; i++)
    {
  
      this.setState({DocumentYourCharges: String(0.00), 
      DeliveryModeSelectedValue: String(0.00), ['DocumentYourCharges'+String(i)]: String(0.00)
      })
      

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


    renderSearchableData1 = ({ item, index }) => {
      //console.log('renderSearchableData ==> ', item)
      return (
        <View>
          <TouchableOpacity onPress={() => this.selectItemOnDropDown1(item)}>
          <Text style={{ padding: 10, color: 'white' }}>{item.name} </Text>
          </TouchableOpacity>
        </View>
      );
     }
    selectItemOnDropDown1 = (item) => 
    {

      if (selectedComboFlagForDimension == 'Length')
      {
        this.setState({ seachableModalVisible1: false, ['lengthType'+this.state.selectedIndexForDimension]: item.name})
      }
      
       if (selectedComboFlagForDimension == 'Breadth')
      {
        this.setState({ seachableModalVisible1: false, ['breadthType'+this.state.selectedIndexForDimension]: item.name})
      }
  
      if (selectedComboFlagForDimension == 'Height')
      {
        this.setState({ seachableModalVisible1: false, ['heightType'+this.state.selectedIndexForDimension]: item.name})
      }
      
       if (selectedComboFlagForDimension == 'Weight')
      {
        this.setState({ seachableModalVisible1: false, ['WeightType'+this.state.selectedIndexForDimension]: item.name})
      }
      
  
      
  
      
    }
    renderSeparator1 = () => {
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
    marginRight: 13,
    marginLeft: 13,
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
        modalStyle: {
          height: 330,
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
        checboxkView: {
          flexDirection: 'row',
          justifyContent: 'flex-start',
          alignContent: 'flex-start',
          alignItems: 'flex-start',
          width: '90%',
          marginLeft: '0%',
          marginRight: '10%'
      },
      checkbox: {
        alignSelf: 'flex-start',
        height: 22,
        width: 22,

    },
    modalStyle1: {
      height: 80,
      width: '80%',
      alignSelf: 'center',
      marginTop: 100,
      backgroundColor: 'red',
      borderRadius: 6
    },
    spinnerTextStyle: {
      color: 'red'
    },
  });