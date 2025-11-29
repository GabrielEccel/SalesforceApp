import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { colors } from "../global/colors";
import Separator from "./separator";

interface ShowAccountProps {
    opportunity: string,
    onToggle: () => void,
}

export default function ProductsListButton({ opportunity, onToggle }: ShowAccountProps) {

    return (
        <TouchableOpacity style={styles.container} activeOpacity={0.7} onPress={onToggle}>
            <Text style={styles.name} numberOfLines={2}>
                Lista de produtos
            </Text>
            <Separator color="white" margin={5} />
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        height: 70,
        width: 270,
        backgroundColor: colors.orange,
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