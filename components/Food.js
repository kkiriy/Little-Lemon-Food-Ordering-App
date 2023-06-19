import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

export default function Food(props) {
  return (
    <View>
      <Text>{props.item.title}</Text>
    </View>
  )
}
