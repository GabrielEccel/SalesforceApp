import { useLocalSearchParams } from "expo-router"
import AccountDetail from "../../src/pages/accountDetail/accountDetail"

export default function(){
    const { id } = useLocalSearchParams();

    return <AccountDetail id={id as string}/>;
}