/* eslint-disable prettier/prettier */
/* eslint-disable no-trailing-spaces */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable quotes */
import React ,{ Component } from "react";
import { Image, View, Text, StyleSheet, FlatList } from 'react-native';
import { Caption } from 'react-native-paper';


export default class Posts extends Component {

    constructor(props) {
        super(props);

        this.state = [
            {image: '../assets/anne.png',title:'1st post', date:"23/3/2022", position:"president",content:"1st post content",username:'swift', 'id':1},
            {image: '../assets/anne.png',title:'2nd post', date:"23/3/2022", position:"vice-president",content:"2nd post content",username:'Apostle_dan', 'id':2},
            {image: '../assets/anne.png',title:'3rd post', date:"23/3/2022", position:"software director",content:"3rd post content",username:'hammed', 'id':3},
            {image: '../assets/anne.png',title:'4th post', date:"23/3/2022", position:"leader",content:"4th post content",username:'sitanda', 'id':4},
        ];

}
    render() {
      return (
        <View style={styles.container}>
        {/* <View style={styles.box}>
          <View style={styles.boxin}>
            <View style={styles.userinfo}>
              <View style={styles.userinfoImage}>
                <Image
                  source={require('../assets/anne.png')}
                  style={{width:"80%", height:"80%", borderRadius:30}}
                />
                <Caption style={{color: 'green',fontSize:7,lineHeight: 6}}>@Username</Caption>
              </View>
              <View style={styles.userinfoDetails}>
                <Text style={styles.title}>The GST 205 issue</Text>
                <Text style={styles.position}>Position</Text>
              </View>
            </View>
            <View style={styles.hline}/>
            <View style={styles.boxcontent}>
                <Text style={{color:"black",fontSize:11}}>I am vc vc cf vc vfdbdbgfbgf  bgfbfg c szd d fvg fg  dfb gf  gfhn g gf gf hgnjhmkjngf fd fdbgffd fd gfgf v dfgbf  fdf gn  df dfgnghg bv fv n hgngnhg f ghnhg hg gf gfhn f f gfhnjmjhmhg  fg hnhg hg fg fg h g  h ghgh nhgmjhmhj </Text>
            </View>
          </View>
        </View>
        <View style={styles.box}>
        <View style={styles.boxin}>
          <View style={styles.userinfo}>
            <View style={styles.userinfoImage}>
              <Image
                source={require('../assets/anne.png')}
                style={{width:"80%", height:"80%", borderRadius:30}}
              />
              <Text style={{color: 'green',fontSize:7}}>@Username</Text>
            </View>
            <View style={styles.userinfoDetails}>
              <Text style={styles.title}>The GST 205 issue</Text>
              <Text style={styles.position}>Position</Text>
            </View>
          </View>
          <View style={styles.hline}/>
          <View style={styles.boxcontent}>
              <Text style={{color:"black",fontSize:11}}>I am vc vc cf vc vfdbdbgfbgf  bgfbfg c szd d fvg fg  dfb gf  gfhn g gf gf hgnjhmkjngf fd fdbgffd fd gfgf v dfgbf  fdf gn  df dfgnghg bv fv n hgngnhg f ghnhg hg gf gfhn f f gfhnjmjhmhg  fg hnhg hg fg fg h g  h ghgh nhgmjhmhj </Text>
          </View>
        </View>
      </View> */}
      <FlatList
        data={this.state}
        showsVerticalScrollIndicator={false}
        style={{width:"100%"}}
        renderItem={({ item }) => (
            <View style={styles.box}>
            <View style={styles.boxin}>
            <View style={styles.userinfo}>
              <View style={styles.userinfoImage}>
                
                {/* <Image
                  source={require(item.image )}
                  style={{width:"80%", height:"80%", borderRadius:30}}
                /> */}
                <Caption style={{color: 'green',fontSize:7,lineHeight: 6}}>@{item.username}</Caption>
              </View>
              <View style={styles.userinfoDetails}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.position}>{item.position}</Text>
              </View>
            </View>
            <View style={styles.hline}/>
            <View style={styles.boxcontent}>
                <Text style={{color:"black",fontSize:11}}>{item.content}</Text>
            </View>
          </View>
        </View>
        )}
      />
      </View>
      );
    }
  }


  const styles = StyleSheet.create({
    container: {
      width:"100%",
      height:"100%",
      flex: 1,
      padding:9,
      paddingTop:2,
      flexDirection:'row',
      flexWrap: 'wrap',
    },
  
    box: {
      width:"100%",
      height:"50%",
      marginBottom:40,
      borderRadius:20,
      alignItems:"center",
      backgroundColor:'#009387',
      
    },
  
    boxin: {
      width:"99%",
      height:"96%",
      marginTop:10,
      borderRadius:20,
      alignItems:"center",
      backgroundColor:'white',
      
    },
  
    boxcontent:{
      color:"black",
      fontSize:2,
    },
  
    scroller:{
      width:"100%",
      height:"7%",
      flexDirection:"row",
      padding:2,
      justifyContent:"space-around",
      marginTop:10,
    },
  
    scrollbutton:{
      height:"100%",
      backgroundColor:"#d2d9d3",
      justifyContent:"center",
      alignItems:"center",
      padding:7,
      borderRadius:10,
      marginRight:10,
    },
  
    buttonText:{
      color:"white",
    },
  
    active: {
      height:"100%",
      backgroundColor:"#009387",
      justifyContent:"center",
      alignItems:"center",
      padding:7,
      borderRadius:10,
      marginRight:10,
    },
  
    refresh: {
      width:"100%",
      height:"3%",
      fontSize:5,
      alignItems:"center",
      justifyContent:"center",
      marginBottom:7,
    },
  
    userinfo: {
      width:"100%",
      height:"25%",
      borderRadius:30,
      flexDirection:"row",
      justifyContent:"space-around",
      flexWrap: 'wrap',
    },
  
    userinfoImage:{
      flex: 1,
      height:"100%",
      justifyContent:"center",
      alignItems:"center",
    },
  
    userinfoDetails:{
      flex: 3,
      flexDirection:"column",
    },
  
    title:{
      flex:3,
      color: 'black',
      fontSize:13,
    },
  
    position:{
      flex:1,
      color: 'green',
      fontWeight:"bold",
    },
  
    hline:{
      width:"95%",
      marginTop:5,
      height:1,
      backgroundColor:"#009387",
    },
  });
  
