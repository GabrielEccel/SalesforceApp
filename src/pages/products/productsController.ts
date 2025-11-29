import { useEffect, useState } from "react";
import { opportunityProductsInterface } from "../../types/opportunityProductsInterface";
import OpportunityService from "../../services/opportunityService";
import PricebookService from "../../services/pricebookService";
import ProductService from "../../services/productsService";

export default function useProductsController(id: string) {
    const {getOpportunityFromId } = OpportunityService();
    const {getOpportunityProducts } = ProductService();
    const { getPricebookProducts } = PricebookService()

    const [pricebook, setPricebook] = useState<string>()
    const [products, setProducts] = useState<opportunityProductsInterface[]>([])
    const [loading, setLoading] = useState(true)
    const [refreshing, setRefreshing] = useState(false)

    useEffect(() => {
        fetchProducts()
    }, [])

    const onRefresh = async () => {
        setRefreshing(true)
        await fetchProducts()
        setRefreshing(false)
    }

    async function fetchProducts() {
        const opp = await getOpportunityFromId(id);
        const priceb = opp.Pricebook2Id

        const prods = await getOpportunityProducts(id);
        setProducts(prods)

        if (priceb) {
            const prods = await getPricebookProducts(priceb)
            setPricebook(priceb)
        }

        setLoading(false)
    }

    return {
        products,
        loading,
        refreshing,
        onRefresh
    }
}