import { StyleSheet } from "react-native";

export const accountStyles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        marginTop: 40
    },
    btn: {
        margin: 16,
        backgroundColor: '#2c85b5',
        height: 40,
        width: 150,
        alignItems: 'center',
        justifyContent: 'center'
    },
    btnCancel: {
        margin: 16,
        backgroundColor: '#fb4f57',
        height: 40,
        width: 150,
        alignItems: 'center',
        justifyContent: 'center'
    },
    modal: {
        backgroundColor: '#f9f9f9',
        alignItems: 'center',
        padding: 24,
        gap: 24
    }
})