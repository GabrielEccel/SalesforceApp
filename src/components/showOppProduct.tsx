import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Feather } from '@expo/vector-icons'
import { colors } from "../global/colors";
import { opportunityProductsInterface } from '../types/opportunityProductsInterface';

type FeatherIconName = keyof typeof Feather.glyphMap;

interface ShouOppProduct {
    product?: opportunityProductsInterface
}

export default function ShowOppProduct({ product }: ShouOppProduct) {

    const defineIcon = (stage: string): FeatherIconName => {
        const map: Record<string, FeatherIconName> = {
            "Closed Won": "check-circle",
            "Closed Lost": "x-circle"
        };

        return map[stage] ?? 'activity';
    }

    return (
        <View style={styles.show} >
            <View style={styles.header}>
                <Text style={styles.headerTxt}>{product?.Product2.Name}</Text>
            </View>
            <View style={styles.content}>
                <Text style={styles.contentTxt}>Quantidade: {product?.Quantity}</Text>
                <Text style={styles.contentTxt}>Preço Unitário: {Intl.NumberFormat('pt-BR',{style:'currency',currency:'BRL'}).format(Number(product?.UnitPrice))}</Text>
                <Text style={styles.contentTxt}>Valor Total: {Intl.NumberFormat('pt-BR',{style:'currency',currency:'BRL'}).format(Number(product?.TotalPrice))}</Text>
            </View>

        </View>
    );

}

const styles = StyleSheet.create({
    show: {
        backgroundColor: 'white',
        width: '100%',
        height: 135,
        marginBottom: 8,
        borderRadius: 12,
        padding: 16
    },
    header: {
        marginBottom: 10
    },
    headerTxt: {
        fontSize: 18,
        color: colors.darkGray
    },
    content: {
        gap: 3
    },
    contentTxt: {
        fontSize: 13,
        color: colors.midGray,
    }
})