import React from 'react';
import { StyleSheet, ScrollView } from 'react-native';

import { useAppSelector } from '../../utils/hooks/redux';
import LocationData from './LocationData';
import LocationNotFound from './LocationNotFound';
import LocationResidents from './LocationResidents';

const Location = () => {

    const character = useAppSelector(state => state.character.current_character);

    if ( character?.location.name === 'unknown' ) return <LocationNotFound character={character}/>

    return (
        <ScrollView style={styles.container}>
            <LocationData character={character} />
            <LocationResidents character={character} />
        </ScrollView>
    )
};

export default Location;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fbf1e8',
        padding: 10
    },
    card: {
        flexDirection: 'row',
        elevation: 4,
        backgroundColor: 'white',
        borderRadius: 6,
        padding: 10,
        justifyContent: 'space-around',
        minHeight: 200
    }
});