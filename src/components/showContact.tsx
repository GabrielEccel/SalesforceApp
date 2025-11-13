import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Feather } from "@expo/vector-icons";
import { contactInterface } from "../types/contactInterface";
import Separator from "./separator";
import { useState } from "react";
import ContactModal from "./contactModal";

interface ShowContactProps {
    contact: contactInterface;
}

export default function ShowContact({ contact }: ShowContactProps) {

    const [modalVisible, setModalVisible] = useState(false);

    return (
        <>
            <TouchableOpacity style={styles.container} activeOpacity={0.7} onPress={() => setModalVisible(true)}>
                <Text style={styles.name}>
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
            />
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#3a6ea5",
        height: 200,
        width: 200,
        borderRadius: 12,
        padding: 20,
        marginRight: 1,
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
