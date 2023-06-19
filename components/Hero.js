import { StyleSheet, Text, View, Image } from 'react-native';
import Search from './Search'

export default function Hero(props) {
  return (
    <View style={[props.style.hero, {paddingVertical: 4}]}>
      <View>
        <Text style={{color:'#F4CE14', fontSize:32, fontWeight:"bold"}}>
          Little Lemon
        </Text>
        <Text style={{color:'#EDEFEE', fontSize:20 }}>
          Chicago
        </Text>
      </View>
      <View style={[props.style.subhero, {}]}>
        <Text style={{color:'#EDEFEE', fontSize: 14}}>
          We are a family owned{'\n'}
          Mediterranean restaurant,{'\n'}
          focused on traditional{'\n'}
          recipes served with a{'\n'}
          modern twist.
        </Text>
        <Image
          source={require('../assets/Hero_image.png')}
          style={[props.style.photo, {marginLeft: 35, height: 100}]}
        />
      </View>
    </View>
  )
}
