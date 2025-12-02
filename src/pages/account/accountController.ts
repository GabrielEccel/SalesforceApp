import { router } from "expo-router";
import { useEffect, useState } from "react";
import { accountInterface } from "../../types/accountInterface";
import accountService from "../../services/accountService";
import * as SecureStore from 'expo-secure-store'

export default function useAccountController() {
    const { getAllAccounts } = accountService()

    const [token, setToken] = useState<string | null>(null)

    const [loading, setLoading] = useState(true)
    const [accountList, setAccountList] = useState<accountInterface[]>([]);
    const [filtered, setFiltered] = useState<accountInterface[]>([]);
    const [refreshing, setRefreshing] = useState(false)

    useEffect(() => {
        const load = async () => {
            let accessToken = null;
            while (!accessToken) {
                accessToken = await SecureStore.getItemAsync('access_token');
            }
            setToken(accessToken);
            await fetchAccounts();
        };
        load();
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