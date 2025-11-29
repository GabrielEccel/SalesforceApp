import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Feather } from '@expo/vector-icons'
import { colors } from "../global/colors";
import { opportunityProductsInterface } from '../types/opportunityProductsInterface';
import ProductService from '../services/productsService';

type FeatherIconName = keyof typeof Feather.glyphMap;

interface ShouOppProduct {
    product: opportunityProductsInterface
    onUpdate: () => void
}

export default function ShowOppProduct({ product, onUpdate }: ShouOppProduct) {
    const { deleteProductFromOpp } = ProductService()


    const handleLongPress = () => {
        Alert.alert("Excluir produto", `Tem certeza que deseja excluir o produto ${product?.Product2.Name} da oportunidade?`, [
            {
                text: "Cancelar",
                style: "cancel"
            },
            {
                text: "Confirmar",
                style: "destructive",
                onPress: async () => {
                    await deleteProductFromOpp(product.Id)
                    onUpdate()
                }
            }
        ])
    }

    return (
        <TouchableOpacity style={styles.show} onLongPress={handleLongPress}>
            <View style={styles.header}>
                <Text style={styles.headerTxt}>{product?.Product2.Name}</Text>
            </View>
            <View style={styles.content}>
                <Text style={styles.contentTxt}>Quantidade: {product?.Quantity}</Text>
                <Text style={styles.contentTxt}>Preço Unitário: {Intl.NumberFormat('pt-BR',{style:'currency',currency:'BRL'}).format(Number(product?.UnitPrice))}</Text>
                <Text style={styles.contentTxt}>Valor Total: {Intl.NumberFormat('pt-BR',{style:'currency',currency:'BRL'}).format(Number(product?.TotalPrice))}</Text>
            </View>

        </TouchableOpacity>
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