import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors } from "../global/colors";
import { pricebookProductsInterface } from '../types/pricebookProductsInterface';
import { useState } from 'react';

interface ShowOppProductProps {
    product: pricebookProductsInterface,
    onToggle: (product: pricebookProductsInterface) => void,
    isSelected: boolean
}

export default function ShowPricebookProd({ product, onToggle, isSelected }: ShowOppProductProps) {

    const color = isSelected ? colors.midBlue : 'white';
    const headerColor = isSelected ? 'white' : colors.darkGray;
    const contentColor = isSelected ? 'white' : colors.midGray;

    const styles = dynamicStyles(color, headerColor, contentColor)

    const handlePress = () => {
        onToggle(product);
    };

    return (
        <TouchableOpacity style={styles.show} onPress={handlePress} activeOpacity={0.7}>
            <View style={styles.header}>
                <Text style={styles.headerTxt}>{product?.Product2.Name}</Text>
            </View>
            <View style={styles.content}>
                <Text style={styles.contentTxt}>Preço Unitário: {Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(Number(product?.UnitPrice))}</Text>
            </View>

        </TouchableOpacity>
    );

}

const dynamicStyles = (color: string, headerColor: string, contentColor: string) => StyleSheet.create({
    show: {
        backgroundColor: color,
        width: '100%',
        height: 80,
        marginBottom: 8,
        borderRadius: 12,
        padding: 16
    },
    header: {
        marginBottom: 10
    },
    headerTxt: {
        fontSize: 18,
        color: headerColor
    },
    content: {
        gap: 3
    },
    contentTxt: {
        fontSize: 13,
        color: contentColor
    }
})