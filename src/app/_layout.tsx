import * as Sentry from "@sentry/react-native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import "../global.css";

Sentry.init({
  dsn: "https://45d070fce6e1dc5909aac152843e5229@o4512013009747968.ingest.us.sentry.io/4512013022986240",
  debug: true,
  tracesSampleRate: 1.0,
});

function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <StatusBar style="auto" />
        <SafeAreaView
          edges={["top"]}
          style={{ flex: 1, backgroundColor: "#0e0e0e" }}
        >
          <Stack
            screenOptions={{
              headerShown: false,
              contentStyle: { backgroundColor: "#0e0e0e" },
            }}
          >
            <Stack.Screen name="index" />
          </Stack>
        </SafeAreaView>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

export default Sentry.wrap(RootLayout);
