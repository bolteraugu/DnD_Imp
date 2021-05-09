import React, { useState, useContext } from "react";
import { View, StyleSheet } from "react-native";
import { Title, TextInput, Button, IconButton } from "react-native-paper";
import { AuthUserContext } from "../navigation/AuthUserProvider";

export default function SignupScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { register } = useContext(AuthUserContext);

  return (
    <View style={styles.container}>
      <Title>Register to Dungeon Minion 5e</Title>
      <TextInput
        label="Email"
        value={email}
        style={styles.input}
        autoCapitalize="none"
        onChangeText={(userEmail) => setEmail(userEmail)}
      />
      <TextInput
        label="Password"
        value={password}
        style={styles.input}
        secureTextEntry={true}
        onChangeText={(userPassword) => setPassword(userPassword)}
      />
      <View style={styles.row}>
        <IconButton
          icon="keyboard-backspace"
          size={30}
          color="#6646ee"
          onPress={() => navigation.goBack()}
        />
        <Button
          mode="contained"
          style={styles.button}
          labelStyle={styles.loginButtonLabel}
          onPress={() => register(email, password)}
        >
          Signup
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    flex: 1,
    margin: 5,
  },
  container: {
    alignSelf: "center",
    marginTop: 200,
    width: 500,
  },
  input: {
    margin: 5,
  },
  row: {
    flexDirection: "row",
  },
});
