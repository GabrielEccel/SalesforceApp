import { Stack } from "expo-router";
import { Text, View } from "react-native";
import Toast, { BaseToast, ErrorToast, ToastConfigParams } from "react-native-toast-message";
import { colors } from "../src/global/colors";

export default function Layout() {
    const toastConfig = {
        error: (props: ToastConfigParams<any>) => (
            <ErrorToast
                {...props}
                style={{ borderLeftColor: "#ef4444", backgroundColor: "#fef2f2" }}
                text1Style={{ fontSize: 16, fontWeight: "700" }}
                text2Style={{ fontSize: 13 }}
            />
        ),
    }

    return (
        <>
            <Stack screenOptions={{ headerShown: false }}>
                <Stack.Screen name="index" />
                <Stack.Screen name="accountDetail/[id]" />
                <Stack.Screen name="opportunityDetail/[id]" />
                <Stack.Screen name="opportunityUpsert/index" />
                <Stack.Screen name="products/index" />
            </Stack>
            <Toast config={toastConfig} />
        </>
    )
}