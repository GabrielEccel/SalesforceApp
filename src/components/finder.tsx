import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { TextInput } from "react-native-paper";
import { colors } from "../global/colors";

interface FinderProps {
    item: any[]
    onFiltered: (list: any[]) => void;
}

export default function Finder({ item, onFiltered }: FinderProps) {

    const [search, setSearch] = useState('');

    const handleSearch = (text: string) => {
        setSearch(text)

        if(text.trim() === ''){
            onFiltered(item)
            return;
        }

        const filtered = item.filter(item => 
            item.Name.toLowerCase().includes(text.toLowerCase())
        );

        onFiltered(filtered)

    }

    return (
        <View style={styles.container}>
            <TextInput style={styles.finder}
                editable={true}
                placeholder="Buscar"
                mode='flat'
                underlineColor='transparent'
                selectionHandleColor={colors.darkBlue}
                selectionColor={colors.lightGray}
                cursorColor={colors.darkBlue}
                activeUnderlineColor='transparent'
                textColor={colors.midGray}
                value={search}
                onChangeText={handleSearch}
                left={<TextInput.Icon icon="magnify" color={colors.darkBlue} style={styles.finderIcon} />}
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
        backgroundColor: colors.lightGray,
    },
    finderContent: {
        marginLeft: 45
    },
    finderIcon: {
        marginLeft: 15
    }
})