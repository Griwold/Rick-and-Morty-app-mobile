import React, { useEffect } from "react";
import { ActivityIndicator, SafeAreaView, StyleSheet } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Signin from "../login/Signin";
import { useAppDispatch, useAppSelector } from "../../utils/hooks/redux";
import { checkUser } from '../login/signinSlice';
import Characters from "../character/Characters";
import CharacterDetail from "../character/CharacterDetail";
import CustomHeader from "./CustomHeader";
import Location from '../location/Location';

const Stack = createNativeStackNavigator();

const Root = () => {

    const dispatch = useAppDispatch();
    const status = useAppSelector(state => state.signin.status);

    useEffect(() => {
        dispatch(checkUser());
    }, []);

    if (status === 'loading') return <SafeAreaView style={styles.loading}><ActivityIndicator color={'#60cd34'} size={'large'}/></SafeAreaView>

    return (
        <SafeAreaView style={styles.container}>
            <Stack.Navigator initialRouteName="Signin">
                {status === 'success' ?
                    <>
                        <Stack.Screen
                            name={'Characters'}
                            component={Characters}
                            options={({ navigation, route }) => ({
                                headerTitle: (props) => <CustomHeader tintColor={props.tintColor} />
                            })}
                        />
                        <Stack.Screen
                            name={'Character'}
                            component={CharacterDetail}
                            options={{
                                headerShown: false
                            }}
                        />
                        <Stack.Screen
                            name={'Location'}
                            component={Location}
                            options={{
                                headerShown: false
                            }}
                        />
                    </>
                    :
                    <Stack.Screen
                        name={'Signin'}
                        component={Signin}
                        options={{
                            headerShown: false
                        }}
                    />
                }
            </Stack.Navigator>
        </SafeAreaView>
    );
};

export default Root;

const styles = StyleSheet.create({
    loading: {
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'center', 
        alignItems: 'center'
    },
    container: {
        flex: 1
    }
});