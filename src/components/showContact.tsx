import { StyleSheet, Text, View } from "react-native";
import { Feather } from '@expo/vector-icons'
import { contactInterface } from "../types/contactInterface";
import Separator from "./separator";

interface ShowContactProps {
    contact: contactInterface,
}

export default function ShowContact({ contact }: ShowContactProps) {
    return (
        <View style={styles.container}>
            <Text style={styles.name}>{contact.Salutation} {contact.Name}</Text>
            <Separator color="white" margin={5}/>
            <View style={styles.info}>
                <View style={{alignItems: 'center', flexDirection: 'row'}}>
                    <Feather name="smartphone" color='white' size={16} />
                    <Text style={styles.infoTxt}> {contact.Phone}</Text>
                </View>
                <View style={{alignItems: 'center', flexDirection: 'row'}}>
                    <Feather name="mail" color='white' size={16} />
                    <Text style={styles.infoTxt}> {contact.Email}</Text>
                </View>
                <View style={{alignItems: 'center', flexDirection: 'row'}}>
                    <Feather name="type" color='white' size={16} />
                    <Text style={styles.infoTxt}> {contact.Title}</Text>
                </View>
            </View>
        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#3a6ea5',
        height: 200,
        width: 200,
        borderRadius: 12,
        padding: 20
    },
    name: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold'
    },
    info: {
        marginTop: 12,
        gap: 10
    },
    infoTxt:{
        color: 'white',
        fontSize: 12
    }
})