import React, { FC } from "react";
import { View, Text, StyleSheet } from "react-native";

interface DataType {
    title: string | undefined;
    subTitle: string;
    maxLength?: number;
    numberOfLines?: number;
    titleStyle?: {
        color: string
    };
    subTitleStyle?: {
        color: string
    };
}

const CharacterData: FC<DataType> = ({ title, subTitle, maxLength, numberOfLines = 1, titleStyle, subTitleStyle }) => (
    <View style={[styles.container, { maxWidth: maxLength }]}>
        <Text style={[styles.title, titleStyle]} ellipsizeMode={'tail'} numberOfLines={numberOfLines}>{title}</Text>
        <Text style={[styles.subTitle, subTitleStyle]}>{subTitle}</Text>
    </View>
);

export default CharacterData;

const styles = StyleSheet.create({
    title: {
        color: 'black',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'left',
        borderBottomWidth: 1,
        borderBottomColor: 'lightgrey',
        borderStyle: 'dotted'
    },
    subTitle: {
        color: 'grey',
        fontSize: 12
    },
    container: { 
        justifyContent: 'center', 
        alignItems: 'center',
        maxWidth: 150
    }
});
