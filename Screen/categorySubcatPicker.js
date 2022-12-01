import React,{Component} from 'react';

import { StyleSheet, Image,ImageBackground, View,Text, TextInput, TouchableOpacity, Dimensions, SafeAreaView, ScrollView, Modal, FlatList, Alert, BackHandler, 
  AsyncStorage, PermissionsAndroid,
  Platform, Linking} from 'react-native';
import {StatusBar} from 'react-native';
import {NavigationEvents} from 'react-navigation';
import AnimateLoadingButton from 'react-native-animate-loading-button';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import KeyboardManager from 'react-native-keyboard-manager';
import Spinner from 'react-native-loading-spinner-overlay';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import visibility_off from '../Images/visibility_off.png';
import visibility_on from '../Images/visibility_on.png';
import CountryPicker, { DARK_THEME } from 'react-native-country-picker-modal'
var radio_props = [
  {label: 'Normal user', value: 0 },
  {label: 'Business User', value: 1 }
];
import UrlUtil from '../Service/UrlUtils';
import Geolocation from '@react-native-community/geolocation';
import Geocoder from 'react-native-geocoding';
var selectedComboFlag = 'country'
export default class Login extends Component{

  constructor(props) {
    super(props);
    this.state = {
      radioValue: 0,
      seachableModalVisible: false,
      data: [],
      dropdownMasterData: [],
      value: '',
      // selectedComboFlag: 'country',
      selectedCountryID: '',
      selectedStateID: '',
      selectedCityID: '',
      CountryStateCityFetchURL: 'https://api.countrystatecity.in/v1/countries',

      FirstnameString: '',
      LastnameString: '',
      CompanyNameString: '',
      WebsiteString: '',
      Address1String: '',
      Address2String: '',
      CountryString: 'Country',
      StateString: 'State',
      CityString: 'City',
      ZipcodeString: '',
      PhoneString: '',
      EmailString: '',
      PasswordString: '',
      ConfirmPasswordString: '',
      token: '',
      showPassword: true,
      imgSource: visibility_off,
      countryCodeString : 'IN',
      FcmTokenString: '',
      progress: false,
      serchPalceholderText: ''


    }
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    this.callToSetAddress1Value = this.callToSetAddress1Value.bind(this);
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
 
                                <View style={styles.modalStyle}>
        <FlatList
          data={this.state.data}
          renderItem={this.renderSearchableData}
           keyExtractor={item => item.category_name}
          ItemSeparatorComponent={this.renderSeparator}
           ListHeaderComponent={this.renderHeader}
        />
     
                                </View>

</View>
            </View>

           
            </SafeAreaView >
      
    );
  }
  async componentDidMount() 
  {



selectedComboFlag = this.props.navigation.state.params.flagtoShow

if (this.props.navigation.state.params.flagtoShow == 'docCat')
  {
    this.setState({ 
      serchPalceholderText: 'Please type document category name',
    })
    this.selectDocumentOrPackageCategory('docCat')
  }
  else if (this.props.navigation.state.params.flagtoShow == 'docSubCat')
  {
    this.setState({ 
      serchPalceholderText: 'Please type document sub category name',
    })
    this.selectDocumentOrPackageCategory('docSubCat')
  }
  else if (this.props.navigation.state.params.flagtoShow == 'docItem')
  {
    this.setState({ 
      serchPalceholderText: 'Please type document item name',
    })
    this.selectDocumentOrPackageCategory('docItem')
  }
  else if (this.props.navigation.state.params.flagtoShow == 'packCat')
  {
    this.setState({ 
      serchPalceholderText: 'Please type package category name',
    })
    this.selectDocumentOrPackageCategory('packCat')
  }
  else if (this.props.navigation.state.params.flagtoShow == 'packSubCat')
  {
    this.setState({ 
      serchPalceholderText: 'Please type package sub category name',
    })
    this.selectDocumentOrPackageCategory('packSubCat')
  }
  else if (this.props.navigation.state.params.flagtoShow == 'packItem')
  {
    this.setState({ 
      serchPalceholderText: 'Please type package item name',
    })
    this.selectDocumentOrPackageCategory('packItem')
  }
  else
  {

  }
  
}
selectDocumentOrPackageCategory(flagtoShow) 
    {
      this.setState({
        progress:true
    })


console.log('selectedFlag => ', flagtoShow)

      var params = {}
      var subURL = ''
      // documentCategory documentSubCategory documentItem packageCategory packageSubCategory packageItem
    
      
      

        if (flagtoShow == 'docCat')
           {
            subURL = 'api/item_cat_list_by_shipping_cat',
            params = 
            {
              
              type: '1',
            
            }

           }
           else if (flagtoShow == 'docSubCat')
           {
            subURL = 'api/item_subcat_list_by_shipping_cat_itemcat',
            params = 
            {
          
              type: '1',
              item_cat_id: this.props.navigation.state.params.item_cat_id
            
            }
           }
           else if (flagtoShow == 'docItem')
           {
            subURL = 'api/item_list_by_cat_type',
            params = 
            {
          
              type: '1',
              item_cat_id: this.props.navigation.state.params.item_cat_id
            
            }
           }
           else if (flagtoShow == 'packCat')
      {
        subURL = 'api/item_cat_list_by_shipping_cat',
       params = 
       {
     
         type: '2',
       
       }


      }
      else if (flagtoShow == 'packSubCat')
      {
        subURL = 'api/item_subcat_list_by_shipping_cat_itemcat',
        params = 
        {
      
          type: '2',
          item_cat_id: this.props.navigation.state.params.item_cat_id
        
        }
      }
      else if (flagtoShow == 'packItem')
      {
        subURL = 'api/item_list_by_cat_type',
        params = 
        {
      
          type: '2',
          item_cat_id: this.props.navigation.state.params.item_cat_id
        
        }
      }
      else
           {
             return
           }
    
      
    const { navigate } = this.props.navigation;
    
     //const url = UrlUtil.BASE_URL + 'api/item_cat_list_by_shipping_cat';
     const url = UrlUtil.BASE_URL + subURL;
    
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
          this.setState({
            progress:false
        })

        // if (selectedComboFlag == 'state' || selectedComboFlag == 'tostate' || selectedComboFlag == 'fromstate')
        // {
        //  this.setState({data: json.stateList, value: '', dropdownMasterData: json.stateList})
   
        // }
        // else
        // {
        //  this.setState({data: json.cityList, value: '', dropdownMasterData: json.cityList})
   
        // }


          if (this.props.navigation.state.params.flagtoShow == 'docCat' || this.props.navigation.state.params.flagtoShow == 'packCat')
             {

              console.log('this.props.navigation.state.params.flagtoShow: ',this.props.navigation.state.params.flagtoShow)

              this.setState({ data: json.ItemCatList, dropdownMasterData: json.ItemCatList, value: ''})
             }
             else if (this.props.navigation.state.params.flagtoShow == 'docSubCat' || this.props.navigation.state.params.flagtoShow == 'packSubCat')
             {
              this.setState({ data: json.ItemSubCatList, dropdownMasterData: json.ItemSubCatList, value: ''})
             }
             else if (this.props.navigation.state.params.flagtoShow == 'docItem' || this.props.navigation.state.params.flagtoShow == 'packItem')
             {
              this.setState({ data: json.ItemList, dropdownMasterData: json.ItemList, value: ''})
             }
             else
             {
               return
             }
       
     
         
    
          
        }
        else
        {
           this.setState({
          progress:false
      })
          alert(json.message)
        }
    
    
      })
      .catch((err) => {
        this.setState({
          progress:false
      })
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


  renderSearchableData = ({ item, index }) => {
    //console.log('renderSearchableData ==> ', item)
    return (
      <View>
        <TouchableOpacity onPress={() => this.selectItemOnDropDown(item)}>
        <Text style={{ padding: 10, color: 'black' }}>{item.category_name} </Text>
        </TouchableOpacity>
      </View>
    );
   }
  selectItemOnDropDown = (item) => 
  {

    this.props.navigation.goBack(null);
    this.props.navigation.state.params.onSelect({ 
          selectedFlagForCombo: this.props.navigation.state.params.selectedFlagForCombo,
          index: this.props.navigation.state.params.index,
          navigationFlag1: 'categoryPicker',
          category_name: item.category_name,
          cat_id: item.cat_id
       });
    //return true;



  //   this.props.navigation.navigate('ParcelDetailsPage',{
  //     selectedFlagForCombo: this.props.navigation.state.params.selectedFlagForCombo,
  //     index: this.props.navigation.state.params.index,
  //     navigationFlag1: 'categoryPicker',
  //     category_name: item.category_name,
  //     cat_id: item.cat_id
  // });

 










//      if (this.props.navigation.state.params.navigationFlagForAddress1 == 'editProfilePicker')
//      {
//       if (selectedComboFlag == 'country')
//       {
//         this.props.navigation.navigate('EditProfilePage',{
//           CountryString: item.name,
//           selectedCountryID: item.id,
//           sortname: item.sortname,
//           navigationFlagForAddress1: 'editProfilePicker',
//           flagtoShow: 'country'
//       });
//       }
      
//        if (selectedComboFlag == 'state')
//       {
        
//         this.props.navigation.navigate('EditProfilePage',{
//           StateString: item.name,
//           selectedStateID: item.id,
//           navigationFlagForAddress1: 'editProfilePicker',
//           flagtoShow: 'state'
//       });
//       }
      
  
//       if (selectedComboFlag == 'city') 
//       {
//         this.props.navigation.navigate('EditProfilePage',{
//           CityString: item.name,
//           selectedCityID: item.id,
//           navigationFlagForAddress1: 'editProfilePicker',
//           flagtoShow: 'city'
  
//       });
//       }
//      }
// else
// {
//     if (selectedComboFlag == 'country')
//     {
//       this.props.navigation.navigate('RegistrationPage',{
//         CountryString: item.name,
//         selectedCountryID: item.id,
//         sortname: item.sortname,
//         navigationFlagForAddress1: 'registrationPicker',
//         flagtoShow: 'country'
//     });
//     }
    
//      if (selectedComboFlag == 'state')
//     {
      
//       this.props.navigation.navigate('RegistrationPage',{
//         StateString: item.name,
//         selectedStateID: item.id,
//         navigationFlagForAddress1: 'registrationPicker',
//         flagtoShow: 'state'
//     });
//     }
    

//     if (selectedComboFlag == 'city') 
//     {
//       this.props.navigation.navigate('RegistrationPage',{
//         CityString: item.name,
//         selectedCityID: item.id,
//         navigationFlagForAddress1: 'registrationPicker',
//         flagtoShow: 'city'

//     });
//     }


//     if (selectedComboFlag == 'tocountry')
//     {
//       this.props.navigation.navigate('ToLocationPage',{
//         CountryString: item.name,
//         selectedCountryID: item.id,
//         sortname: item.sortname,
//         navigationFlagForAddress1: 'registrationPicker',
//         flagtoShow: 'tocountry'
//     });
//     }
    
//      if (selectedComboFlag == 'tostate')
//     {
      
//       this.props.navigation.navigate('ToLocationPage',{
//         StateString: item.name,
//         selectedStateID: item.id,
//         navigationFlagForAddress1: 'registrationPicker',
//         flagtoShow: 'tostate'
//     });
//     }
    

//     if (selectedComboFlag == 'tocity') 
//     {
//       this.props.navigation.navigate('ToLocationPage',{
//         CityString: item.name,
//         selectedCityID: item.id,
//         navigationFlagForAddress1: 'registrationPicker',
//         flagtoShow: 'tocity'

//     });
//     }


//     if (selectedComboFlag == 'fromcountry')
//     {
//       this.props.navigation.navigate('LocationPage',{
//         CountryString: item.name,
//         selectedCountryID: item.id,
//         navigationFlagForAddress1: 'registrationPicker',
//         flagtoShow: 'fromcountry'
//     });
//     }
    
//      if (selectedComboFlag == 'fromstate')
//     {
      
//       this.props.navigation.navigate('LocationPage',{
//         StateString: item.name,
//         selectedStateID: item.id,
//         navigationFlagForAddress1: 'registrationPicker',
//         flagtoShow: 'fromstate'
//     });
//     }
    

//     if (selectedComboFlag == 'fromcity') 
//     {
//       this.props.navigation.navigate('LocationPage',{
//         CityString: item.name,
//         selectedCityID: item.id,
//         navigationFlagForAddress1: 'registrationPicker',
//         flagtoShow: 'fromcity'

//     });
//     }

//   }

    // console.log('sssselected item on searchable dropdown is ==> ', item, this.state.isdependencypicklist)

    //  this.setState({ seachableModalVisible: false, dropdownheaderTitle: item.optiondisplay, [this.state.dropdownName]: item.optionvalue, })
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
    this.setState({
      value: text
    });
  
    const newData = this.state.dropdownMasterData.filter(item => {
      const itemData = `${item.category_name.toUpperCase()}`;
      const textData = text.toUpperCase();
      return itemData.includes(textData); // this will return true if our itemData contains the textData
    });
  
    this.setState({
      data: newData
    });
  };
  renderHeader = () => {
    return (
      <View
        style={{ borderColor: 'white', borderWidth: 1 }}>
      <TextInput
        style={{ height: 60, color: 'black', padding: 10, placeholderTextColor: 'black', fontSize: 11 }}
        placeholder={this.state.serchPalceholderText}
        onChangeText={text => this.searchItems(text)}
        placeholderTextColor="grey"
        value={this.state.value}
      />
      </View>
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
        height:Dimensions.get('window').height - 230,
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
        marginBottom: 20
       
        },
        modalStyle: {
          height: 480,
          alignSelf: 'center',
          marginTop: 0,
          backgroundColor: 'rgba(246, 244, 243, 1)',
          borderRadius: 6,
          width: '100%'
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
        textInput2:{
          // borderBottomWidth: 1,
          // borderBottomColor: 'grey',
          width: 200,
    marginLeft: 7,
    borderRadius: 0,
    marginRight: 7,
    backgroundColor: 'white',
    fontSize: 12,
    height: 40,
    color: 'gray',
    marginTop: 3
          
          },
          itemRow2:{
            // marginTop: 18,
            flexDirection: 'row',
          justifyContent: 'flex-start',
          alignContent: 'flex-start',
          alignItems: 'flex-start',
          width: '100%',
          // marginBottom: 20
         
          },
  });