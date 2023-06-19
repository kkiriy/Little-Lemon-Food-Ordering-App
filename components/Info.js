import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Pressable,
  Alert
} from 'react-native';

import {useState, useEffect} from 'react'

import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Info(props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const storeData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem('@onboarding', jsonValue)
    } catch (e) {
      console.err(e)
    }
  }

  useEffect(() => {
    ( async () => {
      try {
        const dt = await AsyncStorage.getItem('@onboarding')
        const dataObj = JSON.parse(dt)
        setName(dataObj.name ? dataObj.name : "")
        setEmail(dataObj.email ? dataObj.email : "")
      } catch (e) {
        console.err(e)
      }
    })()
  }, [])

  useEffect(() => {
    (async () => {
      try {
        const dt = {
          name : name,
          email : email
        }
        storeData(dt)
      } catch (e) {
        console.err(e)
      }
    })()
  }, [name, email])

  const onNext = () => {
    const dt = {
      name : name,
      email : email,
      isOnboardingCompleted : true,
    }
    storeData(dt)
    props.navigation.navigate('Home')
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Name *</Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
        onChangeText={(data) => setName(data)}
        value={name}
      />
      <Text style={styles.label}>Email *</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={(data) => setEmail(data)}
        value={email}
      />
      <Pressable
        style={styles.button}
        onPress={onNext}
      >
        <Text>Next</Text>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'stretch',
    alignSelf: 'stretch',
    marginVertical: 10,
    marginHorizontal: 3
  },
  button: {
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "#495E57",
    backgroundColor: '#F4CE14',
    color: '#495E57',
    padding:10,
    margin:10,
    alignItems: 'center'
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "black",
    minHeight: 35,
    marginVertical:5,
    marginHorizontal:3,
    paddingHorizontal: 8
  },
  label: {
    fontSize: 10,
    marginHorizontal: 3,
  }
})
