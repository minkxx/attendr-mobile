import { authClient } from "@/api/auth-client";
import { LoginScreen } from "@/features/auth/LoginScreen";
import { Stack } from "expo-router";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import "../global.css";

export default function RootLayout() {
  const { data: session, isPending } = authClient.useSession();
  if (isPending) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#4f46e5" />
      </View>
    );
  }

  if (!session) {
    return <LoginScreen />;
  }

  return <Stack />;
}

const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
});
