import React, { useState, useContext } from "react";
import { View, StyleSheet } from "react-native";
import { Title, TextInput, Button } from "react-native-paper";
import { AuthUserContext } from "../navigation/AuthUserProvider";
import { Checkbox } from "react-native-paper";

export default function LoginScreen({ navigation }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(false);

    const { login } = useContext(AuthUserContext);

    //Got help for checkbox code from here: https://callstack.github.io/react-native-paper/checkbox.html

    return (
        <View style={styles.container}>
            <Title style={styles.titleText}>Welcome to Dungeon Minion 5e</Title>
            <TextInput
                label="Email"
                value={email}
                keyboardType="email-address"
                style={styles.input}
                onChangeText={(userEmail) => setEmail(userEmail)}
            />
            <TextInput
                label="Password"
                value={password}
                secureTextEntry={true}
                style={styles.input}
                onChangeText={(userPassword) => setPassword(userPassword)}
            />
            <Checkbox
                status = {rememberMe ? 'checked' : 'unchecked'}
                onPress = {() => {
                    setRememberMe(!rememberMe)
                }}
            />
            <Button
                mode="contained"
                style={styles.button}
                onPress={() => login(email, password)}
            >
                Login
            </Button>
            <Button
                mode="contained"
                style={styles.button}
                onPress={() => navigation.navigate("Register")}
            >
                New User? Join Here
            </Button>
        </View>
    );
}

const styles = StyleSheet.create({
    button: {
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
});
