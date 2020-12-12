import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';

import {ViewImageScreen, ListingDetailScreen, ListingsScreen} from '../screens';

import {Dimensions} from 'react-native';
const HEIGHT = Dimensions.get('screen').height;
const Stack = createStackNavigator();
const commonStyle = {
  gestureEnabled: true,
  gestureResponseDistance: {
    vertical: HEIGHT / 3,
    horizontal: 50,
  },
};
const FeedNavigator = () => {
  return (
    <Stack.Navigator mode="modal" screenOptions={{headerShown: false}}>
      <Stack.Screen
        name="listings"
        options={{
          gestureEnabled: true,
        }}
        component={ListingsScreen}
      />
      <Stack.Screen
        name="listingDetails"
        component={ListingDetailScreen}
        options={{
          ...commonStyle,
        }}
      />
      <Stack.Screen
        name="viewImageScreen"
        component={ViewImageScreen}
        options={{
          ...commonStyle,
        }}
      />
    </Stack.Navigator>
  );
};

export default FeedNavigator;
