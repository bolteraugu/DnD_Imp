import React, {useState, useContext} from 'react';
import {View, StyleSheet} from 'react-native';
import {Title, TextInput, Button, Text, IconButton} from 'react-native-paper';
import {TouchableWithoutFeedback} from 'react-native';
import {AuthUserContext} from '../navigation/AuthUserProvider';
import {Checkbox} from 'react-native-paper';
import {Linking} from 'react-native'

export default function LoginScreen({navigation}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);

  const {login} = useContext(AuthUserContext);

  //Got help for checkbox code from here: https://callstack.github.io/react-native-paper/checkbox.html

  return (
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
        <Checkbox
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
  );
}

const styles = StyleSheet.create({
  contactUs: {
    marginTop:200,
  },

  facebookButton: {
    width: '98%',
    margin: 5,
    height: 45,
    backgroundColor: '#3260a8',
  },

  facebookContainer: {
    flexDirection: 'row',
  },

  appleSignInButton: {
    width: '98%',
    height: 45,
    margin: 5,
    backgroundColor: '#000000',
  },

  googleSignInButton: {
    width: '98%',
    height: 45,
    margin: 5,
    backgroundColor: '#2bc26a',
  },

  forgotPasswordButton: {
    marginLeft: 6,
    marginTop: 6,
    fontSize: 14,
    color: '#6231de',
  },

  passwordContainer: {
    justifyContent: 'center',
    height: 60,
    margin: 5,
  },

  passwordField: {
    height: 60,
  },

  visibilityIcon: {
    position: 'absolute',
    right: 10,
  },

  googleIcon: {
    position: 'absolute',
    right: 10,
    top: 263,
  },

  appleIcon: {
    position: 'absolute',
    right: 10,
    top: 316,
  },

  facebookIcon: {
    position: 'absolute',
    right: 10,
    elevation: 2,
  },

  checkboxContainer: {
    flexDirection: 'row',
  },

  checkboxText: {
    marginTop: 6,
    marginLeft: 6,
  },

  button: {
    margin: 5,
  },
  container: {
    alignSelf: 'center',
    marginTop: 200,
    width: 500,
  },

    body: {
        alignSelf: 'center',
        width: 500,
        marginTop: 50
    },

    titleBox: {
        alignSelf: 'center',
        marginTop: 100,
        width: 500,
    },

    titleText: {
      alignSelf: 'center',
      fontSize: 26
    },

  input: {
    height: 60,
    margin: 5,
  },
});
