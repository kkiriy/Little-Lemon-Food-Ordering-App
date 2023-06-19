import { StyleSheet, Text, View } from 'react-native';
import { Searchbar } from 'react-native-paper';
import * as React from 'react';

export default function Search(props) {

  const {searchQuery, setSearchQuery} = React.useState('')
  const onChangeSearch = query => setSearchQuery(query)

  return (
      <Searchbar
        placeholder="Search"
        onChangeSearch={onChangeSearch}
        value={searchQuery}
        style={props.style.search}
      />
  )
}
