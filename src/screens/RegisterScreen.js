import React, {useState, useContext} from 'react'; //Getting the ability to get state and context
import {View, StyleSheet, Dimensions, Keyboard} from 'react-native'; //Getting view component and style sheet component from react native
import {Title, Text, TextInput, Button, IconButton, Provider, Dialog, Portal} from 'react-native-paper'; //Getting title, text input, button and icon button from react native paper (since this is the library being followed)
import {AuthUserContext} from '../navigation/AuthUserProvider'; //Getting AuthUserContext from AuthUserProvider
import colorScheme from '../utils/colors.js';
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";

global.screenWidth = Dimensions.get("window").width;
global.screenHeight = Dimensions.get("window").height;

//Gets the navigation prop since the sign upscreen is StackScreen part of the stack navigator, the two props passed to any stackscreen is navigation and route.
export default function SignupScreen({navigation}) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [invalidEmail, setInvalidEmail] = useState(false);
    const [passwordDontMatch, setPasswordDontMatch] = useState(false);
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
    const {register} = useContext(AuthUserContext); //Reasoning why we are setting context here to AuthUserContext is because we want to keep track of the current user.
    const [helpVisible, setHelpVisible] = useState(false);
    const hideHelpDialog = () => setHelpVisible(false);
    const showHelpDialog = () => setHelpVisible(true);

    global.ShowHelpRegister = () => {
        Keyboard.dismiss();
        showHelpDialog();
    };

    //We are returning what the user sees on the screen
    return (
        <Provider>
            <KeyboardAwareScrollView>
                <View style={styles.container}>
                    <Title
                        style = {{
                            textAlign: 'center',
                            alignSelf: 'center',
                            marginTop: screenHeight * -0.05,
                            marginBottom: screenHeight * 0.05,
                        }}
                    >Register to Dungeon Minion 5e
                    </Title>
                    <TextInput
                        label="Email" // Label of the text input
                        value={email} // The value of the text input should be the email variable as the email variable will always be set as soon as onChangeText is called
                        style={styles.input} // The style of the text input (which is just setting the margin to 5)
                        autoCapitalize="none" // Don't auto capitalise the input. Important considering email's usually aren't captalised and are quite specific
                        onChangeText={(userEmail) => setEmail(userEmail)} // userEmail is the new text when the text is changed, set email to this. Then value will be changed too.
                    />
                    <View style={styles.passwordContainer}>
                        <TextInput
                            style={styles.passwordField}
                            label="Password"
                            value={password}
                            secureTextEntry={!passwordVisible} // Text is obscured so password can't be seen
                            onChangeText={(userPassword) => setPassword(userPassword)}
                        />
                        <IconButton
                            style={styles.visibilityIcon}
                            icon={passwordVisible ? 'eye-off' : 'eye'}
                            size={20}
                            color="#000000"
                            onPress={() => {
                                setPasswordVisible(!passwordVisible);
                            }}
                        />
                    </View>
                    <View style={styles.passwordContainer}>
                        <TextInput
                            style={styles.passwordField}
                            label="Confirm Password"
                            value={confirmPassword}
                            secureTextEntry={!confirmPasswordVisible} // Text is obscured so password can't be seen
                            onChangeText={(confirmUserPassword) =>
                                setConfirmPassword(confirmUserPassword)
                            }
                        />
                        <IconButton
                            style={styles.visibilityIcon}
                            icon={confirmPasswordVisible ? 'eye-off' : 'eye'}
                            size={20}
                            color="#000000"
                            onPress={() => {
                                setConfirmPasswordVisible(!confirmPasswordVisible);
                            }}
                        />
                    </View>
                    <Button
                            mode="contained" //Sets the style of the button to have background
                            style={styles.button} //Setting how much space the button will take up and it's margin
                            disabled = {email.length === 0 || password.length === 0}
                            onPress={() => {
                                if (email.includes(',')) {
                                    setInvalidEmail(true)
                                }
                                else if (password === confirmPassword) {
                                    setPasswordDontMatch(false);
                                    register(email, password);
                                }
                                else {
                                    setPasswordDontMatch(true);
                                }
                            }} // Register when the button is clicked on. Uses the AuthUserContext provided before. I assume the name is important of the const created. Since it matches up with the provider value in AuthUserProvider.
                        >
                            Signup
                    </Button>
                    {passwordDontMatch && (
                        <Text style={styles.errorText}>
                            The passwords you entered did not match. Please try again.
                        </Text>
                    )}
                    {invalidEmail && (
                        <Text style={styles.errorText}>
                            The email you submitted has a comma in it which isn't allowed for D&D Imp's registration. Please try again.
                        </Text>
                    )}
                </View>
            </KeyboardAwareScrollView>
            <Portal>
                <Dialog
                    visible={helpVisible}
                    onDismiss={hideHelpDialog}
                    style={styles.helpWindow}
                >
                    <View style = {{alignSelf: 'center'}}>
                        <Dialog.Title
                            style={styles.helpTitle}
                        >
                            Register Screen Help
                        </Dialog.Title>
                    </View>
                    <IconButton
                        icon="close" //Getting the back icon image
                        size={36} //Setting the size
                        color="#a60000" //And the color
                        style = {styles.exitButton}
                        onPress={() => {
                            hideHelpDialog()
                        }}
                    />
                    <Dialog.Content>
                        <Text
                            style={styles.helpTextBold}
                        >
                            Please note that this help window is available on every screen by clicking on the help icon in the top right corner. The information shown in this window differs depending on the screen you are on.
                        </Text>
                        <Text>
                            - In this screen you can create a new account by entering an email in the email text input, entering your password in the password and
                            confirm password fields and clicking the signup button.{'\n\n'}

                            - The password fields have visibility icons which toggles whether you can see the password.{'\n\n'}

                            - There is no limit to the amount of accounts you can create but you can only create one account per email.
                        </Text>
                    </Dialog.Content>
                </Dialog>
            </Portal>
        </Provider>
    );
}

