import React,{Component} from 'react';

import { StyleSheet, Image,ImageBackground, View,Text, TextInput, TouchableOpacity, Dimensions, SafeAreaView, ScrollView, Modal, FlatList, Alert, BackHandler, AsyncStorage} from 'react-native';
import {StatusBar} from 'react-native';

import AnimateLoadingButton from 'react-native-animate-loading-button';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import UrlUtil from '../Service/UrlUtils';
import visibility_off from '../Images/visibility_off.png';
import visibility_on from '../Images/visibility_on.png';
import KeyboardManager from 'react-native-keyboard-manager';
var radio_props = [
  {label: 'Normal user', value: 0 },
  {label: 'Business User', value: 1 }
];

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
      oldPassword: '',
      newPassword: '',
      ConfirmPassword: '',
      oldPasswordStringFromAsyncStorage: '',
      UserIDString: '',

      showPassword: true,
      showPassword1: true,
      showPassword2: true,
      imgSource: visibility_off,
      imgSource1: visibility_off,
      imgSource2: visibility_off,
     

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
                <Text style={styles.login}>Change Password</Text>

                
                <View style={{marginLeft:7,marginTop:20, backgroundColor: 'white', marginRight: 7, borderWidth: 0.5,
        borderColor: 'gray', marginBottom: 20}}>

                {/* <TextInput style={styles.textInput}
                placeholder={'Old Password'}
                placeholderTextColor={'grey'}
                secureTextEntry={true}
                value = {this.state.oldPassword}
                placeholderTextColor={'grey'}
                autoCapitalize = 'none'
                onChangeText={(text) => this.setState({ oldPassword: text})}></TextInput> */}

<View style={{flexDirection:'row', alignItems: 'center', justifyContent: 'center', height: 40,
      margin: 0,
      marginTop: 0}}>
            <View style={{flex:1, maxWidth: 414, backgroundColor: null, flexDirection:'row', justifyContent:'space-between'}}>
                <TextInput style={{paddingLeft:13,color: 'gray', fontSize: 12, height: 40, fontSize: 12, width: '70%'}}
                placeholder={'Old Password'}
                secureTextEntry={this.state.showPassword}
                autoCapitalize = 'none'
                value = {this.state.oldPassword}
                placeholderTextColor={'grey'}
                onChangeText={(text) => this.setState({ oldPassword: text})}></TextInput>
                <TouchableOpacity onPress={() => this.onCheckClick()}>
                <View style={{width:20, height:20, justifyContent: 'flex-end', marginRight: 20, marginTop: 9}}>
                  <Image source={ this.state.imgSource } style={{width:20, height:20,}} />
                </View>
                </TouchableOpacity>
              </View>
              </View>

               <View style={{marginLeft:7,marginTop:0, backgroundColor: 'gray', marginRight: 7, height: 1,}}></View>
                {/* <TextInput style={styles.textInput}
                placeholder={'New Password'}
                placeholderTextColor={'grey'}
                secureTextEntry={true}
                value = {this.state.newPassword}
                placeholderTextColor={'grey'}
                autoCapitalize = 'none'
                onChangeText={(text) => this.setState({ newPassword: text})}></TextInput> */}

<View style={{flexDirection:'row', alignItems: 'center', justifyContent: 'center', height: 40,
      margin: 0,
      marginTop: 0}}>
            <View style={{flex:1, maxWidth: 414, backgroundColor: null, flexDirection:'row', justifyContent:'space-between'}}>
                <TextInput style={{paddingLeft:13,color: 'gray', fontSize: 12, height: 40, fontSize: 12, width: '70%'}}
                placeholder={'New Password'}
                secureTextEntry={this.state.showPassword1}
                autoCapitalize = 'none'
                value = {this.state.newPassword}
                placeholderTextColor={'grey'}
                onChangeText={(text) => this.setState({ newPassword: text})}></TextInput>
                <TouchableOpacity onPress={() => this.onCheckClick1()}>
                <View style={{width:20, height:20, justifyContent: 'flex-end', marginRight: 20, marginTop: 9}}>
                  <Image source={ this.state.imgSource1 } style={{width:20, height:20,}} />
                </View>
                </TouchableOpacity>
              </View>
              </View>

                <View style={{marginLeft:7,marginTop:0, backgroundColor: 'gray', marginRight: 7, height: 1, marginBottom:5}}></View>
                {/* <Text style={styles.textInput1}>Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters</Text> */}
                {/* <TextInput style={styles.textInput}
                placeholder={'Confirm New Password'}
                placeholderTextColor={'grey'}
                secureTextEntry={true}
                value = {this.state.ConfirmPassword}
                placeholderTextColor={'grey'}
                autoCapitalize = 'none'
                onChangeText={(text) => this.setState({ ConfirmPassword: text})}></TextInput> */}

