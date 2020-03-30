import React, { Component } from 'react'
import { StyleSheet, ScrollView, ActivityIndicator, View, Text } from 'react-native';
import firebase from '../Database/database';
import FoodHubItem from "./FoodHubItem";
 class FoodHubList extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
           // headerTitleStyle: { flex: 1, textAlign: 'center'},
        };
      };
      constructor() {
        super();
      
        this.firestoreRef = firebase.firestore().collection('foodhubs');
       
        this.state = {
          isLoading: true,
          userArr: []
        };
      }
      componentDidMount() {
        this.firestoreRef.onSnapshot(this.getCollection);
      }
    
    
      getCollection = (querySnapshot) => {
        const userArr = [];
        querySnapshot.forEach((res) => {
          const { title, address, mobile, city } = res.data();
          userArr.push({
            key: res.id,
            res,
            title,
            city,
            address,
            mobile,
          });
        });
        const filteredCities = userArr.filter((city)=>{
          const  fCity = this.props.navigation.getParam("city");
         // console.log(fCity);
            return city.city == fCity;
        });
       // console.log(filteredCities);
        this.setState({
          userArr:filteredCities,
          isLoading: false,
       });
      }
   
   
    render() {
      //  console.log(this.props.navigation.getParam("city"));
        if(this.state.isLoading){
            return(
              <View style={styles.preloader}>
                <ActivityIndicator size="large" color="#9E9E9E"/>
              </View>
            )
          }    
          return (
              <View style={styles.container}>
                   <View style={{padding:10, margin:10,backgroundColor:"#e6f4ff", borderRadius:5}}>
                 <Text style={{fontSize:17}}>List of Food Hubs </Text>
                </View>
              
            <ScrollView>
               
                {
                  this.state.userArr.map((item, i) => {
                    return (
                     <FoodHubItem item={item} key={item.key}/>
                    );
                  })
                }
            </ScrollView>
            </View>
          );
    }
}

const styles = StyleSheet.create({
    container: {
     flex: 1,
    // paddingBottom: 22
    },
    preloader: {
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      position: 'absolute',
      alignItems: 'center',
      justifyContent: 'center'
    }
  });

export default FoodHubList;
