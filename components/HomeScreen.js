import { useEffect, useState, useCallback, useMemo } from 'react';
import { 
  Text,
  View,
  StyleSheet,
  SectionList,
  SafeAreaView,
  StatusBar,
  Alert,
  Image,
} from 'react-native';
import { Searchbar } from 'react-native-paper';
import debounce from 'lodash.debounce';
import {
  createTable,
  getMenuItems,
  saveMenuItems,
  filterByQueryAndCategories,
} from './database';
import Filters from './Filters';
import { getSectionListData, useUpdateEffect } from './utils';

const API_URL =
'https://raw.githubusercontent.com/Meta-Mobile-Developer-PC/Working-With-Data-API/main/capstone.json';

const sections = ['starters', 'mains', 'desserts'];

const Item = ({ name, price, description }) => (
  <Text style={styles.innerContainer}>
    <Text style={styles.itemText1}>
        {name}{'\n'}
    </Text>
    <Text numberOfLines={2} ellipsizeMode='tail' style={styles.itemText2}>
        {description}{'\n'}
    </Text>
    <Text style={styles.itemText3}>
        ${price}
    </Text>
  </Text>
);

const ItemDivider = () => {
  return (
    <View
      style={{
        height: 1,
        width: "100%",
        backgroundColor: "#607D8B",
      }}
    />
  );
}

//export default function App() {
export default function HomeScreen() {

  const [data, setData] = useState([]);
  const [searchBarText, setSearchBarText] = useState('');
  const [query, setQuery] = useState('');
  const [filterSelections, setFilterSelections] = useState(
    sections.map(() => false)
  );

  useEffect(() => {
    (async () => {
      try {
        // 0. Drop table if it does exist
        //await dropTable();
        // 1. Create table if it does not exist
        await createTable();
        // 2. Check if data was already stored
        let menuItems = await getMenuItems();
        //console.log('This is the database stored in the app')
        //console.log(menuItems)
        //console.log('------------------------------------------------')
        if (!menuItems.length) {
          // Fetching menu from URL
          const response = await fetch(API_URL);
          const json = await response.json();
          menuItems = json.menu.map((item,index) => ({
            //...item,
            //title: item.title,
            id: index+1, 
            name: item.name, 
            price: item.price, 
            category: item.category, 
            description: item.description,
          }));
          //console.log('This is the retrieved database')
          //console.log(menuItems)
          //console.log('------------------------------------------------')
          // Storing into database
          saveMenuItems(menuItems);
        }

        const sectionListData = getSectionListData(menuItems);
        setData(sectionListData);

      } catch (e) {
        // Handle error
        Alert.alert(e.message);
      }
    })();
  }, []);

  useUpdateEffect(() => {
    (async () => {
      const activeCategories = sections.filter((s, i) => {
        // If all filters are deselected, all categories are active
        if (filterSelections.every((item) => item === false)) {
          return true;
        }
        return filterSelections[i];
      });
      try {
        const menuItems = await filterByQueryAndCategories(
          query,
          activeCategories
        );
        //console.log('This is the passed object')
        //console.log(menuItems)
        //console.log('------------------------------------------------')
        const sectionListData = getSectionListData(menuItems);
        //console.log('This is the received object')
        //console.log(sectionListData)
        //console.log('------------------------------------------------')
        setData(sectionListData);
      } catch (e) {
        Alert.alert(e.message);
      }
    })();
  }, [filterSelections, query]);

  const lookup = useCallback((q) => {setQuery(q);}, []);

  const debouncedLookup = useMemo(() => debounce(lookup, 500), [lookup]);

  const handleSearchChange = (text) => {
    setSearchBarText(text);
    debouncedLookup(text);
  };

  const handleFiltersChange = async (index) => {
    const arrayCopy = [...filterSelections];
    arrayCopy[index] = !filterSelections[index];
    setFilterSelections(arrayCopy);
  };

  return (
    <View style={styles.container0}>
       <View style={styles.container1a}>
        <Image
          style={styles.image0}
          source={require('../img/Logo.png')}
          resizeMode="stretch"
          accessible={true}
          accessibilityLabel={'Prof'}
        />
        <Image
          style={styles.image1}
          source={require('../img/Profile.png')}
          resizeMode="stretch"
          accessible={true}
          accessibilityLabel={'Prof'}
        />
      </View>
      <View style={styles.container1b}>
        <Text style={styles.container1b1}>
          Little Lemon
        </Text>
        <Text style={styles.container1b2}>
          Chicago
        </Text>
        <Text style={styles.container1b3}>
          We are a family owned Mediterranean restaurant, 
          focused on traditional recipes served with a 
          modern twist.
        </Text>
      </View>
      <View style={styles.container2}>
        <SafeAreaView style={styles.container}>
          <Searchbar
            placeholder="Search"
            placeholderTextColor="white"
            onChangeText={handleSearchChange}
            value={searchBarText}
            style={styles.searchBar}
            iconColor="white"
            inputStyle={{ color: 'white' }}
            elevation={0}
          />
          <Filters
            selections={filterSelections}
            onChange={handleFiltersChange}
            sections={sections}
            //sections={['i1','i2','i3']}
          />
          <SectionList
            style={styles.sectionList}
            sections={data}
            //ItemSeparatorComponent={ItemDivider}
            keyExtractor={(item, index) => item.id.toString()}
            //keyExtractor={(item, index)=>index.toString()}
            renderItem={({ item }) => (
              <Item id={item.id} name={item.name} price={item.price} description={item.description}  />
            )}
            renderSectionHeader={ ({ section: { category } }) => (
              <Text style={styles.header}>{category}</Text>
            )}
          />
        </SafeAreaView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container0: {
    flex: 1,
  },
  container1a: {
    flex: 0.1,
    flexDirection: 'row',
  },
  container1b: {
    flex: 0.2,
    backgroundColor: "grey",
    paddingHorizontal: 10,
  },
  container1b1: { 
    flex: 0.30, 
    color: 'yellow',
    fontSize: 32,
  },
  container1b2: { 
    flex: 0.20, 
    color: 'white',
    fontSize: 24,
  },
  container1b3: { 
    flex: 0.5, 
    color: 'white',
    fontSize: 20,
  },
  container2: {
    flex: 0.7,
  },
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    backgroundColor: '#495E57',
  },
  sectionList: {
    paddingHorizontal: 2,
  },
  searchBar: {
    marginBottom: 24,
    backgroundColor: '#495E57',
    shadowRadius: 0,
    shadowOpacity: 0,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 2,
  },
  header: {
    fontSize: 24,
    paddingVertical: 8,
    color: '#FBDABB',
    backgroundColor: '#495E57',
  },
  title: {
    fontSize: 20,
    color: 'white',
  },
  itemText1: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 22,
    width: '100%',
  },
  itemText2: {
    color: 'grey',
    fontSize: 22,
    maxHeight: 20,
    width: '100%',
  },
  itemText3: {
    color: 'grey',
    fontWeight: 'bold',
    fontSize: 22,
    width: '100%',
  },
  innerContainer: {
    paddingHorizontal: 40,
    paddingVertical: 20,
    backgroundColor: '#495E57',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  image0: {
    width: '60%',
    //height: 50,
    margin: 15,
    //marginTop: 5,
    borderRadius: 0,
    alignItems: 'center',
  },
  image1: {
    width: 60,
    height: 60,
    margin: 10,
    //marginTop: 5,
    alignItems: 'center',
    borderRadius: 35,
  },
});
