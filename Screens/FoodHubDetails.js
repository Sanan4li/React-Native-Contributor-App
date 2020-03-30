import React, { Component } from 'react'
import { StyleSheet, ScrollView, ActivityIndicator, View } from 'react-native';
import firebase from '../Database/database';
 class CategoriesScreen extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            headerTitleStyle: { flex: 1, textAlign: 'center'},
        };
      };
     
    render() {
      
        if(this.state.isLoading){
            return(
              <View style={styles.preloader}>
                <ActivityIndicator size="large" color="#9E9E9E"/>
              </View>
            )
          }    
          return (
            <ScrollView style={styles.container}>
                {
                  this.state.userArr.map((item, i) => {
                    return (
                     <View>
                         <Text> {item.title} </Text>
                         <Text> {item.mobile} </Text>
                         <Text> {item.address} </Text>
                     </View>
                    );
                  })
                }
            </ScrollView>
          )
    }
}

const styles = StyleSheet.create({
    container: {
     flex: 1,
     paddingBottom: 22
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

export default CategoriesScreen;
