import { useEffect, useState } from "react";
import { opportunityProductsInterface } from "../../types/opportunityProductsInterface";
import OpportunityService from "../../services/opportunityService";
import PricebookService from "../../services/pricebookService";

export default function useProductsController(id: string) {
    const {getOpportunityFromId, getOpportunityProducts } = OpportunityService();
    const { getPricebookProducts } = PricebookService()

    const [pricebook, setPricebook] = useState<string>()
    const [products, setProducts] = useState<opportunityProductsInterface[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchProducts()
    }, [])

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
        loading
    }
}