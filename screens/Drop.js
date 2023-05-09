/* eslint-disable react-native/no-inline-styles */
/* eslint-disable comma-dangle */
/* eslint-disable no-trailing-spaces */
/* eslint-disable prettier/prettier */
import React, { useState, useEffect, Component } from 'react';
import { 
    View, 
    Text,
    Alert,
    TextInput,
    Platform,
    TouchableOpacity,
    ActivityIndicator,
    Dimensions,
    StyleSheet,
    StatusBar,
    PermissionsAndroid,
    SafeAreaView
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { DropgRequest } from '../components/requests';
import Geolocation  from 'react-native-geolocation-service';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Radar from 'react-native-radar';



export default class Drop extends Component {
  constructor(props){ 
      super(props);
      this.state = {
        data:null,
        recommendation:'',
        localty:null,
        lat:null,
        long:null,
        flag:null,
        isLoading:false,
        isFetching:true,
        tok:null
      };
    }

    handleRec = (val) => {
      this.setState({
        recommendation:val
      });
    }


    submitUpdate = (data) => {
      this.setState({
        isLoading:true
      });
      DropgRequest(data, this.state.tok).then((result) => {
        console.log(result);
        this.setState({
          isLoading:false
        });
        Alert.alert('SUCCESS',result.satus,[
          {text: 'Okay'},
        ]);
      }).then(() => {
        this.props.navigation.pop();
      }
      
      
      ).catch((err) => {
        console.log(err);
        this.setState({
          isLoading:false
        });

        Alert.alert('ERROR','An error  occurred while sending your update, please check your internet connection and try again',[
          {text: 'Okay'},
        ]);
        
      });
  }

    getLocationInfo = async () => {
      // setIsLoading(false);
      const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          'title':'Traffic Manager Location permission',
          'message':'we need permission to access your location'
        }
      );
    
      if (granted) {

        this.setState({
          isFetching:true,
        });
      await Geolocation.getCurrentPosition(async(position) => {
          this.setState({
            lat:position.coords.latitude,
            long:position.coords.longitude,
          });
          console.log('lat: ',this.state.lat);
          console.log('long: ',this.state.long);
        
      Radar.setUserId('Oladeji');
      if (this.state.long != null && this.state.lat != null) {
        console.log('heree now');
      await  Radar.reverseGeocode({
        latitude:this.state.lat,
      longitude:this.state.long
      }).then((result) => {
        console.log(result);
        let contet;
        let localty;
        let my_dict = result.addresses[0];
        contet = `${my_dict.addressLabel}`;
        localty = `${my_dict.addressLabel}`;
        for (var key in my_dict) {
          // console.log('tools: ',key,' , ',my_dict[key]);
          if ( String(contet).includes(my_dict[key]) ) {
            null;
        } else if (key === 'neighborhood' || key === 'city' ||  key === 'placeLabel' || key === 'street' || key === 'state' ) {
          contet = contet + `, ${my_dict[key]}`;
        }
        if ( String(localty).includes(my_dict[key]) ) {
            null;
        }
        else if (key === 'city' ||  key === 'placeLabel' || key === 'state' ) {
          localty = localty + `, ${my_dict[key]}`;
        }

      }
        contet = contet + ' state.';
        localty = localty + ' state.';

        console.log(localty);
        console.log(contet);
        
        this.setState({
        data:contet,
        localty:localty,
        flag:result.addresses[0].countryFlag,
        isFetching:false,
        });

        Alert.alert('We found you','if this is not your precise location, kindly click the icon below to refetch \n \n NOTE: if it persists this might be the closest recognisable location to your position at the moment',[
          {text: 'Okay'},
      ]);
      }).catch((err) => {
        console.log(err);
      });}
        },
        (error) =>{ 
          console.log(error.code,error.message);
        },
        { enableHighAccuracy:true, timeout:10000,maximumAge:1000}
        );
      }
    };

    componentDidMount() {
      setTimeout(async() => {
        let userToken;
        userToken = null;
        try {
          userToken = await AsyncStorage.getItem('userToken');
          this.setState({
            tok:userToken,
        });
        } catch (e) {
          console.log(e);
        }

      }, 5);

      this.getLocationInfo();
      
    }

    render () {
      return (

        <SafeAreaView style={styles.container}>
          <StatusBar backgroundColor='black' barStyle="light-content"/>
            <Animatable.View 
            style={{
          width: '90%',
          backgroundColor: '#fff',
          borderRadius: 20,
          padding: 20,
        }}
            animation="fadeInUpBig"
        >
        <Text
          style={{
            textAlign: 'center',
            fontSize: 26,
            fontWeight: '600',
            color: '#333',
            marginBottom: 20,
          }}>
          Traffic Update
        </Text>

        <FontAwesome5
          name="quote-left"
          style={{fontSize: 20, marginBottom: -12}}
          color="#000"
        />
        { this.state.data !== null ? 
        (
        <Text
          style={{
            color: '#000',
            fontSize: 16,
            lineHeight: 26,
            letterSpacing: 1.1,
            fontWeight: '400',
            textAlign: 'center',
            marginBottom: 10,
            paddingHorizontal: 30,
          }}>
          There is currently traffic around {'\n'} 
          <Text
          style={{
            color: '#000',
            fontSize: 16,
            lineHeight: 26,
            letterSpacing: 1.1,
            fontWeight: 'bold',
            textAlign: 'center',
            marginBottom: 10,
            paddingHorizontal: 30,
          }}>{this.state.data}</Text>
          {'\n'}
          {this.state.flag}
        </Text>)
        :
        <ActivityIndicator animating={this.state.isFetching} color="#FC6D3F" />
      }
        <FontAwesome5
          name="quote-right"
          style={{
            fontSize: 20,
            textAlign: 'right',
            marginTop: -20,
            marginBottom: 20,
          }}
          color="#000"
        />
        { this.state.isFetching ?
        <Text
          style={{
            textAlign: 'right',
            fontWeight: '300',
            fontStyle: 'italic',
            fontSize: 16,
            color: '#FC6D3F',
          }}>
          —— locating...
        </Text>
        :
        <Text
          style={{
            textAlign: 'right',
            fontWeight: '300',
            fontStyle: 'italic',
            fontSize: 16,
            color: '#FC6D3F',
          }}>
          —— Done
        </Text>
        }

          <TextInput
              backgroundColor="#f0f5f5"
              placeholder="suggest an alternative route. "
              placeholderTextColor="grey"
              multiline={true}
              onChangeText={(val => this.handleRec(val))}
              value={this.state.recommendation}
              style={{
                fontSize: 16,
                fontWeight: '600',
                color: '#333',
                  padding: 20,
                  borderRadius: 30,
                  marginVertical: 20,
                  textAlignVertical:'top',
                  height:150,
              }}
              autoCapitalize="none"
          />

        <TouchableOpacity
         onPress={() => this.submitUpdate(this.state)}
          style={{
            backgroundColor: this.state.isFetching ? 'rgba(83, 114, 240, 0.7)' : 'rgba(83, 114, 240, 1)',
            padding: 20,
            borderRadius: 30,
            marginVertical: 20,
          }}>
          {this.state.isFetching || this.state.isLoading ? 
          (
            <ActivityIndicator animating={this.state.isLoading ? this.state.isLoading : this.state.isFetching } color="#fff" />
            )
            :
          <Text style={{color: '#fff', fontSize: 18, textAlign: 'center'}}>
            Drop
          </Text>
          
    }
        </TouchableOpacity>

        <View style={{flexDirection: 'row',justifyContent:'space-around'}}>
          <TouchableOpacity
            onPress={() => {this.getLocationInfo();}}
            style={{
              borderWidth: 2,
              borderColor: '#FC6D3F',
              borderRadius: 50,
              padding: 15,
            }}>
            <FontAwesome name="refresh" size={22} color="#FC6D3F" />
          </TouchableOpacity>
          
        </View>
        </Animatable.View>
      </SafeAreaView>

      );
    }
  }

const {height} = Dimensions.get('screen');
const height_logo = height * 0.28;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'#FC6D3F',
  },

  action: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5,
},

errorMsg: {
        color: '#FF0000',
        fontSize: 14,
    },


footer: {
      flex: 1,
      backgroundColor: '#FC6D3F',
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
      paddingVertical: 50,
      paddingHorizontal: 30,
      justifyContent: 'center',
      alignItems: 'center'
  },

  opt: {
      backgroundColor: '#fff',
      borderTopLeftRadius: 15,
      borderTopRightRadius: 15,
      paddingVertical: 20,
      paddingHorizontal: 20
  },
  logo: {
      width: height_logo,
      height: height_logo,
      marginTop:'10%',
  },
  title: {
      color:'#FC6D3F',
      fontSize: 30,
      fontWeight: 'bold'
  },
  text: {
      color: 'grey',
      marginTop:5
  },
  button: {
      alignItems: 'flex-end',
      marginTop: 30
  },
  signIn: {
      width: 100,
      height: 40,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 50,
      flexDirection: 'row'
  },
  textSign: {
      color: 'white',
      fontWeight: 'bold'
  }
});

