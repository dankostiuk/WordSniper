import React, { Component } from "react";
import { StyleSheet, View, StatusBar, FlatList } from "react-native";

import ListItem from "./listItem";

export default class Lists extends Component {
  constructor(props) {
    super(props);
    this.state = {
      words: [
        {
          id: 1,
          word: "Word",
          definition: "The definition goes here"
        },
        {
          id: 2,
          word: "Definition",
          definition: "The definition goes here"
        },
        {
          id: 3,
          word: "List",
          definition: "The definition goes here"
        }
      ]
    };
  }

  _renderItem = ({ item }) => (
    <ListItem id={item.id} word={item.word} definition={item.definition} />
  );

  _keyExtractor = (item, index) => item.id + "";

  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <FlatList
          data={this.state.words}
          keyExtractor={this._keyExtractor}
          renderItem={this._renderItem}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  }
});
