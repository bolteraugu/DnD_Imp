import React, { useState, useContext } from "react"; //Getting the ability to get state and context
import { View, StyleSheet } from "react-native"; //Getting view component and style sheet component from react native
import { Title, Text, TextInput, Button, IconButton } from "react-native-paper"; //Getting title, text input, button and icon button from react native paper (since this is the library being followed)
import { AuthUserContext } from "../navigation/AuthUserProvider"; //Getting AuthUserContext from AuthUserProvider
import colorScheme from "../utils/colors.js"

//Gets the navigation prop since the signupscreen is StackScreen part of the stack navigator, the two props passed to any stackscreen is navigation and route.
export default function SignupScreen({ navigation }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [passwordDontMatch, setPasswordDontMatch] = useState(false);
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

    const { register } = useContext(AuthUserContext); //Reasoning why we are setting context here to AuthUserContext is because we want to keep track of the current user.

    //We are returning what the user sees on the screen
    return (
        //First is the view component which holds the email and login fields and the title
        <View style={styles.container}>
            <Title>Register to Dungeon Minion 5e</Title>
            <TextInput
                label="Email" // Label of the text input
                value={email} // The value of the text input should be the email variable as the email variable will always be set as soon as onChangeText is called
                style={styles.input} // The style of the text input (which is just setting the margin to 5)
                autoCapitalize="none" // Don't auto captalise the input. Important considering email's usually aren't captalised and are quite specific
                onChangeText={(userEmail) => setEmail(userEmail)} // userEmail is the new text when the text is changed, set email to this. Then value will be changed too.
            />
            <View style={styles.passwordContainer}>
                <TextInput style = {styles.passwordField}
                           label="Password"
                           value={password}
                           secureTextEntry={!passwordVisible} // Text is obscured so password can't be seen
                           onChangeText={(userPassword) => setPassword(userPassword)}
                />
                <IconButton style = {styles.visibilityIcon}
                            icon={passwordVisible? "eye-off" : "eye"}
                            size={20} color = "#000000"
                            onPress = {() => {
                                setPasswordVisible(!passwordVisible)
                            }}/>
            </View>
            <View style={styles.passwordContainer}>
                <TextInput style = {styles.passwordField}
                           label="Confirm Password"
                           value={confirmPassword}
                           secureTextEntry={!confirmPasswordVisible} // Text is obscured so password can't be seen
                           onChangeText={(confirmUserPassword) => setConfirmPassword(confirmUserPassword)}
                />
                <IconButton style = {styles.visibilityIcon}
                            icon={confirmPasswordVisible? "eye-off" : "eye"}
                            size={20} color = "#000000"
                            onPress = {() => {
                                setConfirmPasswordVisible(!confirmPasswordVisible)
                            }}/>
            </View>
            <View style={styles.row}>
                <IconButton
                    icon="keyboard-backspace" //Getting the back icon image
                    size={30} //Setting the size
                    color="#6646ee" //And the color
                    onPress={() => navigation.goBack()} //When clicked on make it go back to the previous route
                />
                <Button
                    mode="contained" //Sets the style of the button to have background
                    style={styles.button} //Setting how much space the button will take up and it's margin
                    onPress={() => {
                        if (password === confirmPassword) {
                            setPasswordDontMatch(false)
                            register(email, password)
                        }
                        else {
                            setPasswordDontMatch(true)
                        }
                    }} // Register when the button is clicked on. Uses the AuthUserContext provided before. I assume the name is important of the const created. Since it matches up with the provider value in AuthUserProvider.
                >
                    Signup
                </Button>
            </View>
            {passwordDontMatch && <Text style={styles.errorText}> The passwords you entered did not match. Please try again. </Text>}
        </View>
    );
}

//The stylesheet.
const styles = StyleSheet.create({
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

    errorText: {
        color: colorScheme.red
    },
    button: {
        flex: 1,
        margin: 5,
    },
    container: { //Aligns the content on this screen to the center, sets the content 200 from the top and sets the width of it to 500
        alignSelf: "center",
        marginTop: 200,
        width: 500,
    },
    input: {
        height: 60,
        margin: 5
    },
    row: { //This is why the back button and the submit button are on the same row.
        flexDirection: "row",
    },
});
