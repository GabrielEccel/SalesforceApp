import axios from "axios"
import { accountInterface } from "../types/accountInterface";
import * as SecureStore from 'expo-secure-store'

export default function accountService() {

    const host = 'https://orgfarm-dba99aff7f-dev-ed.develop.my.salesforce.com';

    async function getToken() {
        const accessToken = await SecureStore.getItemAsync('access_token')
        return accessToken
    }

    async function getAllAccounts() {
        try {
            const accessToken = await getToken()
            const response = await axios.get(
                host + `/services/data/v64.0/query/?q=SELECT name, id, phone, BillingAddress, Website, Type, Active__c, industry FROM Account WHERE Active__c = 'yes' `,
                {
                    headers: {
                        'Authorization': `Bearer ${accessToken}`,
                        'Content-Type': 'application/json'
                    }
                }
            )

            const accountList = response.data.records.map((item: accountInterface) => ({
                Id: item.Id,
                Name: item.Name,
                Phone: item.Phone ?? "Indisponível",
                Industry: item.Industry ?? "Indisponível",
                BillingAddress: item.BillingAddress ?? "Indisponível",
            }))

            return(accountList);

        } catch (error) {
            console.log(error)
        }
    }

    async function getAccountById(id: string){
        try{
            const accessToken = await getToken()
            const response = await axios.get(
                host + `/services/data/v64.0/query/?q=SELECT name, id, phone, BillingAddress, Website, Type, Active__c, industry, CustomerPriority__c FROM Account WHERE Id  = '${id}'`,
                {
                    headers: {
                        'Authorization': `Bearer ${accessToken}`,
                        'Content-Type': 'application/json'
                    }
                }
            )

            const accountDetail = response.data.records[0] as accountInterface
            return(accountDetail);

        } catch (error){
            console.log(error)
            return null;
        }
    }
    
    return{
        getAllAccounts,
        getAccountById,
    }
}