import { useEffect, useState } from 'react'
import accountService from '../../services/accountService'
import { accountInterface } from '../../types/accountInterface'
import removeLineBreak from '../../utils/removeLineBreak';
import { contactInterface } from '../../types/contactInterface';
import contactService from '../../services/contactService';

export default function useAccountDetailController(id: string) {
    const { getAccountById } = accountService();
    const { getContactFromAccount } = contactService();

    const [info, setInfo] = useState<accountInterface | null>(null);
    const [contactList, setContactList] = useState<contactInterface[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (id) fetchDetails()
    }, [id])

    async function fetchDetails() {
        try {
            const info = await getAccountById(id);

            if (info?.BillingAddress?.street) {
                info.BillingAddress.street = removeLineBreak(info.BillingAddress.street)
            }

            setInfo(info)

            const contacts = await getContactFromAccount(id);
            setContactList(contacts)
            console.log(contacts)

        } catch(error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }



    return {
        info,
        loading,
        contactList
    }
}