import { StyleSheet } from "react-native";
import { colors } from "../../global/colors";

export const productsStyles = StyleSheet.create({
    container: {
        flex: 1,
    },
    items: {
        padding: 25,
        paddingBottom: 145,
    },
    floatingButton: {
        position: 'absolute',
        right: 30,
        bottom: 30,
        backgroundColor: colors.darkBlue,
        width: 70,
        height: 70,
        borderRadius: 70,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
        elevation: 5,

    }
})