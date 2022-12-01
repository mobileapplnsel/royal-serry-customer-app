import React,{Component} from 'react';

import { StyleSheet, Image,ImageBackground, View,Text, TextInput, TouchableOpacity, Dimensions, SafeAreaView, ScrollView, Modal, 
  FlatList, Alert, BackHandler, AsyncStorage} from 'react-native';
import {StatusBar} from 'react-native';

import AnimateLoadingButton from 'react-native-animate-loading-button';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import UrlUtil from '../Service/UrlUtils';
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
  {label: 'Credit/Debit Card', value: 0 },
  {label: 'Cash On Delivery', value: 1 },
  {label: 'Pay Later', value: 2 }
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
      scrollEnabledDoc: true,
      scrollEnabledPack: true,


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
        marginTop:20,}}>Summary & Payment</Text>

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
 <Text style={{fontSize: 15,textAlign: 'center', color: 'white', fontWeight: 'bold'}}>4</Text></View>

 </View>
 </View>       

 {/* <TouchableOpacity onPress ={() => this.props.navigation.navigate('StastShipmentPage',{
                      navigationFlag: 'quote'})}> */}
 <View style={{flexDirection:'row', marginTop: 10}}>
 <Text style={{ fontSize: 14, color: 'grey', marginLeft: 13, fontWeight: 'bold' }}>General</Text>
 <View style={{ marginLeft: 10, marginTop: -7}}>
            {/* <Image style={{ height: 30, width: 30,resizeMode: 'contain'}}
                source={require('../Images/edit.png')}></Image> */}
</View>
 </View>
 {/* </TouchableOpacity> */}

 <View style={{flexDirection:'row', alignItems: 'center', justifyContent: 'center', marginTop: 0}}>
            <View style={{flex:1, maxWidth: 414, backgroundColor: null, flexDirection:'row', justifyContent:'space-between'}}>
  
            <View style={{ width: '50%' }}>
              <Text style={{ fontSize: 13, color: 'grey', marginLeft: 13,marginTop:18 }}>Type of shipment</Text>

              <Text style={{ fontSize: 13, color: 'grey', marginLeft: 13,marginTop:10 }}>Parcel Type</Text>
              </View>
  
           
            <View style={{ width: '50%' }}>
             
              <Text style={{ fontSize: 13, color: 'grey', marginLeft: 13,marginTop:18 }}>{this.props.navigation.state.params.quoteOrShipmentData.DomesticOrInternational}</Text>

              <Text style={{ fontSize: 13, color: 'grey', marginLeft: 13,marginTop:10 }}>{this.state.selectedParcelType}</Text>
            </View>
          
  
  
            </View>
            </View>

            

            {/* <TouchableOpacity onPress ={() => this.props.navigation.navigate('LocationPage',{
                      navigationFlag: 'quote'})}> */}
            <View style={{flexDirection:'row', marginTop: 25}}>
 <Text style={{ fontSize: 14, color: 'grey', marginLeft: 13, fontWeight: 'bold' }}>Location</Text>
 <View style={{ marginLeft: 10, marginTop: -7}}>
            {/* <Image style={{ height: 30, width: 30,resizeMode: 'contain'}}
                source={require('../Images/edit.png')}></Image> */}
