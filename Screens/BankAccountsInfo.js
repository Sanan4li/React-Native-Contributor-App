import React, { Component } from 'react'
import { StyleSheet, ScrollView, ActivityIndicator, View, Text } from 'react-native';
import firebase from '../Database/database';
import AccountItem from "./AccountItem";
 class BankAccountsInfo extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            
        };
      };
      constructor() {
        super();
      
        this.firestoreRef = firebase.firestore().collection('accounts');
       
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
          const { area, accountNo, address, mobile, city } = res.data();
          userArr.push({
            key: res.id,
            res,
            area,
            accountNo,
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
                 <Text style={{fontSize:17}}>List of Accounts to Donate </Text>
                </View>
              
            <ScrollView>
               
                {
                  this.state.userArr.map((item, i) => {
                    return (
                     <AccountItem item={item} key={item.key}/>
                    );
                  })
                }
            </ScrollView>
            </View>
          );
    }
}

const styles = StyleSheet.create({
    main :{
        flex :1,
    },
  
});

export default BankAccountsInfo;
