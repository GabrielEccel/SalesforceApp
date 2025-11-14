import { StyleSheet } from "react-native"
import { colors } from "../../global/colors"

export const accountDetailStyles = StyleSheet.create({
    container: {
        flex: 1,
    },
    card: {
        margin: 25,
        flex: 1,
        backgroundColor: 'white',
        borderRadius: 18,
        padding: 25,
    },
    name: {
        fontSize: 20,
        fontWeight: 'bold',
        color: colors.darkGray
    },
    info: {
        gap: 8,
    },
    infoHeader: {
        fontWeight: 'bold',
        fontSize: 16,
        color: colors.midGray
    },
    infoTxt: {
        color: colors.midGray,
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
        color: colors.midGray,
        marginLeft: 35,
        marginTop: 15
    }
})