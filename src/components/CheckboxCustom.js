import {Checkbox} from "react-native-paper";
import React, {useState} from "react";

export default function CheckboxCustom({select, add, remove}) {
    const [selected, setSelected] = useState(false);
    if (select) {
        return (
            <Checkbox
                status={selected ? 'checked' : 'unchecked'}
                onPress={() => {
                    if (selected) {
                        remove()
                    }
                    else {
                        add()
                    }
                    setSelected(!selected)
                }}
            />
        );
    }
    else {
        return null;
    }
}