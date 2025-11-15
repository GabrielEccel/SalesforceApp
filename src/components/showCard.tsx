import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { accountInterface } from '../types/accountInterface';
import { Feather } from '@expo/vector-icons'
import { colors } from "../global/colors";
import { opportunityInterface } from '../types/opportunityInterface';

type FeatherIconName = keyof typeof Feather.glyphMap;

interface ShowAccountProps {
    account?: accountInterface
    opportunity?: opportunityInterface
    toggle: () => void
}

export default function ShowCard({ account, toggle, opportunity }: ShowAccountProps) {

    const defineIcon = (stage: string): FeatherIconName => {
        const map: Record<string, FeatherIconName> = {
            "Closed Won": "check-circle",
            "Closed Lost": "x-circle"
        };

        return map[stage] ?? 'activity';
    }

    if (account) {
        return (
            <TouchableOpacity style={styles.show} onPress={() => toggle()}>
                <View style={styles.header}>
                    <Text style={styles.headerTxt}>{account.Name}</Text>
                </View>
                <View style={styles.content}>
                    <Text style={styles.contentTxt}><Feather name='phone' size={13} />  {account.Phone}</Text>
                    <Text style={styles.contentTxt}><Feather name='briefcase' size={13} />  {account.Industry}</Text>
                    <Text style={styles.contentTxt}><Feather name='map-pin' size={13} />  {account.BillingAddress?.city ?? "Indisponível"}, {account.BillingAddress?.stateCode ?? "Indisponível"}</Text>
                </View>

            </TouchableOpacity>
        );
    }

    else if (opportunity) {
        return (
            <TouchableOpacity style={styles.show} onPress={() => toggle()}>
                <View style={styles.header}>
                    <Text style={styles.headerTxt}>{opportunity.Name}</Text>
                </View>
                <View style={styles.content}>
                    <Text style={styles.contentTxt}><Feather name='user' size={13} />  {opportunity.Account.Name}</Text>
                    <Text style={styles.contentTxt}><Feather name={defineIcon(opportunity.StageName)} size={13} />  {opportunity.StageName}</Text>
                    <Text style={styles.contentTxt}><Feather name='calendar' size={13} />  {opportunity.CloseDate}</Text>
                </View>

            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    show: {
        backgroundColor: 'white',
        width: '100%',
        height: 130,
        marginBottom: 8,
        borderRadius: 12,
        padding: 16
    },
    header: {
        marginBottom: 10
    },
    headerTxt: {
        fontSize: 18,
        color: colors.darkGray
    },
    content: {
        gap: 3
    },
    contentTxt: {
        fontSize: 13,
        color: colors.midGray,
    }
})