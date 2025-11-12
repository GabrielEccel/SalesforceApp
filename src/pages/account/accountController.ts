import { router } from "expo-router";
import { useEffect, useState } from "react";
import { accountInterface } from "../../types/accountInterface";
import accountService from "../../services/accountService";

export default function useAccountController() {
    const { getAllAccounts } = accountService()

    const [loading, setLoading] = useState(true)
    const [accountList, setAccountList] = useState<accountInterface[]>([]);

    useEffect(() => {
        fetchAccounts();
    }, []);

    async function fetchAccounts() {
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

    return {
        accountList,
        navigateToDetails,
        loading
    }
}