import { useLocalSearchParams } from "expo-router";
import OpportunityUpsert from "../../src/pages/opportunityUpsert/opportunityUpsert";
import { Provider as PaperProvider } from "react-native-paper";

export default function(){
    const { opportunityId, accountId } = useLocalSearchParams()

    return <PaperProvider><OpportunityUpsert opportunityId={opportunityId as string} accountId={accountId as string}></OpportunityUpsert></PaperProvider>
}