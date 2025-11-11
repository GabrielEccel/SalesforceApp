import { FlatList, Text, TextInput, TouchableOpacity, View } from "react-native";
import Modal from "react-native-modal";
import { homeStyles as styles}  from "./homeStyles";
import homeController from "./homeController";
import accountService from "../../services/accountService";
import ShowAccount from "../../components/showAccount";

export default function Home(){
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
    
    return (
        <View style={styles.container}>
            {/* <TouchableOpacity style={styles.btn} onPress={getToken}>
                <Text>Enviar Requsição</Text>
            </TouchableOpacity> */}

            <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity style={styles.btn} onPress={getAllAccounts}>
                    <Text>Todas as Contas</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.btn} onPress={() => setModalCreateVisibleToggle(true)}>
                    <Text>Nova Conta</Text>
                </TouchableOpacity>
            </View>


            <FlatList
                data={accountList}
                keyExtractor={(item, index) => item.Id}
                renderItem={({ item }) => <ShowAccount account={item} toggle={() => {
                    setSelectedAccountToggle(item),
                        setModalUpdateVisibleToggle(true),
                        setNewNameToggle(item.Name)
                }} />}
                showsVerticalScrollIndicator={false}
            />

            <Modal isVisible={modalCreateVisible}>
                <View style={styles.modal}>
                    <Text>Criar nova conta</Text>

                    <TextInput
                        placeholder='Digite o Nome da conta'
                        style={{ backgroundColor: 'rgba(208,208,208, 0.4)', width: '100%' }}
                        onChangeText={setNewNameToggle}
                    />
                    <View style={{ flexDirection: 'row' }}>
                        <TouchableOpacity style={styles.btnCancel} onPress={() => setModalCreateVisibleToggle(false)}>
                            <Text>Cancelar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.btn} onPress={createNewAccount}>
                            <Text>Enviar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            <Modal isVisible={modalUpdateVisible}>
                <View style={styles.modal}>
                    <Text>Atualizar Conta</Text>

                    <Text>Id: {selectedAccount?.Id}</Text>
                    <Text style={{}}>Nome: </Text>

                    <TextInput
                        placeholder='Digite o nome da conta'
                        style={{ backgroundColor: 'rgba(208,208,208, 0.4)', width: '100%' }}
                        value={newName}
                        onChangeText={setNewNameToggle}
                    />

                    <View style={{ flexDirection: 'row' }}>
                        <TouchableOpacity style={styles.btnCancel} onPress={deleteAccount}>
                            <Text>Apagar Conta</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.btn} onPress={updateAccount}>
                            <Text>Confirmar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
}