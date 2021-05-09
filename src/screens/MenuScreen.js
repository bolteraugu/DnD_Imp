import React, { useState, useContext, useEffect } from "react";
import { StyleSheet, FlatList, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { AuthUserContext } from "../navigation/AuthUserProvider";
import { Title, Button, List } from "react-native-paper";
import * as firebase from "firebase";
import "firebase/firestore";
import Spinner from "../components/Spinner";
import Colors from "../utils/colors";

export default function MenuScreen({ navigation }) {
  const { user } = useContext(AuthUserContext);
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .collection("groups")
      .where("members", "array-contains", user.toJSON().email)
      .onSnapshot(
        (querySnapshot) => {
          const groups = querySnapshot.docs.map((documentSnapshot) => {
            return {
              _id: documentSnapshot.id,
              // give defaults
              name: "",
              ...documentSnapshot.data(),
            };
          });

          setGroups(groups);

          if (loading) {
            setLoading(false);
          }
        },
        (error) => {
          alert(error);
        }
      );
    return () => unsubscribe();
  }, []);

  if (loading) {
    return <Spinner />;
  }

  return (
    <View style={styles.wrapper}>
      <Title style={styles.title}>My Groups</Title>
      <ScrollView>
        <FlatList
          data={groups}
          keyExtractor={(item) => item._id}
          ListFooterComponent={() => (
            <Button
              mode="contained"
              onPress={() => navigation.navigate("AddGroup")}
              style={styles.button}
            >
              Create Group
            </Button>
          )}
          renderItem={({ item }) => (
            <List.Item
              onPress={() => navigation.navigate("DM", { group: item })}
              style={styles.container}
              title={item.name}
            />
          )}
        />
      </ScrollView>
    </View>
  );
}

MenuScreen.navigationOptions = {
  header: null,
};

const styles = StyleSheet.create({
  button: { margin: 5 },
  container: {
    backgroundColor: Colors.white,
    elevation: 4,
    margin: 5,
    paddingHorizontal: 10,
    paddingVertical: 15,
  },
  title: {
    alignSelf: "center",
  },
  wrapper: {
    alignSelf: "center",
    paddingTop: 100,
    width: 500,
  },
});
