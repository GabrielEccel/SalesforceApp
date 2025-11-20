import { Picker } from '@react-native-picker/picker';
import { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../global/colors';

interface DropDownProps {
    items: string[],
    value: string,
    onChange: (value: string) => void
    label: string
}   

export default function DropDown({ items, value, onChange, label}: DropDownProps) {
    return (
        <View style={styles.container}>
            <Text style={styles.label}>{label}</Text>
            <Picker
                style={styles.picker}
                selectedValue={value}
                mode='dropdown'
                onValueChange={(newValue) => onChange(newValue)}
                prompt="Selecione um estágio"
            >
                {items.map((item, index) => (
                    <Picker.Item
                        key={index}
                        label={item}
                        value={item}
                    />
                ))}
            </Picker>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        gap: 8
    },
    picker: {
        backgroundColor: colors.extraLightGray,
        color: colors.midGray
    },
    label:{
        color: colors.darkGray
    }
})
