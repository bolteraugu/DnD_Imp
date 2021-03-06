import React, {useState, useContext} from 'react';
import {View, StyleSheet, Dimensions, Keyboard} from 'react-native';
import {Title, TextInput, Button, Text, IconButton, Provider, Dialog, Portal} from 'react-native-paper';
import {TouchableWithoutFeedback} from 'react-native';
import {AuthUserContext} from '../navigation/AuthUserProvider';
import {Checkbox} from 'react-native-paper';
import {Linking} from 'react-native'

global.screenWidth = Dimensions.get("window").width;
global.screenHeight = Dimensions.get("window").height;

export default function LoginScreen({navigation}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const {login} = useContext(AuthUserContext);
  const [helpVisible, setHelpVisible] = useState(false);
  const hideHelpDialog = () => setHelpVisible(false);
  const showHelpDialog = () => setHelpVisible(true);

    global.ShowHelpLogin = () => {
      Keyboard.dismiss();
      showHelpDialog();
    };

  //Got help for checkbox code from here: https://callstack.github.io/react-native-paper/checkbox.html
  return (
      <Provider>
      <View style = {styles.titleBox}>
          <Title style={styles.titleText}>Welcome to Dungeon Minion 5e</Title>
    <View style={styles.body}>
      <TextInput
        label="Email"
        value={email}
        keyboardType="email-address"
        style={styles.input}
        onChangeText={(userEmail) => setEmail(userEmail)}
      />
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.passwordField}
          label="Password"
          value={password}
          secureTextEntry={!passwordVisible}
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
      <View style={styles.checkboxContainer}>
        <Text style={styles.checkboxText}>Remember Me</Text>
        <Checkbox.Android
            status={rememberMe ? 'checked' : 'unchecked'}
            onPress={() => {
              setRememberMe(!rememberMe);
            }}
        />
        <TouchableWithoutFeedback
          onPress={() => navigation.navigate('ForgotPassword')}
        >
          <Text style={styles.forgotPasswordButton}> Forgot Password? </Text>
        </TouchableWithoutFeedback>
      </View>
      <Button
        mode="contained"
        style={styles.button}
        onPress={() => login(email, password, rememberMe)}
      >
        Login
      </Button>
      <Button
        mode="contained"
        style={styles.button}
        onPress={() => navigation.navigate('Register')}
      >
        Register
      </Button>
      <Button
          style = {styles.contactUs}
          onPress={() => Linking.openURL('mailto:Engr489DnDProject@gmail.com?subject=D%26D%20Imp%20Support%20Request')}
      >Contact Us</Button>
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
                  Login Screen Help
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
                - In this screen you can login by entering your account's email and password.{'\n\n'}

                - The password field has a visibility icon which toggles whether you can see your password.{'\n\n'}

                - If you do not yet have an account you can click on the register button which will take you to the register screen where you can create one.{'\n\n'}

                - If you have an account but have forgotten your password you can click on the forgot password button which will take you to the forgot password
                screen.{'\n\n'}

                - Checking the 'Remember Me' checkbox means in the future you don't have to login into your account when you restart this app.
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
  contactUs: {
    marginTop: screenHeight * 0.2659574468085106,
  },

  facebookButton: {
    width: '98%',
    marginBottom: screenHeight * 0.0066489361702128,
    marginTop: screenHeight * 0.0066489361702128,
    marginLeft: screenWidth * 0.0037509377344336,
    marginRight: screenWidth * 0.0037509377344336,
    height: screenHeight * 0.0598404255319149,
    backgroundColor: '#3260a8',
  },

  facebookContainer: {
    flexDirection: 'row',
  },

  appleSignInButton: {
    width: '98%',
    height: screenHeight * 0.0598404255319149,
    marginBottom: screenHeight * 0.0066489361702128,
    marginTop: screenHeight * 0.0066489361702128,
    marginLeft: screenWidth * 0.0037509377344336,
    marginRight: screenWidth * 0.0037509377344336,
    backgroundColor: '#000000',
  },

  googleSignInButton: {
    width: '98%',
    height: screenHeight * 0.0598404255319149,
    marginBottom: screenHeight * 0.0066489361702128,
    marginTop: screenHeight * 0.0066489361702128,
    marginLeft: screenWidth * 0.0037509377344336,
    marginRight: screenWidth * 0.0037509377344336,
    backgroundColor: '#2bc26a',
  },

  forgotPasswordButton: {
    marginLeft: screenWidth * 0.0045011252813203,
    marginTop: screenHeight * 0.0079787234042553,
    fontSize: 14,
    color: '#6231de',
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

  googleIcon: {
    position: 'absolute',
    right: screenWidth * 0.0075018754688672,
    top: screenHeight * 0.3497340425531915,
  },

  appleIcon: {
    position: 'absolute',
    right: screenWidth * 0.0075018754688672,
    top: screenHeight * 0.4202127659574468,
  },

  facebookIcon: {
    position: 'absolute',
    right: screenWidth * 0.0075018754688672,
    elevation: 2,
  },

  checkboxContainer: {
    flexDirection: 'row',
  },

  checkboxText: {
    marginTop: screenHeight * 0.0079787234042553,
    marginLeft: screenWidth * 0.0045011252813203,
  },

  button: {
    marginBottom: screenHeight * 0.0066489361702128,
    marginTop: screenHeight * 0.0066489361702128,
    marginLeft: screenWidth * 0.0037509377344336,
    marginRight: screenWidth * 0.0037509377344336,
  },
  container: {
    alignSelf: 'center',
    marginTop: screenHeight * 0.2659574468085106,
    width: screenWidth * 0.3750937734433608,
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
    },

  input: {
    height: screenHeight * 0.0797872340425532,
    marginBottom: screenHeight * 0.0066489361702128,
    marginTop: screenHeight * 0.0066489361702128,
    marginLeft: screenWidth * 0.0037509377344336,
    marginRight: screenWidth * 0.0037509377344336,
  },
});
