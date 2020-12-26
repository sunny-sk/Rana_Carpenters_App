import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import React from 'react';

import colors from '../constants/colors';
import { AboutUsScreen } from '../screens';
const Stack = createStackNavigator();
//common styles on all tab
const commonStyle = {
  headerTitleAlign: 'center',
  headerStyle: {
    backgroundColor: colors.primary,
    elevation: 0,
  },
  headerTintColor: colors.light,
};

const AccountNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}>
      <Stack.Screen
        name="account"
        options={{ title: '', ...commonStyle, headerShown: false }}
        component={AboutUsScreen}
      />
    </Stack.Navigator>
  );
};

export default AccountNavigator;
