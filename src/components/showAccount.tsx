import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { accountInterface } from '../types/accountInterface';

interface ShowAccountProps{
    account: accountInterface
    toggle: () => void
}

export default function ShowAccount({account, toggle}: ShowAccountProps) {
    return (
        <TouchableOpacity style={styles.show} onPress={() => toggle()}>
            <View style={styles.showFir}>
                <Text style={{color: '#0077b6'}}>{account.Name}</Text>
            </View>
            <View style={styles.showSec}>
                <Text style={{color: '#0077b6'}}>{account.Id}</Text>
            </View>
            
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    show: {
        backgroundColor: 'white',
        width: '100%',
        height: 50,
        borderWidth: 1,
        borderColor: '#e9ecef',
        flexDirection: 'row',
    },
    showFir:{
        height: '100%',
        width: '50%',
        justifyContent: 'center',
        paddingLeft: 40,
        
    },
    showSec:{
        height: '100%',
        width: '50%',
        justifyContent: 'center',
        paddingLeft: 40
    }
})