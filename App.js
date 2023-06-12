import React, { useState, } from 'react'; 
import { View, StyleSheet } from 'react-native';
//import LittleLemonHeader from './components/LittleLemonHeader';
//import LittleLemonFooter from './components/LittleLemonFooter';
import OnboardingScreen from './components/OnboardingScreen';
import ProfileScreen from './components/ProfileScreen';
import HomeScreen from './components/HomeScreen';
//import LoginScreen from './LoginScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

/*
<>
<NavigationContainer>
    <Stack.Navigator useLegacyImplementation initialRouteName="Onboarding">
      <Stack.Screen name="Onboarding" component={OnboardingScreen} />
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
    </Stack.Navigator>
</NavigationContainer>
</>
*/
/*
<>
<Stack.Screen name="HomeScreen" component={HomeScreen} />
<Stack.Screen name="ProfileScreen" component={ProfileScreen} />
</>
*/

function Root() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="HomeScreen" component={HomeScreen} />
      <Drawer.Screen name="ProfileScreen" component={ProfileScreen} />
    </Drawer.Navigator>
  );
}
export default function App() {
  const [state, setState] = useState(false);
  return (
    //console.log('The state is')
    //console.log(state)
    //state ? console.log('1') : console.log('2')
    //<>
    <NavigationContainer>
      <Stack.Navigator>
          <Stack.Screen name="Onboarding" component={OnboardingScreen} />
          <Stack.Screen name="Root" component={Root} />
      </Stack.Navigator>
    </NavigationContainer>
    //</>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#333333',
  },
  footerContainer: { backgroundColor: '#333333' },
});