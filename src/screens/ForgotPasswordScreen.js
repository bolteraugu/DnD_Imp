import {Button, IconButton, Title, TextInput, Text, Dialog, Portal, Provider} from 'react-native-paper';
import {Dimensions, Keyboard, StyleSheet, View} from 'react-native';
import React, {useContext, useState} from 'react';
import {AuthUserContext} from '../navigation/AuthUserProvider';

global.screenWidth = Dimensions.get("window").width;
global.screenHeight = Dimensions.get("window").height;

export default function ForgotPasswordScreen({navigation}) {
    const {forgotPassword} = useContext(AuthUserContext);
    const [email, setEmail] = useState('');
    const [helpVisible, setHelpVisible] = useState(false);
    const hideHelpDialog = () => setHelpVisible(false);
    const showHelpDialog = () => setHelpVisible(true);

    global.ShowHelpForgotPassword = () => {
        Keyboard.dismiss();
        showHelpDialog();
    };

    return (
        <Provider>
            <View style = {styles.titleBox}>
                <Title style = {styles.titleText}>Forgot Password</Title>
                <View style={styles.body}>
                    <TextInput
                        label="Email" // Label of the text input
                        value={email} // The value of the text input should be the email variable as the email variable will always be set as soon as onChangeText is called
                        style={styles.input} // The style of the text input (which is just setting the margin to 5)
                        autoCapitalize="none" // Don't auto captalise the input. Important considering email's usually aren't captalised and are quite specific
                        onChangeText={(userEmail) => setEmail(userEmail)} // userEmail is the new text when the text is changed, set email to this. Then value will be changed too.
                    />
                    <View style={styles.row}>
                        <Button
                            mode="contained"
                            style={styles.button}
                            disabled={email.length === 0}
                            onPress={() => {
                                forgotPassword(email);
                            }}
                        >
                            Submit
                        </Button>
                    </View>
                </View>
            </View>
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
                            Forgot Password Screen Help
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
                            - In this screen you can reset your password by entering your account's email address into the password field and clicking the submit button.
                            The email address you submit will be sent an email containing a link that lets you reset your password.
                        </Text>
                    </Dialog.Content>
                </Dialog>
            </Portal>
        </Provider>
    );
}

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
    row: {
        //This is why the back button and the submit button are on the same row.
        flexDirection: 'row',
        marginTop: screenHeight * 0.0199468085106383,
    },
    container: {
        //Aligns the content on this screen to the center, sets the content 200 from the top and sets the width of it to 500
        alignSelf: 'center',
        marginTop: screenHeight * 0.0664893617021277,
        width: screenWidth * 0.3750937734433608,
    },
    input: {
        marginTop: screenHeight * 0.0132978723404255,
    },
    button: {
        justifyContent: 'center',
        width: "100%"
    },

    body: {
        alignSelf: 'center',
        width: screenWidth * 0.3750937734433608,
        marginTop: screenHeight * 0.0664893617021277
    },

    titleBox: {
        alignSelf: 'center',
        marginTop: screenHeight * 0.1329787234042553,
        width: screenWidth * 0.3750937734433608,
    },

    titleText: {
        alignSelf: 'center',
        fontSize: 26
    }

});
