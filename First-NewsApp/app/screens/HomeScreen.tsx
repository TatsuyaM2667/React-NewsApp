// app/App.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TechnologyScreen from '../screens/TechnologyScreen';
import SportsScreen from '../screens/SportsScreen';
import BusinessScreen from '../screens/BusinessScreen';
const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={{ headerShown: true }}>
        <Tab.Screen name="Technology" component={TechnologyScreen} />
        <Tab.Screen name="Sports" component={SportsScreen} />
        <Tab.Screen name="Business" component={BusinessScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}