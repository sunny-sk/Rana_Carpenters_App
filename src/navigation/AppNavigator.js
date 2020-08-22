import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React, {useEffect} from 'react';
import AccountNavigator from './AccountNavigator';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FeedNavigator from './FeedNavigator';
import colors from '../constants/colors';
import {View, Text, TouchableOpacity} from 'react-native';
import SplashScreen from 'react-native-splash-screen';

const Tab = createBottomTabNavigator();

function MyTabBar({state, descriptors, navigation}) {
  const focusedOptions = descriptors[state.routes[state.index].key].options;
  if (focusedOptions.tabBarVisible === false) {
    return null;
  }

  return (
    <View
      style={{
        flexDirection: 'row',
        paddingVertical: 6,
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
      }}>
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
          <TouchableOpacity
            key={index}
            accessibilityRole="button"
            accessibilityStates={isFocused ? ['selected'] : []}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
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
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const AppNavigator = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);
  return (
    <Tab.Navigator tabBar={(props) => <MyTabBar {...props} />}>
      <Tab.Screen
        name="listings"
        component={FeedNavigator}
        options={{
          tabBarLabel: 'Furnitures',

          tabBarIcon: ({color, size}) => {
            return (
              <MaterialCommunityIcons name="home" color={color} size={size} />
            );
          },
        }}
      />
      <Tab.Screen
        name="account"
        component={AccountNavigator}
        options={{
          tabBarLabel: 'About us',
          tabBarIcon: ({color, size}) => {
            return (
              <MaterialCommunityIcons
                name="account"
                color={color}
                size={size}
              />
            );
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default AppNavigator;
