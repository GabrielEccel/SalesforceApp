import { StyleSheet, View } from "react-native";

interface SeparatorProps{
    color: string,
    margin: number
}

export default function Separator({color, margin }: SeparatorProps) {
    const styles = dynamicStyles(color, margin)

    return (
        <View style={styles.container}>
            <View style={styles.sep}></View>
        </View>
    )
}

const dynamicStyles = (color: string, margin: number) => StyleSheet.create({
    container: {
        width: '100%',
        alignItems: 'center'
    },
    sep: {
        marginVertical: margin,
        height: 1,
        backgroundColor: color,
        width: '90%',
    }
})