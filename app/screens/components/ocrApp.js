import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import Image from 'react-native-scalable-image';
import Icon from 'react-native-vector-icons/FontAwesome';
import ImagePicker from 'react-native-image-picker';
import HeaderApp from './app/components/common/header/header';
import {TextDetectFromImg} from './app/services/textRecognitionFirebase';
// import {utils} from '@react-native-firebase/app';
// import {processDocument} from './app/services/textRecognitionFirebase';
const options = {
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};
class OcrApp extends React.PureComponent {
  state = {
    openCamera: false,
    openGalery: false,
    imgInfo: {},
    ocrData: {},
    loading: false,
  };
  componentDidMount() {
    this.setState({imgInfo: {}, ocrData: {}});
  }
  handleLaunchCamera() {
    ImagePicker.launchCamera(options, response => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        this.setState(
          {
            imgInfo: response,
          },
          () => {
            this._handleTextDetectFromImg();
          },
        );
      }
    });
  }

  handleOpenImageGalery() {
    ImagePicker.launchImageLibrary(options, response => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        this.setState(
          {
            imgInfo: response,
          },
          () => {
            this._handleTextDetectFromImg();
          },
        );
      }
    });
  }
  _handleTextDetectFromImg = () => {
    console.log(this.state.imgInfo.path, '--->');
    TextDetectFromImg(this.state.imgInfo.path).then(res => {
      console.log('Finished processing file.', res);
      this.setState({ocrData: res});
    });
  };
  render() {
    return (
      <>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          <View style={{flex: 1}}>
            <View style={styles.body}>
              <View style={styles.iconRow}>
                <TouchableOpacity
                  style={{padding: 10}}
                  onPress={this.handleLaunchCamera.bind(this)}>
                  <Icon active name="camera" color="#000" size={30} />
                </TouchableOpacity>
                <TouchableOpacity
                  style={{padding: 10}}
                  onPress={this.handleOpenImageGalery.bind(this)}>
                  <Icon active name="picture-o" color="#000" size={30} />
                </TouchableOpacity>
              </View>
              <View>
                {Object.keys(this.state.imgInfo).length > 0 && (
                  <Image
                    source={{uri: this.state.imgInfo.uri}}
                    width={Dimensions.get('window').width}
                  />
                )}
              </View>
              <View style={styles.ocrData}>
                <Text>{this.state.ocrData?.text}</Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </>
    );
  }
}

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  body: {flex: 1, flexDirection: 'column'},
  iconRow: {flexDirection: 'row', justifyContent: 'center'},
  ocrData: {fontSize: 18, padding: 10},
});

export default OcrApp;
