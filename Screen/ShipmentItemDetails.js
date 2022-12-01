


//https://github.com/colbymillerdev/react-native-progress-steps

//This is an example code for NavigationDrawer//
import React, { Component } from 'react';
//import react in our code.
import { StyleSheet, View, Text, ImageBackground,Image, ScrollView,FlatList, TouchableOpacity, SafeAreaView, BackHandler, Alert, Clipboard, } from 'react-native';
// import all basic components
import {Dimensions} from 'react-native';
import StepIndicator from 'react-native-step-indicator';
import UrlUtil from '../Service/UrlUtils';
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
  currentStepLabelColor: 'green'
}
var ordernumbbbb = ''
export default class Home extends Component {
  //Screen1 Component

  
  constructor(props) {
    super(props);
    this.state = {
      currentPosition: 3,
      lineItemGlaobalArray:  [
        {airlineTicket: '', bluePrint: '',  Passport: '', VOS: '', PYS: false}, {airlineTicket: '', bluePrint: '',  Passport: '', VOS: '', PYS: false},
      ],
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
      FromAddressTypeString: 'Home Address',

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
      ToAddressTypeString: 'Home Address',

      price: '',
      tax: '',
      totalPrice: '',
      submitButtonTitle: 'Create Quote',
      UserIDString: '',
      locationType: '1',
      shipmentType: '1',
      loopkey: 0,
      quotationDetails: {},
      quote_from_details: {},
      quote_to_details: {},
      quote_item_detailsforDocument: [],
      quote_item_detailsforPackage: [],
      Grand_Total_String: '',
      payment_Mode_String: '',
      orderNumber: '',
      CopyToClipboard: ''

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

<Text style={styles.login}>Details</Text>


 <View style={{flexDirection:'row', marginTop: 10}}>
 <Text style={{ fontSize: 14, color: 'grey', marginLeft: 13, fontWeight: 'bold' }}>General</Text>
 </View>
 

 <View style={{flexDirection:'row', alignItems: 'center', justifyContent: 'center', marginTop: 0}}>
            <View style={{flex:1, maxWidth: 414, backgroundColor: null, flexDirection:'row', justifyContent:'space-between'}}>
  
            <View style={{ width: '50%' }}>
              <Text style={{ fontSize: 13, color: 'grey', marginLeft: 13,marginTop:18 }}>Type of shipment</Text>

              <Text style={{ fontSize: 13, color: 'grey', marginLeft: 13,marginTop:18 }}>Grand Total</Text>

               <Text style={{ fontSize: 13, color: 'grey', marginLeft: 13,marginTop:18 }}>Payment Mode</Text>

               <Text style={{ fontSize: 13, color: 'grey', marginLeft: 13,marginTop:18 }}>Order Number</Text>
              </View>
  
           
            <View style={{ width: '50%' }}>
             
              <Text style={{ fontSize: 13, color: 'grey', marginLeft: 13,marginTop:18 }}>{this.state.locationType}</Text>

              <Text style={{ fontSize: 13, color: 'grey', marginLeft: 13,marginTop:18 }}>{'$'+this.state.Grand_Total_String}</Text>

              <Text style={{ fontSize: 13, color: 'grey', marginLeft: 13,marginTop:18 }}>{this.state.payment_Mode_String}</Text>   
              <TouchableOpacity onPress ={() => this.copyToClipboard()}>
              <Text style={{ fontSize: 13, color: 'grey', marginLeft: 13,marginTop:18 }}>{this.state.orderNumber}</Text>  
              </TouchableOpacity>       
              <Text style={styles.errorHint}>{this.state.CopyToClipboard}</Text>
            </View>
          
            
  
            </View>
            </View>

            

           
            <View style={{flexDirection:'row', marginTop: 25}}>
 <Text style={{ fontSize: 14, color: 'grey', marginLeft: 13, fontWeight: 'bold' }}>Location</Text>
 </View>
 
 
 <View style={{flexDirection:'row', alignItems: 'center', justifyContent: 'center', marginTop: 0}}>
            <View style={{flex:1, maxWidth: 414, backgroundColor: null, flexDirection:'row', justifyContent:'space-between'}}>
  
            <View style={{ width: '50%' }}>
              <Text style={{ fontSize: 13, color: 'grey', marginLeft: 13,marginTop:18, fontWeight: 'bold' }}>From Location</Text>

              <Text style={{ fontSize: 13, color: 'grey', marginLeft: 13,marginTop:10, marginRight: 5 }}>
                {'Name: '+this.state.quote_from_details.firstname + ' '+ this.state.quote_from_details.lastname}</Text>

              <Text style={{ fontSize: 13, color: 'grey', marginLeft: 13,marginTop:10, marginRight: 5 }}>{'Address Line1: '+this.state.quote_from_details.address}</Text>

              <Text style={{ fontSize: 13, color: 'grey', marginLeft: 13,marginTop:10, marginRight: 5 }}>{'Address Line 2: '+this.state.quote_from_details.address2}</Text>

              <Text style={{ fontSize: 13, color: 'grey', marginLeft: 13,marginTop:10, marginRight: 5 }}>{'Company: '+this.state.quote_from_details.company_name}</Text>

              <Text style={{ fontSize: 13, color: 'grey', marginLeft: 13,marginTop:10, marginRight: 5 }}>{'Country/Territory: '+this.state.quote_from_details.country_name}</Text>

              <Text style={{ fontSize: 13, color: 'grey', marginLeft: 13,marginTop:10, marginRight: 5 }}>{'State: '+this.state.quote_from_details.state_name}</Text>

              <Text style={{ fontSize: 13, color: 'grey', marginLeft: 13,marginTop:10, marginRight: 5 }}>{'City: '+this.state.quote_from_details.city_name}</Text>

              <Text style={{ fontSize: 13, color: 'grey', marginLeft: 13,marginTop:10, marginRight: 5 }}>{'Zip code: '+this.state.quote_from_details.zip}</Text>

              <Text style={{ fontSize: 13, color: 'grey', marginLeft: 13,marginTop:10, marginRight: 5 }}>{'email Address: '+this.state.quote_from_details.email}</Text>

              <Text style={{ fontSize: 13, color: 'grey', marginLeft: 13,marginTop:10, marginRight: 5 }}>{'Phone no: '+this.state.quote_from_details.telephone}</Text>

              <Text style={{ fontSize: 13, color: 'grey', marginLeft: 13,marginTop:10, marginRight: 5 }}>{'Address Type: '+this.state.FromAddressTypeString}</Text>

              </View>
  
           
            <View style={{ width: '50%' }}>
             
              <Text style={{ fontSize: 13, color: 'grey', marginLeft: 13,marginTop:18, fontWeight: 'bold' }}>To Location</Text>

              <Text style={{ fontSize: 13, color: 'grey', marginLeft: 13,marginTop:10, marginRight: 5 }}>{'Name: '+this.state.quote_to_details.firstname + ' '+ this.state.quote_to_details.lastname}</Text>

              <Text style={{ fontSize: 13, color: 'grey', marginLeft: 13,marginTop:10, marginRight: 5 }}>{'Address Line1: '+this.state.quote_to_details.address}</Text>

              <Text style={{ fontSize: 13, color: 'grey', marginLeft: 13,marginTop:10, marginRight: 5 }}>{'Address Line 2: '+this.state.quote_to_details.address2}</Text>

              <Text style={{ fontSize: 13, color: 'grey', marginLeft: 13,marginTop:10, marginRight: 5 }}>{'Company: '+this.state.quote_to_details.company_name}</Text>

              <Text style={{ fontSize: 13, color: 'grey', marginLeft: 13,marginTop:10, marginRight: 5 }}>{'Country/Territory: '+this.state.quote_to_details.country_name}</Text>

              <Text style={{ fontSize: 13, color: 'grey', marginLeft: 13,marginTop:10, marginRight: 5 }}>{'State: '+this.state.quote_to_details.state_name}</Text>

              <Text style={{ fontSize: 13, color: 'grey', marginLeft: 13,marginTop:10, marginRight: 5 }}>{'City: '+this.state.quote_to_details.city_name}</Text>

              <Text style={{ fontSize: 13, color: 'grey', marginLeft: 13,marginTop:10, marginRight: 5 }}>{'Zip code: '+this.state.quote_to_details.zip}</Text>

              <Text style={{ fontSize: 13, color: 'grey', marginLeft: 13,marginTop:10, marginRight: 5 }}>{'email Address: '+this.state.quote_to_details.email}</Text>

              <Text style={{ fontSize: 13, color: 'grey', marginLeft: 13,marginTop:10, marginRight: 5 }}>{'Phone no: '+this.state.quote_to_details.telephone}</Text>

              <Text style={{ fontSize: 13, color: 'grey', marginLeft: 13,marginTop:10, marginRight: 5 }}>{'Address Type: '+this.state.ToAddressTypeString}</Text>

            </View>
  
  
            </View>
            </View>

           
            <View style={{flexDirection:'row', marginTop:30}}>
 <Text style={{ fontSize: 14, color: 'grey', marginLeft: 13, fontWeight: 'bold' }}>Parcel Details</Text>
 </View>
 


 <View style={{flexDirection:'row', alignItems: 'center', justifyContent: 'center', marginTop: 0, marginBottom: 12}}>
            <View style={{flex:1, maxWidth: 414, backgroundColor: null, flexDirection:'row', justifyContent:'space-between'}}>
  
            {/* <View style={{ width: '50%' }}>
              <Text style={{ fontSize: 13, color: 'grey', marginLeft: 13,marginTop:18 }}>Delivery mode:</Text>

              <Text style={{ fontSize: 13, color: 'grey', marginLeft: 13,marginTop:10 }}>Shipping mode:</Text>

              <Text style={{ fontSize: 13, color: 'grey', marginLeft: 13,marginTop:10 }}>Total Charges:</Text>
              </View> */}
  
           
            {/* <View style={{ width: '50%' }}>
             
              <Text style={{ fontSize: 13, color: 'grey', marginLeft: 13,marginTop:18 }}>{this.props.navigation.state.params.quoteOrShipmentData.DeliveryMode}</Text>

              <Text style={{ fontSize: 13, color: 'grey', marginLeft: 13,marginTop:10 }}>{this.props.navigation.state.params.quoteOrShipmentData.ShippingMode}</Text>

              <Text style={{ fontSize: 13, color: 'grey', marginLeft: 13,marginTop:10 }}>{this.props.navigation.state.params.quoteOrShipmentData.TotalPrice}</Text>
            </View> */}
          
  
  
            </View>
            </View>




            { this.state.quote_item_detailsforDocument.length > 0 && <View style={styles.cardBox2New}>
              <View style={styles.dtlsHead}><Text style={{color:'#fff'}}>For Document</Text></View>
              <FlatList
              horizontal
                data={this.state.quote_item_detailsforDocument}
                renderItem={({ item, index }) => (
                  // <TouchableWithoutFeedback onPress={() => this.navigationToDetailsScreen1(item,index)}>
                  <View style={styles.itemBox}>
                          <View style={{flexDirection:'row', alignItems: 'center', justifyContent: 'center', marginTop: 0}}>
            <View style={{flex:1, maxWidth: 414, backgroundColor: null, flexDirection:'row', justifyContent:'space-between'}}>
    
  
            <View style={{ width: '70%' }}>

              <Text style={{ fontSize: 13, color: 'grey', marginLeft: 2,marginTop:10, marginRight: 5 }}>{'Document Category: '+ item.category_name}</Text>

              <Text style={{ fontSize: 13, color: 'grey', marginLeft: 2,marginTop:10, marginRight: 5 }}>{'Sub Category: '+ item.subcategory_name}</Text>

              <Text style={{ fontSize: 13, color: 'grey', marginLeft: 2,marginTop:10, marginRight: 5 }}>{'Item: '+ item.item_name}</Text>

              <Text style={{ fontSize: 13, color: 'grey', marginLeft: 2,marginTop:10, marginRight: 5 }}>{'Value of your shipment: '+ item.value_shipment}</Text>

              {/* <Text style={{ fontSize: 13, color: 'grey', marginLeft: 2,marginTop:10, marginRight: 5 }}>{'Protect your shipment: '+ item.protect_parcel}</Text> */}
              { item.protect_parcel == '0' && 
              <Text style={{ fontSize: 13, color: 'grey', marginLeft: 2,marginTop:10, marginRight: 5 }}>{'Protect your shipment: NO'}</Text>}
{ item.protect_parcel == '1' && 
              <Text style={{ fontSize: 13, color: 'grey', marginLeft: 2,marginTop:10, marginRight: 5 }}>{'Protect your shipment: YES'}</Text>}
              { item.protect_parcel == '0' && 
<Text style={{ fontSize: 13, color: 'grey', marginLeft: 2,marginTop:10, marginRight: 5 }}>{'Charges(Excluding Tax): $'+ item.line_total}</Text>}
{ item.protect_parcel == '1' && 
<Text style={{ fontSize: 13, color: 'grey', marginLeft: 2,marginTop:10, marginRight: 5 }}>{'Charges(Excluding Tax): $'+ String(parseFloat(item.line_total) + parseFloat(item.insur))}</Text>}
              {/* <Text style={{ fontSize: 13, color: 'grey', marginLeft: 2,marginTop:10, marginRight: 5 }}>{'Charges(Excluding Tax): $'+ item.item_total}</Text> */}
              {/* <Text style={{ fontSize: 13, color: 'grey', marginLeft: 2,marginTop:10, marginRight: 5 }}>{'Insurance: $'+ item.insur}</Text> */}
    
              </View>
          
            </View>
  
           
                      </View>
                      
                         
                </View>
                // </TouchableWithoutFeedback>
                )}
                keyExtractor={(item, index) => index}
              />
              </View>    } 


              { this.state.quote_item_detailsforPackage.length > 0 && <View style={styles.cardBox2New}>
              <View style={styles.dtlsHead}><Text style={{color:'#fff'}}>For Package</Text></View>
              <FlatList
              horizontal
                data={this.state.quote_item_detailsforPackage}
                renderItem={({ item, index }) => (
                  // <TouchableWithoutFeedback onPress={() => this.navigationToDetailsScreen1(item,index)}>
                  <View style={styles.itemBox}>
                          <View style={{flexDirection:'row', alignItems: 'center', justifyContent: 'center', marginTop: 0}}>
            <View style={{flex:1, maxWidth: 414, backgroundColor: null, flexDirection:'row', justifyContent:'space-between'}}>
    
  
            <View style={{ width: '70%' }}>

            <Text style={{ fontSize: 13, color: 'grey', marginLeft: 2,marginTop:10, marginRight: 5 }}>{'Package Category: '+ item.category_name}</Text>

<Text style={{ fontSize: 13, color: 'grey', marginLeft: 2,marginTop:10, marginRight: 5 }}>{'Sub Category: '+ item.subcategory_name}</Text>

<Text style={{ fontSize: 13, color: 'grey', marginLeft: 2,marginTop:10, marginRight: 5 }}>{'Item: '+ item.item_name}</Text>

<Text style={{ fontSize: 13, color: 'grey', marginLeft: 2,marginTop:10, marginRight: 5 }}>{'Description: '+item.desc}</Text>

<Text style={{ fontSize: 13, color: 'grey', marginLeft: 2,marginTop:10, marginRight: 5 }}>{'Reference: '+ item.referance_parcel}</Text>

<Text style={{ fontSize: 13, color: 'grey', marginLeft: 2,marginTop:10, marginRight: 5 }}>{'Value of your shipment: '+item.value_shipment}</Text>

{/* <Text style={{ fontSize: 13, color: 'grey', marginLeft: 2,marginTop:10, marginRight: 5 }}>{'Protect your shipment: '+item.protect_parcel}</Text> */}
{ item.protect_parcel == '0' && 
              <Text style={{ fontSize: 13, color: 'grey', marginLeft: 2,marginTop:10, marginRight: 5 }}>{'Protect your shipment: NO'}</Text>}
{ item.protect_parcel == '1' && 
              <Text style={{ fontSize: 13, color: 'grey', marginLeft: 2,marginTop:10, marginRight: 5 }}>{'Protect your shipment: YES'}</Text>}
<Text style={{ fontSize: 13, color: 'grey', marginLeft: 2,marginTop:10, marginRight: 5 }}>{'Quantity: '+item.quantity}</Text>

<Text style={{ fontSize: 13, color: 'grey', marginLeft: 2,marginTop:10, marginRight: 5 }}>{'Length: '+item.length + ' '+ item.length_dimen}</Text>

<Text style={{ fontSize: 13, color: 'grey', marginLeft: 2,marginTop:10, marginRight: 5 }}>{'Breadth: '+item.breadth + ' '+ item.breadth_dimen}</Text>

<Text style={{ fontSize: 13, color: 'grey', marginLeft: 2,marginTop:10, marginRight: 5 }}>{'Height: '+item.height + ' '+ item.height_dimen}</Text>

<Text style={{ fontSize: 13, color: 'grey', marginLeft: 2,marginTop:10, marginRight: 5 }}>{'Weight: '+item.weight + ' '+ item.weight_dimen}</Text>

{ item.protect_parcel == '0' && 
<Text style={{ fontSize: 13, color: 'grey', marginLeft: 2,marginTop:10, marginRight: 5 }}>{'Charges(Excluding Tax): $'+ item.line_total}</Text>}
{ item.protect_parcel == '1' && 
<Text style={{ fontSize: 13, color: 'grey', marginLeft: 2,marginTop:10, marginRight: 5 }}>{'Charges(Excluding Tax): $'+ String(parseFloat(item.line_total) + parseFloat(item.insur))}</Text>}

{/* <Text style={{ fontSize: 13, color: 'grey', marginLeft: 2,marginTop:10, marginRight: 5 }}>{'Charges(Excluding Tax): $'+ item.item_total}</Text> */}
{/* <Text style={{ fontSize: 13, color: 'grey', marginLeft: 2,marginTop:10, marginRight: 5 }}>{'Insurance: $'+ item.insur}</Text> */}
              </View>
  
            </View>
  
           
                      </View>
                      
                         
                </View>
                // </TouchableWithoutFeedback>
                )}
                keyExtractor={(item, index) => index}
              />
              </View>   }

              {/* <View style={{ height: 270, marginBottom: 20, marginLeft: 13}}>
<StepIndicator
         customStyles={customStyles}
         currentPosition={this.state.currentPosition}
         labels={labels}
         direction="vertical"
    />
    </View>   */}


    {/* <TouchableOpacity onPress ={() =>this.ConfirmedToOrder(json.quotation_data.quote_no, json.quotation_data.quotation_id,
              this.state.UserIDString, this.props.navigation.state.params.quoteOrShipmentData.price, 
              this.props.navigation.state.params.quoteOrShipmentData.ga_percentage, this.props.navigation.state.params.quoteOrShipmentData.ga_tax_amt,
              this.props.navigation.state.params.quoteOrShipmentData.ra_percentage, this.props.navigation.state.params.quoteOrShipmentData.ra_tax_amt,
              this.props.navigation.state.params.quoteOrShipmentData.totalprice)}>
              <Text style={{  fontSize:20,fontWeight: "bold",color:'white',
 textAlign: 'center', textAlignVertical: 'center', height: 50,
 marginLeft:  Dimensions.get('window').width - 220,
marginTop:45,borderRadius:2,width: 80,
color: 'white', backgroundColor: 'green', width: 170, marginBottom: 25}}>
  Place Order
</Text> 
</TouchableOpacity> */}

{/* <StepProgressBar
    orientation={'vertical'}
    labelTextColor="#26a541"
    stepColor="#26a541"
    barThickeness={2}
    labelContainerStyle={{marginBottom: 10}}
    stepWidth={20}
    stepHeight={20}
    barLength={60}
    showLabel={true}
    data={[
        {label: 'Ordered'},
        {label: 'Packed'},
        {label: 'Shipped'},
        {label: 'Delivered'},
    ]}
    barColor={'#3498ff'}
    labelTextStyle={{
        fontFamily: 'roboto',
        color: '#a11',
        paddingLeft: 10,
    }}
    renderStep={({index}) => {
        return (
        <View
            style={{
            flex: 1,
            justifyContent: 'center',
            width: 20,
            height: 20,
            borderRadius: 10,
            borderColor: '#3498ff',
            borderWidth: 1,
            }}>
            <Text style={{textAlign: 'center'}}>{index}</Text>
        </View>
        );
    }}
/> */}
</ScrollView>
</View>




      
      </View>
{/*       
      <View style={styles.footer}>
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
  copyToClipboard()
  {
    Clipboard.setString(ordernumbbbb),  
    this.setState({CopyToClipboard: 'Copied!'})
  }
  async componentDidMount() 
  {

    
    this.FetchQuoteDetails()

   console.log('componentDidMount called',  this.props.navigation.state.params.shipment_id)

  }
  ConfirmedToOrder = (quote_no, quote_id, user_id, subtotal, ga_percentage, ga_tax_amt, ra_percentage, ra_tax_amt, grand_total) => {
    
    console.log('all details: ', quote_no, quote_id, user_id, subtotal, ga_percentage, ga_tax_amt, ra_percentage, ra_tax_amt, grand_total)
    
    this.props.navigation.navigate('OrderPlacementPage',{
            quote_id: quote_id,
            user_id: user_id,
            subtotal: subtotal,
            ga_percentage: ga_percentage,
            ga_tax_amt: ga_tax_amt,
            ra_percentage: ra_percentage,
            ra_tax_amt: ra_tax_amt,
            grand_total: grand_total,
          })
      }
  handleBackButtonClick() {
  

    this.props.navigation.goBack(null);
    return true;
  }
 
  FetchQuoteDetails = () => {

        
    var params = {}
    
    
  
   
    params = 
    {
  
      order_id: this.props.navigation.state.params.shipment_id
    
    }
  
    
  const { navigate } = this.props.navigation;
  
    const url = UrlUtil.BASE_URL + 'api/viewOrderDetails';
  
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


          var documentArr = []
          var packageArr = []
          for(let i = 0; i < json.orderDetails.order_item_details.length; i++)
          {
           console.log()
            if (json.orderDetails.order_item_details[i].type == '1')
            {
              documentArr.push(json.orderDetails.order_item_details[i])
            } 
            else
            {
              packageArr.push(json.orderDetails.order_item_details[i])
            }
          }

          console.log('documentArr & packageArr', documentArr, packageArr)

          this.setState({quotationDetails: json.orderDetails, quote_from_details: json.orderDetails.order_from_details[0],
            quote_to_details: json.orderDetails.order_to_details[0], quote_item_detailsforDocument: documentArr, quote_item_detailsforPackage: packageArr})


            if (json.orderDetails.order_details[0].payment_mode == '1')
    {
      this.setState({payment_Mode_String: 'Pay Later'})
    }
    else if (json.orderDetails.order_details[0].payment_mode == '2')
    {
      this.setState({payment_Mode_String: 'Credit/Debit Card'})
    }
    else if (json.orderDetails.order_details[0].payment_mode == '3')
    {
      this.setState({payment_Mode_String: 'Credit amount'})
    }
    
    this.setState({Grand_Total_String: json.orderDetails.order_price_details[0].grand_total_with_tax})

    if (json.orderDetails.order_details[0].location_type == '1')
    {
      this.setState({locationType: 'Domestic'})
    }
    else
    {
      this.setState({locationType: 'International'})
    }

    if (json.orderDetails.order_from_details[0].address_type == '0')
    {
      this.setState({FromAddressTypeString: 'Home Address'})
    }
    else
    {
      this.setState({FromAddressTypeString: 'Business Address'})
    }

    if (json.orderDetails.order_to_details[0].address_type == '0')
    {
      this.setState({ToAddressTypeString: 'Home Address'})
    }
    else
    {
      this.setState({ToAddressTypeString: 'Business Address'})
    }
    this.setState({orderNumber: json.orderDetails.order_details[0].shipment_no, CopyToClipboard: 'Copy to clipboard'})
    ordernumbbbb = json.orderDetails.order_details[0].shipment_no
        
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
      errorHint: {
        color: 'red',
        fontSize: 10,
        marginBottom: -10,
        marginLeft: 13,
    },  
  
});

       