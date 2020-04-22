'use strict';
import React, {PureComponent} from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {RNCamera} from 'react-native-camera';

const PendingView = () => (
  <View
    style={{
      flex: 1,
      backgroundColor: 'lightgreen',
      justifyContent: 'center',
      alignItems: 'center',
    }}>
    <Text>Waiting</Text>
  </View>
);
const flashModeOrder = {
  off: 'on',
  on: 'auto',
  auto: 'torch',
  torch: 'off',
};

const wbOrder = {
  auto: 'sunny',
  sunny: 'cloudy',
  cloudy: 'shadow',
  shadow: 'fluorescent',
  fluorescent: 'incandescent',
  incandescent: 'auto',
};

const landmarkSize = 2;

export default class RNCameraBasic extends React.Component {
  state = {
    flash: 'off',
    zoom: 0,
    autoFocus: 'on',
    depth: 0,
    type: 'back',
    whiteBalance: 'auto',
    ratio: '16:9',
    isRecording: false,
    canDetectFaces: false,
    canDetectText: false,
    canDetectBarcode: false,
    faces: [],
    textBlocks: [],
    barcodes: [],
  };

  toggle = value => () =>
    this.setState(prevState => ({[value]: !prevState[value]}));

  renderTextBlocks = () => (
    <View style={styles.facesContainer} pointerEvents="none">
      {this.state.textBlocks.map(this.renderTextBlock)}
    </View>
  );

  renderTextBlock = ({bounds, value}) => (
    <React.Fragment key={value + bounds.origin.x}>
      <Text
        style={[
          styles.textBlock,
          {left: bounds.origin.x, top: bounds.origin.y},
        ]}>
        {value}
      </Text>
      <View
        style={[
          styles.text,
          {
            ...bounds.size,
            left: bounds.origin.x,
            top: bounds.origin.y,
          },
        ]}
      />
    </React.Fragment>
  );
  textRecognized = object => {
    const {textBlocks} = object;
    this.setState({textBlocks});
  };

  takePicture = async function(camera) {
    const options = {quality: 0.5, base64: true};
    const data = await camera.takePictureAsync(options);
    //  eslint-disable-next-line
    console.log(data.uri);
  };
  render() {
    const {canDetectText} = this.state;
    const {open, handleToggle} = this.props;
    return (
      <>
        {open && (
          <View style={styles.container}>
            <RNCamera
              style={styles.preview}
              type={RNCamera.Constants.Type.back}
              flashMode={RNCamera.Constants.FlashMode.on}
              androidCameraPermissionOptions={{
                title: 'Permission to use camera',
                message: 'We need your permission to use your camera',
                buttonPositive: 'Ok',
                buttonNegative: 'Cancel',
              }}
              androidRecordAudioPermissionOptions={{
                title: 'Permission to use audio recording',
                message: 'We need your permission to use your audio',
                buttonPositive: 'Ok',
                buttonNegative: 'Cancel',
              }}
              playSoundOnCapture={true}
              onTextRecognized={canDetectText ? this.textRecognized : null}>
              {({camera, status, recordAudioPermissionStatus}) => {
                if (status !== 'READY') return <PendingView />;
                return (
                  <View
                    style={{
                      flex: 1,
                      // flexDirection: 'row',
                      // justifyContent: 'center',
                    }}>
                    <View
                      style={{
                        backgroundColor: 'transparent',
                        flexDirection: 'row',
                        justifyContent: 'space-around',
                      }}>
                      <TouchableOpacity
                        onPress={this.toggle('canDetectText')}
                        style={styles.flipButton}>
                        <Text style={styles.flipText}>
                          {!canDetectText ? 'Detect Text' : 'Detecting Text'}
                        </Text>
                      </TouchableOpacity>
                    </View>
                    <View
                      style={{
                        flex: 0.1,
                        backgroundColor: 'transparent',
                        flexDirection: 'row',
                        alignSelf: 'flex-end',
                      }}>
                      <TouchableOpacity
                        onPress={() => this.takePicture(camera)}
                        style={styles.capture}>
                        <Text style={{fontSize: 14}}> SNAP </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                );
              }}
            </RNCamera>
            {!!canDetectText && this.renderTextBlocks()}
            <TouchableOpacity onPress={handleToggle} style={styles.capture}>
              <Text style={{fontSize: 14}}> Cancel </Text>
            </TouchableOpacity>
          </View>
        )}
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
  },

  flipButton: {
    // flex: 0.3,
    height: 40,
    marginHorizontal: 2,
    marginBottom: 10,
    marginTop: 10,
    borderRadius: 8,
    borderColor: 'white',
    borderWidth: 1,
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  flipText: {
    color: 'white',
    fontSize: 15,
  },

  picButton: {
    backgroundColor: 'darkseagreen',
  },
  facesContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    top: 0,
  },

  faceText: {
    color: '#FFD700',
    fontWeight: 'bold',
    textAlign: 'center',
    margin: 10,
    backgroundColor: 'transparent',
  },
  text: {
    padding: 10,
    borderWidth: 2,
    borderRadius: 2,
    position: 'absolute',
    borderColor: '#F00',
    justifyContent: 'center',
  },
  textBlock: {
    color: '#F00',
    position: 'absolute',
    textAlign: 'center',
    backgroundColor: 'transparent',
  },
});
