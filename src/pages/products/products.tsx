import { FlatList, Image, ImageBackground, RefreshControl, Text, TouchableOpacity, View } from "react-native";
import Header from "../../components/header";
import useProductsController from "./productsController";
import { productsStyles as styles } from "./productsStyle";
import ShowOppProduct from "../../components/showOppProduct";
import Loading from "../../components/loading";
import { Feather } from '@expo/vector-icons'
import ShowPricebookProd from "../../components/showPricebookProd";
import { pricebookProductsInterface } from "../../types/pricebookProductsInterface";
import { opportunityProductsInterface } from "../../types/opportunityProductsInterface";
import Finder from "../../components/finder";

type ProductType = pricebookProductsInterface | opportunityProductsInterface;

interface ProductsProps {
    id: string
}

export default function Products({ id }: ProductsProps) {
    const { products, pricebookProducts, filteredOppProds, filteredPricProds, toggleFilteredOppProds, toggleFilteredPricProds, loading, icon, refreshing, onRefresh, handlePress, selectedProducts, toggleProduct } = useProductsController(id);
    const data: ProductType[] = icon === 'plus' ? filteredOppProds : filteredPricProds;

    if (loading) {
        return <Loading />
    }

    return (
        <View style={styles.container}>
            <Header
                label="Produtos da oportunidade"
                back={true}
            />
            <Finder item={icon === 'plus' ? products : pricebookProducts} onFiltered={icon === 'plus' ? toggleFilteredOppProds : toggleFilteredPricProds} object="product"/>

            {data.length === 0 ? (
                <ImageBackground
                    source={require("../../../assets/images/emptyList.png")}
                    style={{ flex: 1, width: "100%" }}
                    resizeMode="cover"
                />
            ) : (
                <View style={styles.items}>
                    <FlatList<ProductType>
                        data={icon === 'plus' ? filteredOppProds : filteredPricProds}
                        keyExtractor={(item) => item.Id}
                        renderItem={({ item }) => icon === 'plus' ? (<ShowOppProduct product={item as opportunityProductsInterface} onUpdate={onRefresh}/>) : (<ShowPricebookProd product={item as pricebookProductsInterface} isSelected={!!products.find(opp => opp.PricebookEntryId === (item as pricebookProductsInterface).Id)} onToggle={toggleProduct}/>)}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{ paddingBottom: 20 }}
                        refreshControl={
                            <RefreshControl
                                onRefresh={onRefresh}
                                refreshing={refreshing}
                                enabled={false}
                            />
                        }
                    />
                </View>


            )}

            <TouchableOpacity style={styles.floatingButton} onPress={handlePress}>
                <Feather name={icon} size={25} color='white' />
            </TouchableOpacity>
        </View>
    )
}