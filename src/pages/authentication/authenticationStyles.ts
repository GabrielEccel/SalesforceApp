import { StyleSheet } from "react-native";
import { colors } from "../../global/colors";

export const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems: 'center'
    },
    bttn:{
        backgroundColor: colors.darkBlue,
        marginTop: 550,
        borderRadius: 4
    },
    bttnTxt:{
        color: 'white',
        margin: 12
    }
})