import { FlatList, View } from "react-native";
import { accountStyles as styles } from "./accountStyles";
import homeController from "./accountController";
import accountService from "../../services/accountService";
import ShowAccount from "../../components/showAccount";
import Header from "../../components/header";

export default function Account() {
    const {
        accountList,
        navigateToDetails
    } = homeController();


    return (
        <View style={styles.container}>
            <Header label="Contas Disponíveis:" subLabel1="Nome" subLabel2="Id" />
            <FlatList
                data={accountList}
                keyExtractor={(item, index) => item.Id}
                renderItem={({ item }) => <ShowAccount account={item} toggle={() => {
                    navigateToDetails(item.Id)
                }} />}
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
}