import { Text, View } from "react-native";
import Header from "../../components/header";
import eventBus from "../../utils/eventBus";
import { router } from "expo-router";

interface ProductsProps {
    id: string
}

export default function Products({ id }: ProductsProps) {
    return (
        <View>
            <Header label="Lista de produtos" back={true} backFunction={goBackWithoutReload}/>
        </View>
    )

    function goBackWithoutReload() {
        eventBus.emit("skipReloadOppDetail", true);
        router.back();
    }

}