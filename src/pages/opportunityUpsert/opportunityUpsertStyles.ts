import { StyleSheet } from "react-native";
import { colors } from "../../global/colors";

export const OpportunityUpsertStyles = StyleSheet.create({
    container: {
        flex: 1
    },
    card: {
        margin: 25,
        flex: 1,
        backgroundColor: 'white',
        borderRadius: 18,
        padding: 25,
        gap: 8
    },
    name: {
        fontSize: 20,
        fontWeight: 'bold',
        color: colors.darkGray
    },
    infoHeader: {
        fontWeight: 'bold',
        fontSize: 16,
        color: colors.midGray
    },
    form:{
        gap: 8
    },
    label:{
        color: colors.darkGray
    },
    input:{
        backgroundColor: colors.extraLightGray
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