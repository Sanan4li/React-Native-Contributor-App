import React, { Component } from 'react'
import {StyleSheet, View, ImageBackground, Text, ScrollView, StatusBar} from 'react-native';
import {
    SkypeIndicator,
  } from 'react-native-indicators';
import Icon from 'react-native-vector-icons/Entypo';
import Accordion from 'react-native-collapsible/Accordion';
import { Table, TableWrapper, Row } from 'react-native-table-component';
import { colors } from '../assets/colors/primaryColors';
import { TouchableOpacity } from 'react-native-gesture-handler';

 class HomeScreen extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
         title : navigation.getParam("title"),
         headerTitleStyle: { flex: 1, textAlign: 'center'},  
        };
      };
      
      state = {
        activeSections: [],
      };

      _renderSectionTitle = section => {
        return (
          <View style={styles.content}>
            <Text>{section.content}</Text>
          </View>
        );
      };
     
      _renderHeader = section => {
        return (
          <View style={styles.faq}>
            <Text style={{color:"white", fontSize:18, width:"80%"}}>{section.title}</Text>
            <Icon name="chevron-thin-down" color="white" size={25}/>
            
          </View>
        );
      };
     
      _renderContent = section => {
        return (
          <View style={styles.content}>
            <Text style={{fontSize:17,padding:10,color:"black"}}>{section.content}</Text>
          </View>
        );
      };
     
      _updateSections = activeSections => {
        this.setState({ activeSections });
      };

    render() {
      const SECTIONS = [
        {
          title: 'How it Works?',
          content: 'People living in a specific area collect donations from contributers living in that area and use them to buy food for that specific area. Needy people request food from a specific area. Volunteers join us on food hubs and distribute food to nearby needy people.',
        },
       
       
        {
            title: 'Who is a Contributer?',
            content: 'A contributer is one who is willing to donate money for his area to help needy people.',
          }, 
        {
          title: 'Who is a Volunteer?',
          content: 'A volunteer is one who goes to food hubs and manage the process also distributes food to needy people by going to their homes.',
        },
        
        {
            title: 'Who are needy people?',
            content: 'Needy people are those who need food and other daily use things but have no money to buy them.',
          },
      ];
        return (
            <View style={styles.container}>
              <ScrollView>
              <StatusBar backgroundColor="#023953" barStyle="light-content" />
              {/* <ImageBackground source={require("../assets/images/helpingHand.jpg")} style={{width:"100%",height:170}} resizeMode="stretch">
              <View style={{flexDirection:"row"}}>
              <Text style={{color:"white", fontSize:22, width:"40%", marginTop:30, marginLeft:20, padding:10, shadowColor:"black", elevation:1}}>Be a True Pakistani</Text>
              <Text style={{color:"white", fontSize:22, width:"40%", marginTop:30, marginLeft:70, padding:10}}>Help Others!</Text>
              </View>
               </ImageBackground> */}
               <View style={{...styles.shadow, backgroundColor:"#e6f4ff"}}>
                <View style={styles.rowStyle}>
                <View style={styles.numberView}>
                   <Text style={styles.numbers}>45902</Text>
                 </View>
                 <View style={{paddingTop:18}}>
                   <Text style={styles.totalText}>Total Contributers</Text>
                 </View>
                </View>
                 <View style={styles.rowStyle}>
                 <Text style={styles.message}>Contributers donate money to help poors.</Text>
                 </View>
                 
                 <TouchableOpacity  style={styles.touchableOpacityStyle}onPress={
                   ()=>{
                     this.props.navigation.navigate("Categories");
                   }
                 }>
                 <Text style={{...styles.button , backgroundColor:"#4db2ff"}}>Be a contributer</Text>
                 </TouchableOpacity>
                 
               </View>
               <View style={{...styles.shadow, backgroundColor:"#eae6ff"}}>
               <View style={styles.rowStyle}>
                <View  style={styles.numberView}>
                   <Text style={styles.numbers}>23002</Text>
                 </View>
                 <View  style={{paddingTop:18}}>
                   <Text style={styles.totalText}>Total Volunteers</Text>
                 </View>
                </View>
                 <View style={styles.rowStyle}>
                 <Text style={styles.message}>Volunteers distribute food and manage process.</Text>
                 </View>
                 
                 <TouchableOpacity  style={styles.touchableOpacityStyle}onPress={
                   ()=>{
                     this.props.navigation.navigate("FavScreen");
                   }
                 }>
                 <Text  style={{...styles.button , backgroundColor:"#aa99ff"}}>Be a volunteer</Text>
                 </TouchableOpacity>
                 
               </View>
               <View style={{...styles.shadow, backgroundColor:"#fff1e6"}}>
               <View style={{flexDirection:"row",  marginLeft:20}}>
                <View   style={styles.numberView}>
                   <Text style={styles.numbers}>12532</Text>
                 </View>
                 <View   style={{paddingTop:18}}>
                   <Text style={styles.totalText}>Total Needy People</Text>
                 </View>
                </View>
                 <View style={styles.rowStyle}>
                 <Text style={styles.message}>Needy people are those who need food for family.</Text>
                 </View>
                 
                 <TouchableOpacity  style={styles.touchableOpacityStyle} onPress={
                   ()=>{
                     this.props.navigation.navigate("Cart");
                   }
                 }>
                 <Text   style={{...styles.button , backgroundColor:"#ffb780"}}>Request us</Text>
                 </TouchableOpacity>
                 
               </View>
               <Accordion
                  sections={SECTIONS}
                  activeSections={this.state.activeSections}
                  renderHeader={this._renderHeader}
                  renderContent={this._renderContent}
                  onChange={this._updateSections}
                />
               </ScrollView>
          </View>
           
        )
    }
}

