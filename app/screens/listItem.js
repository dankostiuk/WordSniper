import React, { Component } from "react";
import {
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Text,
  Image,
  View
} from "react-native";
import { Icon } from "react-native-elements";

export default class ListItem extends Component {
  render() {
    return (
      <TouchableOpacity onPress={this._onEditBook}>
        <View style={styles.rowContainer}>
          <Icon
            style={styles.thumbnail}
            name="logo-wordpress"
            type="ionicon"
            size={28}
            color="#000000"
          />

          <View style={styles.rowText}>
            <Text style={styles.word} numberOfLines={2} ellipsizeMode={"tail"}>
              {this.props.word}
            </Text>
            <Text
              style={styles.definition}
              numberOfLines={1}
              ellipsizeMode={"tail"}
            >
              {this.props.definition}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  rowContainer: {
    flexDirection: "row",
    backgroundColor: "#FFF",
    height: 100,
    width: Dimensions.get("window").width,
    padding: 10,
    marginRight: 10,
    marginLeft: 10,
    marginTop: 10,
    borderRadius: 4,
    shadowOffset: { width: 1, height: 1 },
    shadowColor: "#CCC",
    shadowOpacity: 1.0,
    shadowRadius: 1
  },
  word: {
    paddingLeft: 10,
    paddingTop: 5,
    fontSize: 16,
    fontWeight: "bold",
    color: "#777"
  },
  definition: {
    paddingLeft: 10,
    marginTop: 5,
    fontSize: 14,
    color: "#777"
  },
  thumbnail: {
    flex: 1,
    height: undefined,
    width: undefined
  },
  rowText: {
    flex: 4,
    flexDirection: "column"
  }
});
