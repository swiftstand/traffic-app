/* eslint-disable prettier/prettier */
import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import SignInScreen from './SignInScreen';
import SignUpScreen from './SignUpScreen';
import ResetRequestScreen from './ResetRequest';
import ResetConfirmScreen from './ResetConfirm';

const RootStack = createStackNavigator();

const RootStackScreen = ({navigation}) => (
    <RootStack.Navigator headerMode="none">
        <RootStack.Screen name="SignInScreen" component={SignInScreen} options = {{headerShown:false}}/>
        <RootStack.Screen name="SignUpScreen" component={SignUpScreen} options = {{headerShown:false}}/>
        <RootStack.Screen name="ResetRequestScreen" component={ResetRequestScreen} options = {{headerShown:false}}/>
        <RootStack.Screen name="ResetConfirmScreen" component={ResetConfirmScreen} options = {{headerShown:false}}/>
    </RootStack.Navigator>
);
export default RootStackScreen;
