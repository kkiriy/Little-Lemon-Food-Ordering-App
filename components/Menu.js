import {
  StyleSheet,
  Text,
  View,
  FlatList,
  SectionList,
  StatusBar,
  Alert,
  Image
} from 'react-native';

import {
  useEffect,
  useState,
  useCallback,
  useMemo
} from 'react';

import {
  createTable,
  dropTable,
  getMenuItems,
  saveMenuItems,
  filterByQueryAndCategories,
} from './database';

import {
  getSectionListData,
  useUpdateEffect
} from './utils';

import Search from './Search'
import Filters from './Filters';
import FoodList from './FoodList'
import debounce from 'lodash.debounce';
import { Searchbar } from 'react-native-paper';

const API_URL =
  'https://raw.githubusercontent.com/Meta-Mobile-Developer-PC/Working-With-Data-API/main/capstone.json';
const sections = ['starters', 'mains', 'desserts', 'drinks'];

const imageUrl = (filename) => `https://github.com/Meta-Mobile-Developer-PC/Working-With-Data-API/blob/main/images/${filename}?raw=true`

const Item = ({ item }) => (
  <View style={styles.item}>
    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
      <View style={{flexDirection: 'column'}}>
        <Text style={styles.title}>{item.name}</Text>
        <Text style={{fontSize: 12, marginVertical:5, maxWidth: 180}}>{item.description}</Text>
        <Text style={styles.title}>${item.price}</Text>
      </View>
      <View>
        <Image
          source={{uri : imageUrl(item.image)}}
          style={{
            width: 100,
            height: 100,
          }}
        />
      </View>
    </View>
    <View style={{height: 2, backgroundColor: "#D3D3D3", marginTop: 2}}></View>
  </View>
);

export default function Menu(props) {
  const [data, setData] = useState([]);
  const [searchBarText, setSearchBarText] = useState('');
  const [query, setQuery] = useState('');
  const [filterSelections, setFilterSelections] = useState(
    sections.map(() => false)
  );

  const fetchData = async() => {
    const items = []
    try {
      await fetch(API_URL, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        },
      })
      .then(response => response.json())
      .then((response) => {
        response.menu.map((e) => {
          items.push(e)
        })
      })
    } catch(error) {
      console.err(error)
    }
    return items;
  }

  useEffect(() => {
      (async () => {
        try {
          await createTable();
          let menuItems = await getMenuItems();
          if (!menuItems.length) {
            const menuItems = await fetchData();
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
          const sectionListData = getSectionListData(menuItems);
          setData(sectionListData);
        } catch (e) {
          Alert.alert(e.message);
        }
      })();
    }, [filterSelections, query]);

  const lookup = useCallback((q) => {
    setQuery(q);
  }, []);

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

  let keyCounter = 0;
  return (
    <View style={props.style.menuContainer}>
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
    />
    <SectionList
        style={styles.sectionList}
        sections={data}
        keyExtractor={(item) => keyCounter++ }
        renderItem={({ item }) => (
          <Item item={item} />
        )}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    backgroundColor: '#495E57',
  },
  sectionList: {
    alignSelf: 'stretch'
  },
  searchBar: {
    marginBottom: 12,
    backgroundColor: '#495E57',
    shadowRadius: 0,
    shadowOpacity: 0,
    borderRadius: 0
  },
  item: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'stretch',
    padding: 8,
  },
  header: {
    fontSize: 24,
    paddingVertical: 8,
    color: '#FBDABB',
    backgroundColor: '#495E57',
  },
  title: {
    fontSize: 20,
    color: 'black',
  },
});
