import { useState } from "react";
import { Alert, Button, TextInput, View } from "react-native";
import { authClient } from "../../api/auth-client";

export const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    await authClient.signIn.email({
      email,
      password,
      callbackURL: "/",
      fetchOptions: {
        onError: (ctx) => {
          Alert.alert("Authentication Failed", ctx.error.message);
        },
      },
    });
  };

  return (
    <View>
      <TextInput
        placeholder="Email Address"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Button title="Sign In" onPress={handleLogin} color="#4f46e5" />
    </View>
  );
};
