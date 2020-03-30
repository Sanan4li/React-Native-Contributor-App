import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, StatusBar, Alert, ActivityIndicator, Image } from 'react-native';
import firebase from '../Database/database';
import CheckBox from 'react-native-check-box';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {colors} from "../assets/colors/primaryColors";
export default class Login extends Component {
  
 state = { 
      email: '', 
      password: '',
      isLoading: false,
      checked : true,
      message : "Email Address",
     // message:'Please Enter Email and Password'
    }
  

  updateInputVal = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  }

  userLogin = () => {
    if(this.state.email === '' || this.state.password === '') {
      Alert.alert('Enter Details!',"Please Enter Email & Password to Signup.",["Ok"])
    } else {
      this.setState({
        isLoading: true,
      })
      firebase
      .auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then((res) => {
        console.log(res)
        console.log('User logged-in successfully!')
        this.setState({
          isLoading: false,
          email: '', 
          password: ''
        })
        this.props.navigation.navigate('App');
      })
      .catch(error => this.setState(
          { 
              message: error.message,
              isLoading : false 
            },()=>{
                Alert.alert("Error!", this.state.message,["OK"])
          console.log("Error");
      }));
    }
  }

  rememberMe = ()=>{
      this.setState({
          checked:!this.state.checked
      });
  }


  render() {
      
    if(this.state.isLoading){
      return(
        <View style={styles.preloader}>
          <ActivityIndicator size="large" color="#9E9E9E"/>
        </View>
      )
    }    
   else if(!this.state.isLoading){
    return (
        <View style={styles.container}>  
        
        {/* <Text>{this.state.message}</Text>
          <TextInput
            style={styles.inputStyle}
            placeholder="Email"
            value={this.state.email}
            onChangeText={(val) => this.updateInputVal(val, 'email')}
          />
          <TextInput
            style={styles.inputStyle}
            placeholder="Password"
            value={this.state.password}
            onChangeText={(val) => this.updateInputVal(val, 'password')}
            maxLength={15}
            secureTextEntry={true}
          />   
          <Button
            color="#3740FE"
            title="Signin"
            onPress={() => this.userLogin()}
          />   
  
          <Text 
            style={styles.loginText}
            onPress={() => this.props.navigation.navigate('Signup')}>
            Don't have account? Click here to signup
          </Text>                           */}
         <View style={{marginLeft:5, marginTop:5, padding:20}}>
            <Text style={{color:"white", fontSize:22}}>Welcome Back,</Text>
            <Text style={{color:"white", fontSize:13, marginTop:8}}>Sign in to Continue</Text>
         </View>
         
         <View style={{marginTop:"3%", backgroundColor:"white", height:"85%", borderRadius:20, padding:40}}>
          <View>
          
              <Text style={{fontSize:16}} maxLength="15">
                  Email Address
              </Text>
              <TextInput placeholder="Email"
              value={this.state.email}
              onChangeText={(val) => this.updateInputVal(val, 'email')}
              style={{borderBottomWidth:1,borderBottomColor:"#8c8c8c"}} />
          </View>
          <View style={{marginTop:20}}>
              <Text style={{fontSize:16}}>
                  Password
              </Text>
              <TextInput placeholder="Password"
              value={this.state.password}
              onChangeText={(val) => this.updateInputVal(val, 'password')}
              style={{borderBottomWidth:1,borderBottomColor:"#8c8c8c"}} maxLength={15} secureTextEntry={true} />
          </View>
          <View style={{marginTop:20, alignItems:"flex-end"}}>
              <Text style={{color: colors.header, fontSize:13}}>Forgot Password?</Text>
          </View> 
          <View style={{ marginTop:10}}>
          <CheckBox
            style={{flex: 1, padding: 10,}}
            onClick={this.rememberMe}
            isChecked={this.state.checked}
            rightText="Remember me logged in"
            checkBoxColor="#00e600"
        />
        <View style={{marginTop:20}}>
           <TouchableOpacity style={styles.loginButton} onPress={() => this.userLogin()}>
               <Text style={{color:"white"}}>
                   SIGN IN
               </Text>
           </TouchableOpacity>
        </View>
        <View style={{marginTop:10, alignItems:"center"}}>
            <Text style={{color:"#8c8c8c"}}>Or you can also</Text>
        </View>
        <View style={{marginTop:20}}>
           <TouchableOpacity style={styles.googleButton}>
            <View style={{width:"20%", marginLeft:30}}>
            <Image source={require("../assets/images/google.png")} style={{width:30, height:30}}/>
            </View>
              <View style={{width:"80%", marginLeft:30}}>
              <Text style={{color:"black", fontSize:13, fontWeight:"bold", color:"#666666"}}>
                   SIGN IN WITH GOOGLE
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