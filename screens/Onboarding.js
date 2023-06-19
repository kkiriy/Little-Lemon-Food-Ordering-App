import { StyleSheet, Text, View } from 'react-native';

import Header from '../components/Header'
import Hero from '../components/Hero'
import Info from '../components/Info'

export default function Onboarding({navigation}) {
  return (
    <View style={styles.container}>
      <Header style={styles} allowProfile={false} />
      <Hero style={styles} />
      <Info navigation={navigation}/>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  header: {
    backgroundColor: 'white',
    alignSelf: 'stretch',
    alignItems: 'center',
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  hero:{
    alignSelf: 'stretch',
    padding: 10,
    backgroundColor: '#495E57',
    color: 'white',
  },
  subhero: {
    flexDirection: 'row',
    alignItems: 'baseline',
    alignSelf: 'stretch',
  },
  photo: {
    width: 100,
    height: 120,
    resizeMode: 'cover',
    borderRadius: 10,
  },
  logo: {
    width: 160,
    height: 65,
    resizeMode: 'contain'
  },
})
