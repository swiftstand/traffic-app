/* eslint-disable prettier/prettier */
import React from 'react';

import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import Icon from 'react-native-vector-icons/Ionicons';

import HomeScreen from './HomeScreen';
import DetailsScreen from './DetailsScreen';
import ExploreScreen from './ExploreScreen';
import ProfileScreen from './ProfileScreen';



const HomeStack = createStackNavigator();
const ProfileStack = createStackNavigator();
const DetailsStack = createStackNavigator();
const ExploreStack = createStackNavigator();

const Tab = createMaterialBottomTabNavigator();

const MainTabScreen = () => (
    <Tab.Navigator
      initialRouteName="Home"
      activeColor="#fff"
    >
      <Tab.Screen
        name="Home"
        component={HomeStackScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarColor: '#083610',
          tabBarIcon: ({ color }) => (
            <Icon name="ios-home" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Notifications"
        component={DetailsStackScreen}
        options={{
          tabBarLabel: 'Polls',
          tabBarColor: '#083610',
          tabBarIcon: ({ color }) => (
            <Icon name="ios-notifications" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: 'My page',
          tabBarColor: '#083610',
          tabBarIcon: ({ color }) => (
            <Icon name="ios-person" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Explore"
        component={ExploreStackScreen}
        options={{
          tabBarLabel: 'Explore',
          tabBarColor: '#083610',
          tabBarIcon: ({ color }) => (
            <Icon name="ios-aperture" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
);

export default MainTabScreen;

const HomeStackScreen = ({navigation}) => (
<HomeStack.Navigator screenOptions={{
        headerStyle: {
        backgroundColor: '#083610',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
        fontWeight: 'bold',
        },
    }}>
        <HomeStack.Screen name="Home" component={HomeScreen} options={{
        title:'Daily Updates',
        headerLeft: () => (
            <Icon.Button name="ios-menu" size={25} backgroundColor='#083610' onPress={() => navigation.openDrawer()}></Icon.Button>
        )
        }} />
</HomeStack.Navigator>
);


  const ExploreStackScreen = ({navigation}) => (
    <ExploreStack.Navigator screenOptions={{
            headerStyle: {
            backgroundColor: '#083610',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
            fontWeight: 'bold',
            },
        }}>
            <ExploreStack.Screen name="Explore" component={ExploreScreen} options={{
            title:'Explore Screen',
            headerLeft: () => (
                <Icon.Button name="ios-menu" size={25} backgroundColor='#083610' onPress={() => navigation.openDrawer()}></Icon.Button>
            )
            }} />
    </ExploreStack.Navigator>
    );
  

const DetailsStackScreen = ({navigation}) => (
<DetailsStack.Navigator screenOptions={{
        headerStyle: {
        backgroundColor: '#083610',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
        fontWeight: 'bold',
        },
    }}>
        <DetailsStack.Screen name="Details" component={DetailsScreen} options={{ title:'Polls',
        headerLeft: () => (
            <Icon.Button name="ios-menu" size={25} backgroundColor='#083610' onPress={() => navigation.openDrawer()}></Icon.Button>
        ),
        }} />
</DetailsStack.Navigator>
);



