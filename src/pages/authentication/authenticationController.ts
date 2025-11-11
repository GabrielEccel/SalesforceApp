import axios from "axios";
import * as AuthSession from "expo-auth-session";
import { router } from "expo-router";
import * as SecureStore from 'expo-secure-store';
import { useEffect, useState } from "react";
import * as LocalAuthentication from 'expo-local-authentication';
import { TokenResponse } from "expo-auth-session";

const redirectUri = AuthSession.makeRedirectUri({
    path: "home",
});

const clientId = process.env.EXPO_PUBLIC_CLIENT_ID;
const clientSecret = process.env.EXPO_PUBLIC_CLIENT_SECRET;

// const discovery = {
//   authorizationEndpoint: "https://orgfarm-dba99aff7f-dev-ed.develop.my.salesforce.com/services/oauth2/authorize",
//   tokenEndpoint: "https://orgfarm-dba99aff7f-dev-ed.develop.my.salesforce.com/services/oauth2/token",
//   revocationEndpoint: "https://orgfarm-dba99aff7f-dev-ed.develop.my.salesforce.com/services/oauth2/revoke",
// };

export function useAuthenticationController() {
    const discovery = AuthSession.useAutoDiscovery(
        "https://orgfarm-dba99aff7f-dev-ed.develop.my.salesforce.com"
    );

    const [tokenResponse, setTokenResponse] = useState<TokenResponse | null>(null);
    const [accToken, setAccToken] = useState<string>('');
    const [refToken, setRefToken] = useState<string>('');
    const [hasAccess, setHasAccess] = useState(false);

    useEffect(() => {
        if (hasAccess === true)
            router.replace('/account')
    }, [hasAccess])

    useEffect(() => {
        verifyToken();
    }, [])

    const verifyToken = async () => {
        const refresh = await SecureStore.getItemAsync('refresh_token')

        if (refresh !== null) {

            const compatible = await LocalAuthentication.hasHardwareAsync();
            const enrolled = await LocalAuthentication.isEnrolledAsync();

            if (compatible && enrolled) {
                const result = await LocalAuthentication.authenticateAsync({
                    promptMessage: 'Autenticar para entrar',
                    fallbackLabel: 'Usar senha do sistema',
                });

                if (result.success) {
                    loginWithRefresh(refresh);
                }
            }
            else {
                login();
            }
        }
    }

    const loginWithRefresh = async (refresh: string) => {

        const formData = new URLSearchParams();
        formData.append('client_id', clientId);
        formData.append('client_secret', clientSecret);
        formData.append('grant_type', 'refresh_token');
        formData.append('refresh_token', refresh);

        try {
            const response = await axios.post('https://login.salesforce.com/services/oauth2/token', formData,
                {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'Accept': 'application/json'
                    }
                })

            await SecureStore.setItemAsync('access_token', response.data.access_token)
            setAccToken(response.data.access_token)
            setHasAccess(true)

        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                if (error.response.status === 400) {
                    await SecureStore.deleteItemAsync('refresh_token')
                    login()
                }
            }
        }
    }

    const login = async () => {

        const newAuthRequest = new AuthSession.AuthRequest({
            clientId,
            clientSecret,
            redirectUri,
            scopes: ["refresh_token", "api", "offline_access", "full"],
            responseType: AuthSession.ResponseType.Code,
            usePKCE: true,
            extraParams: {
                prompt: "login"
            }
        });

        try {
            if (!discovery) return;
            await newAuthRequest.makeAuthUrlAsync(discovery);

            if (!newAuthRequest.codeVerifier) {
                throw new Error("Falha ao gerar code verifier");
            }

            const result = await newAuthRequest.promptAsync(discovery);

            if (result.type === "success" && result.params.code) {
                const tokenResponse = await AuthSession.exchangeCodeAsync(
                    {
                        clientId,
                        clientSecret,
                        code: result.params.code,
                        redirectUri,
                        extraParams: {
                            code_verifier: newAuthRequest.codeVerifier,
                            grant_type: "authorization_code",
                        },
                    },
                    discovery
                );

                setTokenResponse(tokenResponse);
                setAccToken(tokenResponse.accessToken)

                await SecureStore.setItemAsync('access_token', tokenResponse.accessToken);
                if (tokenResponse.refreshToken) {
                    await SecureStore.setItemAsync('refresh_token', tokenResponse.refreshToken)
                    setRefToken(tokenResponse.refreshToken)
                }

                setHasAccess(true)

            } else {
                console.log("Login cancelado ou falhou:", result);
            }
        } catch (error) {
            console.log("Erro no login:", error);
        }
    }

    const logout = async () => {
        if (!hasAccess) return;
        if (!discovery) return;

        try {
            await AuthSession.revokeAsync(
                { token: accToken, clientId },
                { revocationEndpoint: discovery.revocationEndpoint }
            );
            setTokenResponse(null);
            setHasAccess(false)
        } catch (error) {
            console.log("Erro ao deslogar:", error);
        }
    };

    return {
        hasAccess,
        accToken,
        refToken,
        logout,
        login
    }

}