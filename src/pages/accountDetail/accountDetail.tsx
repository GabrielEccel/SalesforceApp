import { FlatList, RefreshControl, ScrollView, Text, TouchableOpacity, View } from "react-native"
import useAccountDetailController from "./accountDetailController";
import { accountDetailStyles as styles } from "./accountDetailStyles";
import Header from "../../components/header";
import Separator from "../../components/separator";
import { Feather } from '@expo/vector-icons'
import Loading from "../../components/loading";
import ShowContact from "../../components/showContact";
import { useState } from "react";
import ContactModal from "../../components/contactModal";
import ShowOpportunity from "../../components/showOpportunity";
import { colors } from "../../global/colors";

interface AccountDetailProps {
    id: string;
}

export default function AccountDetail({ id }: AccountDetailProps) {
    const { info, loading, contactList, onRefresh, refreshing, opportunityList } = useAccountDetailController(id);

    const [createModal, setCreateModal] = useState(false)

    const onUpdate = () => onRefresh();

    if (loading) {
        return (
            <Loading />
        )
    }

    return (
        <>
            <ScrollView style={styles.container} refreshControl={<RefreshControl onRefresh={onRefresh} refreshing={refreshing} />}>
                <Header label="Informações da Conta" back={true} />
                <View style={styles.card}>
                    <Text style={styles.name}>{info?.Name}</Text>
                    <Separator color={colors.lightGray} margin={12} />
                    <View style={styles.info}>
                        <Text style={styles.infoHeader}><Feather name="file-text" size={16} /> Geral</Text>
                        <Text style={styles.infoTxt}>Telefone: {info?.Phone}</Text>
                        <Text style={styles.infoTxt}>Setor: {info?.Industry}</Text>
                        <Text style={styles.infoTxt}>Tipo: {info?.Type}</Text>
                        <Text style={styles.infoTxt}>Site: {info?.Website}</Text>
                        <Text style={styles.infoTxt}>Prioridade: {info?.CustomerPriority__c}</Text>
                        <Text style={styles.infoTxt}>Id: {info?.Id}</Text>
                    </View>
                    <Separator color={colors.lightGray} margin={12} />
                    <View style={styles.info}>
                        <Text style={styles.infoHeader}><Feather name="map-pin" size={16} /> Endereço</Text>
                        <Text style={styles.infoTxt}>Rua: {info?.BillingAddress?.street ?? "Indisponível"}</Text>
                        <Text style={styles.infoTxt}>Cidade: {info?.BillingAddress?.city ?? "Indisponível"}</Text>
                        <Text style={styles.infoTxt}>Estado: {info?.BillingAddress?.state ?? "Indisponível"}</Text>
                        <Text style={styles.infoTxt}>País: {info?.BillingAddress?.country ?? "Indisponível"}</Text>
                    </View>
                    <Separator color={colors.lightGray} margin={12} />
                    <View style={styles.contactHeader}>
                        <Text style={styles.infoHeader}><Feather name="user" size={16} /> Contatos</Text>
                        <TouchableOpacity onPress={() => setCreateModal(true)}>
                            <Feather name="plus-circle" size={16} color={colors.darkGray}/>
                        </TouchableOpacity>
                    </View>
                    <FlatList
                        data={contactList}
                        keyExtractor={(item, index) => item.Id}
                        renderItem={({ item }) =>  <ShowContact contact={item} onUpdate={onUpdate}/>}
                        showsHorizontalScrollIndicator={false}
                        horizontal={true}
                        contentContainerStyle={{ gap: 10 }}
                        style={styles.list}
                        ListEmptyComponent={() => (<Text style={styles.emptyTxt}>Nenhum contato encontrado</Text>)}
                    />
                    {contactList.length > 0 && <Text style={[styles.infoTxt, {marginTop: 8}]}>Total de contas: {contactList.length}</Text>}
                    <Separator color={colors.lightGray} margin={12}/>
                    <View style={styles.contactHeader}>
                        <Text style={styles.infoHeader}><Feather name="shopping-bag" size={16} /> Oportunidades relacionadas</Text>
                        <TouchableOpacity onPress={() => {}}>
                            <Feather name="plus-circle" size={16} color={colors.darkGray}/>
                        </TouchableOpacity>
                    </View>
                    <FlatList
                        data={opportunityList}
                        keyExtractor={(item, index) => item.Id}
                        renderItem={({ item }) =>  <ShowOpportunity opportunity={item} onUpdate={onUpdate}/>}
                        showsHorizontalScrollIndicator={false}
                        horizontal={true}
                        contentContainerStyle={{ gap: 10 }}
                        style={styles.list}
                        ListEmptyComponent={() => (<Text style={styles.emptyTxt}>Nenhuma oportunidade encontrado</Text>)}
                    />
                    {opportunityList.length > 0 && <Text style={[styles.infoTxt, {marginTop: 8}]}>Total de oportunidades: {opportunityList.length}</Text>}
                </View>
            </ScrollView>
            <ContactModal 
                onClose={() => setCreateModal(false)}
                visible={createModal}
                account={id}
                onUpdate={onUpdate}
            />
        </>
    )
}