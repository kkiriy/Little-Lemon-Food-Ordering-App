import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet
} from 'react-native';

const Filters = ({ onChange, selections, sections }) => {
  return (
    <View>
      <Text style={{marginLeft : 8, fontWeight: 'bold', fontSize: 18}}>ORDER FOR DELIVERY!</Text>
      <View style={styles.filtersContainer}>
        {sections.map((section, index) => (
          <TouchableOpacity
            onPress={() => {
              onChange(index);
            }}
            style={{
              flex: 1 / sections.length,
              justifyContent: 'center',
              alignItems: 'center',
              paddingVertical: 5,
              marginHorizontal: 5,
              backgroundColor: selections[index] ? '#EE9972' : '#D3D3D3',
              borderWidth: 0,
              borderRadius: 12
            }}>
            <View>
              <Text style={{ color: selections[index] ? 'white' : 'black', }}>
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
      <View style={{height: 3, backgroundColor: "#D3D3D3", marginHorizontal: 5}}></View>
    </View>
  );
};

const styles = StyleSheet.create({
  filtersContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 16,
  },
});

export default Filters;
