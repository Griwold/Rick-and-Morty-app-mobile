import React, { useState, FC } from "react";
import { 
    TextInput, 
    View, 
    StyleSheet, 
    TouchableOpacity, 
    Text,
    Keyboard
} from "react-native";

import { windowWidth } from "../constants/dimensions";
import { useAppSelector, useAppDispatch } from "../utils/hooks/redux";

interface SearchBarType {
    onPress: (name: string) => void
}

const SearchBar: FC<SearchBarType> = ({ onPress }) => {
    
    const nameFilter = useAppSelector(state => state.character.filters.name);
    const [name, setName] = useState<string>(nameFilter);

    const handleOnPress = () => {
        onPress(name)
    };

    return (
        <View style={styles.container}>
            <TextInput 
                value={name}
                placeholder={"Name"}
                onChangeText={setName}
                style={styles.bar}
                placeholderTextColor='grey'
                onSubmitEditing={() => {
                    Keyboard.dismiss()
                }}
            />
            <TouchableOpacity style={styles.button} onPress={handleOnPress}>
                <Text style={styles.text}>Search</Text>
            </TouchableOpacity>
        </View>
    );

};

export default SearchBar;

const styles = StyleSheet.create({
    bar: {
        width: windowWidth * 0.7,
        height: 40,
        backgroundColor: 'white',
        borderRadius: 6,
        marginVertical: 20,
        color: 'black',
        borderWidth: .3
    },
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '90%'
    },
    button: {
        backgroundColor: '#60cd34',
        height: 40, 
        width: 70,
        borderRadius: 6,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        fontSize: 14,
        color: 'white'
    }
});