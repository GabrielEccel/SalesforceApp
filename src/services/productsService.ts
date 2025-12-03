import * as SecureStore from 'expo-secure-store'
import axios from 'axios';
import { pricebookProductsInterface } from '../types/pricebookProductsInterface';
import { pricebookInterface } from '../types/pricebookInterface';
import { opportunityProductsInterface } from '../types/opportunityProductsInterface';

export default function ProductService() {

    const host = 'https://orgfarm-dba99aff7f-dev-ed.develop.my.salesforce.com';

    async function getToken() {
        const accessToken = await SecureStore.getItemAsync('access_token')
        return accessToken
    }

    async function getOpportunityProducts(id: string) {
        try {
            const accessToken = await getToken();
            const response = await axios.get(
                host + `/services/data/v64.0/query/?q=SELECT Id, OpportunityId, PricebookEntryId, Quantity, UnitPrice, TotalPrice, Product2Id, Product2.Name FROM OpportunityLineItem WHERE OpportunityId = '${id}'`,
                {
                    headers: {
                        'Authorization': `Bearer ${accessToken}`,
                        'Content-Type': 'application/json'
                    }
                }
            )

            const products = response.data.records.map((item: opportunityProductsInterface) => ({
                Id: item.Id,
                OpportunityId: item.OpportunityId,
                PricebookEntryId: item.PricebookEntryId,
                Quantity: item.Quantity,
                UnitPrice: item.UnitPrice,
                TotalPrice: item.TotalPrice,
                Product2Id: item.Product2Id,
                Product2: {
                    Name: item.Product2.Name
                }
            }))

            return products

        } catch (error) {
            console.log(error)
        }
    }

    async function deleteProductFromOpp(id: string){
        try {
            const accessToken = await getToken();
            const response = await axios.delete(
                host + `/services/data/v64.0/sobjects/OpportunityLineItem/${id}`,
                {
                    headers: {
                        'Authorization': `Bearer ${accessToken}`,
                        'Content-Type': 'application/json'
                    }
                }
            )

            return response

        } catch (error) {
            console.log(error)
        }
    }

    async function editOpportunityLineItem(id: string, updatedData: Partial<opportunityProductsInterface>){
        try {
            const accessToken = await getToken();
            const response = await axios.patch(
                host + `/services/data/v64.0/sobjects/OpportunityLineItem/${id}`,
                updatedData,
                {
                    headers: {
                        'Authorization': `Bearer ${accessToken}`,
                        'Content-Type': 'application/json'
                    }
                }
            )
            
            return response
            

        } catch (error) {
            console.log(error)
        }
    }

    async function createOpportunityLineItem(data: opportunityProductsInterface){
        try {
            const accessToken = await getToken();
            const response = await axios.post(
                host + `/services/data/v64.0/sobjects/OpportunityLineItem/`,
                data,
                {
                    headers: {
                        'Authorization': `Bearer ${accessToken}`,
                        'Content-Type': 'application/json'
                    }
                }
            )
            
            return response
            

        } catch (error) {
            console.log(error)
        }
    }

    return {
        getOpportunityProducts,
        deleteProductFromOpp,
        editOpportunityLineItem,
        createOpportunityLineItem
    }

}