const styles = StyleSheet.create({
  shadow: {
    shadowOffset: { width: 10, height: 10 },
    shadowColor: 'black',
    //shadowOpacity: 1,
   // elevation: 1,
    height:200,
    width:"95%",
    marginTop:10,
    marginLeft:"auto",
    marginRight:"auto",
    borderRadius:10,
    padding:15,
    // background color must be set // invisible color
  },
  rowStyle:{
    flexDirection:"row", 
    marginLeft:20
  },
  numbers :{
    fontSize:35, 
    fontWeight:"bold", 
    color:"#4d4d4d",
  },
  numberView : {
    width:"40%", 
    padding:5,
  },
  totalText:{
    fontSize:17, 
    fontWeight:"bold", 
    color:"#4d4d4d",
  },
  message : {
    fontSize:13,
    color:"#4d4d4d"
  },
  touchableOpacityStyle:{
    alignItems:"center", 
    marginTop:20,
  },
  button : {
    padding:10,
    backgroundColor:"#367FFA",
    fontSize:18,
    borderRadius:10,
    marginTop:5,
    margin:5,
    color:"white",
    textAlign:"center",
    width:"90%",
    marginTop:5,
},
  faq:{
    padding:15,
    backgroundColor:colors.header,
    fontSize:18,
    borderRadius:10,
    marginTop:5,
    margin:5,
    color:"white",
    flexDirection:"row",
    justifyContent:"space-between"
},
content : {
  padding:5,
  borderRadius:10,
  margin:5,
  backgroundColor:"#e6f4ff",
  fontSize:18,
  
},
  headerText:{
    padding:10,
    backgroundColor:colors.header,
    fontSize:18,
    borderRadius:20,
    marginTop:5,
    margin:5,
    color:"white",
    textAlign:"center",
},
    container: { flex: 1, padding: 0, paddingTop: 0, backgroundColor: '#fff' },
    header: { height: 40, backgroundColor: '#262626', },
    text: { textAlign: 'center', fontWeight: '100',color:"white" },
    textRow: { textAlign: 'center', fontWeight: '100',color:"black" },
    dataWrapper: { marginTop: -1 },
    row: { height: 40, backgroundColor: '#e6faff' }
  });

export default HomeScreen;
