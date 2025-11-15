import axios from "axios"
import * as SecureStore from 'expo-secure-store'
import { opportunityInterface } from "../types/opportunityInterface";
import { dateFormatter } from "../utils/dateFormatter";

export default function OpportunityService() {

    const host = 'https://orgfarm-dba99aff7f-dev-ed.develop.my.salesforce.com';

    async function getToken() {
        const accessToken = await SecureStore.getItemAsync('access_token')
        return accessToken
    }

    async function getOpportunityFromAccount(id: string){
        try {
            const accessToken = await getToken()
            const response = await axios.get(
                host + `/services/data/v64.0/query/?q=SELECT name, Id, CloseDate, StageName, Probability, Type, AccountId, Amount, ExpectedRevenue FROM Opportunity WHERE AccountId = '${id}'`,
                {
                    headers: {
                        'Authorization': `Bearer ${accessToken}`,
                        'Content-Type': 'application/json'
                    }
                }
            )

            const opportunityList = response.data.records.map((item: opportunityInterface) => ({
                Name: item.Name,
                Id: item.Id,
                StageName: item.StageName,
                Probability: item.Probability ?? 'Indisponível',
                Type: item.Type ?? 'Indisponível',
                AccountId: item.AccountId,
                Amount: item.Amount ?? 'Indisponível',
                ExpectedRevenue: item.ExpectedRevenue ?? 'Indisponível',
                CloseDate: item.CloseDate ? dateFormatter(item.CloseDate) : 'Indisponível'
            }))
            
            return (opportunityList);

        } catch (error) {
            console.log(error)
        }
    }

    async function getAllOpportunities(){
        const accessToken = await getToken()
            const response = await axios.get(
                host + `/services/data/v64.0/query/?q=SELECT name, Id, CloseDate, StageName, Probability, Type, AccountId, Amount, ExpectedRevenue, Account.Name FROM Opportunity WHERE Account.Active__c = 'yes'`,
                {
                    headers: {
                        'Authorization': `Bearer ${accessToken}`,
                        'Content-Type': 'application/json'
                    }
                }
            )

            const opportunityList = response.data.records.map((item: opportunityInterface) => ({
                Name: item.Name,
                Id: item.Id,
                StageName: item.StageName,
                Probability: item.Probability ?? 'Indisponível',
                Type: item.Type ?? 'Indisponível',
                AccountId: item.AccountId,
                Account: {
                    Name: item.Account?.Name ?? 'Indisponível'
                },
                Amount: item.Amount ?? 'Indisponível',
                ExpectedRevenue: item.ExpectedRevenue ?? 'Indisponível',
                CloseDate: item.CloseDate ? dateFormatter(item.CloseDate) : 'Indisponível'
            }))

            return(opportunityList)
    }

    return {
        getOpportunityFromAccount,
        getAllOpportunities
    }
}