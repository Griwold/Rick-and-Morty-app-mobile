import React, { FC } from "react";
import { View, StyleSheet, Image, Text } from 'react-native';

import { Character } from "../../constants/interfaces/character";

interface LocationNotFoundType {
    character: Character | null;
}

const LocationNotFound: FC<LocationNotFoundType> = ({ character }) => (
    <View style={styles.container}>
        <Image style={styles.image} source={{ uri: character?.image }}/>
        <Text style={styles.text}>The location of this character is a mystery...</Text>
    </View>
);

export default LocationNotFound;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-around', 
        alignItems: 'center',
        backgroundColor: '#fbf1e8'
    },
    image: {
        height: 200,
        width: 200
    },
    text: {
        color: 'black',
        fontSize: 30
    }
})