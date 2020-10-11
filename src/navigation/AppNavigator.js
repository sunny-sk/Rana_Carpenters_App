import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React, {useEffect, useState} from 'react';
import AccountNavigator from './AccountNavigator';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import FeedNavigator from './FeedNavigator';
import colors from '../constants/colors';
import {
  View,
  Pressable,
  Text,
  Dimensions,
  StyleSheet,
  Animated,
} from 'react-native';
import SplashScreen from 'react-native-splash-screen';

const Tab = createBottomTabNavigator();
//customizing tabBar
function MyTabBar({state, descriptors, navigation}) {
  //scren deimensions
  const totalWidth = Dimensions.get('window').width;
  const tabWidth = totalWidth / state.routes.length;
  const [translateValue] = useState(new Animated.Value(0));
  const focusedOptions = descriptors[state.routes[state.index].key].options;
  if (focusedOptions.tabBarVisible === false) {
    return null;
  }

  return (
    <View
      style={{
        ...styles.tabContainer,
        width: totalWidth,
      }}>
      <Animated.View
        style={[
          styles.slider,
          {
            transform: [{translateX: translateValue}],
            width: tabWidth - 20,
          },
        ]}
      />
      <View style={{flexDirection: 'row', padding: 5}}>
        {state.routes.map((route, index) => {
          const {options} = descriptors[route.key];

          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name;

          const isFocused = state.index === index;

          const onPress = () => {
            Animated.spring(translateValue, {
              toValue: index * tabWidth,
              velocity: 10,
              useNativeDriver: true,
            }).start();
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };

          return (
            <Pressable
              android_disableSound={false}
              android_ripple={{color: '#c4c4c4'}}
              key={index}
              accessibilityRole="button"
              accessibilityStates={isFocused ? ['selected'] : []}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
              <>
                {options.tabBarIcon({
                  color: isFocused ? colors.primary : colors.medium,
                  size: 26,
                })}
                {
                  <Text
                    style={{
                      color: isFocused ? colors.primary : colors.medium,
                      textAlign: 'center',
                      fontSize: 10,
                    }}>
                    {label}
                  </Text>
                }
              </>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

//tab bar base

const AppNavigator = () => {
  useEffect(() => SplashScreen.hide(), []);
  return (
    <Tab.Navigator tabBar={(props) => <MyTabBar {...props} />}>
      <Tab.Screen
        name="listings"
        component={FeedNavigator}
        options={{
          tabBarLabel: 'Furnitures',

          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
      />

      <Tab.Screen
        name="account"
        component={AccountNavigator}
        options={{
          tabBarLabel: 'About us',
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons name="account" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default AppNavigator;

const styles = StyleSheet.create({
  tabContainer: {
    justifyContent: 'center',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    backgroundColor: 'white',
    shadowColor: colors.primary,
    borderColor: colors.light,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 10,
  },
  tab: {},
  slider: {
    height: 2.5,
    left: 10,
    backgroundColor: colors.primary,
    borderRadius: 10,
  },
});
