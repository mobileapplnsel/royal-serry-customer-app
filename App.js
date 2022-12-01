import React, { Component } from 'react';

import { createAppContainer } from 'react-navigation';
import { createStackNavigator} from 'react-navigation-stack';

import SplashPage from './Screen/SplashScreen';
import ForgotPasswordPage from './Screen/ForgotPassword';
import LoginPage1 from './Screen/Login1';
import DashPage from './Screen/Dashboard';
import RegistrationPage from './Screen/Registration';
import StastShipmentPage from './Screen/StastShipment';
import LocationPage from './Screen/Location';
import ParcelDetailsPage from './Screen/ParcelDetails';
import PricePage from './Screen/Price';
import SummaryPage from './Screen/Summary';
import ItemDetailsPage from './Screen/ItemDetails';
import ItemListPage from './Screen/ItemList';
import EditProfilePage from './Screen/EditProfile';
import ChangePasswordPage from './Screen/ChangePassword';
import UserServicePage from './Screen/UserService';
import GoogleAddressPage from './Screen/GoogleAddress';
import ContactUsPage from './Screen/ContactUs';
import TrackAndTracePage from './Screen/TrackAndTrace';
import OrderPlacementPage from './Screen/OrderPlacement';
import ShipmentItemListPage from './Screen/ShipmentItemList';
import ShipmentItemDetailsPage from './Screen/ShipmentItemDetails';
import ViewProfilePage from './Screen/ViewProfile';
import cityStateCountryPickerPage from './Screen/cityStateCountryPicker';
import ToLocationPage from './Screen/ToLocation';
import categorySubcatPickerPage from './Screen/categorySubcatPicker';

const App = createStackNavigator({
  //Constant which holds all the screens like index of any book 
  SplashPage: { screen: SplashPage , 
    navigationOptions: {
    header: null //this will hide the header
  },
}, 

LoginPage1: { screen: LoginPage1 , 
  navigationOptions: {
  header: null //this will hide the header
},
}, 

ForgotPasswordPage: { screen: ForgotPasswordPage, 
  navigationOptions: {
  header: null //this will hide the header
},
},
DashPage: { screen: DashPage, 
  navigationOptions: {
  header: null //this will hide the header
},
},

RegistrationPage: { screen: RegistrationPage, 
  navigationOptions: {
  header: null //this will hide the header
},
}, 
StastShipmentPage: { screen: StastShipmentPage, 
  navigationOptions: {
  header: null //this will hide the header
},
}, 
LocationPage: { screen: LocationPage, 
  navigationOptions: {
  header: null //this will hide the header
},
}, 
ParcelDetailsPage: { screen: ParcelDetailsPage, 
  navigationOptions: {
  header: null //this will hide the header
},
}, 
PricePage: { screen: PricePage, 
  navigationOptions: {
  header: null //this will hide the header
},
}, 
SummaryPage: { screen: SummaryPage, 
  navigationOptions: {
  header: null //this will hide the header
},
}, 
ItemDetailsPage: { screen: ItemDetailsPage, 
  navigationOptions: {
  header: null //this will hide the header
},
}, 
ItemListPage: { screen: ItemListPage, 
  navigationOptions: {
  header: null //this will hide the header
},
}, 
EditProfilePage: { screen: EditProfilePage, 
  navigationOptions: {
  header: null //this will hide the header
},
}, 
ChangePasswordPage: { screen: ChangePasswordPage, 
  navigationOptions: {
  header: null //this will hide the header
},
}, 
UserServicePage: { screen: UserServicePage, 
  navigationOptions: {
  header: null //this will hide the header
},
}, 
GoogleAddressPage: { screen: GoogleAddressPage, 
  navigationOptions: {
  header: null //this will hide the header
},
}, 
ContactUsPage: { screen: ContactUsPage, 
  navigationOptions: {
  header: null //this will hide the header
},
}, 
TrackAndTracePage: { screen: TrackAndTracePage, 
  navigationOptions: {
  header: null //this will hide the header
},
}, 
OrderPlacementPage: { screen: OrderPlacementPage, 
  navigationOptions: {
  header: null //this will hide the header
},
}, 
ShipmentItemListPage: { screen: ShipmentItemListPage, 
  navigationOptions: {
  header: null //this will hide the header
},
}, 
ShipmentItemDetailsPage: { screen: ShipmentItemDetailsPage, 
  navigationOptions: {
  header: null //this will hide the header
},
},
ViewProfilePage: { screen: ViewProfilePage, 
  navigationOptions: {
  header: null //this will hide the header
},
},
cityStateCountryPickerPage: { screen: cityStateCountryPickerPage, 
  navigationOptions: {
  header: null //this will hide the header
},
},
ToLocationPage: { screen: ToLocationPage, 
  navigationOptions: {
  header: null //this will hide the header
},
},
categorySubcatPickerPage: { screen: categorySubcatPickerPage, 
  navigationOptions: {
  header: null //this will hide the header
},
},

  },
  {
    initialRouteName: 'SplashPage', //ParcelDetailsPage ,  SplashPage
  }
);
export default createAppContainer(App);