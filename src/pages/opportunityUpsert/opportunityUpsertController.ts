import { useEffect, useState } from "react"
import OpportunityService from "../../services/opportunityService"
import { opportunityInterface } from "../../types/opportunityInterface"
import { router } from "expo-router"
import { useRefreshStore } from "../../store/useStore"


export default function useOpportunityUpsertController(opportunityId: string) {
    const { getOpportunityFromId, getOpportunityDescribe, updateOpportunity } = OpportunityService()
    const { setShouldUpdateOpp } = useRefreshStore()

    const [opportunity, setOpportunity] = useState<opportunityInterface>()
    const [loading, setLoading] = useState(true)
    const [stages, setStages] = useState<string[]>([])
    const [types, setTypes] = useState<string[]>([])

    const [name, setName] = useState('');
    const [stage, setStage] = useState('');
    const [amount, setAmount] = useState('');
    const [type, setType] = useState('');
    const [closedDate, setClosedDate] = useState('');

    useEffect(() => {
        if (opportunityId !== '') {
            fetchOpp();
        }
        fetchPath();
    }, [])

    useEffect(() => {
        if(opportunity){
            setName(opportunity.Name)
            setStage(opportunity.StageName)
            setAmount(String(opportunity.Amount))
            setType(opportunity.Type)
            setClosedDate(opportunity.CloseDate)
        }
    },[opportunity])

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

    async function updateOpp(){
        try {
            await updateOpportunity(opportunityId, {
                Name: name,
                Type: type,
                StageName: stage,
                Amount: Number(amount),
                CloseDate: closedDate
            } as opportunityInterface)

            setShouldUpdateOpp(true)
            navigateBack()
        } catch (error) {
            console.log(error)
        }
    }

    const navigateBack = () => {
        router.back()
    }

    const toggleName = (name:string) => {
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

    const toggleClosedDate = (date: string) => {
        setClosedDate(date)
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
        closedDate,
        toggleClosedDate,
        navigateBack,
        updateOpp
    }
}