import React, { FC } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Character } from "../../constants/interfaces/character";

interface CharactersEpisodeype {
    character: Character | null;
}

const CharactersEpisode: FC<CharactersEpisodeype> = ({ character }) => (
    <View style={styles.card}>
        <Text style={styles.title}>Episodes</Text>
        <View style={styles.episodes}>
            {character?.episode.map((episode, index) => {
                return <Text key={episode} style={styles.episode}>{episode} {(character.episode.length - 1) === index ? '' : ' - '}</Text>
            })}
        </View>
    </View>
);

export default CharactersEpisode;

const styles = StyleSheet.create({
    card: {
        backgroundColor: 'white',
        marginTop: 10,
        elevation: 4,
        borderRadius: 8,
        minHeight: 200,
        padding: 10,
        marginBottom: 20
    },
    title: {
        color: 'black',
        fontWeight: 'bold',
        fontSize: 20
    },
    episode: {
        color: 'grey',
        fontWeight: 'bold'
    },
    episodes: { 
        flexWrap: 'wrap', 
        flexDirection: 'row', 
        padding: 10 
    }
});