//The stylesheet.
const styles = StyleSheet.create({
    exitButton: {
        left: screenWidth * 0.565,
        top: screenHeight * -0.02,
        position: 'absolute'
    },
    helpWindow: {
        width: screenWidth * 0.605,
        alignSelf: 'center',
        marginTop: screenHeight * -0.0563829787234
    },
    helpTitle: {
        alignSelf: 'center',
        textAlign: 'center'
    },
    helpTextBold: {
        textAlign: 'center',
        fontWeight: 'bold',
        marginBottom: screenHeight * 0.02
    },
    passwordContainer: {
        justifyContent: 'center',
        height: screenHeight * 0.0797872340425532,
        marginBottom: screenHeight * 0.0066489361702128,
        marginTop: screenHeight * 0.0066489361702128,
        marginLeft: screenWidth * 0.0037509377344336,
        marginRight: screenWidth * 0.0037509377344336,
    },
    passwordField: {
        height: screenHeight * 0.0797872340425532,
    },
    visibilityIcon: {
        position: 'absolute',
        right: screenWidth * 0.0075018754688672,
    },

    errorText: {
        color: colorScheme.red,
    },
    button: {
        marginBottom: screenHeight * 0.0106489361702128,
        marginTop: screenHeight * 0.0086489361702128,
        marginLeft: screenWidth * 0.0037509377344336,
        marginRight: screenWidth * 0.0037509377344336,
    },
    container: {
        //Aligns the content on this screen to the center, sets the content 200 from the top and sets the width of it to 500
        alignSelf: 'center',
        marginTop: screenHeight * 0.2659574468085106,
        width: screenWidth * 0.3750937734433608,
    },
    input: {
        height: screenHeight * 0.0797872340425532,
        marginBottom: screenHeight * 0.0066489361702128,
        marginTop: screenHeight * 0.0066489361702128,
        marginLeft: screenWidth * 0.0037509377344336,
        marginRight: screenWidth * 0.0037509377344336,
    },
    row: {
        //This is why the back button and the submit button are on the same row.
        flexDirection: 'row',
    },
});
