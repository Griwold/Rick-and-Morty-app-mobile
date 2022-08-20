/**
 * @format
 */
import React from 'react';
import { AppRegistry } from 'react-native';
import Root from './app/features/root/Root';
import { name as appName } from './app.json';
import { Provider } from 'react-redux';
import { store } from './app/store/index';
import { NavigationContainer } from '@react-navigation/native';

const RickAndMorty = () => (
    <Provider store={store}>
        <NavigationContainer>
            <Root key='root' />
        </NavigationContainer>
    </Provider>
);
AppRegistry.registerComponent(appName, () => RickAndMorty);