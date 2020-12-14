import 'react-native-gesture-handler';
import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import DashboardTab from './DashboardTab';

const Tab = createBottomTabNavigator();

function dashboard() {
  return <DashboardTab />;
}

function estados() {
  return null;
}

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarIcon: ({focused, color, size}) => {
            let iconName;

            if (route.name === 'Dashboard') {
              iconName = focused ? 'chart-line' : 'chart-line';
            } else if (route.name === 'Estados') {
              iconName = focused ? 'city' : 'city';
            }

            // You can return any component that you like here!
            return <FontAwesome5 name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: 'blue',
          inactiveTintColor: 'gray',
        }}>
        <Tab.Screen
          name="Dashboard"
          component={dashboard}
          options={{title: 'Dashboard'}}
        />
        <Tab.Screen
          name="Estados"
          component={estados}
          options={{title: 'Estados'}}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
