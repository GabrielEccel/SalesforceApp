import { FlatList, Text, TextInput, TouchableOpacity, View } from "react-native";
import Modal from "react-native-modal";
import { accountStyles as styles}  from "./accountStyles";
import homeController from "./accountController";
import accountService from "../../services/accountService";
import ShowAccount from "../../components/showAccount";

export default function Account(){
    const { createNewAccount, updateAccount, deleteAccount, getAllAccounts} = accountService();

    const { 
        accountList, 
        selectedAccount, 
        newName, 
        modalCreateVisible, 
        modalUpdateVisible, 
        setModalCreateVisibleToggle, 
        setModalUpdateVisibleToggle,
        setNewNameToggle,
        setSelectedAccountToggle
    } = homeController();    
    
    
    return(
        <View>
            
        </View>
    );
}