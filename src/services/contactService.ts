import axios from "axios"
import * as SecureStore from 'expo-secure-store'
import { contactInterface } from "../types/contactInterface";

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
                host + `/services/data/v64.0/query/?q=SELECT name, title, phone, email, salutation FROM Contact WHERE AccountId = '${id}'`,
                {
                    headers: {
                        'Authorization': `Bearer ${accessToken}`,
                        'Content-Type': 'application/json'
                    }
                }
            )

            const contactList = response.data.records.map((item: contactInterface) => ({
                Name: item.Name,
                Phone: item.Phone,
                Email: item.Email ?? "Indisponível",
                Title: item.Title ?? "Indisponível",
                Salutation: item.Salutation ?? ''
            }))

            return (contactList);

        } catch (error) {
            console.log(error)
        }
    }

    return {
        getContactFromAccount
    }
}