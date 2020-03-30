import React, { Component } from 'react';
import {View, Text, StyleSheet, } from "react-native";

class AccountItem extends Component {
    render() {
        const {area, address, mobile, city, accountNo} = this.props.item;
        return (
            <View>
                 <View style={styles.main}>
                     <View style={styles.row}>
                         <Text style={styles.rowText}>City </Text>
                         <Text style={styles.rowText1}>{city} </Text>
                     </View>
                    <View style={styles.row}>
                        <Text style={styles.rowText}>Area </Text>
                        <Text style={styles.rowText1}>{area} </Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.rowText}>Mobile No. </Text>
                        <Text style={styles.rowText1}>{mobile} </Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.rowText}>Account No. </Text>
                        <Text style={styles.rowText1}>{accountNo} </Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.rowText}>Address</Text>
                        <Text  style={styles.rowText1}> {address} </Text>
                    </View>
                
                </View>  
            </View>
         
        );
    }
}
const styles = StyleSheet.create({
    main : {
        backgroundColor : "#eae6ff",
        padding:10,
        margin:10,
        borderRadius:10,
        //alignItems:"center"
    },
    row : {
        padding:10,
        margin:2,
        borderRadius:5,
        flexDirection:"row",
        justifyContent:"space-between",
       // backgroundColor:"#fff",
    },
    rowText:{
      //  backgroundColor:"blue",
        fontSize:17,
        width:"35%"
    },
    rowText1:{
        //backgroundColor:"#fff",
        marginLeft:10,
        fontSize:17,
        width:"65%"
    },
});


export default AccountItem;