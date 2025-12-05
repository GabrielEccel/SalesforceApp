import { Text, TouchableOpacity, ImageBackground } from "react-native";
import { useAuthenticationController } from "./authenticationController";
import { styles } from "./authenticationStyles";

export default function Authentication() {
    const { login } = useAuthenticationController();

    return (
        <ImageBackground
            source={require('../../../assets/loginBackground.png')}
            style={styles.container}
            resizeMode="cover"
        >
            <TouchableOpacity style={styles.bttn} onPress={login}>
                <Text style={styles.bttnTxt}>Entrar com Salesforce</Text>
            </TouchableOpacity>

        </ImageBackground>
    );
}