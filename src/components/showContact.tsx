import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Feather } from "@expo/vector-icons";
import { contactInterface } from "../types/contactInterface";
import Separator from "./separator";
import { useState } from "react";
import ContactModal from "./contactModal";
import contactService from "../services/contactService";
import { colors } from "../global/colors";

interface ShowContactProps {
    contact: contactInterface;
    onUpdate: () => void;
}

export default function ShowContact({ contact, onUpdate }: ShowContactProps) {
    const [modalVisible, setModalVisible] = useState(false);
    const { deleteContact } = contactService()

    const handleLongPress = () => {
        Alert.alert("Excluir contato", `Tem certeza que deseja excluir ${contact.Name}?`, [
            {
                text: "Cancelar",
                style: "cancel"
            },
            {
                text: "Confirmar",
                style: "destructive",
                onPress: async () => {
                    await deleteContact(contact.Id)
                    onUpdate()
                }
            }
        ])
    }

    return (
        <>
            <TouchableOpacity style={styles.container} activeOpacity={0.7} onPress={() => setModalVisible(true)} onLongPress={handleLongPress}>
                <Text style={styles.name} numberOfLines={2}>
                    {contact.Salutation} {contact.Name}
                </Text>
                <Separator color="white" margin={5} />
                <View style={styles.info}>
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <Feather name="smartphone" color="white" size={16} />
                        <Text style={styles.infoTxt}> {contact.Phone}</Text>
                    </View>
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <Feather name="mail" color="white" size={16} />
                        <Text style={styles.infoTxt}> {contact.Email}</Text>
                    </View>
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <Feather name="type" color="white" size={16} />
                        <Text style={styles.infoTxt}> {contact.Title}</Text>
                    </View>
                </View>
            </TouchableOpacity>

            <ContactModal
                contact={contact}
                visible={modalVisible}
                onClose={() => setModalVisible(false)}
                onUpdate={onUpdate}
            />
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.violet,
        height: 200,
        width: 200,
        borderRadius: 12,
        padding: 20,
    },
    name: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
    },
    info: {
        marginTop: 12,
        gap: 10,
    },
    infoTxt: {
        color: "white",
        fontSize: 12,
    }
});
