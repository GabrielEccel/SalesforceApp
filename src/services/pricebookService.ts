import * as SecureStore from 'expo-secure-store'
import axios from 'axios';
import { pricebookProductsInterface } from '../types/pricebookProductsInterface';
import { pricebookInterface } from '../types/pricebookInterface';

export default function PricebookService() {

    const host = 'https://orgfarm-dba99aff7f-dev-ed.develop.my.salesforce.com';

    async function getToken() {
        const accessToken = await SecureStore.getItemAsync('access_token')
        return accessToken
    }

    async function getPricebookProducts(id: string) {
        try {
            const accessToken = await getToken();
            const response = await axios.get(
                host + `/services/data/v64.0/query/?q=SELECT Id, Product2Id, Product2.Name, UnitPrice FROM PricebookEntry WHERE Pricebook2Id = '${id}' AND IsActive = true`,
                {
                    headers: {
                        'Authorization': `Bearer ${accessToken}`,
                        'Content-Type': 'application/json'
                    }
                }
            )

            const products = response.data.records.map((item: pricebookProductsInterface) => ({
                Id: item.Id,
                Product2Id: item.Product2Id,
                UnitPrice: item.UnitPrice,
                Product2: {
                    Name: item.Product2.Name
                }
            }))

            return products

        } catch (error) {
            console.log(error)
        }

    }

    async function getPricebooks() {
        try {
            const accessToken = await getToken();
            const response = await axios.get(
                host + `/services/data/v64.0/query/?q=SELECT Id,Name,IsActive,IsStandard FROM Pricebook2 WHERE IsActive = true`,
                {
                    headers: {
                        'Authorization': `Bearer ${accessToken}`,
                        'Content-Type': 'application/json'
                    }
                }
            )

            const pricebooks = response.data.records.map((item: pricebookInterface) => ({
                Id: item.Id,
                Name: item.Name,
                IsActive: item.IsActive,
                IsStandard: item.IsStandard
            }))

            return pricebooks

        } catch (error) {
            console.log(error)
        }
    }

    return {
        getPricebookProducts,
        getPricebooks
    }

}