</View>
 </View>
 {/* </TouchableOpacity> */}
 
 <View style={{flexDirection:'row', alignItems: 'center', justifyContent: 'center', marginTop: 0}}>
            <View style={{flex:1, maxWidth: 414, backgroundColor: null, flexDirection:'row', justifyContent:'space-between'}}>
  
            <View style={{ width: '50%' }}>
              <Text style={{ fontSize: 13, color: 'grey', marginLeft: 13,marginTop:18, fontWeight: 'bold' }}>From Location</Text>

              <Text style={{ fontSize: 13, color: 'grey', marginLeft: 13,marginTop:10, marginRight: 5 }}>{'Name: '+this.state.FromFirstnameString + ' '+ this.state.FromLastnameString}</Text>

              <Text style={{ fontSize: 13, color: 'grey', marginLeft: 13,marginTop:10, marginRight: 5 }}>{'Address Line1: '+this.state.FromAddress1String}</Text>

              <Text style={{ fontSize: 13, color: 'grey', marginLeft: 13,marginTop:10, marginRight: 5 }}>{'Address Line 2: '+this.state.FromAddress2String}</Text>

              <Text style={{ fontSize: 13, color: 'grey', marginLeft: 13,marginTop:10, marginRight: 5 }}>{'Company: '+this.state.FromCompanyString}</Text>

              <Text style={{ fontSize: 13, color: 'grey', marginLeft: 13,marginTop:10, marginRight: 5 }}>{'Country/Territory: '+this.state.FromCountryString}</Text>

              <Text style={{ fontSize: 13, color: 'grey', marginLeft: 13,marginTop:10, marginRight: 5 }}>{'State: '+this.state.FromStateString}</Text>

              <Text style={{ fontSize: 13, color: 'grey', marginLeft: 13,marginTop:10, marginRight: 5 }}>{'City: '+this.state.FromCityString}</Text>

              <Text style={{ fontSize: 13, color: 'grey', marginLeft: 13,marginTop:10, marginRight: 5 }}>{'Zip code: '+this.state.FromZipCodeString}</Text>

              <Text style={{ fontSize: 13, color: 'grey', marginLeft: 13,marginTop:10, marginRight: 5 }}>{'email Address: '+this.state.FromEmailString}</Text>

              <Text style={{ fontSize: 13, color: 'grey', marginLeft: 13,marginTop:10, marginRight: 5 }}>{'Phone no: '+this.state.FromPhoneString}</Text>

              <Text style={{ fontSize: 13, color: 'grey', marginLeft: 13,marginTop:10, marginRight: 5 }}>{'Address Type: '+this.state.FromAddressTypeString}</Text>

              </View>
  
           
            <View style={{ width: '50%' }}>
             
              <Text style={{ fontSize: 13, color: 'grey', marginLeft: 13,marginTop:18, fontWeight: 'bold' }}>To Location</Text>

              <Text style={{ fontSize: 13, color: 'grey', marginLeft: 13,marginTop:10, marginRight: 5 }}>{'Name: '+this.state.ToFirstnameString + ' '+ this.state.ToLastnameString}</Text>

              <Text style={{ fontSize: 13, color: 'grey', marginLeft: 13,marginTop:10, marginRight: 5 }}>{'Address Line1: '+this.state.ToAddress1String}</Text>

              <Text style={{ fontSize: 13, color: 'grey', marginLeft: 13,marginTop:10, marginRight: 5 }}>{'Address Line 2: '+this.state.ToAddress2String}</Text>

              <Text style={{ fontSize: 13, color: 'grey', marginLeft: 13,marginTop:10, marginRight: 5 }}>{'Company: '+this.state.ToCompanyString}</Text>

              <Text style={{ fontSize: 13, color: 'grey', marginLeft: 13,marginTop:10, marginRight: 5 }}>{'Country/Territory: '+this.state.ToCountryString}</Text>

              <Text style={{ fontSize: 13, color: 'grey', marginLeft: 13,marginTop:10, marginRight: 5 }}>{'State: '+this.state.ToStateString}</Text>

              <Text style={{ fontSize: 13, color: 'grey', marginLeft: 13,marginTop:10, marginRight: 5 }}>{'City: '+this.state.ToCityString}</Text>

              <Text style={{ fontSize: 13, color: 'grey', marginLeft: 13,marginTop:10, marginRight: 5 }}>{'Zip code: '+this.state.ToZipCodeString}</Text>

              <Text style={{ fontSize: 13, color: 'grey', marginLeft: 13,marginTop:10, marginRight: 5 }}>{'email Address: '+this.state.ToEmailString}</Text>

              <Text style={{ fontSize: 13, color: 'grey', marginLeft: 13,marginTop:10, marginRight: 5 }}>{'Phone no: '+this.state.ToPhoneString}</Text>

              <Text style={{ fontSize: 13, color: 'grey', marginLeft: 13,marginTop:10, marginRight: 5 }}>{'Address Type: '+this.state.ToAddressTypeString}</Text>

            </View>
  
  
            </View>
            </View>

            {/* <TouchableOpacity onPress ={() => this.props.navigation.navigate('ParcelDetailsPage',{
                      navigationFlag: 'quote'})}> */}
            <View style={{flexDirection:'row', marginTop:30}}>
 <Text style={{ fontSize: 14, color: 'grey', marginLeft: 13, fontWeight: 'bold' }}>Parcel Details</Text>
 <View style={{ marginLeft: 10, marginTop: -7}}>
            {/* <Image style={{ height: 30, width: 30,resizeMode: 'contain'}}
                source={require('../Images/edit.png')}></Image> */}
