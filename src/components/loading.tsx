import { ActivityIndicator, StyleSheet, View } from "react-native";
import { colors } from "../global/colors";

export default function Loading(){
    return(
        <View style={styles.container}>
            <ActivityIndicator size='large' color={colors.darkBlue}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})