import { useEffect, useState } from "react";
import { pricebookInterface } from "../../types/pricebookInterface";
import { opportunityProductsInterface } from "../../types/opportunityProductsInterface";
import OpportunityService from "../../services/opportunityService";

export default function useProductsController(id: string) {
    const {getOpportunityPricebook, getOpportunityProducts, getPricebookProducts } = OpportunityService();

    const [pricebook, setPricebook] = useState<pricebookInterface>()
    const [products, setProducts] = useState<opportunityProductsInterface[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchProducts()
    }, [])

    async function fetchProducts() {
        const priceb = await getOpportunityPricebook(id);
        setPricebook(priceb)

        const prods = await getOpportunityProducts(id);
        setProducts(prods)

        if (priceb?.Pricebook2Id) {
            const prods = await getPricebookProducts(priceb.Pricebook2Id)
        }

        setLoading(false)
    }

    return {
        products,
        loading
    }
}