import React, {useEffect, useState} from 'react';
import {
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
  StatusBar,
} from 'react-native';
import colors from '../constants/colors';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const ViewImageScreen = ({route, navigation}) => {
  const [imgUrl, setImgUrl] = useState(undefined);
  useEffect(() => {
    const {imgUrl} = route.params;
    setImgUrl(imgUrl);
  }, [route.params]);
  return (
    <>
      <StatusBar backgroundColor={colors.dark} />
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
          style={styles.closeIcon}>
          <MaterialCommunityIcons name="close" size={30} color={colors.white} />
        </TouchableOpacity>
        {imgUrl ? (
          <Image
            style={styles.image}
            resizeMode="contain"
            source={{uri: imgUrl}}
          />
        ) : (
          //TODO:// Show Loader here
          <></>
        )}
      </View>
    </>
  );
};

export default ViewImageScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000000',
    flex: 1,
  },
  closeIcon: {
    position: 'absolute',
    top: '4%',
    left: 30,
    zIndex: 10,
  },
  deleteIcon: {
    position: 'absolute',
    top: '4%',
    right: 30,
    zIndex: 10,
  },

  image: {
    width: '100%',
    height: '100%',
    // borderWidth: 1,
  },
});
