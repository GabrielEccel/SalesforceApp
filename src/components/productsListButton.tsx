import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { colors } from "../global/colors";

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
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        height: 50,
        width: 270,
        backgroundColor: colors.orange,
        borderRadius: 12,
        paddingHorizontal: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    name: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
    }
})