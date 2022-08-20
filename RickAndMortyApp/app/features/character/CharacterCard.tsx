import React, { FC } from "react";
import { View, Image, StyleSheet, TouchableOpacity } from "react-native";
import CharacterData from "./CharacterData";
import { Character } from "../../constants/interfaces/character";
import { useNavigation } from "@react-navigation/native";
import { windowWidth } from '../../constants/dimensions';

interface CharacterCardType {
    character: Character | null;
}

const CharacterCard: FC<CharacterCardType> = ({ character }) => {

    const navigation = useNavigation();

    return (
        <View style={styles.card}>
            <View style={styles.imagenPosition}>
                <Image style={styles.image} source={{ uri: character?.image }} />
                <CharacterData title={character?.name} subTitle={'Name'} maxLength={130} numberOfLines={3}/>
            </View>
            <View style={styles.data}>
                <View style={styles.rowData}>
                    <CharacterData title={character?.species} subTitle={'Species'} />
                    <CharacterData title={character?.status} subTitle={'Status'} />
                </View>
                <View style={styles.rowData}>
                    <CharacterData title={character?.gender} subTitle={'Gender'} />
                    <TouchableOpacity onPress={() => navigation.navigate({ name: 'Location' } as never)}>
                        <CharacterData titleStyle={{ color: '#60cd34' }} subTitleStyle={{ color: '#60cd34' }} title={character?.location.name} subTitle={'Location'} maxLength={100} />
                    </TouchableOpacity>
                </View>
                {character?.type &&
                    <View style={styles.imagenPosition}>
                        <CharacterData title={'Human'} subTitle={'Type'} />
                    </View>
                }
            </View>
        </View>
    );
};

export default CharacterCard;

const styles = StyleSheet.create({
    image: {
        height: 120,
        width: 120,
    },
    text: {
        color: 'black',
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'left',
        borderBottomWidth: 1,
        borderBottomColor: 'lightgrey',
        borderStyle: 'dotted'
    },
    imagenPosition: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    card: {
        flexDirection: 'row',
        elevation: 4,
        backgroundColor: 'white',
        borderRadius: 6,
        padding: 10
    },
    data: {
        width: windowWidth - 180,
        flexDirection: 'column',
        justifyContent: 'space-around',
        paddingHorizontal: 30
    },
    rowData: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    }
})