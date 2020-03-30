import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, StatusBar, Alert, ActivityIndicator, Image } from 'react-native';
import firebase from '../Database/database';
import CheckBox from 'react-native-check-box';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {colors} from "../assets/colors/primaryColors";

export default class Signup extends Component {

  state = { 
      displayName: '',
      email: '', 
      password: '',
      phone: '',
      isLoading: false,
      checked:false,
  }
  static navigationOptions = ({ navigation }) => {
    return {
        headerTitleStyle: { flex: 1, textAlign: 'center'},
        
    };
  };
  updateInputVal = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  }

  registerUser = () => {
    if(this.state.email === '' || this.state.password === '' || this.state.phone==='') {
      Alert.alert('Enter Details!', "Please Enter Details to Sign Up.", ["Ok"])
    } else {
      this.setState({
        isLoading: true,
      })
      firebase
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then((res) => {
        res.user.updateProfile({
          displayName: this.state.displayName
        })
        console.log('User registered successfully!')
        this.setState({
          isLoading: false,
          displayName: '',
          email: '', 
          password: '',
          phone:''
        })
        this.props.navigation.navigate('Login')
      })
      .catch(error => this.setState({ errorMessage: error.message, isLoading:false }, ()=>{
         Alert.alert("Error in Signing Up!",this.state.errorMessage, ["Ok"] );
      }));      
    }
  }

  render() {
    if(this.state.isLoading){
      return(
        <View style={styles.preloader}>
          <ActivityIndicator size="large" color="#9E9E9E"/>
        </View>
      )
    }    
    return (
      <View style={styles.container}>  
       <StatusBar backgroundColor="#023953" barStyle="light-content" />
       
         <View style={{marginLeft:5, marginTop:0, padding:15}}>
            <Text style={{color:"white", fontSize:22}}>Hi, Join us,</Text>
         </View>
         <View style={{marginTop:"3%", backgroundColor:"white", height:"98%", borderRadius:20, padding:40}}>
          <View>
              <Text style={{fontSize:16}}>
                  Email Address 
              </Text>
              <TextInput  value={this.state.email}
                onChangeText={(val) => this.updateInputVal(val, 'email')} 
          placeholder="Email" style={{borderBottomWidth:1,borderBottomColor:"#8c8c8c"}} />
          </View>
          <View style={{marginTop:20}}>
              <Text style={{fontSize:16}}>
                  Password
              </Text>
              <TextInput 
              value={this.state.password}
              onChangeText={(val) => this.updateInputVal(val, 'password')}
              placeholder="Password" style={{borderBottomWidth:1,borderBottomColor:"#8c8c8c"}} secureTextEntry={true} />
          </View>
          <View style={{marginTop:20}}>
              <Text style={{fontSize:16}}>
                  Mobile No.
              </Text>
              <TextInput 
              value={this.state.phone}
              onChangeText={(val) => this.updateInputVal(val, 'phone')}
              keyboardType="number-pad" placeholder="Mobile" style={{borderBottomWidth:1,borderBottomColor:"#8c8c8c"}} maxLength={15} />
          </View>
         
          <View style={{ marginTop:10}}>
        <View style={{marginTop:20}}>
           <TouchableOpacity style={styles.loginButton} onPress={() => this.registerUser()}>
               <Text style={{color:"white"}}>
                   SIGN UP
               </Text>
           </TouchableOpacity>
        </View>
        <View style={{marginTop:10, alignItems:"center", flexDirection:"row", justifyContent:"flex-end"}}>
            <Text style={{color:"#8c8c8c"}}>Already have an account?</Text>
            <TouchableOpacity style={{marginLeft:10, padding:2}} onPress={() => this.props.navigation.navigate('Login')}>
                <Text style={{color:colors.header, fontSize:15}}>Sign in</Text>
            </TouchableOpacity>
        </View>
        <View style={{marginTop:20}}>
           <TouchableOpacity style={styles.googleButton}>
            <View style={{width:"20%", marginLeft:30}}>
            <Image source={require("../assets/images/google.png")} style={{width:30, height:30}}/>
            </View>
              <View style={{width:"80%", marginLeft:30}}>
              <Text style={{color:"black", fontSize:13, fontWeight:"bold", color:"#666666"}}>
                   SIGN UP WITH GOOGLE
               </Text>
              </View>
           </TouchableOpacity>
        </View>
           
          </View>
         </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: "flex",
        flexDirection: "column",
        backgroundColor: colors.header
      },
      loginButton : {
        backgroundColor: colors.header,
        padding:15,
        color:"white",
        alignItems:"center",
        borderRadius:10
      },
      googleButton :{
        flexDirection:"row",
        backgroundColor:"white",
        justifyContent:"space-around",
        borderWidth:1,
        borderRadius:10,
        alignItems:"center",
        padding:10,
      },
  inputStyle: {
    width: '100%',
    marginBottom: 15,
    paddingBottom: 15,
    alignSelf: "center",
    borderColor: "#ccc",
    borderBottomWidth: 1
  },
  loginText: {
    color: '#3740FE',
    marginTop: 25,
    textAlign: 'center'
  },
  preloader: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff'
  }
});