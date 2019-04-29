import React, { Component } from "react";
import {
  StyleSheet,
  Dimensions,
  View,
  Alert,
  ActivityIndicator
} from "react-native";
import { RNCamera } from "react-native-camera";
import CaptureButton from "./captureButton";

const PICTURE_OPTIONS = {
  quality: 1,
  fixOrientation: true,
  forceUpOrientation: true
};

export default class AddWord extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      image: null,
      error: null,
      visionResp: []
    };
  }

  takePicture = async () => {
    if (this.camera) {
      // Pause the camera's preview
      this.camera.pausePreview();

      // Set the activity indicator
      this.setState((previousState, props) => ({
        loading: true
      }));

      try {
        // Get the base64 version of the image
        const data = await this.camera.takePictureAsync(PICTURE_OPTIONS);
        if (!data.uri) {
          throw "OTHER";
        }

        this.setState(
          {
            image: data.uri
          },
          () => {
            console.log(data.uri);
            this.processImage(data.uri, {
              height: data.height,
              width: data.width
            });
          }
        );
      } catch (e) {
        console.warn(e);

        this.setState({
          loading: false,
          image: null,
          error: "other"
        });
      }

      this.setState((previousState, props) => ({
        loading: false
      }));

      // Resume the camera's preview
      this.camera.resumePreview();
    }
  };

  processImage = async (uri, imageProperties) => {
    // Show an alert with the answer on
    Alert.alert("You just took a photo: " + uri);
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
          onTextRecognized={d => {
            console.log("onTextRecognized", d);
            Alert.alert(d);
          }}
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
    alignItems: "center",
    height: Dimensions.get("window").height,
    width: Dimensions.get("window").width
  },
  loadingIndicator: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});
