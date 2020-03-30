import React , {Component} from 'react';
import {
  View,
  Text,
  StatusBar,
} from 'react-native';
import SplashScreen from "./Screens/SplashScreen";
import AppContainer from "./Navigation/NavigationConfig";
import { decode, encode } from 'base-64'
global.crypto = require("@firebase/firestore");
global.crypto.getRandomValues = byteArray => { for (let i = 0; i < byteArray.length; i++) { byteArray[i] = Math.floor(256 * Math.random()); } }

if (!global.btoa) { global.btoa = encode; }

if (!global.atob) { global.atob = decode; }
class App extends Component {
  state = {
    loading:true,
  }
  componentDidMount = ()=>{
    this.showApp();
  }
  showApp = ()=>{
    setTimeout(()=>{
      this.setState({
        loading:false
      });
    },1500);
  }
  render() {
    // const App = <SplashScreen/>
    // if(!this.state.loading){
    //   App =  <AppContainer/>
    // }
    return (
      this.state.loading?<View style={{flex:1,justifyContent:"center", alignItems:"center"}}>
        <StatusBar backgroundColor="#023953" barStyle="light-content" />
        <SplashScreen/>
      </View>:<AppContainer/>
      // <View>
      //   <View>
      //     <Text>Test</Text>
      //   </View>
      //  <AppContainer/>
      // </View>
    )
  }
  
  }
export default App;
