import React, { useEffect } from 'react';
import { StyleSheet, ScrollView, View, ActivityIndicator } from 'react-native';

import { useAppDispatch, useAppSelector } from '../../utils/hooks/redux';
import LocationData from './LocationData';
import LocationNotFound from './LocationNotFound';
import LocationResidents from './LocationResidents';
import { fetchResidents } from './locationSlice';
import { windowHeight } from '../../constants/dimensions';

const Location = () => {

    const character = useAppSelector(state => state.character.current_character);
    const status = useAppSelector(state => state.location.status);
    const residents = useAppSelector(state => state.location.residents);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (character) dispatch(fetchResidents(character));
    }, [character])

    if (character?.location.name === 'unknown') return <LocationNotFound character={character} />

    return (
        <ScrollView style={styles.container}>
            <LocationData character={character} />
            {status !== 'success' ?
                <View style={styles.loading}>
                    <ActivityIndicator size={'large'} color={'#60cd34'} />
                </View>
                :
                <LocationResidents residents={residents} />
            }
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
    loading: { 
        alignItems: 'center', 
        justifyContent: 'center', 
        height: windowHeight - 300
    }
});