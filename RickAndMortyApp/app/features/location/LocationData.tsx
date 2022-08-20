import React, { FC } from 'react';
import { View, StyleSheet } from 'react-native';

import { Character } from '../../constants/interfaces/character';
import CharacterData from '../character/CharacterData';

interface LocationDataType {
    character: Character | null;
}

const LocationData: FC<LocationDataType> = ({ character }) => (
        <View style={styles.card}>
            <View style={styles.data}>
                <CharacterData title={character?.location.name} subTitle={"Name"} />
                <CharacterData title={character?.location.dimension} subTitle={"Dimension"} />
            </View>
            <View style={styles.data}>
                <CharacterData title={character?.location.type} subTitle={"Type"} />
                <CharacterData title={`${character?.location.residents?.length}`} subTitle={"Residents"} />
            </View>
        </View>
);

export default LocationData;

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        elevation: 4,
        backgroundColor: 'white',
        borderRadius: 6,
        padding: 10,
        justifyContent: 'space-around',
        height: 200,
        marginBottom: 10
    },
    data: {
        justifyContent: 'space-around'
    }
});