<View style={{flexDirection:'row', alignItems: 'center', justifyContent: 'center', height: 40,
      margin: 0,
      marginTop: 0}}>
            <View style={{flex:1, maxWidth: 414, backgroundColor: null, flexDirection:'row', justifyContent:'space-between'}}>
                <TextInput style={{paddingLeft:13,color: 'gray', fontSize: 12, height: 40, fontSize: 12, width: '70%'}}
                placeholder={'Confirm New Password'}
                secureTextEntry={this.state.showPassword2}
                autoCapitalize = 'none'
                value = {this.state.ConfirmPassword}
                placeholderTextColor={'grey'}
                onChangeText={(text) => this.setState({ ConfirmPassword: text})}></TextInput>
                <TouchableOpacity onPress={() => this.onCheckClick2()}>
                <View style={{width:20, height:20, justifyContent: 'flex-end', marginRight: 20, marginTop: 9}}>
                  <Image source={ this.state.imgSource2 } style={{width:20, height:20,}} />
                </View>
                </TouchableOpacity>
              </View>
              </View>

                <View style={{marginLeft:7,marginTop:0, backgroundColor: 'gray', marginRight: 7, height: 1, marginBottom:12}}></View>
                </View>

               

               {/* <TouchableOpacity onPress={this.form_Submit}>
                <LinearGradient style={{height:60,marginRight:0,marginLeft:0,marginTop:50,borderRadius:0}}
                colors={['green', 'green']}>
                    <Text style={{fontSize:20,fontWeight: "bold",alignSelf:'center',color:'white',
                marginTop:14}}>Login</Text>        
        </LinearGradient> 
        </TouchableOpacity> */}
<View style={{marginBottom: 20}}>
        <AnimateLoadingButton
              ref={c => (this.loadingButton1 = c)}
              width={Dimensions.get('window').width - 66}
              height={50}
              marginTop={50}
              marginLeft={10}
              marginRight={10}
              title="Submit"
              titleFontSize={16}
              titleColor="rgb(255,255,255)"
              backgroundColor="green"
              borderRadius={4}
              onPress={this._onPressBotton1Handler.bind(this)}
            />
