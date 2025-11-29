import { Text, View } from "react-native";

interface ProductsProps {
    id: string
}

export default function Products({ id }: ProductsProps) {
    return (
        <View>
            <Text>{id}</Text>
        </View>
    )

}