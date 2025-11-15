import { Text, TouchableOpacity, View } from "react-native"
import { StyleSheet } from "react-native"
import { Feather } from '@expo/vector-icons'
import { router } from "expo-router"
import { colors } from "../global/colors";

interface headerProps {
    label: string,
    back?: boolean,
    refresh?: boolean,
    refreshFunction?: () => void
}

export default function Header({ label, back, refresh, refreshFunction }: headerProps) {

    return (
        <View>
            <View style={styles.container}>
                <View style={styles.label}>
                    {back &&
                        <TouchableOpacity onPress={router.back}>
                            <Feather name="arrow-left" size={20} color='white' />
                        </TouchableOpacity>}
                    <View style={styles.refreshContainer}>
                        <Text style={styles.txt}>{label}</Text>
                        {refresh &&
                            <TouchableOpacity onPress={refreshFunction}>
                                <Feather name='refresh-cw' size={20} color='white' style={{ marginLeft: 1 }} />
                            </TouchableOpacity>}
                    </View>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: 90,
        backgroundColor: colors.darkBlue,
        justifyContent: 'center',
        paddingHorizontal: 30
    },
    txt: {
        color: 'white',
        fontSize: 20,
    },
    label: {
        flexDirection: 'row',
        marginTop: 30,
        gap: 12,
        alignItems: 'center'
    },
    refreshContainer:{
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
    }
})
