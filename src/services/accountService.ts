import axios from "axios"
import useAccountController from "../pages/account/accountController";
import { accountDetailInterface, accountInterface } from "../types/accountInterface";

export default function accountService() {

    const host = 'https://orgfarm-dba99aff7f-dev-ed.develop.my.salesforce.com';

    async function getAllAccounts(accessToken: string) {
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

            const accountList = response.data.records.map((item: accountInterface) => ({
                Id: item.Id,
                Name: item.Name
            }))

            return(accountList)

        } catch (error) {
            console.log(error)
        }
    }

    async function getAccountById(accessToken: string, id: string){
        try{
            const response = await axios.get(
                host + `/services/data/v64.0/query/?q=SELECT name, id, phone FROM Account WHERE Id = '${id}'`,
                {
                    headers: {
                        'Authorization': `Bearer ${accessToken}`,
                        'Content-Type': 'application/json'
                    }
                }
            )

            const accountDetail = response.data as accountDetailInterface

        } catch (error){
            console.log(error)
        }

    }

    // async function createNewAccount() {
    //     if (newName !== '') {

    //         try {
    //             await axios.post(host + '/services/data/v64.0/sobjects/Account/',
    //                 {
    //                     Name: newName
    //                 },
    //                 {
    //                     headers: {
    //                         'Authorization': `Bearer ${accessToken}`,
    //                         'Content-Type': 'application/json',
    //                         'Accept': 'application/json'
    //                     }
    //                 }
    //             )

    //             setNewNameToggle('')
    //             setModalCreateVisibleToggle(false)
    //             await getAllAccounts();

    //         } catch (error) {
    //             console.log(error)
    //         }

    //     }
    // }

    // async function deleteAccount() {
    //     try {
    //         await axios.delete(host + '/services/data/v64.0/sobjects/Account/' + selectedAccount?.Id,
    //             {
    //                 headers: {
    //                     'Authorization': `Bearer ${accessToken}`,
    //                     'Content-Type': 'application/json',
    //                     'Accept': 'application/json'
    //                 }
    //             }
    //         )

    //         setModalUpdateVisibleToggle(false);
    //         getAllAccounts();

    //     } catch (error) {
    //         console.log(error)
    //     }
    // }

    // async function updateAccount() {
    //     if (selectedAccount?.Name !== newName) {
    //         try {
    //             await axios.patch(host + '/services/data/v64.0/sobjects/Account/' + selectedAccount?.Id,
    //                 {
    //                     Name: newName
    //                 },
    //                 {
    //                     headers: {
    //                         'Authorization': `Bearer ${accessToken}`,
    //                         'Content-Type': 'application/json',
    //                         'Accept': 'application/json'
    //                     }
    //                 }
    //             )

    //             setModalUpdateVisibleToggle(false);
    //             getAllAccounts();

    //         } catch (error) {
    //             console.log(error)
    //         }
    //     } else {
    //         setModalUpdateVisibleToggle(false)
    //     }

    // }

    return{
        getAllAccounts,
        // createNewAccount,
        // deleteAccount,
        // updateAccount
    }
}