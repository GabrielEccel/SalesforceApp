import { useEffect, useState } from 'react'
import accountService from '../../services/accountService'
import { accountInterface } from '../../types/accountInterface'
import removeLineBreak from '../../utils/removeLineBreak';
import { contactInterface } from '../../types/contactInterface';
import contactService from '../../services/contactService';
import { accountPriority } from '../../utils/accountPriority';
import { opportunityInterface } from '../../types/opportunityInterface';
import OpportunityService from '../../services/opportunityService';

export default function useAccountDetailController(id: string) {
    const { getAccountById } = accountService();
    const { getContactFromAccount } = contactService();
    const {getOpportunityFromAccount} = OpportunityService();

    const [info, setInfo] = useState<accountInterface | null>(null);
    const [contactList, setContactList] = useState<contactInterface[]>([])
    const [opportunityList, setOppotunityList] = useState<opportunityInterface[]>([])
    const [loading, setLoading] = useState(true)
    const [refreshing, setRefreshing] = useState(false)

    useEffect(() => {
        if (id) fetchDetails()
    }, [id])

    async function onRefresh() {
        setRefreshing(true)
        await fetchDetails()
        setRefreshing(false)
    }

    async function fetchDetails() {
        try {
            const info = await getAccountById(id);

            if (info?.BillingAddress?.street) {
                info.BillingAddress.street = removeLineBreak(info.BillingAddress.street)
            }
            if(info?.CustomerPriority__c){
                info.CustomerPriority__c = accountPriority(info.CustomerPriority__c)
            }

            setInfo(info)

            const contacts = await getContactFromAccount(id);
            setContactList(contacts)

            const opportunities = await getOpportunityFromAccount(id)
            setOppotunityList(opportunities)

        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    return {
        info,
        loading,
        contactList,
        onRefresh,
        refreshing,
        opportunityList
    }
}