import { useLocalSearchParams } from "expo-router"
import OpportunityDetail from "../../src/pages/opportunityDetail/opportunityDetail";

export default function () {
    const { id } = useLocalSearchParams();

    return <OpportunityDetail id={id as string} />;
}