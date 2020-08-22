import React from 'react';
import {View} from 'react-native';
import colors from '../constants/colors';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Foundation from 'react-native-vector-icons/Foundation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Octicons from 'react-native-vector-icons/Octicons';
import Zocial from 'react-native-vector-icons/Zocial';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5Pro from 'react-native-vector-icons/FontAwesome5Pro';
import Fontisto from 'react-native-vector-icons/Fontisto';
const VectorIcons = {
  MaterialIcons,
  EvilIcons,
  Entypo,
  FontAwesome,
  Foundation,
  Ionicons,
  MaterialCommunityIcons,
  Zocial,
  Octicons,
  SimpleLineIcons,
  Feather,
  FontAwesome5Pro,
  AntDesign,
  FontAwesome5,
  Fontisto,
};
const Icon = ({
  name,
  size = 30,
  bgColor = colors.black,
  color = colors.white,
  from = 'AntDesign',
}) => {
  let Icon = VectorIcons[from];
  return (
    <View
      style={{
        width: size,
        height: size,
        borderRadius: size / 2,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: bgColor,
      }}>
      <Icon name={name} size={size / 2} color={color} />
    </View>
  );
};

export default Icon;
