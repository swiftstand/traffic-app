/* eslint-disable react-native/no-inline-styles */
/* eslint-disable comma-dangle */
/* eslint-disable no-trailing-spaces */
/* eslint-disable prettier/prettier */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

 import React, { useEffect } from 'react';
 import { View, ActivityIndicator, Alert } from 'react-native';
 import { 
   NavigationContainer, 
   DefaultTheme as NavigationDefaultTheme,
   DarkTheme as NavigationDarkTheme
 } from '@react-navigation/native';
 import { createDrawerNavigator } from '@react-navigation/drawer';
 
 import { 
   Provider as PaperProvider, 
  DefaultTheme as PaperDefaultTheme,
   DarkTheme as PaperDarkTheme 
 } from 'react-native-paper';
 
 import SplashScreen from './screens/SplashScreen';
  import Check from './screens/check';
  import Drop from './screens/Drop';
 
 import { AuthContext } from './components/context';

 import { LogoutRequest } from './components/requests';
 
 
 import AsyncStorage from '@react-native-async-storage/async-storage';

 import RootStackScreen from './screens/RootStackScreen';
import { createStackNavigator } from '@react-navigation/stack';


const RootStack = createStackNavigator();

 const App = () => {

   const [isDarkTheme, setIsDarkTheme] = React.useState(false);
 
   const initialLoginState = {
     isLoading: true,
     userName: null,
     userToken: null,
     jambRegNumber:null,
     fullname:null,
     
   };
 
   const CustomDefaultTheme = {
     ...NavigationDefaultTheme,
     ...PaperDefaultTheme,
     colors: {
       ...NavigationDefaultTheme.colors,
       ...PaperDefaultTheme.colors,
       background: '#ffffff',
       text: '#333333'
     }
   };
   
   const CustomDarkTheme = {
     ...NavigationDarkTheme,
     ...PaperDarkTheme,
     colors: {
       ...NavigationDarkTheme.colors,
       ...PaperDarkTheme.colors,
       background: '#333333',
       text: '#ffffff'
     }
   };

   const theme = isDarkTheme ? CustomDarkTheme : CustomDefaultTheme;
 
   const loginReducer = (prevState, action) => {
     switch ( action.type ) {
       case 'RETRIEVE_TOKEN': 
         return {
           ...prevState,
           userToken: action.token,
           isLoading: false,
         };
       case 'LOGIN': 
         return {
           ...prevState,
           userName: action.id,
           fullname: action.name,
           userToken: action.token,
           isLoading: false,
         };
       case 'LOGOUT': 
         return {
           ...prevState,
           userName: null,
           userToken: null,
           isLoading: false,
           jambRegNumber:null,
           fullname:null,
         };
       case 'REGISTER': 
         return {
           ...prevState,
           userName: action.id,
           userToken: action.token,
           isLoading: false,

         };
        case 'REGNO':
        return {
           ...prevState,
           userName: null,
           userToken: null,
           isLoading: false,
           jambRegNumber:action.regnum,
           fullname:null,
         };
     }
   };
 
   const [loginState, dispatch] = React.useReducer(loginReducer, initialLoginState);
 
   const authContext = React.useMemo(() => ({
     signIn: async(foundUser, usernamed) => {
       const userToken = String(foundUser.token);
       const fullName = String(foundUser.fullname);
       const userName = usernamed;
       
       try {
         await AsyncStorage.setItem('userToken', userToken);
         await AsyncStorage.setItem('userName', usernamed);
         await AsyncStorage.setItem('fullName', fullName);
       } catch (e) {
         Alert.alert('Error', 'please reopen the app');
       }
       dispatch({ type: 'LOGIN', id: userName, token: userToken });
     },

     signOut: async() => {
      let d_t = String( await AsyncStorage.getItem('userToken'));
      let d_u = String( await AsyncStorage.getItem('userName'));
      LogoutRequest(d_t).then(result => {
      if (result.status === 'success'){
        if (result.user === d_u){
        try {
          AsyncStorage.removeItem('userToken');
          AsyncStorage.removeItem('fullName');
          AsyncStorage.removeItem('userName');
        } catch (e) {
          console.log(e);
        }
        dispatch({ type: 'LOGOUT' });
      } }
      
      });
     },
     signUp: () => {
     },
     toggleTheme: () => {
       setIsDarkTheme( isDarkTheme => !isDarkTheme );
     }
   }), []);
 
   useEffect(() => {
     setTimeout(async() => {
       // setIsLoading(false);
       let userToken;
       let userName;
       userToken = null;
       userName = null;
       try {
         userToken = await AsyncStorage.getItem('userToken');
         userName = await AsyncStorage.getItem('userName');
       } catch (e) {
         console.log(e);
       }
        console.log('user token: ', userToken);
        console.log('user name: ', userName);
       dispatch({ type: 'RETRIEVE_TOKEN', token: userToken });
     }, 1000);
   }, []);
 
   if ( loginState.isLoading ) {
     return (
       <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
         <ActivityIndicator size="large"/>
       </View>
     );
   }
   return (
     <PaperProvider theme={theme}>
     <AuthContext.Provider value={authContext}>
     <NavigationContainer theme={theme}>
     { loginState.userToken !== null  ? (
        <RootStack.Navigator headerMode="none">
            <RootStack.Screen name="SplashScreen" component={SplashScreen}/>
            <RootStack.Screen name="drop" component={Drop}/>
            <RootStack.Screen name="check" component={Check}/>
        </RootStack.Navigator>
     )
     :
        <RootStackScreen/>
     }
     </NavigationContainer>
     </AuthContext.Provider>
     </PaperProvider>
   );
 };
 
 export default App;
 
