import React, { useState } from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import DateTimePicker, { DateTimePickerEvent } from "@react-native-community/datetimepicker";
import { colors } from "../global/colors";

interface DateInputProps {
    label?: string;
    value: string | null;
    onChange: (date: string) => void;
}

export default function DateInput({ label, value, onChange }: DateInputProps) {
    const [show, setShow] = useState(false);

    const parseDate = (str: string | null) => {
        if (!str) return new Date();
        const [y, m, d] = str.split("-");
        return new Date(Number(y), Number(m) - 1, Number(d));
    };

    const formatDate = (date: Date) => {
        const y = date.getFullYear();
        const m = String(date.getMonth() + 1).padStart(2, "0");
        const d = String(date.getDate()).padStart(2, "0");
        return `${y}-${m}-${d}`;
    };

    const onDateChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
        setShow(false);

        if (event.type === "set" && selectedDate) {
            onChange(formatDate(selectedDate));
        }
    };

    return (
        <View style={styles.container}>
            {label && <Text style={styles.label}>{label}</Text>}

            <Pressable onPress={() => setShow(true)} style={styles.input}>
                <Text style={{ color: colors.midGray }}>
                    {value ? parseDate(value).toLocaleDateString("pt-BR") : "Selecione a data"}
                </Text>
            </Pressable>

            {show && (
                <DateTimePicker
                    value={parseDate(value)}
                    mode="date"
                    display="default"
                    onChange={onDateChange}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginVertical: 10,
    },
    label: {
        marginBottom: 5,
        color: colors.darkGray,
        fontSize: 14,
    },
    input: {
        padding: 12,
        borderRadius: 8,
        backgroundColor: colors.extraLightGray,
    },
});
