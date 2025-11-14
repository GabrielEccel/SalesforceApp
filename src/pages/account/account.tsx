import { FlatList, View } from "react-native";
import { accountStyles as styles } from "./accountStyles";
import homeController from "./accountController";
import ShowAccount from "../../components/showAccount";
import Header from "../../components/header";
import Loading from "../../components/loading";
import Finder from "../../components/finder";

export default function Account() {
    const {
        accountList,
        navigateToDetails,
        loading,
        filtered,
        toggleFiltered
    } = homeController();

    

    if (loading) {
        return (
            <Loading />
        )
    }

    return (
        <View style={styles.container}>
            <Header label="Contas" back={false} />
            <Finder accounts={accountList} onFiltered={toggleFiltered}/>
            <View style={styles.items}>
                <FlatList
                    data={filtered}
                    keyExtractor={(item, index) => item.Id}
                    renderItem={({ item }) => <ShowAccount account={item} toggle={() => {
                        navigateToDetails(item.Id)
                    }} />}
                    showsVerticalScrollIndicator={false}
                />
            </View>

        </View>
    );
}