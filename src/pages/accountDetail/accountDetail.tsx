import { useLocalSearchParams } from "expo-router"
import { Text, View } from "react-native"

interface AccountDetailProps{
    id: string;
}

export default function AccountDetail({ id }: AccountDetailProps){
    return(
        <View>
            <Text>Id recebido: {id}</Text>
        </View>
    )
}