import { useEffect, useState } from "react"
import OpportunityService from "../../services/opportunityService"
import { opportunityInterface } from "../../types/opportunityInterface"
import { router } from "expo-router"
import eventBus from "../../utils/eventBus"
import { pricebookInterface } from "../../types/pricebookInterface"
import PricebookService from "../../services/pricebookService"


export default function useOpportunityUpsertController(opportunityId: string, accountId: string) {
    const { getOpportunityFromId, getOpportunityDescribe, updateOpportunity, createOpportunity } = OpportunityService()
    const { getPricebooks } = PricebookService();

    const [opportunity, setOpportunity] = useState<opportunityInterface>()
    const [loading, setLoading] = useState(true)
    const [stages, setStages] = useState<string[]>([])
    const [types, setTypes] = useState<string[]>([])
    const [pricebooks, setPricebooks] = useState<pricebookInterface[]>([])

    const [name, setName] = useState('');
    const [stage, setStage] = useState(accountId ? 'Prospecting' : '');
    const [type, setType] = useState(accountId ? 'New Customer' : '');
    const [closeDate, setCloseDate] = useState('');
    const [pricebook, setPricebook] = useState('');
    const [pricebookEnabled, setPricebookEnabled] = useState(true);

    useEffect(() => {
        const load = async () => {
            if (opportunityId) {
                await fetchOpp();
            }
            else {
                await fetchDetails();
            }
        };

        load();
    }, []);

    useEffect(() => {
        if (opportunity) {
            setName(opportunity.Name)
            setStage(opportunity.StageName)
            setType(opportunity.Type)
            setCloseDate(opportunity.CloseDate)
            setPricebook(opportunity.Pricebook2.Name)
            if(opportunity.OpportunityLineItems?.totalSize === 1){
                setPricebookEnabled(false)
            }

            fetchDetails();
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

    async function fetchDetails() {
        setLoading(true)
        try {
            const describe = await getOpportunityDescribe();

            setStages(describe.stages)
            setTypes(describe.types)

            const pricebks = await getPricebooks();
            setPricebooks(pricebks)

            setPricebooks(prev => [
                ...prev,
                { Name: 'None', Id: null } as pricebookInterface
            ]);


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
                    CloseDate: closeDate,
                    Pricebook2Id: pricebooks.find(pb => pb.Name === pricebook)?.Id
                } as Partial<opportunityInterface>)

                eventBus.emit('updateOppFlag', true);
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
                    AccountId: accountId,
                    Pricebook2Id: pricebooks.find(pb => pb.Name === pricebook)?.Id
                } as Partial<opportunityInterface>)

                eventBus.emit('updateOppFlag', true);
                eventBus.emit('updateAccDetailFlag', true);
                if (newopp?.id) {
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

    const toggleType = (type: string) => {
        setType(type)
    }

    const toggleCloseDate = (date: string) => {
        setCloseDate(date)
    }

    const togglePriceBook = (value: string) => {
        setPricebook(value);
    }

    return {
        opportunity,
        loading,
        stages,
        types,
        pricebooks,
        name,
        toggleName,
        stage,
        toggleStage,
        type,
        toggleType,
        closeDate,
        toggleCloseDate,
        pricebook,
        pricebookEnabled,
        togglePriceBook,
        navigateBack,
        handleSave,
        
    }
}