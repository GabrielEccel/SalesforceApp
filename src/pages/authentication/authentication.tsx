import { View, Text, Button, TouchableOpacity } from "react-native";
import { useAuthenticationController } from "./authenticationController";
import { styles } from "./authenticationStyles";

export default function Authentication() {
    const { accToken, refToken, logout, login } = useAuthenticationController();

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.bttn} onPress={login}>
                <Text style={styles.bttnTxt}>Entrar com Salesforce</Text>
            </TouchableOpacity>
        </View>
    );
}