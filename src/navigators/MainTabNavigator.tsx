import React from 'react';
import PropTypes from 'prop-types';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import {View, Text} from 'react-native';

import ListenNowScreen from '../components/listenNow/ListenNowScreen';
import SearchScreen from '../components/search/SearchScreen';
import LibraryScreen from '../components/library/LibraryScreen';

const ListenNowStack = createStackNavigator();

const ListenNowStackNavigator = () => {
  return (
    <ListenNowStack.Navigator>
      <ListenNowStack.Screen
        options={{
          title: 'Listen Now',
        }}
        name="ListenNow"
        component={ListenNowScreen}
      />
    </ListenNowStack.Navigator>
  );
};

const SearchStack = createStackNavigator();

const SearchStackNavigator = () => {
  return (
    <SearchStack.Navigator>
      <SearchStack.Screen name="Search" component={SearchScreen} />
    </SearchStack.Navigator>
  );
};

const LibraryStack = createStackNavigator();

const LibraryStackNavigator = () => {
  return (
    <LibraryStack.Navigator>
      <LibraryStack.Screen name="Library" component={LibraryScreen} />
    </LibraryStack.Navigator>
  );
};

const MainTab = createBottomTabNavigator();

const MainTabNavigator = () => {
  return (
    <React.Fragment>
      <MainTab.Navigator>
        <MainTab.Screen
          options={{
            title: 'Listen Now',
          }}
          name="ListenNow"
          component={ListenNowStackNavigator}
        />
        <MainTab.Screen name="Library" component={LibraryStackNavigator} />
        <MainTab.Screen name="Search" component={SearchStackNavigator} />
      </MainTab.Navigator>
    </React.Fragment>
  );
};
MainTabNavigator.defaultProps = {};

MainTabNavigator.propTypes = {};

export default MainTabNavigator;
