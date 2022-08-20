import React, { FC } from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';

import { Character } from '../../constants/interfaces/character';

interface LocationResidentsType {
    character: Character | null;
}

const LocationResidents: FC<LocationResidentsType> = ({ character }) => (
    <View style={styles.card}>
        <Text style={styles.title}>Residents</Text>
        <View style={styles.images}>
            {character?.location.residents?.map(resident => (
                <Image key={resident} source={{ uri: resident }} style={styles.image} />
            ))}
        </View>
    </View>
);

export default LocationResidents;

const styles = StyleSheet.create({
    card: {
        flexDirection: 'column',
        elevation: 4,
        backgroundColor: 'white',
        borderRadius: 6,
        padding: 10,
        minHeight: 300,
        marginBottom: 20
    },
    data: {
        justifyContent: 'space-around'
    },
    title: {
        color: 'black',
        fontWeight: 'bold',
        fontSize: 20
    },
    images: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        padding: 10
    },
    image: {
        height: 50,
        width: 50,
        margin: 2
    }
});