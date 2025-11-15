import { useEffect, useState } from "react";
import OpportunityService from "../../services/opportunityService";
import { opportunityInterface } from "../../types/opportunityInterface";


export default function useOpportunituController() {
    const { getAllOpportunities } = OpportunityService();
    
    const [loading, setLoading] = useState(true)
    const [opportunityList, setOpportunityList] = useState<opportunityInterface[]>([])
    const [filtered, setFiltered] = useState<opportunityInterface[]>([]);
    const [refreshing, setRefreshing] = useState(false)

    useEffect(() => {
        fetchOpportunities()
    }, [])

    useEffect(() => {
        setFiltered(opportunityList)
    }, [opportunityList]);

    const onRefresh = async () => {
        setRefreshing(true)
        await fetchOpportunities()
        setRefreshing(false)
    }

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

    const toggleFiltered = (list: opportunityInterface[]) => {
            setFiltered(list)
        }

    return {
        opportunityList,
        filtered,
        refreshing,
        onRefresh,
        toggleFiltered,
        loading
    }
}