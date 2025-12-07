import { Alert, FlatList, RefreshControl, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { OpportunityDetailStyles as styles } from "./opportunityDetailStyles";
import Header from "../../components/header";
import useOpportunityDetailController from "./opportunityDetailController";
import Loading from "../../components/loading";
import Separator from "../../components/separator";
import { colors } from "../../global/colors";
import { Feather } from "@expo/vector-icons"
import ShowAccount from "../../components/showAccount";
import ShowStageHistory from "../../components/showStageHistory";
import ProductsListButton from "../../components/productsListButton";

interface OpportunityDetailProps {
    id: string
}

export default function OpportunityDetail({ id }: OpportunityDetailProps) {
    const { loading, info, account, deleteOpp, refreshing, onRefresh, navigateToUpsert, stageHistoryList, navigateToProducts } = useOpportunityDetailController(id);

    if (loading) {
        return <Loading />
    }

    const pressHandle = () => {
        Alert.alert("Excluir oportunidade", `Tem certeza que deseja excluir ${info?.Name}?`, [
            {
                text: "Cancelar",
                style: "cancel"
            },
            {
                text: "Confirmar",
                style: "destructive",
                onPress: async () => {
                    await deleteOpp()
                }
            }
        ])
    }

    return (
        <ScrollView style={styles.container} refreshControl={<RefreshControl onRefresh={onRefresh} refreshing={refreshing} />}>
            <Header label="Informações da Oportunidade" back={true} />
            <View style={styles.card}>
                <Text style={styles.name}>{info?.Name}</Text>
                <Separator color={colors.lightGray} margin={12} />
                <View style={styles.info}>
                    <Text style={styles.infoHeader}><Feather name="file-text" size={16} /> Geral</Text>
                    <Text style={styles.infoTxt}>Tipo: {info?.Type}</Text>
                    <Text style={styles.infoTxt}>Estágio: {info?.StageName}</Text>
                    <Text style={styles.infoTxt}>Probabilidade: {info?.Probability}%</Text>
                    <Text style={styles.infoTxt}>Valor: {Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(Number(info?.Amount ? info.Amount : 0))}</Text>
                    <Text style={styles.infoTxt}>Receita Esperada: {Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(Number(info?.ExpectedRevenue ? info.ExpectedRevenue : 0))}</Text>
                    <Text style={styles.infoTxt}>Data Fechada: {info?.CloseDate}</Text>
                    <Text style={styles.infoTxt}>Pricebook: {info?.Pricebook2.Name}</Text>
                    <Text style={styles.infoTxt}>Id: {info?.Id}</Text>
                </View>
                <Separator color={colors.lightGray} margin={12} />
                <View style={styles.info}>
                    <Text style={styles.infoHeader}><Feather name="user" size={16} /> Conta Relacionada</Text>
                    <View style={{ alignItems: 'center' }}>
                        <ShowAccount account={account} />
                    </View>
                </View>
                <Separator color={colors.lightGray} margin={12} />
                <View style={styles.info}>
                    <Text style={styles.infoHeader}><Feather name="shopping-bag" size={16} /> Produtos</Text>
                    <View style={{ alignItems: 'center' }}>
                        <ProductsListButton opportunity={id} onToggle={navigateToProducts} />
                    </View>
                </View>
                <Separator color={colors.lightGray} margin={12} />
                <Text style={styles.infoHeader}><Feather name="rotate-ccw" size={16} /> Histórico</Text>
                <FlatList
                    data={stageHistoryList}
                    keyExtractor={(item, index) => item.Id}
                    renderItem={({ item }) => <ShowStageHistory stageHistory={item} />}
                    showsHorizontalScrollIndicator={false}
                    horizontal={true}
                    contentContainerStyle={{ gap: 10 }}
                    style={styles.list}
                    ListEmptyComponent={() => (<Text style={styles.emptyTxt}>Nenhuma histórico encontrado</Text>)}
                />
                {stageHistoryList.length > 0 && <Text style={[styles.infoTxt, { marginTop: 8 }]}>Total de modificações: {stageHistoryList.length}</Text>}
                <Separator color={colors.lightGray} margin={12} />
                <Text style={styles.infoHeader}><Feather name="tool" size={16} /> Ações</Text>
                <View style={styles.btnView}>
                    <TouchableOpacity style={[styles.btn, { backgroundColor: colors.midBlue }]} activeOpacity={0.7} onPress={navigateToUpsert}>
                        <Text style={styles.btnText}>Editar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.btn, { backgroundColor: colors.red }]} activeOpacity={0.7} onPress={pressHandle}>
                        <Text style={styles.btnText}>Excluir</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    )
}