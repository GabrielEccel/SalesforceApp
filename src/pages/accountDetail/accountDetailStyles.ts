import { StyleSheet } from "react-native"

export const accountDetailStyles = StyleSheet.create({
    container: {
        flex: 1,
    },
    card: {
        margin: 30,
        flex: 1,
        backgroundColor: 'white',
        borderRadius: 18,
        padding: 30,
    },
    name: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#343a40'
    },
    info: {
        gap: 8,
    },
    infoHeader: {
        fontWeight: 'bold',
        fontSize: 16,
        color: '#6c757d'
    },
    infoTxt: {
        color: '#6c757d',
        marginLeft: 5
    },
    list: {
        marginTop: 8,
    },
    contactHeader: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        paddingRight: 20,
        alignItems: 'center'
    },
    emptyTxt: {
        color: '#6c757d',
        marginLeft: 35,
        marginTop: 15
    }
})