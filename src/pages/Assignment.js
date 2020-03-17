import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from "react-native";

function Assignment() {
    const [data, setData] = useState({});
    const [name, setName] = useState("");
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [description, setDescription] = useState("");
    
    function save () {
        setData({
            name: name,
            date: date,
            time: time,
            description: description
        });

        console.log(data);
        setName("");
        setDate("");
        setTime("");    }

    return(
        <View style={styles.container}>
            <View style={styles.form}>
                <Text style={styles.formTitle}>
                    Cadastro de Tarefa
                </Text>
                <>
                    <TextInput style={styles.formInputs} placeholder="Nome" onChangeText={(name) => setName(name)} value={name} />
                    <TextInput style={styles.formInputs} placeholder="Data" onChangeText={(date) => setDate(date)} value={date} />
                    <TextInput style={styles.formInputs} placeholder="Hora" onChangeText={(time) => setTime(time)} value={time} />
                    <TextInput style={styles.formTextearea} placeholder="Descrição" multiline onChangeText={(description) =>setDescription(description)} value={description} /> 
                    <TouchableOpacity style={styles.formButton} onPress={save}>
                        <Text style={styles.formButtonText}>Salvar</Text>
                    </TouchableOpacity>
                </>
            </View>
        </View>
        
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fafafa"
    },
    form: {
        marginTop: 20,
        backgroundColor: "#FFF",
        borderWidth: 1,
        borderColor: "#DDD",
        borderRadius: 5,
        padding: 20,
        marginHorizontal: 20
    },
    formTitle: {
        fontSize: 25,
        textAlign: "center",
        padding: 5,
        height: 90
    },
    formInputs: {
        height: 45,
        borderColor: "grey",
        borderWidth: 1,
        borderRadius: 15,
        padding: 15,
        marginVertical: 10
    },
    formTextearea: {
        height: 80,
        justifyContent: "flex-start", 
        borderColor: "grey",
        borderWidth: 1,
        borderRadius: 15,
        padding: 15,
        marginVertical: 10
    }, 
    formButton: {
        height: 42,
        borderRadius: 5, 
        borderWidth: 2, 
        borderColor: "#FFF", 
        backgroundColor: "#3380FF",
        justifyContent: "center", 
        alignItems: "center", 
        marginTop: 10
    },
    formButtonText: {
        fontSize: 16,
        color: "#FFF", 
        fontWeight: "bold"
    }
});

export default Assignment;