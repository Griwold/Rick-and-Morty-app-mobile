import React, { FC } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Episode } from '../../constants/interfaces/episode';

interface CharactersEpisodeype {
    episodes: any;
}

const CharactersEpisode: FC<CharactersEpisodeype> = ({ episodes }) => (
    <View style={styles.card}>
        <Text style={styles.title}>Episodes</Text>
        <View style={styles.episodes}>
            {episodes && episodes.map((episode: Episode, index: number) => (
                <Text key={episode.id} style={styles.episode}>{episode.name} {(episodes.length - 1) === index ? '' : ' - '}</Text>
            ))}
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