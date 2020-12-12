/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  StyleSheet,
  View,
  Image,
  Dimensions,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import Onboarding from 'react-native-onboarding-swiper';
import {Icon} from '../components';
const WIDTH = Dimensions.get('screen').width;
const OnBoardingScreen = ({navigation}) => {
  return (
    <>
      <StatusBar backgroundColor="#f8f4f4" />
      <Onboarding
        onDone={() => {
          navigation.replace('MainApp');
        }}
        SkipButtonComponent={() => {
          return null;
        }}
        DoneButtonComponent={(props) => {
          return (
            <TouchableOpacity {...props}>
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  padding: 10,
                }}>
                <Icon size={28} from="MaterialIcons" name="done" />
              </View>
            </TouchableOpacity>
          );
        }}
        NextButtonComponent={(props) => {
          return (
            <TouchableOpacity {...props}>
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  padding: 10,
                }}>
                <Icon size={28} from="AntDesign" name="right" />
              </View>
            </TouchableOpacity>
          );
        }}
        bottomBarColor="#f8f4f4"
        titleStyles={{
          fontSize: 23,
          fontWeight: 'bold',
        }}
        subTitleStyles={{
          fontSize: 15,
        }}
        pages={[
          {
            backgroundColor: '#f8f4f4',
            image: (
              <>
                <Image
                  style={{height: 350, width: WIDTH, resizeMode: 'center'}}
                  source={require('../assets/images/modern.png')}
                />
              </>
            ),
            title: 'Modern Designs',
            subtitle: 'We have more then 20+ years of experience.',
          },
          {
            backgroundColor: '#f8f4f4',
            image: (
              <>
                {/* <StatusBar backgroundColor="#f8f4f4" /> */}
                <Image
                  style={{height: 350, width: WIDTH - 40, resizeMode: 'center'}}
                  source={require('../assets/images/Qa.png')}
                />
              </>
            ),
            title: 'Experience',
            subtitle:
              'we work with all modern designs that you see in other furnitures.',
          },
          {
            backgroundColor: '#f8f4f4',
            image: (
              <>
                <Image
                  style={{height: 350, width: WIDTH, resizeMode: 'center'}}
                  source={require('../assets/images/fast.png')}
                />
              </>
            ),
            title: 'Fast Work',
            subtitle:
              'We care about your time. we try to furnish your home in minimum time span',
          },
        ]}
      />
    </>
  );
};

export default OnBoardingScreen;

const styles = StyleSheet.create({});
