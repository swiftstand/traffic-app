/* eslint-disable comma-dangle */
/* eslint-disable no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-trailing-spaces */
/* eslint-disable quotes */
/* eslint-disable jsx-quotes */
/* eslint-disable prettier/prettier */
import React, { Component} from 'react';
import { Platform, 
    View, 
    ActivityIndicator, 
    StatusBar,
     Alert, 
     Text, 
     StyleSheet,
     SafeAreaView,
      TouchableOpacity,
      PermissionsAndroid,
      FlatList} from 'react-native';
import {icons, SIZES, COLORS, FONTS } from '../constants';
import { CheckRequests } from "../components/requests";
import {Card,} from 'react-native-shadow-cards';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Geolocation  from 'react-native-geolocation-service';
import Radar from 'react-native-radar';


export default class Check extends Component {
    constructor(props){ 
        super(props);
        this.state = {
            data:null,
            isLoading:false,
            isL:false,
            is_clear:true,
            lat:null,
            long:null,
            flag:null,
            updateList:[],
            tok:null
    };
    }

    getPost = (mydata) => {
        this.setState({
            isL:true,
            isLoading:true,
        });
        CheckRequests(mydata).then((result) => {
            console.log(result);
            this.setState({
                isL:false,
                updateList:result,
            });
            this.setState({
                isLoading:false,
            });
        }).then(() => {
            if (this.state.updateList.length > 0){
            Alert.alert(`${this.state.data} Traffic updates`,'These are traffic updates within your current local government in the last 48 hours',[
                {text: 'Okay'},
            ]);
        }
        });
    }

    getRefresh = () => {
        this.setState({
            isL:true,
        });
        CheckRequests(this.state.data).then((result) => {
            console.log(result);
            this.setState({
                updateList:result,
            });
            this.setState({
                isL:false,
            });
        }).then(() => {
            Alert.alert(`${this.state.data} Traffic updates`,'These are traffic updates within your current local government in the last 48 hours',[
                {text: 'Okay'},
            ]);
        });
    }

