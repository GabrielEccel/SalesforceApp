import { ScrollView, Text, View } from "react-native";
import { OpportunityDetailStyles as styles } from "./opportunityDetailStyles";
import Header from "../../components/header";
import useOpportunityDetailController from "./opportunityDetailController";
import Loading from "../../components/loading";
import Separator from "../../components/separator";
import { colors } from "../../global/colors";
import { Feather } from "@expo/vector-icons"
import ShowAccount from "../../components/showAccount";

interface OpportunityDetailProps {
    id: string
}

export default function OpportunityDetail({ id }: OpportunityDetailProps) {
    const { loading, info, account } = useOpportunityDetailController(id);

    if (loading) {
        return <Loading />
    }

    return (
        <ScrollView style={styles.container}>
            <Header label="Informações da Oportunidade" back={true} />
            <View style={styles.card}>
                <Text style={styles.name}>{info?.Name}</Text>
                <Separator color={colors.lightGray} margin={12} />
                <View style={styles.info}>
                    <Text style={styles.infoHeader}><Feather name="file-text" size={16} /> Geral</Text>
                    <Text style={styles.infoTxt}>Tipo: {info?.Type}</Text>
                    <Text style={styles.infoTxt}>Estágio: {info?.StageName}</Text>
                    <Text style={styles.infoTxt}>Probabilidade: {info?.Probability}</Text>
                    <Text style={styles.infoTxt}>Valor: {info?.Amount}</Text>
                    <Text style={styles.infoTxt}>Receita Esperada: {info?.ExpectedRevenue}</Text>
                    <Text style={styles.infoTxt}>Data Fechada: {info?.CloseDate}</Text>
                    <Text style={styles.infoTxt}>Id: {info?.Id}</Text>
                </View>
                <Separator color={colors.lightGray} margin={12} />
                <View style={styles.info}>
                    <Text style={styles.infoHeader}><Feather name="user" size={16} /> Conta Relacionada</Text>
                    <View style={{alignItems: 'center'}}>
                        <ShowAccount account={account} />
                    </View>
                </View>
            </View>
        </ScrollView>
    )
}