import React, { useState, useContext } from "react"; //Getting the ability to get state and context
import { View, StyleSheet } from "react-native"; //Getting view component and style sheet component from react native
import { Title, TextInput, Button, IconButton } from "react-native-paper"; //Getting title, text input, button and icon button from react native paper (since this is the library being followed)
import { AuthUserContext } from "../navigation/AuthUserProvider"; //Getting AuthUserContext from AuthUserProvider

//Gets the navigation prop since the signupscreen is StackScreen part of the stack navigator, the two props passed to any stackscreen is navigation and route.
export default function SignupScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
      <TextInput
        label="Password"
        value={password}
        style={styles.input}
        secureTextEntry={true} // Text is obscured so password can't be seen
        onChangeText={(userPassword) => setPassword(userPassword)}
      />
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
          labelStyle={styles.loginButtonLabel} //???? Think I can delete this lol
          onPress={() => register(email, password)} // Register when the button is clicked on. Uses the AuthUserContext provided before. I assume the name is important of the const created. Since it matches up with the provider value in AuthUserProvider.
        >
          Signup
        </Button>
      </View>
    </View>
  );
}

//The stylesheet.
const styles = StyleSheet.create({
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
    margin: 5,
  },
  row: { //This is why the back button and the submit button are on the same row.
    flexDirection: "row",
  },
});
