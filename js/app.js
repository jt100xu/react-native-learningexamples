import React from 'react';
import {
    AppRegistry,
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import HomeScreen from './screens/HomeScreen'
import StopWatchScreen from './screens/StopWatchScreen'

const LearningExamples = StackNavigator({
    Home: { screen: HomeScreen },
    StopWatch: { screen: StopWatchScreen },
});

AppRegistry.registerComponent('LearningExamples', () => LearningExamples);
