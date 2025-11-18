import { useEffect, useState } from "react";
import OpportunityService from "../../services/opportunityService";
import { opportunityInterface } from "../../types/opportunityInterface";
import { router } from "expo-router";
import { useRefreshStore } from "../../store/useStore";


export default function useOpportunityController() {
    const { getAllOpportunities } = OpportunityService();
    const { setShouldUpdateOpp, shouldUpdateOpp } = useRefreshStore();

    const [loading, setLoading] = useState(true)
    const [opportunityList, setOpportunityList] = useState<opportunityInterface[]>([])
    const [filtered, setFiltered] = useState<opportunityInterface[]>([]);
    const [refreshing, setRefreshing] = useState(false)

    useEffect(() => {
        fetchOpportunities()
    }, [])

    const onRefresh = async () => {
        setRefreshing(true)
        await fetchOpportunities()
        setRefreshing(false)
    }

    useEffect(() => {
        setFiltered(opportunityList)
    }, [opportunityList]);

    async function fetchOpportunities() {
        setLoading(true)
        try {
            const opportunities = await getAllOpportunities()
            setOpportunityList(opportunities);
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    const navigateToDetails = (Id: string) => {
        router.push(`/opportunityDetail/${Id}?callback=refresh`)
    }

    const toggleFiltered = (list: opportunityInterface[]) => {
        setFiltered(list)
    }

    const toggleShouldUpdateOpp = (cond: boolean) => {
        setShouldUpdateOpp(cond)
    }

    return {
        opportunityList,
        filtered,
        refreshing,
        onRefresh,
        toggleFiltered,
        loading,
        navigateToDetails,
        shouldUpdateOpp,
        toggleShouldUpdateOpp
    }
}