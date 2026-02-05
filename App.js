import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import HomeScreen from './src/screens/HomeScreen';
import HistoryScreen from './src/screens/HistoryScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === 'Today') {
              iconName = focused ? 'heart' : 'heart-outline';
            } else if (route.name === 'History') {
              iconName = focused ? 'book' : 'book-outline';
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#FF6B6B',
          tabBarInactiveTintColor: 'gray',
          headerStyle: { backgroundColor: '#FF6B6B' },
          headerTintColor: '#fff',
        })}
      >
        <Tab.Screen 
          name="Today" 
          component={HomeScreen}
          options={{ title: '오늘의 감사' }}
        />
        <Tab.Screen 
          name="History" 
          component={HistoryScreen}
          options={{ title: '감사 기록' }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}