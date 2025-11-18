import { StyleSheet } from "react-native";
import { colors } from "../../global/colors";

export const OpportunityDetailStyles = StyleSheet.create({
    container: {
        flex: 1
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
    btnView:{
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 12
    },
    btn:{
        height: 35,
        width: 120,
        borderRadius: 6,
        alignItems: 'center',
        justifyContent: 'center'
    },
    btnText:{
        color: 'white'
    }
})