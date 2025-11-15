import { FlatList, RefreshControl, View } from "react-native";
import { OpportunityStyles as styles } from "./opportunityStyles";
import Header from "../../components/header";
import useOpportunituController from "./opportunityController";
import ShowCard from "../../components/showCard";
import Finder from "../../components/finder";
import Loading from "../../components/loading";

export default function Opportunity() {
    const { filtered, loading, onRefresh, refreshing, opportunityList, toggleFiltered } = useOpportunituController()

    if(loading){
        return(
            <Loading />
        )
    }

    return (
        <View style={styles.container}>
            <Header label="Oportunidades" refresh={true} refreshFunction={onRefresh}/>
            <Finder item={opportunityList} onFiltered={toggleFiltered} />
            <View style={styles.items}>
                <FlatList
                    data={filtered}
                    keyExtractor={(item, index) => item.Id}
                    renderItem={({ item }) => <ShowCard opportunity={item} toggle={() => { }} />}
                    showsVerticalScrollIndicator={false}
                    refreshControl={
                        <RefreshControl
                            onRefresh={onRefresh}
                            refreshing={refreshing}
                            enabled={false}
                        />
                    }
                />
            </View>

        </View>
    )
}