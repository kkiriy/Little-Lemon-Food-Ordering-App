import React, { useState } from 'react'; 
import { View, Text, StyleSheet, Pressable, Image, TextInput, CheckBox } from 'react-native';
import BouncyCheckbox from "react-native-bouncy-checkbox";

export default function ProfileScreen({ route, navigation }) {
    //const { firstname, mail } = route.params;
    console.log(route)
    //const [firstName, onChangeFirstName] = useState(firstname);
    //const [email, onChangeEmail] = useState(mail);

    const [firstName, onChangeFirstName] = useState('');
    const [lastName, onChangeLastName] = useState('');
    const [email, onChangeEmail] = useState('');
    const [phonenumber, onChangePhoneNumber] = useState('');
    const [isSelected, setSelection] = useState(false);
 
  return (
    <View style={styles.container0}>
      <View style={styles.container2}>
        <Image
          style={styles.image}
          source={require('../img/Profile.png')}
          resizeMode="stretch"
          accessible={true}
          accessibilityLabel={'Prof'}
        />
      </View>
      <View style={styles.container3}>
        <Text style={styles.regularText}>
          First Name
        </Text>
        <TextInput
          style={styles.inputBox}
          value={firstName}
          onChangeText={onChangeFirstName}
          keyboardType={'default'}
        />
        <Text style={styles.regularText}>
          Last Name
        </Text>
        <TextInput
          style={styles.inputBox}
          value={lastName}
          onChangeText={onChangeLastName}
          keyboardType={'default'}
        />
        <Text style={styles.regularText}>
          Email
        </Text>
        <TextInput
          style={styles.inputBox}
          value={email}
          onChangeText={onChangeEmail}
          keyboardType={'email-address'}
        />
        <Text style={styles.regularText}>
          Phone number
        </Text>
        <TextInput
          style={styles.inputBox}
          value={phonenumber}
          onChangeText={onChangePhoneNumber}
          keyboardType={'phone-pad'}
        />
      </View>
      <View style={styles.container4}>
      <Text style={styles.regularText}>
        Email notifications
      </Text>
      <BouncyCheckbox 
        onPress={(setSelection) => {isSelected}} 
        text = "Newsletter"
        textStyle={{textDecorationLine : "none", }}
      />
      </View>
      <View style={styles.container5}>
        <Pressable 
          //onPress={() => onLogin(!loggedIn)} 
          onPress={() => navigation.navigate('Onboarding')}
          style={styles.button}
          >
          <Text style={styles.buttonText}>Log out</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
container0: {
  flex: 1,
  backgroundColor: 'grey',
  justifyContent: 'center',
  width: '100%',
},
  container2: {
    flex: 0.2,
    backgroundColor: 'grey',
    justifyContent: 'center',
    align: 'top',
    alignItems: 'top',
  },
    image: {
      width: 80,
      height: 80,
      //align: "left",
      margin: 15,
      marginTop: 35,
      borderRadius: 40,
    },
  container1: {
    backgroundColor: '#fff',
    justifyContent: 'center',
    align: 'center',
    alignItems: 'center',
  },
  container3: {
    flex: 0.5,
    backgroundColor: '#EE9972',
    justifyContent: 'center',
    align: 'top',
    alignItems: 'top',
  },
  container4: {
    flex: 0.1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    align: 'top',
    alignItems: 'top',
  },
  inputBox: {
    height: 40,
    width: '100%',
    margin: 12,
    borderWidth: 1,
    padding: 0,
    paddingHorizontal: 0,
    fontSize: 16,
    borderColor: 'black',
    backgroundColor: '#EDEFEE',
  },
  container5: {
    flex: 0.2,
    backgroundColor: '#fff',
    justifyContent: 'center',
    align: 'top',
    alignItems: 'top',
  },
  button: {
    fontSize: 22,
    padding: 20,
    //marginVertical: 40,
    //margin: 100,
    width: 200,
    backgroundColor: '#EE9972',
    borderColor: '#EE9972',
    borderWidth: 2,
    borderRadius: 50,
    //alignItems: 'center',
    //justifyContent: 'center',
    //alignItems: 'center',
    alignSelf: "center",
  },
  buttonText: {
    color: 'black',
    textAlign: 'center',
    //fontSize: 25,
  },
});
