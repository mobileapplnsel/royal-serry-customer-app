import React,{Component} from 'react';

import { StyleSheet, Image,ImageBackground, AsyncStorage} from 'react-native';
import {StatusBar} from 'react-native';


export default class SplashScreen extends Component{

 
  async componentWillMount(){

      let userLoggedInOrNotFlagString = await AsyncStorage.getItem('userLoggedInOrNotFlag');

      if (userLoggedInOrNotFlagString == 'yes')
{
  setTimeout(()=>{
    this.props.navigation.replace('DashPage');//ParcelDetailsPage //DashPage
},3000)
console.disableYellowBox = true; 
}
else
{
        setTimeout(()=>{
            this.props.navigation.replace('LoginPage1');
        },3000)
        console.disableYellowBox = true; 
      }

      }

  render(){
    return(
        <ImageBackground source={require('../assets/img/splash-screen.jpg')} style= {styles.container} >
            <StatusBar
                backgroundColor="#090915"
                barStyle="light-content"
            />
        </ImageBackground>
    );
  }
}

var styles = StyleSheet.create({
    container: {
      flex: 1,
      // remove width and height to override fixed static size
      width: null,
      height: null,
    }
  });





// import React,{Component} from 'react';

// import { StyleSheet, Image,ImageBackground, AsyncStorage} from 'react-native';
// import {StatusBar} from 'react-native';


// export default class SplashScreen extends Component{

 
//   async componentWillMount(){

//       let userLoggedInOrNotFlagString = await AsyncStorage.getItem('userLoggedInOrNotFlag');

// //       if (userLoggedInOrNotFlagString == 'yes')
// // {
// //   setTimeout(()=>{
// //     this.props.navigation.replace('DashPage');//ParcelDetailsPage //DashPage
// // },3000)
// // console.disableYellowBox = true; 
// // }
// // else
// // {
//         setTimeout(()=>{
//             this.props.navigation.replace('LoginPage1'); // Home1Page // LoginPage1
//         },5000)
//         console.disableYellowBox = true; 
//  //     }

//       }

//   render(){
//     return(
//         <ImageBackground source={require('../Images/ani.gif')} style= {styles.container} >
//             <StatusBar
//                 backgroundColor="#090915"
//                 barStyle="light-content"
//             />
//         </ImageBackground>
//     );
//   }
// }

// var styles = StyleSheet.create({
//     container: {
//       flex: 1,
//       // remove width and height to override fixed static size
//       width: null,
//       height: null,
//     }
//   });