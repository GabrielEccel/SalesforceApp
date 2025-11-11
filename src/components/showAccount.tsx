import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { AccountInterface } from '../types/AccountInterface';

interface ShowAccountProps{
    account: AccountInterface
    toggle: () => void
}

export default function ShowAccount({account, toggle}: ShowAccountProps) {
    return (
        <TouchableOpacity style={styles.show} onPress={() => toggle()}>
            <Text>Nome: {account.Name}</Text>
            <Text>Id: {account.Id}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    show: {
        backgroundColor: 'rgba(208,208,208, 0.4)',
        width: '100%',
        height: 80,
        padding: 15,
        gap: 5,
        borderWidth: 1
    }
})