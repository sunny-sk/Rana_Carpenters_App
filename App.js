import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {enableScreens} from 'react-native-screens';
import myTheme from './src/navigation/navigationTheme';
import AppNavigator from './src/navigation/AppNavigator';

enableScreens();
const App = () => {
  return (
    <SafeAreaProvider>
      <NavigationContainer theme={myTheme}>
        <AppNavigator />
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;
