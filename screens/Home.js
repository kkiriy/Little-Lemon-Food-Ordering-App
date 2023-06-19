import { StyleSheet, Text, View, ScrollView } from 'react-native';
import Header from '../components/Header'
import Hero from '../components/Hero'
import Menu from '../components/Menu'

export default function Home({navigation}) {
  return (
    <ScrollView style={styles.container}>
      <Header style={styles} navigation={navigation} allowProfile={true} />
      <Hero style={styles} />
      <Menu style={styles} />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column'
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
  search: {
    alignSelf: 'stretch',
    backgroundColor: '#495E57',
    marginTop: 0,
    padding: 0,
    borderRadius: 0,
  },
  menuContainer:{
    alignSelf: 'stretch',

  },
  menu: {
  },
  food: {
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
  item: {
    backgroundColor: 'red',
    fontSize: 15
  }
})
