import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { accountInterface } from "../types/accountInterface";
import { colors } from "../global/colors";
import Separator from "./separator";
import useAccountController from "../pages/account/accountController";

interface ShowAccountProps {
    account: accountInterface | null
}

export default function ShowAccount({ account }: ShowAccountProps) {
    const { navigateToDetails } = useAccountController();

    return (
        <TouchableOpacity style={styles.container} activeOpacity={0.7} onPress={account ? () => navigateToDetails(account?.Id) : () => { }}>
            <Text style={styles.name} numberOfLines={2}>
                {account?.Name}
            </Text>
            <Separator color="white" margin={5} />
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        height: 70,
        width: 270,
        backgroundColor: colors.midBlue,
        borderRadius: 12,
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    name: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
    }
})