import axios from "axios"
import * as SecureStore from 'expo-secure-store'
import { contactCreateInterface, contactInterface } from "../types/contactInterface";

export default function contactService() {
    const host = 'https://orgfarm-dba99aff7f-dev-ed.develop.my.salesforce.com';

    async function getToken() {
        const accessToken = await SecureStore.getItemAsync('access_token')
        return accessToken
    }

    async function getContactFromAccount(id: string) {
        try {
            const accessToken = await getToken()
            const response = await axios.get(
                host + `/services/data/v64.0/query/?q=SELECT name, id, title, phone, email, salutation FROM Contact WHERE AccountId = '${id}'`,
                {
                    headers: {
                        'Authorization': `Bearer ${accessToken}`,
                        'Content-Type': 'application/json'
                    }
                }
            )

            const contactList = response.data.records.map((item: contactInterface) => ({
                Name: item.Name,
                Id: item.Id,
                Phone: item.Phone ?? "Indisponível",
                Email: item.Email ?? "Indisponível",
                Title: item.Title ?? "Indisponível",
                Salutation: item.Salutation ?? ''
            }))

            return (contactList);

        } catch (error) {
            console.log(error)
        }
    }

    async function updateContactById(id: string, updatedData: contactInterface) {
        try {
            const accessToken = await getToken()
            const response = await axios.patch(
                host + `/services/data/v64.0/sobjects/Contact/${id}`,
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

    async function createContact(data: contactCreateInterface) {
        try {
            const accessToken = await getToken()
            const response = await axios.post(
                host + `/services/data/v64.0/sobjects/Contact/`,
                data,
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


    return {
        getContactFromAccount,
        updateContactById,
        createContact
    }
}