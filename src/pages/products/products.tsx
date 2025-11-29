import { FlatList, Image, ImageBackground, Text, View } from "react-native";
import Header from "../../components/header";
import eventBus from "../../utils/eventBus";
import { router } from "expo-router";
import useProductsController from "./productsController";
import { productsStyles as styles } from "./productsStyle";
import ShowOppProduct from "../../components/showOppProduct";
import Loading from "../../components/loading";

interface ProductsProps {
    id: string
}

export default function Products({ id }: ProductsProps) {
    const { products, loading } = useProductsController(id);

    if (loading) {
        return <Loading />
    }

    return (
        <View style={styles.container}>
            <Header
                label="Produtos da oportunidade"
                back={true}
                backFunction={goBackWithoutReload}
            />

            {products.length === 0 ? (
                <ImageBackground
                    source={require("../../../assets/images/emptyList.png")}
                    style={{ flex: 1, width: "100%" }}
                    resizeMode="cover"
                />
            ) : (
                <View style={styles.items}>
                    <FlatList
                        data={products}
                        keyExtractor={(item) => item.Id}
                        renderItem={({ item }) => <ShowOppProduct product={item} />}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{ paddingBottom: 20 }}
                    />
                </View>


            )}
        </View>
    )

    function goBackWithoutReload() {
        eventBus.emit("skipReloadOppDetail", true);
        router.back();
    }

}