import React, { Component } from "react";
import { StyleSheet, Button, View, TouchableHighlight } from "react-native";

export default class CaptureButton extends Component {
  render() {
    return (
      <View style={styles.container}>
        <TouchableHighlight
          style={styles.captureButton}
          disabled={this.props.buttonDisabled}
        >
          <Button
            onPress={this.props.onClick}
            disabled={this.props.buttonDisabled}
            title="Capture"
            accessibilityLabel="Learn more about this button"
          />
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    backgroundColor: "#F5FCFF"
  },
  captureButton: {
    width: 160,
    borderRadius: 10,
    backgroundColor: "white"
  }
});
