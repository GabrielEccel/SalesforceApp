import { useEffect, useState } from "react";
import { opportunityInterface } from "../../types/opportunityInterface";
import OpportunityService from "../../services/opportunityService";
import { accountInterface } from "../../types/accountInterface";
import accountService from "../../services/accountService";
import { dateFormatter } from "../../utils/dateFormatter";

export default function useOpportunityDetailController(id: string){
    const { getOpportunityFromId } = OpportunityService()
    const { getAccountById } = accountService()

    const [loading, setLoading] = useState(true);
    const [info, setinfo] = useState<opportunityInterface | null>(null)
    const [account, setAccount] = useState<accountInterface | null>(null)

    useEffect(() => {
        if(id) fetchDetails()
    },[id])

    async function fetchDetails(){
        try {
            const info = await getOpportunityFromId(id);
            if(info?.CloseDate){
                info.CloseDate = dateFormatter(info.CloseDate)
            }
            setinfo(info)

            const account = await getAccountById(info.AccountId)
            setAccount(account)

        } catch (error) {
            console.log(error)
        } finally{
            setLoading(false)
        }
    }

    return{
        loading,
        info,
        account
    }
}