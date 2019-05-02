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

import dictionary from "../resources/dictionary.json";

const PICTURE_OPTIONS = {
  quality: 1,
  fixOrientation: true,
  forceUpOrientation: true
};

export default class AddWord extends Component {
  constructor(props) {
    super(props);

    this.state = {
      captureClicked: false,
      visionResp: [],
      maskRowHeight: Math.round(Dimensions.get("window").height / 10),
      maskColWidth: (Dimensions.get("window").width - 300) / 2,
      targetWidth: 0,
      targetHeight: 0
    };
  }

  captureWords = async () => {
    /*
    Alert.alert(
      "Width: " +
        this.state.targetWidth +
        " " +
        "Height: " +
        this.state.targetHeight +
        " " +
        "X: " +
        this.state.maskColWidth +
        " " +
        "Y: " +
        this.state.maskRowHeight * 3
    );
    */
    if (this.camera) {
      // Pause the camera's preview
      this.camera.pausePreview();

      // Set the activity indicator
      this.setState((previousState, props) => ({
        captureClicked: true
      }));

      // do something with the text read

      /*
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
      */

      // Resume the camera's preview
      //this.camera.resumePreview();
    }
  };

  processWords = async d => {
    // Filter so we are only dealing with words in center

    let filtered = d.filter(
      e =>
        e.bounds.origin.y >= this.state.maskRowHeight * 3 &&
        e.bounds.origin.y <
          this.state.maskRowHeight * 3 + this.state.targetHeight &&
        e.bounds.origin.x >= this.state.maskColWidth &&
        e.bounds.origin.x < this.state.maskColWidth + this.state.targetWidth
    );

    //TODO: add camera overlay to ensure user has crosshair box

    if (filtered && filtered.length > 0) {
      let currentWord = filtered[0].value
        .toLowerCase()
        .replace(/[^a-z\s]/g, "");

      if (currentWord.split(" ").length > 1) {
        let words = "";
        currentWord.split(" ").forEach(e => (words += e + ", "));
        Alert.alert("Got multiple words: " + words);
      } else {
        // de-pluralize
        if (currentWord.slice(-1) === "s") {
          currentWord = currentWord.substring(0, currentWord.length - 1);
        }

        if (dictionary[currentWord.toUpperCase()]) {
          let alertString =
            currentWord.toUpperCase() +
            " - " +
            dictionary[currentWord.toUpperCase()];

          Alert.alert(alertString);
        } else {
          Alert.alert(
            "Invalid word, please focus on a single word - got: \n" +
              currentWord.toUpperCase()
          );
        }
      }
    } else {
      Alert.alert("No word detected");
    }

    this.setState({
      captureClicked: false
    });

    // Resume the camera's preview
    this.camera.resumePreview();
  };

  processImage = async (uri, imageProperties) => {
    // Show an alert with the answer on
    Alert.alert("You just took a photo: " + uri);
  };

  setTargetDimensions = (width, height) => {
    this.setState({
      targetWidth: width,
      targetHeight: height
    });
  };

  render() {
    const { maskRowHeight, maskColWidth } = this.state;

    return (
      <View style={styles.container}>
        <RNCamera
          ref={ref => {
            this.camera = ref;
          }}
          style={styles.preview}
          captureAudio={false}
          onTextRecognized={
            this.state.captureClicked
              ? d => this.processWords(d.textBlocks)
              : null
          }
        >
          <View style={styles.maskOuter}>
            <View
              style={[
                { flex: maskRowHeight },
                styles.maskRow,
                styles.maskFrame
              ]}
            />
            <View style={[{ flex: 30 }, styles.maskCenter]}>
              <View style={[{ width: maskColWidth }, styles.maskFrame]} />
              <View
                style={styles.maskInner}
                ref={ref => {
                  this.marker = ref;
                }}
                onLayout={({ nativeEvent }) => {
                  if (this.marker) {
                    this.marker.measure((x, y, width, height) => {
                      this.setTargetDimensions(width, height);
                    });
                  }
                }}
              />
              <View style={[{ width: maskColWidth }, styles.maskFrame]} />
            </View>
            <View
              style={[
                { flex: maskRowHeight },
                styles.maskRow,
                styles.maskFrame
              ]}
            />
          </View>
          <ActivityIndicator
            size="large"
            style={styles.loadingIndicator}
            color="#fff"
            animating={this.state.captureClicked}
          />
          <CaptureButton
            buttonDisabled={this.state.captureClicked}
            onClick={() => this.captureWords()}
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
    justifyContent: "flex-start",
    alignItems: "center",
    width: Dimensions.get("window").width
  },
  loadingIndicator: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  maskOuter: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "space-around"
  },
  maskInner: {
    width: 300,
    backgroundColor: "transparent",
    borderColor: "white",
    borderWidth: 1
  },
  maskFrame: {
    backgroundColor: "rgba(1,1,1,0.6)"
  },
  maskRow: {
    width: "100%"
  },
  maskCenter: { flexDirection: "row" }
});
