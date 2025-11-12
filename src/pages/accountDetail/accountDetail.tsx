import { ScrollView, Text, View } from "react-native"
import useAccountDetailController from "./accountDetailController";
import { accountDetailStyles as styles } from "./accountDetailStyles";
import Header from "../../components/header";
import Separator from "../../components/separator";
import { Feather } from '@expo/vector-icons'
import Loading from "../../components/loading";

interface AccountDetailProps {
    id: string;
}

export default function AccountDetail({ id }: AccountDetailProps) {
    const { info, loading } = useAccountDetailController(id);

    if(loading){
        return(
            <Loading />
        )
    }

    return (
        <ScrollView style={styles.container}>
            <Header label="Informações da Conta" back={true}/>
            <View style={styles.card}>
                <Text style={styles.name}>{info?.Name}</Text>
                <Separator />
                <View style={styles.info}>
                    <Text style={styles.infoHeader}><Feather name="file-text" size={16}/> Geral</Text>
                    <Text style={styles.infoTxt}>Telefone: {info?.Phone}</Text>
                    <Text style={styles.infoTxt}>Setor: {info?.Industry}</Text>
                    <Text style={styles.infoTxt}>Tipo: {info?.Type}</Text>
                    <Text style={styles.infoTxt}>Site: {info?.Website}</Text>
                    <Text style={styles.infoTxt}>Id: {info?.Id}</Text>
                </View>
                <Separator />
                <View style={styles.addInfo}>
                    <Text style={styles.addHeader}><Feather name="map-pin" size={16}/> Endereço</Text>
                    <Text style={styles.addTxt}>Rua: {info?.BillingAddress.street}</Text>
                    <Text style={styles.addTxt}>Cidade: {info?.BillingAddress.city}</Text>
                    <Text style={styles.addTxt}>Estado: {info?.BillingAddress.state}</Text>
                    <Text style={styles.addTxt}>País: {info?.BillingAddress.country}</Text>
                </View>
            </View>
        </ScrollView>
    )
}