import {Button, IconButton, Title, TextInput, Text} from "react-native-paper";
import {StyleSheet, View} from "react-native";
import React, {useContext, useState} from "react";
import {AuthUserContext} from "../navigation/AuthUserProvider";

export default function forgotPasswordScreen({navigation}) {
    const { forgotPassword } = useContext(AuthUserContext);
    const [email, setEmail] = useState("");
    return (
        <View style = {styles.container}>
            <Title>Forgot Password</Title>
            <Text>Please submit your account's email so a password reset link can be sent to it.</Text>
            <TextInput
                label="Email" // Label of the text input
                value={email} // The value of the text input should be the email variable as the email variable will always be set as soon as onChangeText is called
                style={styles.input} // The style of the text input (which is just setting the margin to 5)
                autoCapitalize="none" // Don't auto captalise the input. Important considering email's usually aren't captalised and are quite specific
                onChangeText={(userEmail) => setEmail(userEmail)} // userEmail is the new text when the text is changed, set email to this. Then value will be changed too.
            />
            <View style={styles.row}>
                <IconButton
                    icon="keyboard-backspace" //Getting the back icon image
                    size={30} //Setting the size
                    color="#6646ee" //And the color
                    onPress={() => navigation.goBack()} //When clicked on make it go back to the previous route
                />
                <Button
                    mode="contained"
                    style = {styles.button}
                    onPress = {() => {
                    forgotPassword(email)
                }}>
                    Submit
                </Button>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    row: { //This is why the back button and the submit button are on the same row.
        flexDirection: "row",
        marginTop: 15
    },
    container: { //Aligns the content on this screen to the center, sets the content 200 from the top and sets the width of it to 500
        alignSelf: "center",
        marginTop: 200,
        width: 500,
    },
    input: {
        marginTop: 10
    },
    button: {
        justifyContent: 'center'
    }
})