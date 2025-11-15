import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { opportunityInterface } from "../types/opportunityInterface";
import Separator from "./separator";
import { colors } from "../global/colors";
import { Feather  } from '@expo/vector-icons'

type FeatherIconName = keyof typeof Feather.glyphMap;

interface ShowOpportunityProps {
    opportunity: opportunityInterface
    onUpdate: () => void;
}

export default function ShowOpportunity({ opportunity, onUpdate }: ShowOpportunityProps) {

    const defineIcon = (stage: string): FeatherIconName => {
        const map: Record<string, FeatherIconName> = {
            "Closed Won": "check-circle",
            "Closed Lost": "x-circle"
        };

        return map[stage] ?? 'activity';
    }

    return (
        <TouchableOpacity style={styles.container}>
            <Text style={styles.name} numberOfLines={2}>
                {opportunity.Name}
            </Text>
            <Separator color="white" margin={5} />
            <View style={styles.info}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Feather name={defineIcon(opportunity.StageName)} color="white" size={16} />
                    <Text style={styles.infoTxt} numberOfLines={1}> Estágio: {opportunity.StageName}</Text>
                </View>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Feather name='percent' color="white" size={16} />
                    <Text style={styles.infoTxt} numberOfLines={1}> Probabildade: {opportunity.Probability}%</Text>
                </View>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Feather name='dollar-sign' color="white" size={16} />
                    <Text style={styles.infoTxt} numberOfLines={1}> Valor: ${opportunity.Amount}</Text>
                </View>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Feather name='pie-chart' color="white" size={16} />
                    <Text style={styles.infoTxt} numberOfLines={2}> Receita esperada: ${opportunity.ExpectedRevenue}</Text>
                </View>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Feather name='calendar' color="white" size={16} />
                    <Text style={styles.infoTxt} numberOfLines={2}> Data fechada: {opportunity.CloseDate}</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.orange,
        height: 250,
        width: 200,
        borderRadius: 12,
        padding: 20
    },
    name: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
    },
    info: {
        marginTop: 12,
        gap: 10,
    },
    infoTxt: {
        color: "white",
        fontSize: 12,
    }
})
