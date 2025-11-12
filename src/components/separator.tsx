import { StyleSheet, View } from "react-native";

export default function Separator() {
    return (
        <View style={styles.container}>
            <View style={styles.sep}></View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        alignItems: 'center'
    },
    sep: {
        marginVertical: 24,
        height: 1,
        backgroundColor: '#dee2e6',
        width: '90%',
    }
})