import {Text} from "react-native-paper";
import React, {useEffect, useState} from "react"

export default function BiographyScreen({route}) {
    console.log(global.charaData["strength"])
    const [charData, setCharData] = useState(global.charaData);

    useEffect(() => {
        getCharacter();
    }, [])

    function getCharacter() {
        global.charaRef.onSnapshot( (snapshot) => {
            setCharData(snapshot.data())
        });
    }


    return (
        <Text>{charData["strength"]}</Text>
    );
}