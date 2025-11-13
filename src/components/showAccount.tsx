import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { accountInterface } from '../types/accountInterface';
import { Feather } from '@expo/vector-icons'

interface ShowAccountProps {
    account: accountInterface
    toggle: () => void
}

export default function ShowAccount({ account, toggle }: ShowAccountProps) {
    return (
        <TouchableOpacity style={styles.show} onPress={() => toggle()}>
            <View style={styles.header}>
                <Text style={styles.headerTxt}>{account.Name}</Text>
            </View>
            <View style={styles.content}>
                <Text style={styles.contentTxt}><Feather name='phone' size={13} />  {account.Phone}</Text>
                <Text style={styles.contentTxt}><Feather name='briefcase' size={13} />  {account.Industry}</Text>
                <Text style={styles.contentTxt}><Feather name='map-pin' size={13} />  {account.BillingAddress?.city ?? "Indisponível"}, {account.BillingAddress?.stateCode ?? "Indisponível"}</Text>
            </View>

        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    show: {
        backgroundColor: 'white',
        width: '100%',
        height: 130,
        marginBottom: 8,
        borderRadius: 12,
        padding: 16
    },
    header: {
        marginBottom: 10
    },
    headerTxt: {
        fontSize: 18,
        color: '#343a40'
    },
    content: {
        gap: 3
    },
    contentTxt: {
        fontSize: 13,
        color: '#6c757d',
    }
})