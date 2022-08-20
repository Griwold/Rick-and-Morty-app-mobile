import React, { FC, SetStateAction } from "react";
import { 
    TextInput, 
    StyleSheet, 
    ReturnKeyTypeOptions, 
    NativeSyntheticEvent, 
    TextInputSubmitEditingEventData, 
} from "react-native";

interface SigninType {
    onChangeText: SetStateAction<any> | ((text: any) => {});
    value: string;
    placeholder?: string;
    customMarginTop?: number;
    returnKeyType: ReturnKeyTypeOptions;
    onSubmitEditing?: ((e: NativeSyntheticEvent<TextInputSubmitEditingEventData>) => void);
    focuseable?: boolean;
    reference?: any;
};

const SigninInput: FC<SigninType> = ({
    onChangeText,
    value,
    placeholder,
    customMarginTop,
    returnKeyType = 'done',
    onSubmitEditing,
    focuseable,
    reference }) => {

    return (
        <TextInput
            onChangeText={onChangeText}
            value={value}
            placeholder={placeholder}
            style={{ ...styles.input, marginTop: customMarginTop }}
            placeholderTextColor='black'
            blurOnSubmit={false}
            returnKeyType={returnKeyType}
            onSubmitEditing={onSubmitEditing}
            focusable={focuseable}
            ref={reference}
        />
    );
};

export default SigninInput;

const styles = StyleSheet.create({
    input: {
        color: 'black',
        width: '100%',
        height: 50,
        borderWidth: 1,
        borderRadius: 10,
        // borderColor: '#60cd34',
        backgroundColor: '#e3e5e5'
    }
});