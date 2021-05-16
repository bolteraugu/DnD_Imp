import React, { useState, useContext } from "react";
import { View, StyleSheet, Alert } from "react-native";
import { Title, TextInput, Button, Text, IconButton } from "react-native-paper";
import { TouchableWithoutFeedback } from 'react-native';
import { AuthUserContext } from "../navigation/AuthUserProvider";
import { Checkbox } from "react-native-paper";

export default function LoginScreen({ navigation }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(false);
    const [passwordVisible, setPasswordVisible] = useState(false);

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
            <View style={styles.passwordContainer}>
                <TextInput style = {styles.passwordField}
                           label="Password"
                           value={password}
                           secureTextEntry={!passwordVisible}
                           onChangeText={(userPassword) => setPassword(userPassword)}
                />
                <IconButton style = {styles.visibilityIcon}
                            icon={passwordVisible? "eye-off" : "eye"}
                            size={20} color = "#000000"
                            onPress = {() => {
                                setPasswordVisible(!passwordVisible)
                            }}/>
            </View>
            <View style={styles.checkboxContainer}>
                <Text style={styles.checkboxText}>Remember Me</Text>
                <Checkbox
                    status = {rememberMe ? 'checked' : 'unchecked'}
                    onPress = {() => {
                        setRememberMe(!rememberMe)
                    }}
                />
                <TouchableWithoutFeedback
                    onPress = {() => navigation.navigate("ForgotPassword")}>
                    <Text style = {styles.forgotPasswordButton}> Forgot Password? </Text>
                </TouchableWithoutFeedback>
            </View>
            <Button
                mode="contained"
                style={styles.button}
                onPress={() =>
                    login(email, password, rememberMe)
                }
            >
                Login
            </Button>
            <Button
                mode="contained"
                style={styles.button}
                onPress={() => navigation.navigate("Register")}
            >
                Register
            </Button>
        </View>
    );
}

const styles = StyleSheet.create({
    forgotPasswordButton: {
        marginLeft: 6,
        marginTop: 6,
        fontSize: 14,
        color: "#6f1ff0"
    },

    passwordContainer: {
        justifyContent: 'center',
        height: 60,
        margin: 5
    },

    passwordField: {
        height: 60,
    },

    visibilityIcon: {
        position: 'absolute',
        right: 10
    },

    checkboxContainer: {
        flexDirection: "row"
    },

    checkboxText: {
        marginTop: 6,
        marginLeft: 6,
    },

    button: {
        margin: 5,
    },
    container: {
        alignSelf: "center",
        marginTop: 200,
        width: 500,
    },
    input: {
        height: 60,
        margin: 5,
    },
});
