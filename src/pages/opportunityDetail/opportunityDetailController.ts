import { useCallback, useEffect, useRef, useState } from "react";
import { opportunityInterface } from "../../types/opportunityInterface";
import OpportunityService from "../../services/opportunityService";
import { accountInterface } from "../../types/accountInterface";
import accountService from "../../services/accountService";
import { dateFormatter } from "../../utils/dateFormatter";
import { router, useFocusEffect } from "expo-router";
import { StageHistoryInterface } from "../../types/stageHistoryInterface";
import { pricebookInterface } from "../../types/pricebookInterface";
import { pricebookProductsInterface } from "../../types/pricebookProductsInterface";
import { opportunityProductsInterface } from "../../types/opportunityProductsInterface";
import eventBus from "../../utils/eventBus";

export default function useOpportunityDetailController(id: string) {
    const { getOpportunityFromId, deleteOpportunity, getOpportunityStageHistory, getOpportunityPricebook, getOpportunityProducts, getPricebookProducts } = OpportunityService();
    const { getAccountById } = accountService();

    const [loading, setLoading] = useState(true);
    const [info, setinfo] = useState<opportunityInterface | null>(null)
    const [account, setAccount] = useState<accountInterface | null>(null)
    const [stageHistoryList, setStageHistoryList] = useState<StageHistoryInterface[]>([])
    const [pricebook, setPricebook] = useState<pricebookInterface>()
    const [products, setProducts] = useState<opportunityProductsInterface[]>([])
    const [refreshing, setRefreshing] = useState(false)

    const skipReloadRef = useRef(false);


    useEffect(() => {
        const listener = eventBus.addListener(
            'skipReloadOppDetail',
            (valor: boolean) => {
                skipReloadRef.current = valor;
            }
        );

        return () => listener.remove();
    }, []);

    useFocusEffect(
        useCallback(() => {
            if (skipReloadRef.current) {
                skipReloadRef.current = false;
                return;
            }

            onRefresh();
        }, [])
    );

    async function onRefresh() {
        setRefreshing(true)
        await fetchDetails()
        setRefreshing(false)
    }

    async function fetchDetails() {
        setLoading(true)
        try {
            const info = await getOpportunityFromId(id);
            const formatted = {
                ...info,
                CloseDate: info?.CloseDate ? dateFormatter(info.CloseDate) : '',
            }
            setinfo(formatted)

            const account = await getAccountById(info.AccountId)
            setAccount(account)

            const stageHistoryList = await getOpportunityStageHistory(id);
            const form = stageHistoryList.map((item: StageHistoryInterface) => ({
                ...item,
                CloseDate: item.CloseDate ? dateFormatter(item.CloseDate) : '',
                CreatedDate: item.CreatedDate ? dateFormatter(item.CreatedDate) : ''
            }))
            setStageHistoryList(form)

            const priceb = await getOpportunityPricebook(id);
            setPricebook(priceb)

            const prods = await getOpportunityProducts(id);
            setProducts(prods)

            if (priceb?.Pricebook2Id) {
                const prods = await getPricebookProducts(priceb.Pricebook2Id)
            }


        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    async function deleteOpp() {
        try {
            await deleteOpportunity(id)
            router.replace({
                pathname: '/opportunity',
                params: { shouldRefresh: 'true' }
            })
        } catch (error) {
            console.log(error)
        }
    }

    const navigateToUpsert = () => {
        router.push({
            pathname: '/opportunityUpsert',
            params: { opportunityId: info?.Id }
        })
    }

    const navigateToProducts = () => {
        router.push({
            pathname: '/products',
            params: { id: info?.Id }
        })
    }

    return {
        loading,
        info,
        account,
        deleteOpp,
        refreshing,
        onRefresh,
        navigateToUpsert,
        stageHistoryList,
        navigateToProducts
    }
}