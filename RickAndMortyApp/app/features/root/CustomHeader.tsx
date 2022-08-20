import React, { FC, useEffect, useState } from "react";
import {
    SafeAreaView, 
    StyleSheet, 
    Text, 
    Image, 
    TouchableOpacity 
} from "react-native";

import { useAppSelector, useAppDispatch } from '../../utils/hooks/redux';
import images from '../../constants/images/index';
import { windowWidth } from '../../constants/dimensions';
import { logout } from '../login/signinSlice';
import ConfimationModal from "../../components/ConfirmationModal";

interface CustomHaderType {
    tintColor?: string;
}

const CustomHeader: FC<CustomHaderType> = ({ tintColor }) => {

    const user = useAppSelector(state => state.signin.user);
    const dispatch = useAppDispatch();
    const [modalVisible, setModalVisible] = useState<boolean>(false);

    const onAccept = () => {
        dispatch(logout());
        setModalVisible(false);
    };

    return (
        <SafeAreaView style={styles.container} >
            <Text style={[styles.text, { color: tintColor }]}>{user?.name}</Text>
            <TouchableOpacity onPress={() => setModalVisible(true)} >
                <Image source={images.logout} />
            </TouchableOpacity>
            {modalVisible && <ConfimationModal modalVisible={modalVisible} setModalVisible={setModalVisible} onAccept={onAccept}/>}
        </SafeAreaView >
    );

};

export default CustomHeader;

const styles = StyleSheet.create({
    text: {
        fontSize: 18,
        fontWeight: '500'
    },
    container: {
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        width: windowWidth * 0.95
    }
});