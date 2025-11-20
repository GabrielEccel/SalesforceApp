import { useLocalSearchParams } from "expo-router";
import OpportunityUpsert from "../../src/pages/opportunityUpsert/opportunityUpsert";
import { Provider as PaperProvider } from "react-native-paper";

export default function(){
    const { opportunityId } = useLocalSearchParams()

    return <PaperProvider><OpportunityUpsert opportunityId={opportunityId as string}></OpportunityUpsert></PaperProvider>
}