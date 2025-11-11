import { router } from "expo-router";
import * as SecureStore from 'expo-secure-store';
import { useEffect, useState } from "react";
import { accountInterface } from "../../types/accountInterface";
import accountService from "../../services/accountService";

export default function useAccountController() {
    const { getAllAccounts } = accountService()

    const [accountList, setAccountList] = useState<accountInterface[]>([]);
    const [modalCreateVisible, setModalCreateVisible] = useState(false);
    const [modalUpdateVisible, setModalUpdateVisible] = useState(false);
    const [newName, setNewName] = useState('');
    const [selectedAccount, setSelectedAccount] = useState<accountInterface | null>(null);

    useEffect(() => {
        async function fetchAccounts() {
            const accessToken = await SecureStore.getItemAsync('access_token')
            const accounts = await getAllAccounts(String(accessToken));
            setAccountList(accounts);
        }

        fetchAccounts();
    }, []);

    const navigateToDetails = (Id: string) => {
        router.push(`/accountDetail/${Id}`)
    }


    const setSelectedAccountToggle = (account: accountInterface) => {
        setSelectedAccount(account);
    }

    const setModalCreateVisibleToggle = (cond: boolean) => {
        setModalCreateVisible(cond);
    }

    const setModalUpdateVisibleToggle = (cond: boolean) => {
        setModalUpdateVisible(cond);
    }

    const setNewNameToggle = (newName: string) => {
        setNewName(newName)
    }

    return {
        accountList,
        navigateToDetails,

        newName,
        selectedAccount,
        modalCreateVisible,
        setModalCreateVisibleToggle,
        modalUpdateVisible,
        setModalUpdateVisibleToggle,
        setNewNameToggle,
        setSelectedAccountToggle
    }
}