import { router } from "expo-router";
import { useEffect, useState } from "react";
import { accountInterface } from "../../types/accountInterface";
import accountService from "../../services/accountService";

export default function useAccountController() {
    const { getAllAccounts } = accountService()

    const [loading, setLoading] = useState(true)
    const [accountList, setAccountList] = useState<accountInterface[]>([]);
    const [filtered, setFiltered] = useState<accountInterface[]>([]);
    const [refreshing, setRefreshing] = useState(false)

    useEffect(() => {
        fetchAccounts();
    }, []);

    useEffect(() => {
        setFiltered(accountList)
    }, [accountList]);

    async function fetchAccounts() {
        setLoading(true)
        try {
            const accounts = await getAllAccounts();
            setAccountList(accounts);
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }

    }

    const navigateToDetails = (Id: string) => {
        router.push(`/accountDetail/${Id}`)
    }

    const onRefresh = async () => {
        setRefreshing(true)
        await fetchAccounts()
        setRefreshing(false)
    }

    const toggleFiltered = (list: accountInterface[]) => {
        setFiltered(list)
    }

    return {
        accountList,
        navigateToDetails,
        loading,
        toggleFiltered,
        filtered,
        onRefresh,
        refreshing
    }
}