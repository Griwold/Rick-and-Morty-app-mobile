import React, { useEffect, useCallback, useMemo } from "react";
import { FlatList, Text, SafeAreaView, StyleSheet, View, Image, TouchableOpacity, ActivityIndicator } from "react-native";
import { fetchCharacters, saveCurrentCharacter, setFilter, fetchCharactersPagining } from "./characterSlice";
import { useAppDispatch, useAppSelector } from "../../utils/hooks/redux";
import { Character } from '../../constants/interfaces/character';
import { useNavigation } from "@react-navigation/native";
import SearchBar from "../../components/SearchBar";
import { fetchEpisodes } from "./episodeSlice";

const Characters = () => {
    const dispatch = useAppDispatch();
    const navigation = useNavigation();
    const characters = useAppSelector(state => state.character.entities);
    const status = useAppSelector(state => state.character.status);
    const status_save_character = useAppSelector(state => state.character.status_save_character);
    const status_pagining = useAppSelector(state => state.character.status_pagining);

    useEffect(() => {
        dispatch(fetchCharacters({}));
    }, [])

    useEffect(() => {
        if (status_save_character === 'success') navigation.navigate({ name: 'Character' } as never)
    }, [status_save_character])

    const currentCharacter = (item: Character | undefined) => {
        if (item) {
            dispatch(saveCurrentCharacter(item));
            dispatch(fetchEpisodes(item));
        }
    };

    const filterCharacter = (name: string) => {
        dispatch(setFilter(name));
        dispatch(fetchCharacters({ name }));
    }

    const onLoadMoreRows = useCallback(() => {
        dispatch(fetchCharactersPagining());
    }, [dispatch])

    const renderItem = ({ item }: { item: Character | undefined }) => {
        return (
            <TouchableOpacity style={[styles.item, styles.shadowProp]} onPress={() => currentCharacter(item)}>
                {item?.image && <Image style={styles.image} source={{ uri: item.image }} />}
                <View style={styles.subItem}>
                    <Text style={styles.text}>Name: {item?.name}</Text>
                    <Text style={styles.text}>Location: {item?.location.name}</Text>
                </View>
            </TouchableOpacity>
        );
    };

    const renderFooter = useMemo(() => {
        if (status_pagining === 'loading') return <ActivityIndicator style={{marginVertical: 10}} color={"#60cd34"} />
        else if (status_pagining === 'failed') return <Text style={{ color: 'grey', textAlign: 'center' }}>A problem ocurred, try later</Text>

        return <></>
    }, [status_pagining]);

    const renderEmpty = () => (
        <Text style={{ color: 'grey', textAlign: 'center', textAlignVertical:'center', flex: 1}}>There are not data to show...</Text>
    );

    return (
        <SafeAreaView style={styles.container}>
            <SearchBar onPress={(name: string) => filterCharacter(name)} />
            {status === 'loading' && <View style={styles.loading}><ActivityIndicator size={"large"} color={"#60cd34"} /></View>}
            {status === 'success' &&
                <FlatList
                    contentContainerStyle={{ flexGrow: 1 }}
                    style={{ width: '96%'}}
                    data={Object.values(characters)}
                    keyExtractor={(item) => item?.id ? item?.id.toString() : ''}
                    renderItem={renderItem}
                    onEndReachedThreshold={0.2}
                    onEndReached={onLoadMoreRows}
                    ListEmptyComponent={renderEmpty}
                    ListFooterComponent={renderFooter}
                />
            }
        </SafeAreaView>
    )
};

export default Characters;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#fbf1e8'
    },
    item: {
        flexDirection: 'row',
        width: '100%',
        marginTop: 20,
        borderRadius: 10,
        padding: 10,
        backgroundColor: 'white',
        elevation: 2
    },
    text: {
        color: 'black'
    },
    image: {
        width: 60,
        height: 60
    },
    subItem: {
        justifyContent: 'space-around',
        marginLeft: 20
    },
    shadowProp: {
        shadowColor: '#red',
        shadowOffset: { width: -2, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },
    loading: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1
    }
});