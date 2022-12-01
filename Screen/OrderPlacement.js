import React,{Component} from 'react';

import { StyleSheet, Image,ImageBackground, View,Text, TextInput, TouchableOpacity, Dimensions, SafeAreaView, ScrollView, Modal, 
  FlatList, Alert, BackHandler, AsyncStorage} from 'react-native';

import {StatusBar} from 'react-native';

import AnimateLoadingButton from 'react-native-animate-loading-button';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import UrlUtil from '../Service/UrlUtils';
import Spinner from 'react-native-loading-spinner-overlay';
import Notifications1 from '../Notifications';
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

var radio_props1 = [
  {label: 'Pay Later', value: 0 },
  {label: 'Credit/Debit Card', value: 1 },
  {label: 'Pay with Credit amount', value: 2 },
  
];

var selectedComboFlag = ''
var shouldProceedOnBankDataSaving = 'no'
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
      lineItemGlaobalArray:  [
        {airlineTicket: '', bluePrint: '',  Passport: '', VOS: '', PYS: false}, {airlineTicket: '', bluePrint: '',  Passport: '', VOS: '', PYS: false},
      ],

      selectedParcelType: 'Document',
      selectedParcelType2: 'Domestic',

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
      FromAddressTypeString: 0,

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

      price: '',
      tax: '',
      totalPrice: '',
      submitButtonTitle: 'Place Order',
      UserIDString: '',
      locationType: '1',
      shipmentType: '1',
      credit_outstanding_amount: '0',
      credit_limit: '0',
      pay_later: '0',
      radiobuttonClickedValue: 100,
      usernameString: '',
      passwordString: '',
      bankPaymentModalVisible: false,
      cardNameString: '',
      cardNoString: '',
      cardCVVString: '',
      expMonth: '',
      expYear: '',
      isPaymentViewOn: false,
      initialSelectedRadiButtonIndex: 100,
      holderNameError: '',
      cardNumberError: '',
      expMonthError: '',
      expYearError: '',
      cvvError: '',
      progress: false,
      pymntsbmssn: false,
      orderIDString: '',
      radio_props11 : [
        {label: 'Pay Later', value: 0 },
        {label: 'Credit/Debit Card', value: 1 },
        {label: 'Pay with Credit amount', value: 2 },
        
      ]
      
    }
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    this.CallToShowDropDownCombo = this.CallToShowDropDownCombo.bind(this);
    this.uploadDetailsToCloudApiCall = this.uploadDetailsToCloudApiCall.bind(this);
    
}

  render(){

    const { navigate } = this.props.navigation;
    return(

<SafeAreaView >


            <View style={styles.MainContainer}>

            <View style={{backgroundColor: 'rgba(246, 244, 243, 1)', flexDirection:'row', alignItems: 'center'}}>

            {/* <TouchableOpacity onPress={this.handleBackButtonClick}>
        <Text style={{color:'red',fontSize:17, marginLeft: 17, fontWeight: "bold",}}>Back</Text>
        </TouchableOpacity> */}

       <Image style={{ height: 75,
              marginLeft: Dimensions.get('window').width - 153,
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

 { this.state.isPaymentViewOn == true && <ScrollView >

  <View style={{ marginBottom: 20 }}>
                                <View style={styles.modalStyle}>
                                <ScrollView>
                                
                                <View style={{ width: null, justifyContent: 'flex-start', marginTop: 0, width: '100%', flexDirection:'row',}}>
                                
<Image style={{ height: 75, width: '22%',
            marginTop:0,borderRadius:2, resizeMode: 'contain',
            alignContent: 'center',
            alignItems: 'center', 
            margin: 5,
            }}
          source={require('../Images/picon_1.png')}>
          </Image> 

          <Image style={{ height: 75, width: '22%',
            marginTop:0,borderRadius:2, resizeMode: 'contain',
            alignContent: 'center',
            alignItems: 'center', 
            margin: 5,
            }}
          source={require('../Images/picon_2.png')}>
          </Image> 

          <Image style={{ height: 75, width: '22%',
            marginTop:0,borderRadius:2, resizeMode: 'contain',
            alignContent: 'center',
            alignItems: 'center', 
            margin: 5,
            }}
          source={require('../Images/picon_3.png')}>
          </Image> 

          <Image style={{ height: 75, width: '22%',
            marginTop:0,borderRadius:2, resizeMode: 'contain',
            alignContent: 'center',
            alignItems: 'center', 
            margin: 5,
            }}
          source={require('../Images/picon_4.png')}>
          </Image> 
          
          </View>

          <Text style={{fontSize:15,
        color:'black',
        marginLeft: 13,
        marginTop:10, marginBottom: 7}}>CARD HOLDER NAME *</Text>

                <TextInput style={styles.textInput1}
                
                placeholder={'Enter Card Holder Name'}
                placeholderTextColor={'grey'}
                autoCapitalize = 'words'
                
                value = {this.state.cardNameString}
                onChangeText={(text) => this.setState({ cardNameString: text})}></TextInput>
<Text style={styles.errorHint}>{this.state.holderNameError}</Text>
    

               <Text style={{fontSize:15,
        color:'black',
        marginLeft: 13,
        marginTop:12, marginBottom: 7}}>CARD NUMBER *</Text>

                <TextInput style={styles.textInput1}
                placeholder={'Enter Card Number'}
                placeholderTextColor={'grey'}
                keyboardType = 'phone-pad'
                maxLength = {16}
                value = {this.state.cardNoString}
                onChangeText={(text) => this.setState({ cardNoString: text})}></TextInput>
                <Text style={styles.errorHint}>{this.state.cardNumberError}</Text>

<Text style={{fontSize:15,
        color:'black',
        marginLeft: 13,
        marginTop:12, marginBottom: 7}}>EXPIRY DATE *</Text>

<View style={{flexDirection:'row', alignItems: 'center', justifyContent: 'center', marginBottom: 7}}>
            <View style={{flex:1, maxWidth: 414, backgroundColor: null, flexDirection:'row', justifyContent:'space-between'}}>

            <View style={{ width: null, justifyContent: 'flex-start', marginTop: 0, width: '50%',}}>
           

            <TextInput style={{marginLeft:10, color: 'grey', height: 1, marginBottom: 5,  fontSize: 12,
    height: 50, marginRight: 2, backgroundColor: 'white', width: '90%', padding: 5}}
                placeholder={'MM'}
                maxLength = {2}
                placeholderTextColor={'grey'}
                keyboardType = 'phone-pad'
                value =  {this.state.expMonth}
               // onChangeText={(text) => this.setState({ ['packageLength'+String(index)]: text})}
                onChangeText={(text) => this.setState({ expMonth: text})}
                ></TextInput>

<Text style={styles.errorHint}>{this.state.expMonthError}</Text>

            </View>
            <View style={{ width: null, justifyContent: 'flex-start', marginRight: 13, marginTop: 0, width: '50%'}}>

<TextInput style={{marginLeft:10, color: 'grey', height: 1, marginBottom: 5,  fontSize: 12,
height: 50, marginRight: 2, backgroundColor: 'white', width: '90%', padding: 5}}
    placeholder={'YY'}
    maxLength = {2}
    placeholderTextColor={'grey'}
    keyboardType = 'phone-pad'
    value =  {this.state.expYear}
    // onChangeText={(text) => this.setState({ ['packageBreadth'+String(index)]: text})}
    onChangeText={(text) => this.setState({ expYear: text})}
    ></TextInput>
<Text style={styles.errorHint}>{this.state.expYearError}</Text>
            </View>
            </View>
            </View>

            <Text style={{fontSize:15,
        color:'black',
        marginLeft: 13,
       marginBottom: 7}}>CVV *</Text>

                <TextInput style={styles.textInput1}
                placeholder={'Enter CVV'}
                placeholderTextColor={'grey'}
                keyboardType = 'phone-pad'
                autoCapitalize = 'words'
                maxLength = {3}
                value = {this.state.cardCVVString}
                onChangeText={(text) => this.setState({ cardCVVString: text})}></TextInput>
<Text style={styles.errorHint}>{this.state.cvvError}</Text>

<View style={{flexDirection:'row', alignItems: 'center', justifyContent: 'center', marginTop: 43}}>
<View style={{flex:1, maxWidth: 414, backgroundColor: null, flexDirection:'row', justifyContent:'space-between'}}>
<View style={{ width: null, justifyContent: 'flex-start', marginTop: 0, width: '50%', flexDirection:'row'}}>
<TouchableOpacity onPress={() => this.cancelBankview()}>
              <Text style={{  fontSize:13,fontWeight: "bold",color:'white',
 textAlign: 'center', textAlignVertical: 'center', height: 50,
 marginLeft:  13,
borderRadius:2,width: 80,
color: 'white', backgroundColor: 'red', width: 120, marginBottom: 25, padding: 10 }}>
   Cancel
</Text> 
</TouchableOpacity>
</View>
<View style={{ width: null, justifyContent: 'flex-end', marginTop: 0, width: '50%', flexDirection:'row'}}>
<TouchableOpacity onPress={() => this.submitBankview()}>
              <Text style={{  fontSize:13,fontWeight: "bold",color:'white',
 textAlign: 'center', textAlignVertical: 'center', height: 50,
 marginLeft:  13,
borderRadius:2,width: 80,
color: 'white', backgroundColor: 'green', width: 120, marginBottom: 25, padding: 10, marginRight: 13 }}>
   Place Order
</Text> 
</TouchableOpacity>
</View>
</View>
</View>
</ScrollView>
                                </View>

                               

                            </View>

  </ScrollView> }

 { this.state.isPaymentViewOn == false &&

 <ScrollView >
                <Text style={styles.login}>Start Shipment</Text>

                <Text style={{fontSize:15,
        color:'red',
        alignSelf:'center',
        marginTop:20,}}>Payment</Text>

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
 <Text style={{fontSize: 15,textAlign: 'center', color: 'white', fontWeight: 'bold'}}>5</Text></View>

 </View>
 </View>       

   

                <View style={{flexDirection:'row', marginTop: 20, marginBottom: 10}}>
 <Text style={{ fontSize: 17, color: 'grey', marginLeft: 13, fontWeight: 'bold', color: 'green' }}>{'Total amount: $'+String(parseFloat(this.props.navigation.state.params.grand_total).toFixed(2))}</Text>
 </View> 

  <View style={{flexDirection:'row', alignItems: 'center', justifyContent: 'center', marginTop: 10}}>
            <View style={{flex:1, maxWidth: 414, backgroundColor: null, flexDirection:'row', justifyContent:'space-between'}}>
  
            
              <View style={{marginLeft:13,marginTop:10, marginRight: 7, width: '40%'}}>
                <RadioForm
  radio_props={this.state.radio_props11}
  style={{
    backgroundColor: 'rgba(246, 244, 243, 1)'
}}
ref="radioForm"
  initial={this.state.initialSelectedRadiButtonIndex}
  formHorizontal={false}
  buttonColor={'rgba(198, 35, 0, 1)'}
  selectedButtonColor={'rgba(198, 35, 0, 1)'}
       //   buttonOuterColor={'rgba(204, 32, 0, 1)'}
  
  labelStyle={{fontSize: 12, color: 'gray', marginRight:7, fontWeight: 'bold', marginBottom: 13}}
  onPress={(value) => {this.switchingBetweenHaveDetailsOfItem(value)}}
/>
</View>  

{/* <View style={{marginLeft:10,marginTop:46, marginRight: 7, width: '50%'}}>
<View style={{ marginLeft: 0, marginTop: -8}}>
            <Image style={{ height: 45, width: 30,resizeMode: 'contain'}}
                source={require('../Images/card.png')}></Image>
                </View> 

                
                <View style={{ flexDirection:'row'}}>
                <View style={{ marginLeft: 0, marginTop: -10}}>
            <Image style={{ height: 45, width: 30,resizeMode: 'contain'}}
                source={require('../Images/cash.png')}></Image>  
                </View>  
                <Text style={{ fontSize: 11, color: 'grey', marginLeft: -4, fontWeight: 'bold', color: 'red', marginTop: 4 }}>{'Your Credit Amount: '+this.state.credit_outstanding_amount}</Text>
                </View>       
</View>  */}

</View>
</View> 

<View style={{flexDirection:'row', alignItems: 'center', justifyContent: 'center', marginTop: 0, marginBottom: 12}}>
           
  
            <View style={{ width: '50%' }}>
              
              <TouchableOpacity style={{height: 50,
 marginLeft:  13,
marginTop:45,borderRadius:2,width: 80,
color: 'white', backgroundColor: 'red', width: 100, marginBottom: 25, padding: 10}} onPress ={() => this.props.navigation.navigate('DashPage')}>
              <Text style={{  fontSize:14,fontWeight: "bold",color:'white',
 textAlign: 'center', textAlignVertical: 'center', padding: 6}}>
  Cancel
</Text> 
</TouchableOpacity>

              </View>
  
           
            <View style={{ width: '50%' }}>

            <TouchableOpacity style={{marginRight: 13, alignSelf: 'flex-end',
marginTop:45,borderRadius:2,width: 80, height: 50,
color: 'white', backgroundColor: 'green', width: 130, marginBottom: 25, padding: 10}} onPress ={() => this.SubmitButtonCliecked()}>
              <Text style={{  fontSize:14,fontWeight: "bold",color:'white',
 textAlign: 'center', textAlignVertical: 'center', padding: 7}}>
   {this.state.submitButtonTitle}
</Text> 
</TouchableOpacity>

            </View>
            
            
  
  
            
            </View>     
              
       

        
<Spinner
          visible={this.state.progress}
          textContent={'Loading...'}
          textStyle={styles.spinnerTextStyle}
        />
  
</ScrollView> 
}
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
  cancelBankview()
  {
    this.setState({ isPaymentViewOn: false, pymntsbmssn: false })
   // this.refs.radioForm.updateIsActiveIndex(-1)
  }
  submitBankview()
  {

    if (this.state.cardNameString.trim() == '')
    {
      this.setState({ holderNameError: 'Card Holder Name field is empty' })
    }
    else
    {
      this.setState({ holderNameError: '' })
    }
     
    if (this.state.cardNoString.trim() == '')
    {
      
      this.setState({ cardNumberError: 'Card number field is empty' })
    }
    else
    {
      if (this.state.cardNoString.trim().length != 16)
    {
      this.setState({ cardNumberError: 'Card number should be 16 digits' })
    }
    else
    {
      this.setState({ cardNumberError: '' })
    }
    }


    if (this.state.expMonth.trim() == '')
    {
      this.setState({ expMonthError: 'Exp Month field is empty' })
    }
    else
    {
      if (this.state.expMonth.trim().length != 2)
      {
        this.setState({ expMonthError: 'Exp month should be 2 digits' })
      }
      else
      {
        this.setState({ expMonthError: '' })
      }
    }


    if (this.state.expYear.trim() == '')
    {
      this.setState({ expYearError: 'Exp Year field is empty' })
    }
    else
    {
      if (this.state.expYear.trim().length != 2)
    {
      this.setState({ expYearError: 'Exp year should be 2 digits' })
    }
    else
    {
      this.setState({ expYearError: '' })
    }
    }

    if (this.state.cardCVVString.trim() == '')
    {
      this.setState({ cvvError: 'CVV field is empty' })
    }
    else
    {
      if (this.state.cardCVVString.trim().length != 3)
    {
      this.setState({ cvvError: 'CVV should be 3 digits' })
    }
    else
    {
      this.setState({ cvvError: '' })
    }
    }

    
if (this.state.cardNameString.trim().length != 0 && this.state.cardNoString.length == 16 && this.state.expMonth.length == 2
&& this.state.expYear.length == 2 && this.state.cardCVVString.length == 3 )
{
console.log('go......')
// this.setState({ pymntsbmssn: true })

this.setState({
  pymntsbmssn: true
}, () => {
  this.SubmitButtonCliecked()
});
}

   
  }
  SubmitButtonCliecked()
  {

    

    var dictionary_main = {};

    dictionary_main['user_id'] = this.props.navigation.state.params.user_id
    dictionary_main['quote_id'] = this.props.navigation.state.params.quote_id
    dictionary_main['payment_mode'] = String(this.state.radiobuttonClickedValue + 1)
    dictionary_main['credit_outstanding_amount'] = this.state.credit_outstanding_amount
    dictionary_main['subtotal'] = this.props.navigation.state.params.subtotal
    dictionary_main['discount'] = '0'
    dictionary_main['ga_percentage'] = this.props.navigation.state.params.ga_percentage
    dictionary_main['ga_tax_amt'] = this.props.navigation.state.params.ga_tax_amt
    dictionary_main['ra_percentage'] = this.props.navigation.state.params.ra_percentage
    dictionary_main['ra_tax_amt'] = this.props.navigation.state.params.ra_tax_amt
    dictionary_main['grand_total'] = String(parseFloat(this.props.navigation.state.params.grand_total).toFixed(2))

    //(cus_name, card_number, card_exp_month, card_exp_year, card_cvc)
    if (String(this.state.radiobuttonClickedValue + 1) == '2')
    {
      dictionary_main['cus_name'] = this.state.cardNameString
      dictionary_main['card_number'] = this.state.cardNoString
      dictionary_main['card_exp_month'] = this.state.expMonth
      dictionary_main['card_exp_year'] = this.state.expYear
      dictionary_main['card_cvc'] = this.state.cardCVVString

    }

    

    
  console.log('this.state.radiobuttonClickedValue', dictionary_main);
  console.log('parseFloat(this.state.credit_outstanding_amount).toFixed(2)', parseFloat(this.state.credit_outstanding_amount).toFixed(2));
  console.log('parseFloat(this.props.navigation.state.params.grand_total).toFixed(2)', parseFloat(this.props.navigation.state.params.grand_total).toFixed(2));

     if (this.state.radiobuttonClickedValue == 1)
     {
     
if (this.state.pymntsbmssn == true)
{
  this.setState({progress:true})
  this.uploadDetailsToCloudApiCall(dictionary_main)
}
else
{
  Alert.alert(
        'Alert',
        'Please select a payment option ', // <- this part is optional, you can pass an empty string
        [
          {text: 'OK', onPress: () => this.setState({progress:false})},
        ],
        {cancelable: false},
      );
}

      

      // Alert.alert(
      //   'Alert',
      //   'Currently payment gateway is under development', // <- this part is optional, you can pass an empty string
      //   [
      //     {text: 'OK', onPress: () => this.setState({progress:false})},
      //   ],
      //   {cancelable: false},
      // );
     }
     else if (this.state.radiobuttonClickedValue == 2)
     {

      if ( Math.fround(parseFloat(this.state.credit_outstanding_amount).toFixed(2)) < Math.fround(parseFloat(this.props.navigation.state.params.grand_total).toFixed(2)))
      // {
        // if (parseFloat(this.state.credit_outstanding_amount).toFixed(2) < parseFloat(this.props.navigation.state.params.grand_total).toFixed(2))
      {
      
        Alert.alert(
          'Sorry!',
          'You do not have suffiecient Credit amout to be placed order', // <- this part is optional, you can pass an empty string
          [
            {text: 'OK', onPress: () => this.setState({progress:false})},
          ],
          {cancelable: false},
        );
        
      }
      else
      {
        this.setState({progress:true})
this.uploadDetailsToCloudApiCall(dictionary_main)
     }
    }
     else if (this.state.radiobuttonClickedValue == 0)
     {

if (this.state.pay_later == 0)
{

  Alert.alert(
    'Alert',
    'You do not have a rights to Pay Later, kindly contact with ADMIN for the same', // <- this part is optional, you can pass an empty string
    [
      {text: 'OK', onPress: () => this.setState({progress:false})},
    ],
    {cancelable: false},
  );
  
}
else
{
  this.setState({progress:true})
  this.uploadDetailsToCloudApiCall(dictionary_main)
}

      
     }
     else
     {
      Alert.alert(
        'Alert',
        'Please select a payment methode to be proceeded', // <- this part is optional, you can pass an empty string
        [
          {text: 'OK', onPress: () => this.setState({progress:false})},
        ],
        {cancelable: false},
      );
     }



    
  

  

  }

  uploadDetailsToCloudApiCall = (dictionary_main) => {

    console.log('uploadDetailsToCloudApiCall called=>')

    var params = {}
    var url = ''
    
    
      url = UrlUtil.BASE_URL + 'api/onSaveOrder';
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
        this.setState({progress:false})
        this.setState({orderIDString: json.OrderNumber})
       this.customLoginClick()
       
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
    customLoginClick = () => {

        
      var params = {}
      var emailOrPhoneFlag = ''
     
      
    
     
       
      params = 
      {
    
        email: this.state.usernameString,
        password: this.state.passwordString,
    
      
      }
    
    
      
    const { navigate } = this.props.navigation;
    
      const url = UrlUtil.BASE_URL + 'api/user_login';
    
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
    
      // this.setState({progress:false})
        let resultJSON = JSON.stringify(json)
        console.log("Result JSON is == ",resultJSON)
    
    
        if (json.status == 'success')
        {
    
          AsyncStorage.setItem('userdata', JSON.stringify(json.userdata));
          Notifications1.schduleNotification1(new Date(Date.now()), 'Your order: ' + this.state.orderIDString + ' has been successfully placed');
         
          Alert.alert(
            'Success',
            'Your Order has been placed, Your Order Number : ' + this.state.orderIDString, // <- this part is optional, you can pass an empty string
            [
              {text: 'OK', onPress: () => this.props.navigation.navigate('DashPage')},
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
    switchingBetweenHaveDetailsOfItem(value) 
    {
      console.log('switchingBetweenHaveDetailsOfItem: ', value)
      this.setState({radiobuttonClickedValue: value})
if (value == 1)
{
  this.setState({isPaymentViewOn: true })
}
  
  
    }
  async componentDidMount() 
  {
    
   // String(parseInt(this.props.navigation.state.params.grand_total , 10))
console.log("grand total2=> ", parseFloat(this.props.navigation.state.params.grand_total).toFixed(2))

    let user = await AsyncStorage.getItem('userdata');
    let parsed = JSON.parse(user);
    let passwordString1 = await AsyncStorage.getItem('password');

    this.setState({
      credit_outstanding_amount: parsed.credit_outstanding_amount,
      credit_limit: parsed.credit_limit,
      pay_later: parsed.pay_later,
      usernameString: parsed.email,
      passwordString: passwordString1,
    });
    

    console.log('pay_later: ', this.state.pay_later)
    console.log('credit_limit: ', this.state.credit_limit)

    if (this.state.pay_later == '0' && this.state.credit_limit == '0')
    {
      this.setState({
      radio_props11 : [
        {label: 'Credit/Debit Card', value: 1 },  
      ]})
    }
    else
    {
      if (this.state.pay_later == '0' && this.state.credit_limit != '0')
      {
        this.setState({
        radio_props11 : [
          {label: 'Credit/Debit Card', value: 1 },
          {label: 'Pay with Credit amount, Your Credit Amount: $'+this.state.credit_outstanding_amount, value: 2 },
          
        ]})
      }
      else if (this.state.pay_later != '0' && this.state.credit_limit == '0')
      {
        this.setState({
        radio_props11 : [
          {label: 'Pay Later', value: 0 },
          {label: 'Credit/Debit Card', value: 1 },
          
        ]})
      }
      else
      {
        this.setState({
        radio_props11 : [
          {label: 'Pay Later', value: 0 },
          {label: 'Credit/Debit Card', value: 1 },
          {label: 'Pay with Credit amount, Your Credit Amount: '+this.state.credit_outstanding_amount, value: 2 },
          
        ]})
      }

    }

    // "credit_outstanding_amount":"40","credit_limit":"100","pay_later":"1"
   
    // console.log('all details: ',this.props.navigation.state.params.quote_id, 
    // this.props.navigation.state.params.user_id, this.props.navigation.state.params.subtotal, 
    // this.props.navigation.state.params.ga_percentage, this.props.navigation.state.params.ga_tax_amt, 
    // this.props.navigation.state.params.ra_percentage, this.props.navigation.state.params.ra_tax_amt,
    //  this.props.navigation.state.params.grand_total)
    

   
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
    color: 'gray',
    padding: 6,
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
          height: Dimensions.get('window').height - 112,
          marginLeft: 13,
          width: Dimensions.get('window').width - 46,
          marginRight: 13,
          alignSelf: 'center',
          marginTop: 0,
          backgroundColor: 'red',
          borderRadius: 6,
          backgroundColor: 'rgba(246, 244, 243, 1)',
          borderColor: 'red',
          borderWidth: 6,

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
        textInput1:{
    
          width: null,
          marginLeft: 13,
          borderRadius: 0,
          marginRight: 7,
          backgroundColor: 'white',
          fontSize: 12,
          height: 50,
          color: 'gray',
          padding: 6,
          },
          errorHint: {
            color: 'red',
            fontSize: 10,
            marginBottom: -10,
            marginLeft: 13,
        },
        spinnerTextStyle: {
          color: 'red'
        },
  });