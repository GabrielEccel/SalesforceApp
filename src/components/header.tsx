import { Text, TouchableOpacity, View } from "react-native"
import { StyleSheet } from "react-native"
import { Feather } from '@expo/vector-icons'
import { router } from "expo-router"

interface headerProps {
    label: string,
    back: boolean
}

export default function Header({ label, back }: headerProps) {
    return (
        <View>
            <View style={styles.container}>
                <View style={styles.label}>
                    {back &&
                    <TouchableOpacity onPress={router.back}>
                        <Feather name="arrow-left" size={20} color='white'/>
                    </TouchableOpacity>}
                    <Text style={styles.txt}>{label}</Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: 90,
        backgroundColor: '#023e8a',
        justifyContent: 'center',
    },
    txt: {
        color: 'white',
        fontSize: 20,
    },
    label: {
        flexDirection: 'row',
        marginTop: 30,
        gap: 12,
        marginLeft: 30,
        alignItems: 'center'
    }
})
