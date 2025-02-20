import React from 'react';
import ImagePicker from 'react-native-image-picker';
// More info on all the options is below in the API Reference... just some common use cases shown here
const options = {
  title: 'Select Avatar',
  customButtons: [{name: 'fb', title: 'Choose Photo from Facebook'}],
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};
export default class ImagePickerBar extends React.PureComponent {
  state = {
    avatarSource: null,
  };
  render() {
    const {open, handleToggle} = this.props;
    return (
      /**
       * The first arg is the options object for customization (it can also be null or omitted for default options),
       * The second arg is the callback which sends object: response (more info in the API Reference)
       */
      <>
        {open &&
          ImagePicker.showImagePicker(options, response => {
            console.log('Response = ', response);

            if (response.didCancel) {
              console.log('User cancelled image picker');
              handleToggle();
            } else if (response.error) {
              console.log('ImagePicker Error: ', response.error);
              handleToggle();
            } else if (response.customButton) {
              console.log('User tapped custom button: ', response.customButton);
              handleToggle();
            } else {
              const source = {uri: response.uri};
              handleToggle();
              // You can also display the image using data:
              // const source = { uri: 'data:image/jpeg;base64,' + response.data };

              this.setState(
                {
                  avatarSource: source,
                },
                () => {
                  console.log(source, 'source');
                },
              );
            }
          })}
      </>
    );
  }
}
