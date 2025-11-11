import { Tabs } from "expo-router";
import { Feather } from "@expo/vector-icons"

export default function TabsLayout(){
    return (
        <Tabs screenOptions={{headerShown: false}}>
            <Tabs.Screen name="account" options={{
                tabBarIcon: ({color, size}) => <Feather name="user" size={size} color={color}/>,
                tabBarLabel: 'Contas'
            }}/>
        </Tabs>
    )
}