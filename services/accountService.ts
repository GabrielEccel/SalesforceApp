import axios from "axios"
import homeController from "../src/pages/home/homeController";
import { AccountInterface } from "../types/AccountInterface";

export default function accountService() {
    const {
        newName,
        accessToken, 
        setAccountListToggle,
        selectedAccount, 
        setModalCreateVisibleToggle, 
        setModalUpdateVisibleToggle,
        setNewNameToggle
    } = homeController()

    const host = 'https://orgfarm-dba99aff7f-dev-ed.develop.my.salesforce.com';

    async function getAllAccounts() {
        try {
            const response = await axios.get(
                host + '/services/data/v64.0/query/?q=SELECT name,id from Account',
                {
                    headers: {
                        'Authorization': `Bearer ${accessToken}`,
                        'Content-Type': 'application/json'
                    }
                }
            )

            const listaContas = response.data.records.map((item: AccountInterface) => ({
                Id: item.Id,
                Name: item.Name
            }))

            setAccountListToggle(listaContas)

        } catch (error) {
            console.log(error)
        }
    }

    async function createNewAccount() {
        if (newName !== '') {

            try {
                await axios.post(host + '/services/data/v64.0/sobjects/Account/',
                    {
                        Name: newName
                    },
                    {
                        headers: {
                            'Authorization': `Bearer ${accessToken}`,
                            'Content-Type': 'application/json',
                            'Accept': 'application/json'
                        }
                    }
                )

                setNewNameToggle('')
                setModalCreateVisibleToggle(false)
                await getAllAccounts();

            } catch (error) {
                console.log(error)
            }

        }
    }

    async function deleteAccount() {
        try {
            await axios.delete(host + '/services/data/v64.0/sobjects/Account/' + selectedAccount?.Id,
                {
                    headers: {
                        'Authorization': `Bearer ${accessToken}`,
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    }
                }
            )

            setModalUpdateVisibleToggle(false);
            getAllAccounts();

        } catch (error) {
            console.log(error)
        }
    }

    async function updateAccount() {
        if (selectedAccount?.Name !== newName) {
            try {
                await axios.patch(host + '/services/data/v64.0/sobjects/Account/' + selectedAccount?.Id,
                    {
                        Name: newName
                    },
                    {
                        headers: {
                            'Authorization': `Bearer ${accessToken}`,
                            'Content-Type': 'application/json',
                            'Accept': 'application/json'
                        }
                    }
                )

                setModalUpdateVisibleToggle(false);
                getAllAccounts();

            } catch (error) {
                console.log(error)
            }
        } else {
            setModalUpdateVisibleToggle(false)
        }

    }

    return{
        getAllAccounts,
        createNewAccount,
        deleteAccount,
        updateAccount
    }
}