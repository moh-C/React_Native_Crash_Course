import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import ListItem from './components/ListItem';
import Header from './components/Header';

const App = () => {
  const [items, setItem] = useState([
    { id: '1', text: 'Milk' },
    { id: '2', text: 'Eggs' },
    { id: '3', text: 'Bread' },
    { id: '4', text: 'Juice' }
  ]);

  return (
    <View style={styles.container}>
      <Header title='Shopping List' />
      <FlatList
        data={items}
        renderItem={({ item }) => <ListItem item={item} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50
  }
});

export default App;
