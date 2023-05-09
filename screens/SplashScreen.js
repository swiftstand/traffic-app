/* eslint-disable react-native/no-inline-styles */
/* eslint-disable jsx-quotes */
/* eslint-disable no-unused-vars */
/* eslint-disable comma-dangle */
/* eslint-disable no-trailing-spaces */
/* eslint-disable prettier/prettier */
import React from 'react';
import { 
    View, 
    Text,
    TouchableOpacity,
    SafeAreaView,
    Dimensions,
    StyleSheet,
    StatusBar,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import { useTheme } from '@react-navigation/native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { AuthContext } from '../components/context';

function SplashScreen(props){
    const { colors } = useTheme();

    const [data, setData] = React.useState('');

    const godrop = () => {
        props.navigation.navigate('drop');
    };

    const gocheck = () => {
        props.navigation.navigate('check');
    };

    const { signOut, toggleTheme } = React.useContext(AuthContext);

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar backgroundColor='black' barStyle="light-content"/>
          <View style={styles.header}>
          <Text style={[styles.title]}>Traffic Manager</Text>
              <Animatable.Image 
                  animation="bounceIn"
                  duraton="1500"
              source={require('../assets/logon.png')}
              style={styles.logo}
              resizeMode="stretch"
              />
  
          </View>
              <Animatable.View 
              style={[styles.footer, {
              }]}
              animation="fadeInUpBig"
          >
  
          <TouchableOpacity
            onPress={()=>godrop()}
              style={[styles.opt, {
                  backgroundColor: 'white',marginBottom:30
              }]}
            
          >
              <Text style={[styles.textSign, {
                  color:'#FC6D3F',
              }]}>Submit Traffic Updates</Text>
          </TouchableOpacity>
  
          <TouchableOpacity
            onPress={()=>gocheck()}
              style={[styles.opt, {
                  backgroundColor: 'white'
              }]}
          >
              <Text style={[styles.textSign, {
                  color:'#FC6D3F',
              }]}>Check Traffic Updates </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={()=> signOut()}
              style={[styles.opt, {
                  backgroundColor: 'white',
                  marginTop:30,
                  flexDirection:'row'
              }]}
          >
              <Text style={[styles.textSign, {
                  color:'#FC6D3F', marginHorizontal:8
              }]}>Logout Account </Text>

                <FontAwesome 
                    name="sign-out"
                    color="#FC6D3F"
                    size={20}
                />
          </TouchableOpacity>
          </Animatable.View>
          
        </SafeAreaView>
    );
}

export default SplashScreen;

const {height} = Dimensions.get('screen');
const height_logo = height * 0.28;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor:'white',
  },
  header: {
      flex: 2,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor:'white'
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
      paddingHorizontal: 20,
      flexDirection:'row', 
      justifyContent: 'space-evenly',
      alignItems: 'center'
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

