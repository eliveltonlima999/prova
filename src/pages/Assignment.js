import React, { Component } from "react";
import AsyncStorage from '@react-native-community/async-storage';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Keyboard } from "react-native";

export default class Assignment extends  Component {
    createDate = `${new Date().getUTCDate()+"/"+new Date().getUTCMonth()+"/"+new Date().getUTCFullYear()}`;
    createTime = `${new Date().getHours()+":"+new Date().getMinutes()}`;

    state = {
        name: "", 
        date: "", 
        time: "", 
        createDate: this.createDate,
        createTime: this.createTime,
        description: ""
    }

    save = async () => {
        try {
            if (this.state.name == "" || this.state.date == "" || this.state.time == "" || this.state.description == "") {
                alert("Preencha todos os campos!");
                Keyboard.dismiss();
                return;
            }

            const result = await AsyncStorage.setItem("tarefa", JSON.stringify(this.state));
            if (result == null) {
                this.setState({ name: ""});
                this.setState({ date: ""});
                this.setState({ description: ""});
                alert("Cadastro Ralizado Com Sucesso!");
            } else {
                console.log(result);   
            }
        } catch (error) {
            console.log(error);
            return;
        }   
    }

    render() {
        return(
            <View style={styles.container}>
                <View style={styles.form}>
                    <Text style={styles.formTitle}>
                        Cadastro de Tarefa
                    </Text>
                    <>
                        <TextInput style={styles.formInputs} placeholder="Nome" onChangeText={(text) => this.setState({name: text})} value={this.state.name} />
                        <TextInput style={styles.formInputs} placeholder="Data" onChangeText={(text) => this.setState({date: text})} value={this.state.date} />
                        <TextInput style={styles.formInputs} placeholder="Hora" onChangeText={(text) => this.setState({time: text})} value={this.state.time} />
                        <TextInput style={styles.formTextearea} placeholder="Descrição" multiline onChangeText={(text) => this.setState({description: text})} value={this.state.description} /> 
                        <TouchableOpacity style={styles.formButton} onPress={this.save}>
                            <Text style={styles.formButtonText}>Salvar</Text>
                        </TouchableOpacity>
                    </>
                </View>
            </View>
            
        );
    }
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