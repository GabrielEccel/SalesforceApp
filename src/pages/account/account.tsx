import { FlatList, View } from "react-native";
import { accountStyles as styles } from "./accountStyles";
import homeController from "./accountController";
import accountService from "../../services/accountService";
import ShowAccount from "../../components/showAccount";
import Header from "../../components/header";
import Loading from "../../components/loading";

export default function Account() {
    const {
        accountList,
        navigateToDetails,
        loading
    } = homeController();

    if (loading) {
        return (
            <Loading />
        )
    }

    return (
        <View style={styles.container}>
            <Header label="Contas" back={false} />
            <View style={styles.items}>
                <FlatList
                    data={accountList}
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