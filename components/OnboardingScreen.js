import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, Pressable, Image } from 'react-native';

export default function OnboardingScreen({ navigation, state }) {
  //const [firstName, onChangeFirstName] = useState('');
  //const [email, onChangeEmail] = useState('');
  //const [loggedIn, onLogin] = useState(false);
  const initialvalues = {
    firstName: "",
    email: "",
    loggedIn: false,
  };
  const [data, setData] = useState(initialvalues);

  const handleChange = (e) => {
    console.log(e);
    setData({ ...data, [e.target.name]: e.target.value });
  };

  return (
  <View style={styles.container0}>
    <View style={styles.container2}>
      <Image
          style={styles.image}
          source={require('../img/Logo.png')}
          resizeMode="stretch"
          accessible={true}
          accessibilityLabel={'Little Lemon Logo'}
      />
    </View>
    <View style={styles.container}>
      <Text style={styles.regularText}>
        Let us get to know you
      </Text>
      <Text style={styles.regularText}>
          First Name
      </Text>
      <TextInput
        style={styles.inputBox}
        //value={firstName}
        //name="firstName"
        //id="firstName"
        //onChangeText={handleChange}
        onChange = {e=>setData({...data,firstName:e.target.value})}
        //onChangeText={onChangeFirstName}
        keyboardType={'default'}
        //textContentType={givenName}
        //placeholder={'First Name'}
      />
      <Text style={styles.regularText}>
          Email
      </Text>
      <TextInput
        style={styles.inputBox}
        //value={email}
        //name="email"
        //id="email"
        //onChange={handleChange}
        onChange = {e=>setData({...data,email:e.target.value})}
        //onChangeText={onChangeEmail}
        keyboardType={'email-address'}
        //textContentType={emailAddress}
        //placeholder={'E-mail'}
      />
      <View style={styles.footerText}>
        {
        //(data.firstName != '' && data.email != '' && RegExp('[a-z0-9]+@[a-z0-9]+\.[a-z]', 'g').test(data.email)) ? 
        (data.firstName != '' && data.email != '' ) ? 
        (
        <Pressable 
          //onPress={() => onLogin(!loggedIn)} 
          onPress={navigation.navigate('Root', {screen: 'ProfileScreen',params: data, } ) }
          style={styles.button}
          >
          <Text style={styles.buttonText}>Next</Text>
        </Pressable>
        )
        :
        <Text style={styles.buttonText2}>Next</Text>
        }
      </View>
    </View>
  </View>
  );
}

const styles = StyleSheet.create({
container0: {
  flex: 1,
  backgroundColor: '#fff',
  justifyContent: 'center',
  width: '100%',
},
  container2: {
    flex: 0.15,
    width: '100%',
    backgroundColor: '#EE9972',
    padding: 0,
  },
    image: {
      width: 400,
      height: 80,
      resizeMode: "center",
      margin: 5,
      marginTop: 35,
      borderRadius: 20,
    },
  container: {
    flex: 0.85,
    backgroundColor: 'lightgrey',
    padding: 0,
  },
    regularText: {
      fontSize: 24,
      padding: 20,
      width: '100%',
      marginVertical: 8,
      color: 'black',
      textAlign: 'center',
    },
    inputBox: {
      height: 40,
      margin: 12,
      borderWidth: 1,
      padding: 10,
      fontSize: 16,
      borderColor: 'black',
      backgroundColor: '#EDEFEE',
    },
    footerText: {
      flex: 0.85,
      fontSize: 18,
      color: 'black',
      //textAlign: 'center',
      fontStyle: 'italic',
      //align: 'center',
      //alignItems: 'center',
      //justifyContent: 'center',
    },
    button: {
      fontSize: 22,
      padding: 20,
      marginVertical: 40,
      margin: 100,
      width: 200,
      backgroundColor: '#EE9972',
      borderColor: '#EE9972',
      borderWidth: 2,
      borderRadius: 50,
      alignItems: 'center',
      justifyContent: 'center',
    },
    buttonText: {
      color: 'black',
      textAlign: 'center',
      fontSize: 25,
      justifyContent: 'center',
    },
    buttonText2: {
      color: 'grey',
      textAlign: 'center',
      fontSize: 25,
      marginVertical: 40,
    },



});