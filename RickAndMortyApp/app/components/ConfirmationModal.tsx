import React, { FC, SetStateAction } from "react";
import { 
    Modal, 
    StyleSheet, 
    View, 
    Text, 
    TouchableOpacity 
} from "react-native";

import { windowWidth } from '../constants/dimensions';

interface ModalType {
    modalVisible: boolean;
    setModalVisible: SetStateAction<any>;
    onAccept: () => any;
}

const ConfimationModal: FC<ModalType> = ({ modalVisible, setModalVisible, onAccept }) => {

    const onClose = () => {
        setModalVisible(false);
    }

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={modalVisible}
            onRequestClose={onClose}
        >
            <TouchableOpacity style={styles.modal} onPress={onClose}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.text}>Are you sure you want to log out?</Text>
                        <View style={styles.buttonsStyle}>
                            <TouchableOpacity style={styles.button} onPress={onClose}>
                                <Text style={styles.textButton}>Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.button} onPress={onAccept}>
                                <Text style={styles.textButton}>Accept</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        </Modal>
    )

};

export default ConfimationModal;

const styles = StyleSheet.create({
    modal: {
        flex: 1,
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#00000086'
    },
    text: {
        color: 'black',
        fontSize: 18
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        width: windowWidth * 0.8,
        minHeight: 150,
        justifyContent: 'space-around'
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    button: {
        backgroundColor: '#60cd34',
        height: 40,
        width: 60,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textButton: {
        color: 'white'
    },
    buttonsStyle: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        width: '80%'
    }
});