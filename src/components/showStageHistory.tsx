import { StyleSheet, Text, View } from "react-native";
import Separator from "./separator";
import { colors } from "../global/colors";
import { Feather } from '@expo/vector-icons'
import { StageHistoryInterface } from "../types/stageHistoryInterface";
import { dateFormatter } from "../utils/dateFormatter";

type FeatherIconName = keyof typeof Feather.glyphMap;

interface ShowStageHistoryProps {
    stageHistory: StageHistoryInterface
}

export default function ShowStageHistory({ stageHistory }: ShowStageHistoryProps) {

    const defineIcon = (stage: string): FeatherIconName => {
        const map: Record<string, FeatherIconName> = {
            "Closed Won": "check-circle",
            "Closed Lost": "x-circle"
        };

        return map[stage] ?? 'activity';
    }

    return (
        <View style={styles.container}>
            <Text style={styles.name} numberOfLines={2}>
                {stageHistory.CreatedDate}
            </Text>
            <Separator color="white" margin={5} />
            <View style={styles.info}>
                <View style={{ flexDirection: "row", alignItems: "center", gap: 3 }}>
                    <Feather name={defineIcon(stageHistory.StageName)} color="white" size={16} />
                    <Text style={styles.infoTxt} numberOfLines={2}>Estágio: {stageHistory.StageName}</Text>
                </View>
                <View style={{ flexDirection: "row", alignItems: "center", gap: 3 }}>
                    <Feather name='dollar-sign' color="white" size={16} />
                    <Text style={styles.infoTxt} numberOfLines={1}>Valor: ${stageHistory.Amount}</Text>
                </View>
                <View style={{ flexDirection: "row", alignItems: "center", gap: 3 }}>
                    <Feather name='percent' color="white" size={16} />
                    <Text style={styles.infoTxt} numberOfLines={1}>Probabildade: {stageHistory.Probability}%</Text>
                </View>
                <View style={{ flexDirection: "row", alignItems: "center", gap: 3 }}>
                    <Feather name='pie-chart' color="white" size={16} />
                    <Text style={styles.infoTxt} numberOfLines={2}>Receita esperada: ${stageHistory.ExpectedRevenue}</Text>
                </View>
                <View style={{ flexDirection: "row", alignItems: "center", gap: 3 }}>
                    <Feather name='calendar' color="white" size={16} />
                    <Text style={styles.infoTxt} numberOfLines={2}>Data fechada: {stageHistory.CloseDate}</Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.cian,
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
