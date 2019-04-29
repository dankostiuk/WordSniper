import React, { Component } from "react";
import { StyleSheet, View, Alert, ActivityIndicator } from "react-native";
import { RNCamera } from "react-native-camera";
import CaptureButton from "./captureButton";

export default class AddWord extends Component {
  constructor(props) {
    super(props);

    this.state = {
      identifiedAs: "",
      loading: false
    };
  }

  takePicture = async function() {
    if (this.camera) {
      // Pause the camera's preview
      this.camera.pausePreview();

      // Set the activity indicator
      this.setState((previousState, props) => ({
        loading: true
      }));

      // set loading to false after 5 seconds
      await setTimeout(() => {
        this.setState((previousState, props) => ({
          loading: false
        }));
      }, 1000);

      // Show an alert with the answer on
      Alert.alert("You just took a photo");
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <RNCamera
          ref={ref => {
            this.camera = ref;
          }}
          style={styles.preview}
          captureAudio={false}
        >
          <ActivityIndicator
            size="large"
            style={styles.loadingIndicator}
            color="#fff"
            animating={this.state.loading}
          />
          <CaptureButton
            buttonDisabled={this.state.loading}
            onClick={this.takePicture.bind(this)}
          />
        </RNCamera>
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
  },
  preview: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center"
  },
  loadingIndicator: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});
