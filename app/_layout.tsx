import { Stack } from "expo-router";

export default function Layout() {
    return (
        <Stack screenOptions={{ freezeOnBlur: true, headerShown: false}}>
            <Stack.Screen name="index" />
            <Stack.Screen name="accountDetail/[id]" />
        </Stack>
    )
}