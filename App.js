import Onboarding from './screens/Onboarding'
import Home from './screens/Home'
import Profile from './screens/Profile'
import {NavigationContainer} from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import {useEffect, useState} from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {Alert} from 'react-native'

export default function App() {
  const [isOnboardingCompleted, setIsOnboardingCompleted] = useState(false)

  useEffect(() => {
    (async () => {
      try {
        const info = await AsyncStorage.getItem('@onboarding')
        const dt = JSON.parse(info)
        setIsOnboardingCompleted(dt.isOnboardingCompleted)
      } catch (e) {
        // console.err(e)
      }
    })()
  }, [])

  const Stack = createNativeStackNavigator()
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={ isOnboardingCompleted ? 'Home' : 'Onboarding'}
      >
          <Stack.Screen
            name='Home'
            component={Home}
            option={{title: 'Home'}}
          />
          <Stack.Screen
            name='Profile'
            component={Profile}
            option={{title: 'Profile'}}
          />
          <Stack.Screen
            name='Onboarding'
            component={Onboarding}
            option={{title: 'Welcome'}}
          />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
