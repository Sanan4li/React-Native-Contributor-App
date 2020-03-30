import React, { Component } from 'react'
import { StyleSheet, Text, View, TextInput, Picker, Alert, ActivityIndicator, Image } from 'react-native';
import firebase from '../Database/database';
import CheckBox from 'react-native-check-box';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {colors} from "../assets/colors/primaryColors";
 class RequestForm extends Component {
    constructor() {
        super();
        this.dbRef = firebase.firestore().collection('requests');
      }
    state = { 
        displayName: '',
        name: '', 
        address: '',
        phone: '',
        city:'',
        isLoading: false,
        checked:false,
        selectedMembers : "Select Members",
        members : ["2","3","4","5","6","7","8","9","10","12"],
    }
    updateInputVal = (val, prop) => {
        const state = this.state;
        state[prop] = val;
        this.setState(state);
      }
      selectMembers = ()=>{
        const Items =  this.state.members.map(
              (value)=>{
                  return(
                      <Picker.Item label={value} value={value} key={value} />
                  )
              }
          );
          return Items;
        }
        addRequest() {
            if(this.state.name=="" || this.state.address=="" || this.state.phone==""){
                Alert.alert("Fill The Form!", "Please fill all the information in the form.", ["OK"]);
            }
            else{
                this.dbRef.add({
                    name: this.state.name,
                    address: this.state.address,
                    mobile: this.state.phone,
                    members : this.state.selectedMembers,
                    city : this.state.city,
                  }).then(()=>{
                    Alert.alert("Success!", "Your request has been transfered!", ["Thank You"]);
                    this.setState({
                        name:"",
                        address:"",
                        phone:"",
                        city:"",
                    });
                  }).catch((err)=>{
                    console.log(err);
                  });
            }
          
          }
    render() {
        this.state.city = this.props.navigation.getParam("city");
        return (
            <View style={styles.container}>  
           
            
              <View style={{marginTop:10, backgroundColor:"white", height:"98%", padding:40}}>
               <View>
                   <Text style={{fontSize:16}}>
                       Name
                   </Text>
                   <TextInput  value={this.state.name}
                     onChangeText={(val) => this.updateInputVal(val, 'name')} 
               placeholder="Name" style={{borderBottomWidth:1,borderBottomColor:"#8c8c8c"}} />
               </View>
               <View style={{marginTop:20}}>
                   <Text style={{fontSize:16}}>
                      Address
                   </Text>
                   <TextInput 
                   value={this.state.address}
                   onChangeText={(val) => this.updateInputVal(val, 'address')}
                   placeholder="Address" style={{borderBottomWidth:1,borderBottomColor:"#8c8c8c"}} />
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
               <View style={{marginTop:20}}>
                    <Text style={{fontSize:16}}>Family Members</Text>
                    <View style={styles.selectBox}>
                  
                  <Picker
                   itemStyle={{color:'white'}} 
                  
                   selectedValue={this.state.selectedMembers}
                   style={{ height: 50, width: "100%" }}
                   onValueChange={(itemValue, itemIndex) => {this.setState({selectedMembers:itemValue})}}
                   >
                  {this.selectMembers()}
                </Picker>
                  </View>
               </View>
             
               <View style={{ marginTop:10}}>
             <View style={{marginTop:20}}>
                <TouchableOpacity style={styles.loginButton} onPress={() => this.addRequest()}>
                    <Text style={{color:"white"}}>
                        REQUEST FOOD
                    </Text>
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
       // borderRadius:10
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
      selectBox:{
        marginTop:10,
        width:"100%", 
        backgroundColor:"#f2f2f2", 
        borderRadius:10,
        textAlign:"center",
        marginLeft:"auto",
        marginRight:"auto",
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
export default RequestForm;