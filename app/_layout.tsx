import { Stack } from "expo-router";

export default function Layout() {
    return (
        <Stack screenOptions={{ headerShown: false}}>
            <Stack.Screen name="index" />
            <Stack.Screen name="accountDetail/[id]" />
            <Stack.Screen name="opportunityDetail/[id]" />
            <Stack.Screen name="opportunityUpsert/index" />
            <Stack.Screen name="products/index" />
        </Stack>
    )
}