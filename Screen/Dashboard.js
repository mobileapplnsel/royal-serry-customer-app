import React, { Component } from 'react';

import { View, Image, TouchableOpacity, SafeAreaView, ScrollView, Dimensions,Text, Alert, AsyncStorage, TouchableWithoutFeedback } from 'react-native';

import {createAppContainer} from 'react-navigation';
import {createDrawerNavigator, DrawerItems } from 'react-navigation-drawer';
import {createStackNavigator} from 'react-navigation-stack';
import HomePage from './Home';
import GenresPage from './Genres';
import SupportPage from './Support';
import PrivacyPage from './PrivacyPolicy';
import TermsPage from './Terms';
import UserServicePage from './UserService';
import EditProfilePage from './EditProfile';
import ContactUsPage from './ContactUs';
import ViewProfilePage from './ViewProfile';



class NavigationDrawerStructure extends Component {
    //Structure for the navigatin Drawer
    static navigationOptions = {
      drawerLockMode: 'close',
 }
    _onPressButton() {
      Alert.alert('You tapped the button!')
    }
    
    toggleDrawer = () => {
      //Props to open/close the drawer
      this.props.navigationProps.toggleDrawer();
    };
    render() {
      return (       
        // <View style={{
        //   marginTop: 14,
        //   flexDirection: 'row',
        // justifyContent: 'flex-start',
        // alignContent: 'flex-start',
        // alignItems: 'flex-start',
        // width: Dimensions.get('window').width ,
        // backgroundColor: 'rgba(246, 244, 243, 1)',
        // height: 80,
       
        // }}>
        //   <TouchableOpacity onPress={this.toggleDrawer.bind(this)}>
        //     {/*Donute Button Image */}
        //     <Image
        //       source={require('../Images/menu.png')}
        //       style={{ width: 25, height: 16, marginLeft: 10,marginTop:20,}}
        //     />
        //   </TouchableOpacity>
          
        //   <Image style={{ height: 75,
        //       marginLeft: 25,
        //     marginTop:0,borderRadius:2,width: 140, resizeMode: 'contain',
        //     alignContent: 'center',
        //     alignItems: 'center',
        //     }}
        //   source={require('../Images/logo.png')}>
        //   </Image>

        //   {/* <Image source={require('../Images/search.png')}
        //   style={{marginLeft:18,width:36,height:36,marginTop:5}}></Image> */}
        // </View>
  <View style={{
          marginTop: 14,
          flexDirection: 'row',
        justifyContent: 'flex-start',
        alignContent: 'flex-start',
        alignItems: 'flex-start',
        width: Dimensions.get('window').width ,
        backgroundColor: 'rgba(246, 244, 243, 1)',
        height: 80,
       
        }}>
        <View style={{flexDirection:'row', alignItems: 'center', justifyContent: 'center'}}>
            <View style={{flex:1, maxWidth: 414, backgroundColor: null, flexDirection:'row', justifyContent:'space-between'}}>
  
            <View style={{ width: null, justifyContent: 'flex-start', flexDirection: 'row', marginTop: 3}}>
               <TouchableOpacity onPress={this.toggleDrawer.bind(this)}>
               <Image
               source={require('../Images/menu.png')}
               style={{ width: 30, height: 35, marginLeft: 15,marginTop:20,}}
             />
             </TouchableOpacity>

            <Image style={{ height: 75,
             marginLeft: 20,
             marginTop:0,borderRadius:2,width: 140, resizeMode: 'contain',
             alignContent: 'center',
             alignItems: 'center',
             }}
             source={require('../Images/logo.png')}>
             </Image>
             </View>
            
            {/* <TouchableWithoutFeedback onPress ={() =>  Alert.alert(
                'Confirm',
                'Are you sure you want to logout?', // <- this part is optional, you can pass an empty string
                [
                  {text: 'OK', onPress: () => this.LogoutClicked()},
                  {text: 'Cancel', onPress: () => console.log('cancelled')},
                ],
                {cancelable: false},
              )}>
            <View style={{ width: null, justifyContent: 'flex-end', flexDirection: 'row', marginRight: 20, marginTop: 0, backgroundColor: 'red', height: 80,  }}>
              <Image style={{ height: 30, width: 30, marginTop: -5, marginRight: 5, marginTop: 27 }}
                source={require('../Images/user.png')}></Image>
              <Text style={{ fontSize: 16, color: '#ac4175', marginTop: 27 }}>Sign Out</Text>
            </View>
            </TouchableWithoutFeedback> */}

{/* <TouchableWithoutFeedback onPress ={() =>  Alert.alert(
                'Confirm',
                'Are you sure you want to logout?', // <- this part is optional, you can pass an empty string
                [
                  {text: 'OK', onPress: () => this.LogoutClicked()},
                  {text: 'Cancel', onPress: () => console.log('cancelled')},
                ],
                {cancelable: false},
              )}>
           
              <Image style={{ height: 30, width: 30, marginTop: -5, marginRight: 35, marginTop: 27, tintColor: 'red' }}
                source={require('../assets/img/logout.png')}></Image>
              
            
            </TouchableWithoutFeedback> */}
  
  
            </View>
            </View>
             </View>
      );
    }
    LogoutClicked = () => {
      AsyncStorage.setItem('userLoggedInOrNotFlag', 'no');
      this.props.navigationProps.navigate('LoginPage1')
  }

}




  const Home_StackNavigator = createStackNavigator({
    //All the screen from the Screen1 will be indexed here
    First: {
      screen: HomePage,
      navigationOptions: ({ navigation }) => ({
        title: '',
        headerTintColor: '#ffffff',
        headerTitleStyle:{
            // fontFamily: 'Nunito-Regular',
            fontSize: 24,
            marginLeft:-20,
        
        },

        headerTransparent: {
            position: 'absolute',
            backgroundColor: 'transparent',
            zIndex: 100,
            top: 0,
            left: 0,
            right: 0
          
        
        },
      
        headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
       
      
  
        
      }),
    },
  });

  const EditProfile_StackNavigator = createStackNavigator({
    //All the screen from the Screen2 will be indexed here
    Second: {
      screen: ViewProfilePage,
      navigationOptions: ({ navigation }) => (
        {
        title: '',
        headerTintColor: '#ffffff',
        headerTitleStyle:{
            // fontFamily: 'Nunito-Regular',
            fontSize: 24,
            marginLeft:-20
        },
       
        headerTransparent: {
            position: 'absolute',
            backgroundColor: 'transparent',
            zIndex: 100,
            top: 0,
            left: 0,
            right: 0
          
        
        },
        headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
       
      }),
    },
  });


  const Genres_StackNavigator = createStackNavigator({
    //All the screen from the Screen2 will be indexed here
    Second: {
      screen: GenresPage,
      navigationOptions: ({ navigation }) => (
        {
        title: '',
        headerTintColor: '#ffffff',
        headerTitleStyle:{
            // fontFamily: 'Nunito-Regular',
            fontSize: 24,
            marginLeft:-20
        },
       
        headerTransparent: {
            position: 'absolute',
            backgroundColor: 'transparent',
            zIndex: 100,
            top: 0,
            left: 0,
            right: 0
          
        
        },
        headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
       
      }),
    },
  });

  const Support_StackNavigator = createStackNavigator({
    //All the screen from the Screen2 will be indexed here
    Second: {
      screen: SupportPage,
      navigationOptions: ({ navigation }) => (
        {
        title: '',
        headerTintColor: '#ffffff',
        headerTitleStyle:{
            // fontFamily: 'Nunito-Regular',
            fontSize: 24,
            marginLeft:-20
        },
       
        headerTransparent: {
            position: 'absolute',
            backgroundColor: 'transparent',
            zIndex: 100,
            top: 0,
            left: 0,
            right: 0
          
        
        },
        headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
       
      }),
    },
  });


  const Privacy_StackNavigator = createStackNavigator({
    //All the screen from the Screen2 will be indexed here
    Second: {
      screen: PrivacyPage,
      navigationOptions: ({ navigation }) => (
        {
        title: '',
        headerTintColor: '#ffffff',
        headerTitleStyle:{
            // fontFamily: 'Nunito-Regular',
            fontSize: 24,
            marginLeft:-20
        },
       
        headerTransparent: {
            position: 'absolute',
            backgroundColor: 'transparent',
            zIndex: 100,
            top: 0,
            left: 0,
            right: 0
          
        
        },
        headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
       
      }),
    },
  });


  const Terms_StackNavigator = createStackNavigator({
    //All the screen from the Screen2 will be indexed here
    Second: {
      screen: TermsPage,
      navigationOptions: ({ navigation }) => (
        {
        title: '',
        headerTintColor: '#ffffff',
        headerTitleStyle:{
            // fontFamily: 'Nunito-Regular',
            fontSize: 24,
            marginLeft:-20
        },
       
        headerTransparent: {
            position: 'absolute',
            backgroundColor: 'transparent',
            zIndex: 100,
            top: 0,
            left: 0,
            right: 0
          
        
        },
        headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
       
      }),
    },
  });

  const UserService_StackNavigator = createStackNavigator({
    //All the screen from the Screen1 will be indexed here
    First: {
      screen: UserServicePage,
      navigationOptions: ({ navigation }) => ({
        title: '',
        headerTintColor: '#ffffff',
        headerTitleStyle:{
            // fontFamily: 'Nunito-Regular',
            fontSize: 24,
            marginLeft:-20,
        
        },

        headerTransparent: {
            position: 'absolute',
            backgroundColor: 'transparent',
            zIndex: 100,
            top: 0,
            left: 0,
            right: 0
          
        
        },
      
        headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
       
      
  
        
      }),
    },
  });

  const ContactUs_StackNavigator = createStackNavigator({
    //All the screen from the Screen1 will be indexed here
    Second: {
      screen: ContactUsPage,
      navigationOptions: ({ navigation }) => ({
        title: '',
        headerTintColor: '#ffffff',
        headerTitleStyle:{
            // fontFamily: 'Nunito-Regular',
            fontSize: 24,
            marginLeft:-20,
        
        },

        headerTransparent: {
            position: 'absolute',
            backgroundColor: 'transparent',
            zIndex: 100,
            top: 0,
            left: 0,
            right: 0
          
        
        },
      
        headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
       
      
  
        
      }),
    },
  });


  const CustomDrawerComponent = (props) => (

    
    <SafeAreaView style={{flex:1,backgroundColor:'rgba(198, 35, 0, 1)'}}>
        <View style={{height:40}}>

            {/* <View style={{flexDirection: 'row'}}>
                <Image style={{height:30,width:30,marginTop:28,marginLeft:10}}
                      source={require("../Images/user.png")} ></Image>
                      <View>
            <Text style={{fontWeight: "bold",fontSize:18,color:'white',marginTop:20,marginLeft:10}}>Amit</Text>
            <Text style={{fontSize:18,marginLeft:10,color:'#808293'}}>9003334444</Text>
            </View>

            <Image style={{height:12,width:12,marginTop:28,marginLeft:100}}
            //          source={require("../Images/arrow.png")}
                     ></Image>
            </View>
            <LinearGradient style={{height:1,marginRight:10,marginLeft:10,marginTop:5}}
                colors={['#A73DD6', '#F85A53']} 
                startPoint={[0.0, 0.5]}
                endPoint={[1.0, 0.5]}
                 locations={[0.0, 1.0]}>
        </LinearGradient> 

        <View style={{flexDirection: 'row'}}>
            <Text style={{fontWeight: "bold",fontSize:18,color:'#dc5b45',marginTop:10,marginLeft:20}}>Your Plan:</Text>
            <Text style={{fontSize:18,color:'white',marginTop:10,marginLeft:50, fontWeight: '200'}}>No Plan</Text>

        </View> */}
        </View>
        
      <ScrollView>
        <DrawerItems{...props}></DrawerItems>

        <TouchableWithoutFeedback onPress ={() =>  props.navigation.navigate('ChangePasswordPage')}>
           <View style={{flexDirection:'row', alignItems: 'center', justifyContent: 'center', }}>
           <Image
              source={require("../Images/arrow1.png")}
              resizeMode="contain"
              style={{ width: 26, height: 26, marginTop: 10, marginLeft: -12 }}
            />
            <Text style={{height: 26, marginTop: 10, marginLeft: 10, width: 200, fontSize: 18, color: 'white' }}>Change Password</Text>
              </View>
            
            </TouchableWithoutFeedback>
            {/* AsyncStorage.setItem('userLoggedInOrNotFlag', 'no');
      this.props.navigationProps.navigate('LoginPage1') */}
            <TouchableWithoutFeedback onPress ={() =>  Alert.alert(
                'Confirm',
                'Are you sure you want to logout?', // <- this part is optional, you can pass an empty string
                [
                  {text: 'OK', onPress: () => LogoutClicked1(props)},
                  {text: 'Cancel', onPress: () => console.log('cancelled')},
                ],
                {cancelable: false},
              )}>
           <View style={{flexDirection:'row', alignItems: 'center', justifyContent: 'center', marginTop: 17}}>
           <Image
              source={require("../Images/arrow1.png")}
              resizeMode="contain"
              style={{ width: 26, height: 26, marginTop: 10, marginLeft: -12 }}
            />
            <Text style={{height: 26, marginTop: 10, marginLeft: 10, width: 200, fontSize: 18, color: 'white' }}>Logout</Text>
              </View>
            
            </TouchableWithoutFeedback>
      </ScrollView>
    </SafeAreaView>
  )
  const LogoutClicked1 = (props) => {
     AsyncStorage.setItem('userLoggedInOrNotFlag', 'no');
   //  this.props.navigationProps.navigate('LoginPage1')
     props.navigation.navigate('LoginPage1')
   }

  const DrawerNavigatorExample = createDrawerNavigator({
    //Drawer Optons and indexing
    Screen1: {
      //Title
      screen: Home_StackNavigator,
      navigationOptions: {
        drawerLabel: 'Home',
        drawerIcon: () => (
            <Image
              source={require("../Images/arrow1.png")}
              resizeMode="contain"
              style={{ width: 26, height: 26 }}
            />
           
          ),
        
      },

    },
    Screen2: {
      //Title
      screen: Genres_StackNavigator,
      navigationOptions: {
        drawerLabel: 'About Us',

        drawerIcon: () => (
            <Image
              source={require("../Images/arrow1.png")}
              resizeMode="contain"
              style={{ width: 26, height: 26 }}
            />
           
          ),
      },
    },
  
   
    // Screen3: {
    //   //Title
    //   screen: Support_StackNavigator,
    //   navigationOptions: {
    //     drawerLabel: 'Industry Sectors',

    //     drawerIcon: () => (
    //         <Image
    //           source={require("../Images/arrow1.png")}
    //           resizeMode="contain"
    //           style={{ width: 26, height: 26 }}
    //         />
           
    //       ),
    //   },
    // },
    Screen3: {
      //Title
      screen: ContactUs_StackNavigator,
      navigationOptions: {
        drawerLabel: 'Contact Us',

        drawerIcon: () => (
            <Image
              source={require("../Images/arrow1.png")}
              resizeMode="contain"
              style={{ width: 26, height: 26 }}
            />
           
          ),
      },
    },
    

    Screen4: {
      //Title
      screen: UserService_StackNavigator,
      navigationOptions: {
        drawerLabel: 'User Service',

        drawerIcon: () => (
            <Image
              source={require("../Images/arrow1.png")}
              resizeMode="contain"
              style={{ width: 26, height: 26 }}
            />
           
          ),
      },
    },


    Screen5: {
      //Title
      screen: Terms_StackNavigator,
      navigationOptions: {
        drawerLabel: 'Terms Of Use',

        drawerIcon: () => (
            <Image
              source={require("../Images/arrow1.png")}
              resizeMode="contain"
              style={{ width: 26, height: 26 }}
            />
           
          ),
      },
    },

    Screen6: {
      //Title
      screen: Privacy_StackNavigator,
      navigationOptions: {
        drawerLabel: 'Privacy',

        drawerIcon: () => (
            <Image
              source={require("../Images/arrow1.png")}
              resizeMode="contain"
              style={{ width: 26, height: 26 }}
            />
           
          ),
      },
    },

    Screen7: {
      //Title
      screen: Support_StackNavigator,
      navigationOptions: {
drawer: {},

       // drawerLabel: 'Social Media Links To Follow',
        drawerLabel: 'Follow To Social Media',
        drawerIcon: () => (
            <Image
              source={require("../Images/arrow1.png")}
              resizeMode="contain"
              style={{ width: 26, height: 26 }}
            />
           
          ),
      },
    },

    Screen8: {
      //Title
      screen: EditProfile_StackNavigator,
      navigationOptions: {
        drawerLabel: 'Manage Account',
       

        drawerIcon: () => (
            <Image
              source={require("../Images/arrow1.png")}
              resizeMode="contain"
              style={{ width: 26, height: 26 }}
            />
           
          ),
      },
    },
  
    


   

  
  
  },{
    contentComponent:CustomDrawerComponent,
    contentOptions:{
      labelStyle: {
        color: 'white',
        fontSize:18,
        fontWeight: '200'  , 
        marginLeft:0,

  
      },
    }
  }
  );

  
  
  export default createAppContainer(DrawerNavigatorExample);