import React, { Component } from 'react'
import {StyleSheet, View, Text , Picker,} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {colors} from "../assets/colors/primaryColors";
import firebase from '../Database/database';
 class CartScreen extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            headerTitleStyle: { flex: 1, textAlign: 'center'},
        };
      };
      constructor() {
        super();
      
        this.firestoreRef = firebase.firestore().collection('cities');
       
       
      }
      componentDidMount() {
         
        this.firestoreRef.onSnapshot(this.getCollection);
      }
      state = {
        provices : [ "Select Province", "Punjab", "Sindh", "Balochistan", "KPK", "Gilgit Baltistan",  "Azad Jamu Kashmir"],
      //  cities : ["Select City","Lahore", "Islamabad", "Faislabad", "Gujrat", "Gujranwala"],
      cities : [], 
      selectedCity : "Select City",
        selectedProvice : "Select Province",
        cityArr : [],
    }
    getCollection = (querySnapshot) => {
        const userArr = [];
        querySnapshot.forEach((res) => {
          const { province,city } = res.data();
          userArr.push({
            key: res.id,
            province,
            city
          });
        });
        this.setState({
          cityArr: userArr,
       },()=>{
           console.log(this.state.cityArr);
       });
      }


    selectProvinces = ()=>{
    // console.log("called");
    const Items =  this.state.provices.map(
          (value)=>{
             // console.log(value);
              return(
                  <Picker.Item  label={value} value={value} key={value} />
              )
          }
      );
      return Items;

    }
    selectCities = ()=>{
 
     const Items =  this.state.cities.map(
           (value)=>{
             
               return(
                   <Picker.Item label={value} value={value} key={value} />
               )
           }
       );
       return Items;

     }
     filterCities = (province)=>{
        console.log("test", province);
        const filteredCitites =  this.state.cityArr.filter(
            (item)=>{
               return item.province==province
            }
        );
        const newCities = [];
        filteredCitites.forEach(
            (item)=>{
                newCities.push(item.city);
            }
        );
        console.log(newCities);
        this.setState(
            { 
                cities: newCities,
                selectedProvice:province
           },()=>{
               console.log(this.state.cities);
           }
           )
    
     }

    render() {
     
      let cityEnable = false;
      if(this.state.selectedProvice!="Select Province"){
          cityEnable = true;
      }
      
        return (
            <View style={styles.main}>
              <View style={{alignItems:"center", backgroundColor:"#eae6ff", padding:30, borderRadius:10}}>
              <Text style={{fontSize:15, color:"black"}}>You need food but don't have money? Don't worry, we are here to help you.</Text>
             
              </View>
              <View style={{backgroundColor:"#e6f4ff", padding:20,borderRadius:10, marginTop:30}}>
              <Text style={{fontSize:16, color:"black"}}>Select Your Province and City.</Text>
              </View>
             <View style={styles.selectBox}>
             <Picker
             
             selectedValue={this.state.selectedProvice}
             style={{ height: 50, width: "100%" }}
             onValueChange={(itemValue, itemIndex) => {
              this.filterCities(itemValue);
            }}
             >
            {this.selectProvinces()}
          </Picker>
             
             </View>
            <View  style={styles.selectBox}>
            <Picker
               itemStyle={{color:'white'}} 
               enabled={cityEnable}
               selectedValue={this.state.selectedCity}
               style={{ height: 50, width: "100%" }}
               onValueChange={(itemValue, itemIndex) => {this.setState({selectedCity:itemValue})}}
               >
              {this.selectCities()}
            </Picker>
            </View>
            <View>
                <TouchableOpacity onPress={()=>this.props.navigation.navigate("Request", {city:this.state.selectedCity})}>
                    <Text style={styles.button}>Reqest Food</Text>
                </TouchableOpacity>
            </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    main :{
        flex :1,
        padding:10
        // alignItems :"center",
         //backgroundColor:"#f2f2f2"
        
    },
    button : {
        padding:10,
        backgroundColor:colors.header,
        fontSize:18,
        borderRadius:20,
        marginTop:5,
        margin:5,
        color:"white",
        textAlign:"center",
        marginTop:30,
    },
    selectBox:{
        marginTop:30,
        width:"100%", 
        backgroundColor:"#f2f2f2", 
        borderRadius:10,
        textAlign:"center",
        marginLeft:"auto",
        marginRight:"auto",
    }
  
});

export default CartScreen;
