import React, { useEffect } from "react";
import { StyleSheet, View, ScrollView, ActivityIndicator } from "react-native";
import { useAppSelector, useAppDispatch } from "../../utils/hooks/redux";

import { clearCurrentCharacter } from "./characterSlice";
import CharacterCard from "./CharacterCard";
import CharactersEpisode from "./CharactersEpisode";
import { fetchEpisodes } from "./episodeSlice";
import { windowHeight } from '../../constants/dimensions';

const CharacterDetail = () => {

    const character = useAppSelector(state => state.character.current_character);
    const episodes = Object.values(useAppSelector(state => state.episode.entities));
    const status = useAppSelector(state => state.episode.status);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (character) dispatch(fetchEpisodes(character));
    }, [character]);

    useEffect(() => {
        // componentWillUnmount
        return () => {
            // Your code here
            dispatch(clearCurrentCharacter());
        }
    }, []);

    return (
        <ScrollView style={styles.container}>
            <CharacterCard character={character} />
            {status !== 'success' ?
                <View style={styles.loading}>
                    <ActivityIndicator size={'large'} color={'#60cd34'}/>
                </View>
                :
                <CharactersEpisode episodes={Object.values(episodes)} />
            }
        </ScrollView>
    )
};

export default CharacterDetail;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fbf1e8',
        padding: 10,
        flex: 1
    },
    loading: { 
        alignItems: 'center', 
        justifyContent: 'center', 
        height: windowHeight - 200
    }
});