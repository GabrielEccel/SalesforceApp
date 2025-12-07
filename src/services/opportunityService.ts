import axios from "axios"
import * as SecureStore from 'expo-secure-store'
import { createOpportunityResponse, opportunityInterface, opportunityPathInterface } from "../types/opportunityInterface";
import { dateFormatter } from "../utils/dateFormatter";
import { StageHistoryInterface } from "../types/stageHistoryInterface";

export default function OpportunityService() {

    const host = 'https://orgfarm-dba99aff7f-dev-ed.develop.my.salesforce.com';

    async function getToken() {
        const accessToken = await SecureStore.getItemAsync('access_token')
        return accessToken
    }

    async function getOpportunityFromAccount(id: string) {
        try {
            const accessToken = await getToken()
            const response = await axios.get(
                host + `/services/data/v64.0/query/?q=SELECT name, Id, CloseDate, StageName, Probability, Type, Amount, ExpectedRevenue, Pricebook2Id, Account.Name FROM Opportunity WHERE AccountId = '${id}'`,
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
                    Name: item.Account.Name ?? 'Indisponível'
                },
                Pricebook2Id: item.Pricebook2Id ?? 'Indisponível',
                Amount: item.Amount ?? '0',
                ExpectedRevenue: item.ExpectedRevenue ?? '0',
                CloseDate: item.CloseDate ? dateFormatter(item.CloseDate) : 'Indisponível'
            }))

            return (opportunityList);

        } catch (error) {
            console.log(error)
        }
    }

    async function getAllOpportunities() {
        try {
            const accessToken = await getToken()
            const response = await axios.get(
                host + `/services/data/v64.0/query/?q=SELECT name, Id, CloseDate, StageName, Probability, Type, AccountId, Account.Name, Amount, ExpectedRevenue, Pricebook2Id FROM Opportunity WHERE Account.Active__c = 'yes'`,
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
                    Name: item.Account?.Name ?? 'Indisponível',
                },
                PricebookId: item.Pricebook2Id ?? 'Indisponível',
                Amount: item.Amount ?? '0',
                ExpectedRevenue: item.ExpectedRevenue ?? '0',
                CloseDate: item.CloseDate ? dateFormatter(item.CloseDate) : 'Indisponível'
            }))

            return (opportunityList)

        } catch (error) {
            console.log(error)
        }

    }

    async function getOpportunityFromId(id: string) {
        try {
            const accessToken = await getToken()
            const response = await axios.get(
                host + `/services/data/v64.0/query/?q=SELECT name, Id, CloseDate, StageName, Probability, Type, AccountId, Amount, ExpectedRevenue, Account.Name, Pricebook2Id, Pricebook2.Name, (SELECT Id FROM OpportunityLineItems LIMIT 1) FROM Opportunity WHERE Id = '${id}' `,
                {
                    headers: {
                        'Authorization': `Bearer ${accessToken}`,
                        'Content-Type': 'application/json'
                    }
                }
            )

            const record = response.data.records[0] as opportunityInterface

            const opportunity = {
                Name: record.Name ?? 'Indisponível',
                Id: record.Id,
                StageName: record.StageName ?? 'Indisponível',
                Probability: record.Probability ?? 'Indisponível',
                Type: record.Type ?? 'Indisponível',
                AccountId: record.AccountId ?? 'Indisponível',
                Account: {
                    Name: record.Account?.Name ?? 'Indisponível'
                },
                Pricebook2Id: record.Pricebook2Id ?? 'Indisponível',
                Pricebook2: {
                    Name: record.Pricebook2?.Name ?? 'None'
                },
                Amount: record.Amount ?? '0',
                ExpectedRevenue: record.ExpectedRevenue ?? '0',
                CloseDate: record.CloseDate ?? 'Indisponível',
                OpportunityLineItems: {
                    totalSize: record.OpportunityLineItems?.totalSize ?? 0
                }
            };

            return opportunity;
        } catch (error) {
            console.log(error)
            throw error
        }

    }

    async function deleteOpportunity(id: string) {
        try {
            const accessToken = await getToken()
            const response = await axios.delete(
                host + `/services/data/v64.0/sobjects/Opportunity/${id} `,
                {
                    headers: {
                        'Authorization': `Bearer ${accessToken}`,
                        'Content-Type': 'application/json'
                    }
                }
            )

            return (response.data)
        } catch (error) {
            console.log(error)
        }

    }

    async function getOpportunityDescribe() {
        try {
            const accessToken = await getToken()
            const response = await axios.get(
                host + `/services/data/v64.0/sobjects/Opportunity/describe`,
                {
                    headers: {
                        'Authorization': `Bearer ${accessToken}`,
                        'Content-Type': 'application/json'
                    }
                }
            )

            const data = response.data as opportunityPathInterface;

            const stageField = data.fields.find(field => field.name === "StageName")
            const typeField = data.fields.find(field => field.name === "Type")

            const activeStages = stageField?.picklistValues.filter(v => v.active).map(v => v.label) ?? [];
            const activeTypes = typeField?.picklistValues.filter(v => v.active).map(v => v.label) ?? [];

            return {
                stages: activeStages,
                types: activeTypes
            }

        } catch (error) {
            console.log(error)
            throw error
        }

    }

    async function updateOpportunity(id: string, updatedData: Partial<opportunityInterface>) {
        try {
            const accessToken = await getToken()
            const response = await axios.patch(
                host + `/services/data/v64.0/sobjects/Opportunity/${id}`,
                updatedData,
                {
                    headers: {
                        'Authorization': `Bearer ${accessToken}`,
                        'Content-Type': 'application/json'
                    }
                }
            )
            return response.data

        } catch (error) {
            console.log(error)
        }
    }

    async function createOpportunity(data: Partial<opportunityInterface>) {
        try {
            const accessToken = await getToken()
            const response = await axios.post(
                host + `/services/data/v64.0/sobjects/Opportunity/`,
                data,
                {
                    headers: {
                        'Authorization': `Bearer ${accessToken}`,
                        'Content-Type': 'application/json'
                    }
                }
            )

            return response.data as createOpportunityResponse

        } catch (error) {
            console.log(error)
        }
    }

    async function getOpportunityStageHistory(id: string) {
        try {
            const accessToken = await getToken()
            const response = await axios.get(
                host + `/services/data/v64.0/query/?q=SELECT Id, OpportunityId, StageName, Probability, CloseDate, Amount, CreatedDate, ExpectedRevenue FROM OpportunityHistory WHERE OpportunityId = '${id}' ORDER BY CreatedDate DESC `,
                {
                    headers: {
                        'Authorization': `Bearer ${accessToken}`,
                        'Content-Type': 'application/json'
                    }
                }
            )

            const stageHistoryList = response.data.records.map((item: StageHistoryInterface) => ({
                Id: item.Id,
                OpportunityId: item.OpportunityId,
                StageName: item.StageName,
                Probability: item.Probability,
                CloseDate: item.CloseDate,
                Amount: item.Amount,
                CreatedDate: item.CreatedDate,
                ExpectedRevenue: item.ExpectedRevenue
            }))

            return (stageHistoryList)

        } catch (error) {
            console.log(error)
        }

    }

    return {
        getOpportunityFromAccount,
        getAllOpportunities,
        getOpportunityFromId,
        deleteOpportunity,
        getOpportunityDescribe,
        updateOpportunity,
        createOpportunity,
        getOpportunityStageHistory,
    }
}