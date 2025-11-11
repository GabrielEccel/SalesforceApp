import { router } from "expo-router";
import * as SecureStore from 'expo-secure-store';
import { useEffect, useState } from "react";
import { AccountInterface } from "../../types/AccountInterface";

export default function homeController(){
    const [accessToken, setAccessToken] = useState('');
    const [accountList, setAccountList] = useState<AccountInterface[]>([]);
    const [modalCreateVisible, setModalCreateVisible] = useState(false);
    const [modalUpdateVisible, setModalUpdateVisible] = useState(false);
    const [newName, setNewName] = useState('');
    const [selectedAccount, setSelectedAccount] = useState<AccountInterface | null>(null);

    useEffect(() => {
        checkToken();
    }, []);

    const checkToken = async () => {
        const storedToken = await SecureStore.getItemAsync('access_token');
        if (storedToken) {
            setAccessToken(storedToken);
        }

        else {
            router.replace('/authScreen');
        }
    };

    const setAccountListToggle = (accountList: AccountInterface[]) => {
        setAccountList(accountList);
    }

    const setSelectedAccountToggle = (account: AccountInterface) => {
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
        newName,
        accessToken,
        accountList,
        setAccountListToggle,
        selectedAccount,
        modalCreateVisible,
        setModalCreateVisibleToggle,
        modalUpdateVisible,
        setModalUpdateVisibleToggle,
        setNewNameToggle,
        setSelectedAccountToggle
    }
}