import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { TextInput } from "react-native-paper";
import { accountInterface } from "../types/accountInterface";

interface FinderProps {
    accounts: accountInterface[]
    onFiltered: (list: accountInterface[]) => void;
}

export default function Finder({ accounts, onFiltered }: FinderProps) {

    const [search, setSearch] = useState('');

    const handleSearch = (text: string) => {
        setSearch(text)

        if(text.trim() === ''){
            onFiltered(accounts)
            return;
        }

        const filtered = accounts.filter(item => 
            item.Name.toLowerCase().includes(text.toLowerCase())
        );

        onFiltered(filtered)


    }

    return (
        <View style={styles.container}>
            <TextInput style={styles.finder}
                editable={true}
                placeholder="Buscar conta"
                mode='flat'
                underlineColor='transparent'
                selectionHandleColor={'#023e8a'}
                selectionColor="#dee2e6"
                cursorColor="#023e8a"
                activeUnderlineColor='transparent'
                textColor="#6c757d"
                value={search}
                onChangeText={handleSearch}
                left={<TextInput.Icon icon="account-search-outline" color="#023e8a" style={styles.finderIcon} />}
                contentStyle={styles.finderContent}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'red',
        height: 50
    },
    finder: {
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
        backgroundColor: '#dee2e6',
    },
    finderContent: {
        marginLeft: 45
    },
    finderIcon: {
        marginLeft: 15
    }
})