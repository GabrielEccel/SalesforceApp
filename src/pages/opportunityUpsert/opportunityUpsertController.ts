import { useEffect, useState } from "react"
import OpportunityService from "../../services/opportunityService"
import { opportunityInterface } from "../../types/opportunityInterface"
import { router } from "expo-router"
import { useRefreshStore } from "../../store/useStore"


export default function useOpportunityUpsertController(opportunityId: string, accountId: string) {
    const { getOpportunityFromId, getOpportunityDescribe, updateOpportunity, createOpportunity } = OpportunityService()
    const { setShouldUpdateOpp, setShouldUpdateAccDetails } = useRefreshStore()

    const [opportunity, setOpportunity] = useState<opportunityInterface>()
    const [loading, setLoading] = useState(true)
    const [stages, setStages] = useState<string[]>([])
    const [types, setTypes] = useState<string[]>([])

    const [name, setName] = useState('');
    const [stage, setStage] = useState(accountId ? 'Prospecting' : '');
    const [amount, setAmount] = useState('');
    const [type, setType] = useState(accountId ? 'New Customer' : '');
    const [closeDate, setCloseDate] = useState('');

    useEffect(() => {
        if (opportunityId !== '') {
            fetchOpp();
        }
        fetchPath();
    }, [])

    useEffect(() => {
        if (opportunity) {
            setName(opportunity.Name)
            setStage(opportunity.StageName)
            setAmount(String(opportunity.Amount))
            setType(opportunity.Type)
            setCloseDate(opportunity.CloseDate)
        }
    }, [opportunity])

    async function fetchOpp() {
        setLoading(true)
        try {
            const opportunity = await getOpportunityFromId(opportunityId);

            setOpportunity(opportunity)

        } catch (error) {
            console.log(error)
        }
    }

    async function fetchPath() {
        setLoading(true)
        try {
            const describe = await getOpportunityDescribe();

            setStages(describe.stages)
            setTypes(describe.types)

        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    async function handleSave() {
        if (opportunityId !== '') {
            try {
                await updateOpportunity(opportunityId, {
                    Name: name,
                    Type: type,
                    StageName: stage,
                    Amount: Number(amount),
                    CloseDate: closeDate
                } as opportunityInterface)

                setShouldUpdateOpp(true)
                navigateBack()
            } catch (error) {
                console.log(error)
            }
        }
        else if (accountId !== '') {
            try {
                const newopp = await createOpportunity({
                    Name: name,
                    StageName: stage,
                    Type: type,
                    CloseDate: closeDate,
                    Amount: Number(amount),
                    AccountId: accountId
                } as opportunityInterface)

                setShouldUpdateOpp(true)
                setShouldUpdateAccDetails(true)
                if(newopp?.id){
                    router.replace(`/opportunityDetail/${newopp?.id}?callback=refresh`)
                }
            } catch (error) {
                console.log(error)
            }
        }
        else {
            return;
        }

    }

    const navigateBack = () => {
        router.back()
    }

    const toggleName = (name: string) => {
        setName(name)
    }

    const toggleStage = (stage: string) => {
        setStage(stage)
    }

    const toggleAmount = (amount: string) => {
        setAmount(amount)
    }

    const toggleType = (type: string) => {
        setType(type)
    }

    const toggleCloseDate = (date: string) => {
        setCloseDate(date)
    }

    return {
        opportunity,
        loading,
        stages,
        types,
        name,
        toggleName,
        stage,
        toggleStage,
        amount,
        toggleAmount,
        type,
        toggleType,
        closeDate,
        toggleCloseDate,
        navigateBack,
        handleSave
    }
}