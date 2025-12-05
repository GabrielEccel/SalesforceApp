import { useEffect, useState } from "react";
import { opportunityProductsInterface } from "../../types/opportunityProductsInterface";
import OpportunityService from "../../services/opportunityService";
import ProductService from "../../services/productsService";
import Toast from "react-native-toast-message";
import { pricebookProductsInterface } from "../../types/pricebookProductsInterface";
import PricebookService from "../../services/pricebookService";
import { Feather } from "@expo/vector-icons";

type FeatherIconName = keyof typeof Feather.glyphMap

export default function useProductsController(id: string) {
    const { getOpportunityFromId } = OpportunityService();
    const { getOpportunityProducts, createOpportunityLineItem } = ProductService();
    const { getPricebookProducts } = PricebookService();

    const [icon, setIcon] = useState<FeatherIconName>('plus')

    const [filteredOppProds, setFilteredOppProds] = useState<opportunityProductsInterface[]>([])
    const [filteredPricProds, setFilteredPricProds] = useState<pricebookProductsInterface[]>([])

    const [selectedProducts, setSelectedProducts] = useState<pricebookProductsInterface[]>([]);

    const [pricebook, setPricebook] = useState<string>()
    const [products, setProducts] = useState<opportunityProductsInterface[]>([])
    const [pricebookProducts, setpricebookProducts] = useState<pricebookProductsInterface[]>([])
    const [loading, setLoading] = useState(true)
    const [refreshing, setRefreshing] = useState(false)

    useEffect(() => {
        fetchProducts()
    }, [])

    useEffect(() => {
        setFilteredOppProds(products)
    }, [products])

    useEffect(() => {
        setFilteredPricProds(pricebookProducts)
    }, [pricebookProducts])

    useEffect(() => {
        if (icon === 'plus') {
            setFilteredPricProds(pricebookProducts)
        }
        else {
            setFilteredOppProds(products)
        }
    }, [icon])

    const onRefresh = async () => {
        setRefreshing(true)
        await fetchProducts()
        setRefreshing(false)
    }

    async function fetchProducts() {
        const opp = await getOpportunityFromId(id);
        const priceb = opp.Pricebook2Id

        if (priceb) {
            setPricebook(priceb)
        }

        const prods = await getOpportunityProducts(id);
        setProducts(prods)

        setLoading(false)
    }

    async function handlePress() {
        if (icon === 'plus') {
            if (pricebook) {
                const priceProds = await getPricebookProducts(pricebook)
                setpricebookProducts(priceProds)

                setIcon('save')
            }
            else {
                Toast.show({
                    type: "error",
                    text1: "Erro",
                    text2: "Oportunidade sem pricebook"
                });
            }
        }
        else {
            try {
                await Promise.all(
                    selectedProducts.map(item => {
                        return createOpportunityLineItem({
                            OpportunityId: id,
                            PricebookEntryId: item.Id,
                            Quantity: 1,
                            UnitPrice: item.UnitPrice
                        }) as Partial<opportunityProductsInterface>
                    })
                )
                setSelectedProducts([])
                onRefresh()
            } catch (error) {
                console.log(error)
            }
            setIcon('plus')
        }

    }

    const toggleProduct = (product: pricebookProductsInterface) => {
        setSelectedProducts(prev => {
            const exists = prev.find(p => p.Id === product.Id);
            if (exists) {
                return prev.filter(p => p.Id !== product.Id);
            }
            return [...prev, product];
        });
    };

    const toggleFilteredOppProds = (list: opportunityProductsInterface[]) => {
        setFilteredOppProds(list)
    }

    const toggleFilteredPricProds = (list: pricebookProductsInterface[]) => {
        setFilteredPricProds(list)
    }

    return {
        products,
        pricebookProducts,
        filteredOppProds,
        filteredPricProds,
        toggleFilteredOppProds,
        toggleFilteredPricProds,
        icon,
        loading,
        refreshing,
        onRefresh,
        handlePress,
        toggleProduct,
        selectedProducts
    }
}