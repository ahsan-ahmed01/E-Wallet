// import {utils} from '@react-native-firebase/app';
import vision from '@react-native-firebase/ml-vision';

export async function TextDetectFromImg(localPath) {
  try {
    const processed = await vision().textRecognizerProcessImage(localPath);
    // console.log('Found text in document: ', processed.text);
    // processed.blocks.forEach(block => {
    //   console.log('Found block with text: ', block.text);
    //   console.log('Confidence in block: ', block.confidence);
    //   console.log('Languages found in block: ', block.recognizedLanguages);
    // });
    return processed;
  } catch (error) {
    console.log(error, 'error');
  }
}

// // Local path to file on the device
// const localFile = `${utils.FilePath.PICTURES_DIRECTORY}/text-document.jpg`;

// processDocument(localFile).then(() => console.log('Finished processing file.'));
