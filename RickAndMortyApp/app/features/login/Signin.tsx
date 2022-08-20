import React, { useState, useRef } from "react";
import { 
    SafeAreaView, 
    StyleSheet, 
    View, 
    ImageBackground, 
    TouchableOpacity, 
    Text, 
    Alert, 
    Keyboard 
} from "react-native";

import { signin } from "./signinSlice";
import { useAppDispatch } from "../../utils/hooks/redux";
import images from '../../constants/images/index';
import SigninInput from "../../components/SigninInput";
import { validateEmail } from "../../utils/validateEmail";

const Signin = () => {

    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const dispatch = useAppDispatch();
    const emailRef = useRef<any>();

    const customAlert = (title: string, content: string) => {
        Alert.alert(
            title,
            content,
            [
                { text: "OK" }
            ]
        );
    }

    const onSignin = () => {
        if (!name) { customAlert("Please", "Enter a name"); return; }
        if (!email) { customAlert("Please", "Enter a email"); return; }
        if (!validateEmail(email)) { customAlert("I'm Sorry", "Invalid Email"); return; }

        dispatch(signin({ name: name.trim(), email: email.trim() }))
    }

    return (
        <SafeAreaView style={styles.container}>
            <ImageBackground source={images.singin} style={styles.image}>
                <View style={styles.box}>
                    <SigninInput
                        onChangeText={setName}
                        value={name}
                        placeholder="Name"
                        returnKeyType="next"
                        onSubmitEditing={() => {
                            emailRef.current.focus();
                        }}
                    />
                    <SigninInput
                        onChangeText={setEmail}
                        value={email}
                        placeholder="Email"
                        customMarginTop={30}
                        returnKeyType="done"
                        onSubmitEditing={() => {
                            Keyboard.dismiss()
                        }}
                        reference={emailRef}
                    />
                    <TouchableOpacity style={styles.button} onPress={onSignin}>
                        <Text style={styles.buttonText}>Signin</Text>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
        </SafeAreaView>
    );
};

export default Signin;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white'
    },
    image: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingVertical: 40
    },
    box: {
        backgroundColor: '#81e9f0',
        justifyContent: 'center',
        alignItems: 'center',
        width: '80%',
        elevation: 2,
        opacity: .8,
        padding: 20,
        borderRadius: 20
    },
    button: {
        backgroundColor: '#60cd34',
        height: 40,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        width: 200,
        marginTop: 20
    },
    buttonText: {
        fontSize: 14,
        color: 'black'
    },
    input: {
        color: 'black',
        width: '100%',
        height: 50,
        borderWidth: 1,
        borderRadius: 10,
        // borderColor: '#60cd34',
        backgroundColor: '#e3e5e5',
        marginTop: 12
    }
});