    getLocationInfo = async () => {
        this.setState({
            isL:true,
            isLoading:true,
        });
        const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            'title':'Traffic Manager Location permission',
            'message':'we need permission to access your location',
          }
        );
      
        if (granted) {
  
          // console.log('start');
          // Geocoder.setApiKey('AlzaSyDzXDIQ6JgrKD6CHHjrhv2YtNUWYCIVL00');
          // console.log('done');
        Geolocation.getCurrentPosition(async(position) => {
            this.setState({
              lat:position.coords.latitude,
              long:position.coords.longitude,
            });
            console.log('lat: ',this.state.lat);
            console.log('long: ',this.state.long);
          
        Radar.setUserId("Oladeji");
        if (this.state.long != null && this.state.lat != null) {
          console.log('heree now');
        await  Radar.reverseGeocode({
          latitude:this.state.lat,
        longitude:this.state.long,
        }).then((result) => {
          console.log(result);
          let contet;
          let my_dict = result.addresses[0];
          contet = `${my_dict.addressLabel}`;
  
          for (var key in my_dict) {
            console.log('tools: ',key,' , ',my_dict[key]);
            if ( String(contet).includes(my_dict[key]) ) {
              null;
          } else if (key === "neighborhood" || key === "city" ||  key === "placeLabel" ||  key === "street" || key === "state" ) {
            contet = contet + `, ${my_dict[key]}`;
          }
  
        }
          contet = contet + ' state.';
          console.log(contet);
          
          this.setState({
          data:contet,
          flag:result.addresses[0].countryFlag,
          }, (() => {
            this.getPost(this.state.data);
          }));
  
        }).catch((err) => {
          console.log(err);
        });}
          },
          (error) =>{ 
            console.log(error.code,error.message);
          },
          { enableHighAccuracy:true, timeout:10000,maximumAge:1000}
          );
        } else {
            Alert.alert('ERROR','please allow location permission',[
                {text: 'Okay'},
              ]);
            this.props.navigation.goback();
        }
      };

    componentDidMount() {
        this.getLocationInfo();
        setTimeout(async() => {
            let userToken;
            userToken = null;
            try {
              userToken = await AsyncStorage.getItem('userToken');
              console.log('********************');
              console.log(userToken);
              this.setState({
                tok:userToken,
            });
            } catch (e) {
              console.log(e);
            }
          }, 5);
    }

    _renderRestItem = ({ item, index }) => (
            <View
            key={item.id}
                style={{
                     marginBottom: SIZES.padding * 5,
                }}
            >
                <Card style={{margin:10,padding:10,justifyContent:"center"}}>
                        <View style={{marginBottom:5}}>
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
                                fontWeight: '700',
                                textAlign: 'center',
                                marginBottom: 10,
                                paddingHorizontal: 30,
                            }}>{item.adress}{'\n'} </Text>
                            by <Text style={{color:'#FC6D3F'}}>@{item.author_username}</Text>
                        </Text>

                        <Text
                            style={{ 
                                color:'#FC6D3F',
                                ...FONTS.body5,
                                alignSelf:'flex-end',
                            }}
                        >{item.date_posted}</Text>
                        { item.recommendations !== "" ? (
                            <View> 
                                <View style={styles.separator} />

                                <Text
                                    style={{ 
                                        color:COLORS.black,
                                        ...FONTS.body4,
                                        fontWeight:'bold',
                                    }}
                                >{item.recommendations}</Text>
                            </View>   
                        )
                        :
                        null
                        }
                                                
                        </View>
                    </Card>
                </View>
    );
    

    render () {
        return (
            <SafeAreaView style={styles.container}>
            <View style={{flex: 1,alignItems:"center",justifyContent:"center"}}>
                <Text style={{ ...FONTS.h1,color:"white"}}>Traffic Updates</Text>
            </View>
                <StatusBar backgroundColor='black' barStyle="light-content"/>
                <View style={{flex:Platform.OS === 'ios' ? 4 : 6, borderTopLeftRadius: 30, borderTopRightRadius: 30,backgroundColor: '#fff'}}>
                { this.state.isLoading ?
                    <View style={{alignItem:"center",justifyContent:"center", flex:1, borderTopLeftRadius: 30,
                    borderTopRightRadius: 30,}}>
                        <ActivityIndicator size="large" animating color='#FC6D3F' />
                    </View>
                :
                    <View style={{alignItems:"center", justifyContent:"center", flex:1, backgroundColor: "#fff", borderTopLeftRadius: 30,
                    borderTopRightRadius: 30,}}>
                    { this.state.updateList.length === 0 ? 
                        <View>
                        <Text style={{ ...FONTS.body4,color:"#FC6D3F", alignSelf:"center", fontWeight:"bold"}}>No Traffic update in <Text style={{color:"#012e0b"}}>{this.state.data}</Text></Text>
                        <Text style={{ ...FONTS.body4,color:"#FC6D3F", alignSelf:"center", fontWeight:"bold"}}>in the last 48 hours</Text>
                        <TouchableOpacity 
                            style={{
                                backgroundColor:"#FC6D3F",
                                marginVertical:20,
                                height:"18%",
                                alignItems:"center", 
                                justifyContent:"center",
                                borderRadius:15,
                            }}
                            onPress = {() => {this.getPost(this.state.data)}}
                        >
                            <Text style={{color:"white"}}>Try Again</Text>
                        </TouchableOpacity>
                        </View>
                    :
                    <View>
                        <View>
                            <Text style={{ ...FONTS.body5,alignSelf:"center",color:"grey"}}>pull to refresh</Text>
                        </View>
                    
                        <FlatList
                            data={this.state.updateList}
                            showsVerticalScrollIndicator={false}
                            refreshing={this.state.isL}
                            onRefresh={this.getRefresh}
                            keyExtractor={(item, index) => {`${item.id}`; index.toString();}}
                            renderItem={this._renderRestItem}
                        />
                    </View>
                    }
                    </View> 
                    }                       
                </View>
                
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: '#FC6D3F'
      
  },
  shadow: {
      shadowColor: "#000",
      shadowOffset: {
          width: 0,
          height: 3,
      },
      shadowOpacity: 0.1,
      shadowRadius: 3,
      elevation: 1,
  },
  separator: {
      marginTop:8,
    marginBottom: 15,
    borderWidth: 0.5,
    borderColor: '#DCDCDC'},
  fab: {
    position:"absolute",
    margin:16,
    right:0,
    bottom:20,
    backgroundColor:"#083610"
}
});

