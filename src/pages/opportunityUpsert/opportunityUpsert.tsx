import { Keyboard, KeyboardAvoidingView, Platform, ScrollView, Text, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import useOpportunityUpsertController from "./opportunityUpsertController";
import Header from "../../components/header";
import Loading from "../../components/loading";
import { OpportunityUpsertStyles as styles } from "./opportunityUpsertStyles";
import Separator from "../../components/separator";
import { colors } from "../../global/colors";
import { TextInput } from "react-native-paper";
import DropDown from "../../components/dropDown";
import DateInput from "../../components/dateInput";
import { Feather } from "@expo/vector-icons"
import { pricebookInterface } from "../../types/pricebookInterface";

interface OpportunityUpsertProps {
    opportunityId?: string
    accountId?: string
}

export default function OpportunityUpsert({ opportunityId, accountId }: OpportunityUpsertProps) {
    const {
        opportunity, loading,
        types, stages,
        name, toggleName,
        stage, toggleStage,
        type, toggleType,
        closeDate, toggleCloseDate,
        navigateBack, handleSave,
        pricebooks,
        pricebook, togglePriceBook,
        pricebookEnabled
    } = useOpportunityUpsertController(opportunityId ?? '', accountId ?? '')

    if (loading) {
        return <Loading />
    }

    return (
        <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : "height"}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                <ScrollView style={styles.container}>
                    <Header label={opportunity ? "Editar Oportunidade" : "Criar Oportunidade"} />
                    <View style={styles.card}>
                        {opportunity ? <Text style={styles.name}>Id: {opportunity.Id}</Text> : <Text style={styles.name}>Preencha os campos</Text>}
                        <Separator color={colors.lightGray} margin={12} />
                        <Text style={styles.infoHeader}><Feather name="file-text" size={16} /> Informações</Text>
                        <View style={styles.form}>
                            <Text style={styles.label}>Nome</Text>
                            <TextInput style={styles.input}
                                editable={true}
                                placeholder="Nome"
                                placeholderTextColor={colors.midGray}
                                mode='flat'
                                underlineColor='transparent'
                                selectionHandleColor={colors.darkBlue}
                                selectionColor={colors.lightGray}
                                cursorColor={colors.darkBlue}
                                activeUnderlineColor='transparent'
                                textColor={colors.midGray}
                                value={name}
                                onChangeText={toggleName}
                                selection={true ? undefined : { start: 0, end: 0 }}
                                key={true ? "edit" : "readonly"}
                            />
                        </View>
                        <DropDown items={types} value={type} onChange={toggleType} label="Tipo" />
                        <DropDown items={stages} value={stage} onChange={toggleStage} label="Estágio" />
                        <DropDown items={pricebooks.map((item: pricebookInterface) => item.Name)} value={pricebook} onChange={togglePriceBook} label="Pricebook" enabled={pricebookEnabled} />
                        <DateInput label="Data Fechada" value={closeDate} onChange={toggleCloseDate} />
                        <Separator color={colors.lightGray} margin={12} />
                        <Text style={styles.infoHeader}><Feather name="tool" size={16} /> Ações</Text>
                        <View style={styles.btnView}>
                            <TouchableOpacity style={[styles.btn, { backgroundColor: colors.midBlue }]} activeOpacity={0.7} onPress={handleSave}>
                                <Text style={styles.btnText}>Salvar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.btn, { backgroundColor: colors.red }]} activeOpacity={0.7} onPress={navigateBack}>
                                <Text style={styles.btnText}>Cancelar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )
}