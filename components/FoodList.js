import {
  StyleSheet,
  Text,
  View,
  FlatList
} from 'react-native';

import Food from './Food'

const DATA = [
  {
    id : '0',
    title: 'Item 0'
  },
  {
    id : '1',
    title: 'Item 1'
  },
  {
    id : '2',
    title: 'Item 2'
  }
]

export default function FoodList(props) {
  return (
    <View style={props.style.food}>
      <FlatList
        data={DATA}
        renderItem={({item}) => (<Food item={item} />)}
        keyExtractor={(item, index) => item + index}
      />
    </View>
  )
}
