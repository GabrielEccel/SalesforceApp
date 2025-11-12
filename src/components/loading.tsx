import { ActivityIndicator, StyleSheet, View } from "react-native";


export default function Loading(){
    return(
        <View style={styles.container}>
            <ActivityIndicator size='large' color='#023e8a'/>
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