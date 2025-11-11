import { Text, View } from "react-native"
import { StyleSheet } from "react-native"

interface headerProps {
    label: string,
    subLabel1: string,
    subLabel2: string
}

export default function Header({ label, subLabel1, subLabel2}: headerProps) {
    return (
        <View>
            <View style={styles.container}>
                <Text style={styles.txt}>{label}</Text>
            </View>

            <View style={styles.subHeader}>
                <View style={styles.subLabel1}><Text style={{color: '#343a40'}}>{subLabel1}</Text></View>
                <View style={styles.subLabel2}><Text style={{color: '#343a40'}}>{subLabel2}</Text></View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: 110,
        backgroundColor: '#023e8a',
        justifyContent: 'center'
    },
    txt: {
        color: 'white',
        padding: 12,
        fontSize: 20,
        marginTop: 30
    },
    subHeader: {
        backgroundColor: '#ced4da',
        height: 30,
        justifyContent: 'center',
        flexDirection: 'row'
    },
    subLabel1:{
        height: '100%',
        width: '50%',
        justifyContent: 'center',
        paddingLeft: 50,
    },
    subLabel2:{
        height: '100%',
        width: '50%',
        justifyContent: 'center',
        paddingLeft: 50
    }
})
