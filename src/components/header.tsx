import { Text, View } from "react-native"
import { StyleSheet } from "react-native"

interface headerProps {
    label: string,
}

export default function Header({ label }: headerProps) {
    return (
        <View>
            <View style={styles.container}>
                <Text style={styles.txt}>{label}</Text>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: 90,
        backgroundColor: '#023e8a',
        justifyContent: 'center'
    },
    txt: {
        color: 'white',
        padding: 12,
        fontSize: 20,
        marginTop: 30,
        marginLeft: 30
    },
})