</View>
        
        
       

        

  
</ScrollView>
</View>

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
           keyExtractor={item => item.name}
          ItemSeparatorComponent={this.renderSeparator}
          ListHeaderComponent={this.renderHeader}
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

   if (Platform.OS === 'ios') {
    KeyboardManager.setEnable(true);
    KeyboardManager.setKeyboardDistanceFromTextField(5);
    
}

   let user = await AsyncStorage.getItem('userdata');
    let parsed = JSON.parse(user);

    this.setState({
      UserIDString: parsed.user_id,
    });

   console.log('user id', this.state.UserIDString)
   let oldPasswordString = await AsyncStorage.getItem('password');
   this.setState({
    oldPasswordStringFromAsyncStorage : oldPasswordString
  })
  }

  _onPressBotton1Handler() {

   

    this.form_Submit()
   
  }
  form_Submit = () => {

    if (this.state.oldPassword.trim() == '') {
        alert('Please Enter Old Password');
    }

    else if (this.state.newPassword.trim() == '') {
        alert('Please Enter New Password');
    }
    else if (this.state.ConfirmPassword.trim() == '') {
        alert('Please Enter Confirm Password');
    }
    else {

      if (this.state.oldPasswordStringFromAsyncStorage != this.state.oldPassword)
      {
        alert('Entered Old Password is wrong');
      }
       else if (this.state.newPassword != this.state.ConfirmPassword) 
      {
        alert('New Password does not match with Confirm Password');
      }
      else
      {
        this.loadingButton1.showLoading(true);
        this.customChangePasswordClick()

      }

       

       

    }
}
handleBackButtonClick() {
   
   

  this.props.navigation.goBack(null);
  return true;
}
customChangePasswordClick = () => {

  var params = {}
  
  params = 
  {

    user_id: this.state.UserIDString,
    old_password: this.state.oldPasswordStringFromAsyncStorage,
    new_password: this.state.newPassword
    
  }

console.log('params: ', params)
  
const { navigate } = this.props.navigation;

  const url = UrlUtil.BASE_URL + 'api/user_change_password';

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

  this.loadingButton1.showLoading(false);
    let resultJSON = JSON.stringify(json)
    console.log("Result JSON is == ",resultJSON)


    if (json.status == 'success')
    {

      AsyncStorage.setItem('password', this.state.newPassword);

      Alert.alert(
        'Success',
        json.message, // <- this part is optional, you can pass an empty string
        [
          {text: 'OK', onPress: () => this.handleBackButtonClick()},
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

onCheckClick1 = () => {
    
   
  if (this.state.showPassword1 == true)
  {
    this.setState({ showPassword1: false, imgSource1: visibility_on });
  }
  else
  {
    this.setState({ showPassword1: true, imgSource1:  visibility_off});
  }

  // this.setState({ showPassword: !this.state.showPassword });
}

onCheckClick2 = () => {
    
   
  if (this.state.showPassword2 == true)
  {
    this.setState({ showPassword2: false, imgSource2: visibility_on });
  }
  else
  {
    this.setState({ showPassword2: true, imgSource2:  visibility_off});
  }

  // this.setState({ showPassword: !this.state.showPassword });
}

  SuccessCountryStateCityApiFetch(result) 
  {
console.log('SuccessCountryStateCityApiFetch: ', result)

    this.setState({data: result, dropdownMasterData: result, seachableModalVisible: true})
  }

  switchingBetweenNormalAndBusinessUser(value) 
  {
    console.log('switchingBetweenNormalAndBusinessUser: ', value)
    this.setState({radioValue: value})
  }

  CallToShowDropDownCombo(selectedFlag) 
  {

    console.log('selectedFlag: ', selectedFlag);


    if (selectedFlag == 'country')
    {

       selectedComboFlag = 'country'
      this.customCountryStateCityApiCall()
    }
    
     if (selectedFlag == 'state')
    {

      if (this.state.CountryString == 'Country')
      {
        alert('Please Select Your Country');
      }
      else
      {
         selectedComboFlag = 'state'
        this.customCountryStateCityApiCall()
      }

    }
    

    if (selectedFlag == 'city') 
    {
      if (this.state.CountryString == 'Country')
      {
        alert('Please Select Your Country');
      }
      else
      {
        if (this.state.StateString == 'State')
        {
          alert('Please Select Your State');
        }
        else
        {
           selectedComboFlag = 'city'
          this.customCountryStateCityApiCall()
        }
        
      }
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
    if (selectedComboFlag == 'country')
    {
      this.setState({ seachableModalVisible: false, selectedCountryID: item.iso2, CountryString: item.name})
    }
    
     if (selectedComboFlag == 'state')
    {
      this.setState({ seachableModalVisible: false, selectedStateID: item.iso2, StateString: item.name})
    }
    

    if (selectedComboFlag == 'city') 
    {
      this.setState({ seachableModalVisible: false, CityString: item.name})
    }


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
    
    },
    textInput1:{
    
      width: null,
      marginLeft: 7,
      borderRadius: 0,
      marginRight: 7,
      backgroundColor: 'white',
      fontSize: 9,
      height: 25,
      color: 'red'
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
  });