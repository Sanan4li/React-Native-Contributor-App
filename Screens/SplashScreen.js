import React, { Component } from 'react'
import {StyleSheet, View, Text, Image, StatusBar} from 'react-native';

 class SplashScreen extends Component {
    render() {
        return (
            <View style={styles.main}>
                <StatusBar backgroundColor="#023953" barStyle="light-content" />
               
                <Image source={require("../assets/images/pull.png")} style={{width:200, height:200}}/>
                <Text style={{fontSize:20}}>
                    Help Others. Save Pakistan.
                </Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    main :{
        flex :1,
        alignItems :"center",
        justifyContent : "center",
    }
});

export default SplashScreen;
