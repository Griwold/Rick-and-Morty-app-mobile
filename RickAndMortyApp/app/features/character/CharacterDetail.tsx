import React, { useEffect } from "react";
import { Text, SafeAreaView, StyleSheet, Image, View, Touchable, TouchableOpacity, ScrollView } from "react-native";
import { useAppSelector, useAppDispatch } from "../../utils/hooks/redux";
import { windowHeight, windowWidth } from "../../constants/dimensions";
import { clearCurrentCharacter } from "./characterSlice";
import CharacterData from "./CharacterData";
import { useNavigation } from "@react-navigation/native";
import CharacterCard from "./CharacterCard";
import CharactersEpisode from "./CharactersEpisode";

const CharacterDetail = () => {

    const character = useAppSelector(state => state.character.current_character);
    const dispatch = useAppDispatch();
    const navigation = useNavigation();

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
            <CharactersEpisode character={character}/>
        </ScrollView>
    )
};

export default CharacterDetail;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fbf1e8',
        padding: 10
    }
});