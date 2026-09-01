import { authClient } from "@/api/auth-client";
import { ActivityIndicator, Text, View } from "react-native";

export default function Index() {
  const { data: session, isPending } = authClient.useSession();
  if (isPending) {
    return (
      <View>
        <ActivityIndicator size="large" color="#4f46e5" />
      </View>
    );
  }

  return (
    <View>
      <Text>Yo {session?.user.email}</Text>
    </View>
  );
}