</View>
 </View>
 {/* </TouchableOpacity> */}


 <View style={{flexDirection:'row', alignItems: 'center', justifyContent: 'center', marginTop: 0, marginBottom: 12}}>
            <View style={{flex:1, maxWidth: 414, backgroundColor: null, flexDirection:'row', justifyContent:'space-between'}}>
  
            <View style={{ width: '50%' }}>
              {/* <Text style={{ fontSize: 13, color: 'grey', marginLeft: 13,marginTop:18 }}>Delivery mode:</Text> */}

              <Text style={{ fontSize: 13, color: 'grey', marginLeft: 13,marginTop:10 }}>Shipping mode:</Text>

              <Text style={{ fontSize: 13, color: 'grey', marginLeft: 13,marginTop:10 }}>Total Charges:</Text>
              </View>
  
           
            <View style={{ width: '50%' }}>
{/*              
              <Text style={{ fontSize: 13, color: 'grey', marginLeft: 13,marginTop:18 }}>{this.props.navigation.state.params.quoteOrShipmentData.DeliveryMode}</Text> */}

              <Text style={{ fontSize: 13, color: 'grey', marginLeft: 13,marginTop:10 }}>{this.props.navigation.state.params.quoteOrShipmentData.ShippingMode}</Text>

              <Text style={{ fontSize: 13, color: 'grey', marginLeft: 13,marginTop:10 }}>{'$'+String(parseFloat(this.props.navigation.state.params.quoteOrShipmentData.totalprice).toFixed(2))}</Text>
            </View>
          
  
  
            </View>
            </View>




            { this.props.navigation.state.params.quoteOrShipmentData.Document_array.length > 0 &&   <View style={styles.cardBox2New}>
              <View style={styles.dtlsHead}><Text style={{color:'#fff'}}>For Document</Text></View>
              <FlatList
              horizontal
              scrollEnabled={this.state.scrollEnabledDoc}
                data={this.props.navigation.state.params.quoteOrShipmentData.Document_array}
                renderItem={({ item, index }) => (
                  // <TouchableWithoutFeedback onPress={() => this.navigationToDetailsScreen1(item,index)}>
                  <View style={styles.itemBox}>
                          <View style={{flexDirection:'row', alignItems: 'center', justifyContent: 'center', marginTop: 0}}>
            <View style={{flex:1, maxWidth: 414, backgroundColor: null, flexDirection:'row', justifyContent:'space-between'}}>
    
  
            <View style={{ width: '70%' }}>

              <Text style={{ fontSize: 13, color: 'grey', marginLeft: 2,marginTop:10, marginRight: 5 }}>{'Document Category: '+ item.documentCategory}</Text>

              <Text style={{ fontSize: 13, color: 'grey', marginLeft: 2,marginTop:10, marginRight: 5 }}>{'Sub Category: '+ item.documentSubCategory}</Text>

              <Text style={{ fontSize: 13, color: 'grey', marginLeft: 2,marginTop:10, marginRight: 5 }}>{'Item: '+ item.documentItem}</Text>

              <Text style={{ fontSize: 13, color: 'grey', marginLeft: 2,marginTop:10, marginRight: 5 }}>{'Value of your shipment: '+ item.documentvalueOfShipment}</Text>
              { item.documentprotectShipment == true &&
             
              <Text style={{ fontSize: 13, color: 'grey', marginLeft: 2,marginTop:10, marginRight: 5 }}>Protect your shipment: Yes</Text>
             }

{ item.documentprotectShipment == false &&
              <Text style={{ fontSize: 13, color: 'grey', marginLeft: 2,marginTop:10, marginRight: 5 }}>{'Protect your shipment: No'}</Text>
                }
          
              </View>
          
            </View>
  
           
                      </View>
                      
                         
                </View>
                // </TouchableWithoutFeedback>
                )}
                keyExtractor={(item, index) => index}
              />
              </View>     }


              { this.props.navigation.state.params.quoteOrShipmentData.Package_array.length > 0 && <View style={styles.cardBox2New}>
              <View style={styles.dtlsHead}><Text style={{color:'#fff'}}>For Package</Text></View>
              
              <FlatList
              horizontal
              scrollEnabled={this.state.scrollEnabledPack}
                data={this.props.navigation.state.params.quoteOrShipmentData.Package_array}
                renderItem={({ item, index }) => (
                  // <TouchableWithoutFeedback onPress={() => this.navigationToDetailsScreen1(item,index)}>
                  <View style={styles.itemBox}>
                          <View style={{flexDirection:'row', alignItems: 'center', justifyContent: 'center', marginTop: 0}}>
            <View style={{flex:1, maxWidth: 414, backgroundColor: null, flexDirection:'row', justifyContent:'space-between'}}>
    
  
            <View style={{ width: '70%' }}>

            <Text style={{ fontSize: 13, color: 'grey', marginLeft: 2,marginTop:10, marginRight: 5 }}>{'Package Category: '+ item.packageCategory}</Text>

<Text style={{ fontSize: 13, color: 'grey', marginLeft: 2,marginTop:10, marginRight: 5 }}>{'Sub Category: '+ item.packageSubCategory}</Text>

<Text style={{ fontSize: 13, color: 'grey', marginLeft: 2,marginTop:10, marginRight: 5 }}>{'Item: '+ item.packageItem}</Text>

<Text style={{ fontSize: 13, color: 'grey', marginLeft: 2,marginTop:10, marginRight: 5 }}>{'Description: '+item.packageDescribeShipment}</Text>

<Text style={{ fontSize: 13, color: 'grey', marginLeft: 2,marginTop:10, marginRight: 5 }}>{'Reference: '+ item.packageReference}</Text>

<Text style={{ fontSize: 13, color: 'grey', marginLeft: 2,marginTop:10, marginRight: 5 }}>{'Value of your shipment: '+item.packagevalueOfShipment}</Text>
{ item.packageprotectShipment == true &&
             
             <Text style={{ fontSize: 13, color: 'grey', marginLeft: 2,marginTop:10, marginRight: 5 }}>Protect your shipment: Yes</Text>
            }
            { item.packageprotectShipment == false &&
             
             <Text style={{ fontSize: 13, color: 'grey', marginLeft: 2,marginTop:10, marginRight: 5 }}>Protect your shipment: No</Text>
            }
{/* <Text style={{ fontSize: 13, color: 'grey', marginLeft: 2,marginTop:10, marginRight: 5 }}>{'Protect your shipment: '+item.packageprotectShipment}</Text> */}

<Text style={{ fontSize: 13, color: 'grey', marginLeft: 2,marginTop:10, marginRight: 5 }}>{'Quantity: '+item.packageQuantity}</Text>

<Text style={{ fontSize: 13, color: 'grey', marginLeft: 2,marginTop:10, marginRight: 5 }}>{'Length: '+item.packageLength + ' '+ item.lengthType}</Text>

<Text style={{ fontSize: 13, color: 'grey', marginLeft: 2,marginTop:10, marginRight: 5 }}>{'Breadth: '+item.packageBreadth + ' '+ item.breadthType}</Text>

<Text style={{ fontSize: 13, color: 'grey', marginLeft: 2,marginTop:10, marginRight: 5 }}>{'Height: '+item.packageHeight + ' '+ item.heightType}</Text>

<Text style={{ fontSize: 13, color: 'grey', marginLeft: 2,marginTop:10, marginRight: 5 }}>{'Weight: '+item.packageWeight + ' '+ item.WeightType}</Text>

              </View>
  
            </View>
  
           
                      </View>
                      
                         
                </View>
                // </TouchableWithoutFeedback>
                )}
                keyExtractor={(item, index) => index}
              />
              </View>   }

              { this.props.navigation.state.params.navigationFlag == 'shipment' &&   <View style={{flexDirection:'row', marginTop: 10}}>
 <Text style={{ fontSize: 14, color: 'grey', marginLeft: 13, fontWeight: 'bold' }}>Payment</Text>
 </View> }

 { this.props.navigation.state.params.navigationFlag == 'shipment' && <View style={{flexDirection:'row', alignItems: 'center', justifyContent: 'center', marginTop: 0}}>
            <View style={{flex:1, maxWidth: 414, backgroundColor: null, flexDirection:'row', justifyContent:'space-between'}}>
  
            
              <View style={{marginLeft:13,marginTop:10, marginRight: 7, width: '40%'}}>
                <RadioForm
  radio_props={radio_props1}
  style={{
    backgroundColor: 'rgba(246, 244, 243, 1)'
}}
  initial={this.state.radioValueHaveDetails}
  formHorizontal={false}
  buttonColor={'rgba(198, 35, 0, 1)'}
  selectedButtonColor={'rgba(198, 35, 0, 1)'}
       //   buttonOuterColor={'rgba(204, 32, 0, 1)'}
  
  labelStyle={{fontSize: 12, color: 'gray', marginRight:7, fontWeight: 'bold'}}
  onPress={(value) => {this.switchingBetweenHaveDetailsOfItem(value)}}
/>
</View>  

<View style={{marginLeft:10,marginTop:10, marginRight: 7, width: '50%'}}>
<View style={{ marginLeft: 0, marginTop: -8}}>
            <Image style={{ height: 45, width: 30,resizeMode: 'contain'}}
                source={require('../Images/card.png')}></Image>
                </View> 

                <View style={{ marginLeft: 0, marginTop: -10}}>
            <Image style={{ height: 45, width: 30,resizeMode: 'contain'}}
                source={require('../Images/cash.png')}></Image>  
                </View>       
</View> 

</View>
</View> }

               
              <TouchableOpacity style={{ height: 40, marginLeft: Dimensions.get('window').width - 220,
marginTop:45, borderRadius:2, backgroundColor: 'green', width: 170, marginBottom: 65, padding: 6}} onPress ={() => this.SubmitButtonCliecked()}>
              <Text style={{  fontSize:20,fontWeight: "bold",color:'white',
 textAlign: 'center', textAlignVertical: 'center',
color: 'white',}}>
   {this.state.submitButtonTitle}
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
  SubmitButtonCliecked()
  {
    // documentSpeedRateID ID
    /*
    location_type, shipment_type_option, delivery_speed, customer_id, charges_final, user_id, firstname, lastname, 
    address_from, address2, company_name, country, state, city, zip, email, telephone, address_type, firstname_to, 
    lastname_to, address_to, address2_to, company_name_to, country_to, state_to, city_to, zip_to, email_to, telephone_to,
     address_type_to, document_category(id), document_sub_cat(id), document_item(id), other_details_document, 
     value_of_shipment_parcel, protect_parcel, shipment_description_parcel, package_category(id), 
     package_sub_cat(id), package_item(id), other_details_parcel, shipment_description_parcel, 
     value_of_shipment_parcel, protect_parcel, referance_parcel, length, length_dimen, breadth, breadth_dimen, 
     height, height_dimen, weight, weight_dimen
     */

//  location_type, shipment_type_option, delivery_speed, customer_id, charges_final, user_id, firstname, lastname, 
    //  address_from, address2, company_name, country, state, city, zip, email, telephone, address_type, firstname_to, 
    //  lastname_to, address_to, address2_to, company_name_to, country_to, state_to, city_to, zip_to, email_to, 
    //  telephone_to, address_type_to, document_category(id), document_sub_cat(id), document_item(id), 
    //  other_details_document, value_of_shipment_parcel_document, protect_parcel_document, 
    //  shipment_description_parcel, package_category(id), package_sub_cat(id), package_item(id), 
    //  other_details_parcel, shipment_description_parcel, value_of_shipment_parcel_package, protect_parcel_package, 
    //  referance_parcel, length, length_dimen, breadth, breadth_dimen, height, height_dimen, weight, weight_dimen    

    console.log('array length', this.props.navigation.state.params.quoteOrShipmentData.DocumentAndPackage_array)

    // alert('We are developing this syning feature', this.props.navigation.state.params.quoteOrShipmentData.Document_array.length)
    var dictionary_main = {};

    dictionary_main['location_type'] = this.state.locationType//this.props.navigation.state.params.quoteOrShipmentData.DomesticOrInternational
   // dictionary_main['shipment_type_option'] = this.state.shipmentType//this.props.navigation.state.params.quoteOrShipmentData.TypeOfShipment
    dictionary_main['delivery_speed'] = this.props.navigation.state.params.quoteOrShipmentData.DeliveryModeID
    dictionary_main['charges_final'] = this.props.navigation.state.params.quoteOrShipmentData.chargesModeID
    dictionary_main['customer_id'] = this.state.UserIDString
    dictionary_main['user_id'] = this.state.UserIDString
    dictionary_main['loopkey'] = this.state.loopkey
    dictionary_main['insurance'] = this.props.navigation.state.params.quoteOrShipmentData.insurance
    
    

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


    if (this.props.navigation.state.params.quoteOrShipmentData.DocumentAndPackage_array.length>0)
    {

      if (this.props.navigation.state.params.quoteOrShipmentData.DocumentAndPackage_array[0].documentOrPackage == 'document')
      {

        var protect_parcel_document_string = ''
        if (this.props.navigation.state.params.quoteOrShipmentData.DocumentAndPackage_array[0].documentprotectShipment == true)
        {
          protect_parcel_document_string = '1'
        }
        else
        {
          protect_parcel_document_string = '0'
        }

        dictionary_main['document_category'] = this.props.navigation.state.params.quoteOrShipmentData.DocumentAndPackage_array[0].documentCategoryID
        dictionary_main['document_sub_cat'] = this.props.navigation.state.params.quoteOrShipmentData.DocumentAndPackage_array[0].documentSubCategoryID
        dictionary_main['document_item'] = this.props.navigation.state.params.quoteOrShipmentData.DocumentAndPackage_array[0].documentItemID
        dictionary_main['protect_parcel_document'] = protect_parcel_document_string
        dictionary_main['value_of_shipment_parcel_document'] = this.props.navigation.state.params.quoteOrShipmentData.DocumentAndPackage_array[0].documentvalueOfShipment
        dictionary_main['other_details_document'] = ''
        dictionary_main['rates'] = this.props.navigation.state.params.quoteOrShipmentData.DocumentAndPackage_array[0].documentRates
        dictionary_main['shipment_type_option'] = '1'
        dictionary_main['insurance'] = this.props.navigation.state.params.quoteOrShipmentData.DocumentAndPackage_array[0].documentInsurance

      }
      else
      {

        var protect_parcel_package_string = ''
        if (this.props.navigation.state.params.quoteOrShipmentData.DocumentAndPackage_array[0].packageprotectShipment == true)
        {
          protect_parcel_package_string = '1'
        }
        else
        {
          protect_parcel_package_string = '0'
        }

        dictionary_main['package_category'] = this.props.navigation.state.params.quoteOrShipmentData.DocumentAndPackage_array[0].packageCategoryID
        dictionary_main['package_sub_cat'] = this.props.navigation.state.params.quoteOrShipmentData.DocumentAndPackage_array[0].packageSubCategoryID
        dictionary_main['package_item'] = this.props.navigation.state.params.quoteOrShipmentData.DocumentAndPackage_array[0].packageItemID
        dictionary_main['protect_parcel_package'] = protect_parcel_package_string
        dictionary_main['value_of_shipment_parcel_package'] = this.props.navigation.state.params.quoteOrShipmentData.DocumentAndPackage_array[0].packagevalueOfShipment
        dictionary_main['shipment_description_parcel'] = this.props.navigation.state.params.quoteOrShipmentData.DocumentAndPackage_array[0].packageDescribeShipment
        dictionary_main['referance_parcel'] = this.props.navigation.state.params.quoteOrShipmentData.DocumentAndPackage_array[0].packageReference
        dictionary_main['length'] = this.props.navigation.state.params.quoteOrShipmentData.DocumentAndPackage_array[0].packageLength
        dictionary_main['length_dimen'] = this.props.navigation.state.params.quoteOrShipmentData.DocumentAndPackage_array[0].lengthType
        dictionary_main['breadth'] = this.props.navigation.state.params.quoteOrShipmentData.DocumentAndPackage_array[0].packageBreadth
        dictionary_main['breadth_dimen'] = this.props.navigation.state.params.quoteOrShipmentData.DocumentAndPackage_array[0].breadthType
        dictionary_main['height'] = this.props.navigation.state.params.quoteOrShipmentData.DocumentAndPackage_array[0].packageHeight
        dictionary_main['height_dimen'] = this.props.navigation.state.params.quoteOrShipmentData.DocumentAndPackage_array[0].heightType
        dictionary_main['weight'] = this.props.navigation.state.params.quoteOrShipmentData.DocumentAndPackage_array[0].packageWeight
        dictionary_main['weight_dimen'] = this.props.navigation.state.params.quoteOrShipmentData.DocumentAndPackage_array[0].WeightType
        dictionary_main['other_details_parcel'] = ''
        dictionary_main['rates'] = this.props.navigation.state.params.quoteOrShipmentData.DocumentAndPackage_array[0].packageRates
        dictionary_main['quantity'] = this.props.navigation.state.params.quoteOrShipmentData.DocumentAndPackage_array[0].packageQuantity
        dictionary_main['shipment_type_option'] = '2'
        dictionary_main['insurance'] = this.props.navigation.state.params.quoteOrShipmentData.DocumentAndPackage_array[0].packageInsurance
      }



    for(let i = 1; i < this.props.navigation.state.params.quoteOrShipmentData.DocumentAndPackage_array.length; i++)
    {
     
      if (this.props.navigation.state.params.quoteOrShipmentData.DocumentAndPackage_array[i].documentOrPackage == 'document')
      {

        var protect_parcel_document_string1 = ''
        if (this.props.navigation.state.params.quoteOrShipmentData.DocumentAndPackage_array[i].documentprotectShipment == true)
        {
          protect_parcel_document_string1 = '1'
        }
        else
        {
          protect_parcel_document_string1 = '0'
        }

        dictionary_main['document_category_'+String(i)] = this.props.navigation.state.params.quoteOrShipmentData.DocumentAndPackage_array[i].documentCategoryID
        dictionary_main['document_sub_cat_'+String(i)] = this.props.navigation.state.params.quoteOrShipmentData.DocumentAndPackage_array[i].documentSubCategoryID
        dictionary_main['document_item_'+String(i)] = this.props.navigation.state.params.quoteOrShipmentData.DocumentAndPackage_array[i].documentItemID
        dictionary_main['protect_parcel_document_'+String(i)] = protect_parcel_document_string1
        dictionary_main['value_of_shipment_parcel_document_'+String(i)] = this.props.navigation.state.params.quoteOrShipmentData.DocumentAndPackage_array[i].documentvalueOfShipment
        dictionary_main['other_details_document_'+String(i)] = ''
        dictionary_main['rates_'+String(i)] = this.props.navigation.state.params.quoteOrShipmentData.DocumentAndPackage_array[i].documentRates
        dictionary_main['shipment_type_option_'+String(i)] = '1'
        dictionary_main['insurance_'+String(i)] = this.props.navigation.state.params.quoteOrShipmentData.DocumentAndPackage_array[i].documentInsurance
      }
      else
      {

        var protect_parcel_package_string1 = ''
        if (this.props.navigation.state.params.quoteOrShipmentData.DocumentAndPackage_array[i].packageprotectShipment == true)
        {
          protect_parcel_package_string1 = '1'
        }
        else
        {
          protect_parcel_package_string1 = '0'
        }

        dictionary_main['package_category_'+String(i)] = this.props.navigation.state.params.quoteOrShipmentData.DocumentAndPackage_array[i].packageCategoryID
        dictionary_main['package_sub_cat_'+String(i)] = this.props.navigation.state.params.quoteOrShipmentData.DocumentAndPackage_array[i].packageSubCategoryID
        dictionary_main['package_item_'+String(i)] = this.props.navigation.state.params.quoteOrShipmentData.DocumentAndPackage_array[i].packageItemID
        dictionary_main['protect_parcel_package_'+String(i)] = protect_parcel_package_string1
        dictionary_main['value_of_shipment_parcel_package_'+String(i)] = this.props.navigation.state.params.quoteOrShipmentData.DocumentAndPackage_array[i].packagevalueOfShipment
        dictionary_main['shipment_description_parcel_'+String(i)] = this.props.navigation.state.params.quoteOrShipmentData.DocumentAndPackage_array[i].packageDescribeShipment
        dictionary_main['referance_parcel_'+String(i)] = this.props.navigation.state.params.quoteOrShipmentData.DocumentAndPackage_array[i].packageReference
        dictionary_main['length_'+String(i)] = this.props.navigation.state.params.quoteOrShipmentData.DocumentAndPackage_array[i].packageLength
        dictionary_main['length_dimen_'+String(i)] = this.props.navigation.state.params.quoteOrShipmentData.DocumentAndPackage_array[i].lengthType
        dictionary_main['breadth_'+String(i)] = this.props.navigation.state.params.quoteOrShipmentData.DocumentAndPackage_array[i].packageBreadth
        dictionary_main['breadth_dimen_'+String(i)] = this.props.navigation.state.params.quoteOrShipmentData.DocumentAndPackage_array[i].breadthType
        dictionary_main['height_'+String(i)] = this.props.navigation.state.params.quoteOrShipmentData.DocumentAndPackage_array[i].packageHeight
        dictionary_main['height_dimen_'+String(i)] = this.props.navigation.state.params.quoteOrShipmentData.DocumentAndPackage_array[i].heightType
        dictionary_main['weight_'+String(i)] = this.props.navigation.state.params.quoteOrShipmentData.DocumentAndPackage_array[i].packageWeight
        dictionary_main['weight_dimen_'+String(i)] = this.props.navigation.state.params.quoteOrShipmentData.DocumentAndPackage_array[i].WeightType
        dictionary_main['rates_'+String(i)] = this.props.navigation.state.params.quoteOrShipmentData.DocumentAndPackage_array[i].packageRates
        dictionary_main['quantity_'+String(i)] = this.props.navigation.state.params.quoteOrShipmentData.DocumentAndPackage_array[i].packageQuantity
        dictionary_main['other_details_parcel_'+String(i)] = ''
        dictionary_main['shipment_type_option_'+String(i)] = '2'
        dictionary_main['insurance_'+String(i)] = this.props.navigation.state.params.quoteOrShipmentData.DocumentAndPackage_array[i].packageInsurance
      }

    }

    this.uploadDetailsToCloudApiCall(dictionary_main)
  //  console.log('dictionary_main=>', dictionary_main)
  }


  

  

  }

  uploadDetailsToCloudApiCall = (dictionary_main) => {

    console.log('uploadDetailsToCloudApiCall called=>')

    var params = {}
    var url = ''
    
    
      url = UrlUtil.BASE_URL + 'api/creatQuote';
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

        Notifications1.schduleNotification1(new Date(Date.now()), 'Your quote has been successfully created');
        // user_id, quote_id, payment_mode, credit_outstanding_amount, subtotal, discount, ga_percentage, 
        // ga_tax_amt, ra_percentage, ra_tax_amt, grand_total
        Alert.alert(
          json.message,
          'Do you want create an Order using this quotation?', // <- this part is optional, you can pass an empty string
          [
            {text: 'NO', onPress: () => this.props.navigation.navigate('DashPage')},
            {text: 'YES', onPress: () => this.ConfirmedToOrder(json.quotation_data.quote_no, json.quotation_data.quotation_id,
              this.state.UserIDString, this.props.navigation.state.params.quoteOrShipmentData.price, 
              this.props.navigation.state.params.quoteOrShipmentData.ga_percentage, this.props.navigation.state.params.quoteOrShipmentData.ga_tax_amt,
              this.props.navigation.state.params.quoteOrShipmentData.ra_percentage, this.props.navigation.state.params.quoteOrShipmentData.ra_tax_amt,
              this.props.navigation.state.params.quoteOrShipmentData.totalprice)},
            
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
      alert('error = '+JSON.stringify(err));
    })
      
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
  
  async componentDidMount() 
  {



if (this.props.navigation.state.params.quoteOrShipmentData.Document_array.length > 0 && this.props.navigation.state.params.quoteOrShipmentData.Package_array.length > 0)
{
  this.setState({selectedParcelType: 'Document And Package'})
  
}
else if (this.props.navigation.state.params.quoteOrShipmentData.Document_array.length > 0)
{
  this.setState({selectedParcelType: 'Document'})
}
else
{
  this.setState({selectedParcelType: 'Package'})
}

    


    if (this.props.navigation.state.params.quoteOrShipmentData.DomesticOrInternational == 'Domestic')
    {
      this.setState({locationType: '1'})
    }
    else
    {
      this.setState({locationType: '2'})
    }

    if (this.props.navigation.state.params.quoteOrShipmentData.fromUserdata.FromAddressTypeString == 0)
    {
      this.setState({FromAddressTypeString: 'Home Address'})
    }
    else
    {
      this.setState({FromAddressTypeString: 'Business Address'})
    }


    if (this.props.navigation.state.params.quoteOrShipmentData.toUserdata.ToAddressTypeString == 0)
    {
      this.setState({ToAddressTypeString: 'Home Address'})
    }
    else
    {
      this.setState({ToAddressTypeString: 'Business Address'})
    }

    // if (this.props.navigation.state.params.quoteOrShipmentData.TypeOfShipment == 'Document')
    // {
    //   this.setState({shipmentType: '1'})
    // }
    // else
    // {
    //   this.setState({shipmentType: '2'})
    // }


    if (this.props.navigation.state.params.quoteOrShipmentData.DocumentAndPackage_array.length==1)
    {
      this.setState({
        loopkey: 0,
      });
    }
    else
    {
      this.setState({
        loopkey: this.props.navigation.state.params.quoteOrShipmentData.DocumentAndPackage_array.length -1,
      });
    }

    if (this.props.navigation.state.params.quoteOrShipmentData.Document_array.length==1)
    {
      this.setState({
        scrollEnabledDoc: false,
      });
    }

    if (this.props.navigation.state.params.quoteOrShipmentData.Package_array.length==1)
    {
      this.setState({
        scrollEnabledPack: false,
      });
    }

    let user = await AsyncStorage.getItem('userdata');
    let parsed = JSON.parse(user);

    this.setState({
      UserIDString: parsed.user_id,
    });

    console.log('quoteOrShipmentData=> ', this.props.navigation.state.params.quoteOrShipmentData)

    this.setState({
      FromFirstnameString: this.props.navigation.state.params.quoteOrShipmentData.fromUserdata.FromFirstnameString,
      FromLastnameString: this.props.navigation.state.params.quoteOrShipmentData.fromUserdata.FromLastnameString,
      FromAddress1String: this.props.navigation.state.params.quoteOrShipmentData.fromUserdata.FromAddress1String,
       FromAddress2String: this.props.navigation.state.params.quoteOrShipmentData.fromUserdata.FromAddress2String,
       FromCountryString: this.props.navigation.state.params.quoteOrShipmentData.fromUserdata.FromCountryString,
       FromStateString: this.props.navigation.state.params.quoteOrShipmentData.fromUserdata.FromStateString,
       FromCityString: this.props.navigation.state.params.quoteOrShipmentData.fromUserdata.FromCityString,
       FromZipCodeString: this.props.navigation.state.params.quoteOrShipmentData.fromUserdata.FromZipCodeString,
       FromPhoneString: this.props.navigation.state.params.quoteOrShipmentData.fromUserdata.FromPhoneString,
       FromEmailString: this.props.navigation.state.params.quoteOrShipmentData.fromUserdata.FromEmailString,
       FromCompanyString: this.props.navigation.state.params.quoteOrShipmentData.fromUserdata.FromCompanyString,
       WebsiteString: this.props.navigation.state.params.quoteOrShipmentData.fromUserdata.WebsiteString,


      

       ToFirstnameString: this.props.navigation.state.params.quoteOrShipmentData.toUserdata.ToFirstnameString,
       ToLastnameString: this.props.navigation.state.params.quoteOrShipmentData.toUserdata.ToLastnameString,
       ToAddress1String: this.props.navigation.state.params.quoteOrShipmentData.toUserdata.ToAddress1String,
       ToAddress2String: this.props.navigation.state.params.quoteOrShipmentData.toUserdata.ToAddress2String,
       ToCountryString: this.props.navigation.state.params.quoteOrShipmentData.toUserdata.ToCountryString,
       ToCompanyString: this.props.navigation.state.params.quoteOrShipmentData.toUserdata.ToCompanyString,
       ToStateString: this.props.navigation.state.params.quoteOrShipmentData.toUserdata.ToStateString,
       ToCityString: this.props.navigation.state.params.quoteOrShipmentData.toUserdata.ToCityString,
       ToZipCodeString: this.props.navigation.state.params.quoteOrShipmentData.toUserdata.ToZipCodeString,
       ToEmailString: this.props.navigation.state.params.quoteOrShipmentData.toUserdata.ToEmailString,
       ToPhoneString: this.props.navigation.state.params.quoteOrShipmentData.toUserdata.ToPhoneString,
  
      
     });

     if (this.props.navigation.state.params.navigationFlag == 'shipment')
     {
      this.setState({
      submitButtonTitle: 'Confirm Order'
      })
     }
     else
     {
      this.setState({
        submitButtonTitle: 'Create Quote'
        })
     }

   // this.customCountryStateCityApiCall()
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
  });