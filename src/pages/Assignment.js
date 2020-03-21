import React, { Component } from "react";
import InputMask from "react-native-text-input-mask"
import AsyncStorage from '@react-native-community/async-storage';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Keyboard, KeyboardAvoidingView } from "react-native";

export default class Assignment extends  Component {
    createDate = `${new Date().getUTCDate()+"/"+new Date().getUTCMonth()+"/"+new Date().getUTCFullYear()}`;
    createTime = `${new Date().getHours()+":"+new Date().getMinutes()}`;

    state = {
        id: 0,
        name: "", 
        date: "", 
        time: "", 
        createDate: this.createDate,
        createTime: this.createTime,
        description: ""
    }

    checkDate = (date) => {
        /**** Valida a data no formato DD/MM/AAAA ****/

        var regExpCaracter = /[^\d]/;     //Expressão regular para procurar caracter não-numérico.
        var regExpEspaco = /^\s+|\s+$/g;  //Expressão regular para retirar espaços em branco.

        if(date.length != 10){
            return false;
        }

        var splitData = date.split('/');

        if(splitData.length != 3){
            return false;
        }

        /* Retira os espaços em branco do início e fim de cada string. */
        splitData[0] = splitData[0].replace(regExpEspaco, '');
        splitData[1] = splitData[1].replace(regExpEspaco, '');
        splitData[2] = splitData[2].replace(regExpEspaco, '');

        if ((splitData[0].length != 2) || (splitData[1].length != 2) || (splitData[2].length != 4)){
            return false;
        }

        /* Procura por caracter não-numérico. EX.: o "x" em "28/09/2x11" */
        if (regExpCaracter.test(splitData[0]) || regExpCaracter.test(splitData[1]) || regExpCaracter.test(splitData[2])){
            return false;
        }

        var dia = parseInt(splitData[0],10);
        var mes = parseInt(splitData[1],10)-1; //O JavaScript representa o mês de 0 a 11 (0->janeiro, 1->fevereiro... 11->dezembro)
        var ano = parseInt(splitData[2],10);

        var novaData = new Date(ano, mes, dia);

        /*   O JavaScript aceita criar datas com, por exemplo, mês=14, porém a cada 12 meses mais um ano é acrescentado à data
            final e o restante representa o mês. O mesmo ocorre para os dias, sendo maior que o número de dias do mês em
            questão o JavaScript o converterá para meses/anos.
             Por exemplo, a data 28/14/2011 (que seria o comando "new Date(2011,13,28)", pois o mês é representado de 0 a 11)
            o JavaScript converterá para 28/02/2012.
             Dessa forma, se o dia, mês ou ano da data resultante do comando "new Date()" for diferente do dia, mês e ano da
            data que está sendo testada esta data é inválida. 
        */
        if ((novaData.getDate() != dia) || (novaData.getMonth() != mes) || (novaData.getFullYear() != ano)){
            return false;
        } else {
            return true;
        }
    }

    checkTime = (time) => {
        /**** Valida a hora ****/
        let hourMin = time.split(":"); /* Separa hora e minutos */
        let hour = parseInt(hourMin[0]); /* Hora */
        let minutes = parseInt(hourMin[1]); /* Minutos */

        /** Verifica e retorna um boolean **/
        if ((hour < 0 ) || (hour > 23) || ( minutes < 0) ||( minutes > 59)){ 
            return false; 
        } else {
            return true;
        }
    }

    checkDateTime = (date, time) => {
        /** Verificando a data **/
        var dateResult = true;
        let resultDate = this.checkDate(date);
        if (!resultDate) {
            alert("Data inválida.");
            dateResult = false;
        }

        /** Varificando a hora **/
        var timeResult = true;
        let resultTime = this.checkTime(time);
        if (!resultTime) {
            alert("Hora inválida.");
            timeResult = false;
        }

        if (dateResult === true && timeResult === true) {
            return true;
        } else {
            return false;
        }
    }

    save = async () => {
        try {
            /** Verifica se todos os campos estão vazios **/
            if (this.state.name == "" || this.state.date == "" || this.state.time == "" || this.state.description == "") {
                alert("Preencha todos os campos!");
                Keyboard.dismiss();
                return;
            }

            /* Valida a data e a hora */
            let checkDateTime = this.checkDateTime(this.state.date, this.state.time);
            
            if (checkDateTime === true) {
                /** Busca os dados que estão armazenados em storage local **/
                let search = await AsyncStorage.getItem("tarefa");
                            
                /** Se a busca for vazia, os dados são armazenados direto,
                    caso contrario, os dados são armazenados no objeto e 
                    salvo novamente no storage local.    
                **/
                if (!search) {
                    var result = await AsyncStorage.setItem("tarefa", JSON.stringify([this.state]));
                } else {
                    let newSeach = JSON.parse(search);
                    let storageAssignment = [...newSeach, this.state];
                    var result = await AsyncStorage.setItem("tarefa", JSON.stringify(storageAssignment));
                }

                /* Verifica se houve erros na transação, atualiza o estado, 
                incrementa +1 no id que serve como index de cada objeto e 
                fecha o teclado automaticamente.
                */
                if (result == null) {
                    this.setState({ id: this.state.id + 1 });
                    this.setState({ name: ""});
                    this.setState({ date: ""});
                    this.setState({ time: ""});
                    this.setState({ description: ""});

                    Keyboard.dismiss();
                    
                    alert("Cadastro Ralizado Com Sucesso!");
                } else {
                    alert("Ops! Não foi possível cadastrar seus dados.");
                    console.log(result);   
                }
            }

            
        } catch (error) {
            console.log(error);
            return;
        }   
    }

    render() {
        return(
            <KeyboardAvoidingView 
                style={styles.container} 
                enabled={true} 
                behavior="padding" 
                resetScrollToCoords={{ x: 0, y: 0 }}
                contentContainerStyle={styles.container}
                scrollEnabled={false}
            >
                <View style={styles.form}>
                    <Text style={styles.formTitle}>
                        Cadastro de Tarefa
                    </Text>
                    <>
                        <TextInput style={styles.formInputs} placeholder="Nome" onChangeText={(text) => this.setState({name: text})} value={this.state.name} />
                        <InputMask 
                            placeholder="Data"
                            style={styles.formInputs} 
                            mask={"[00]/[00]/[0000]"} 
                            value={this.state.date}
                            onChangeText={(text) => {
                                this.setState({ date: text });
                            }}
                        />
                        <InputMask 
                            placeholder="Hora" 
                            style={styles.formInputs} 
                            mask={"[00]:[00]"} 
                            value={this.state.time}
                            onChangeText={(text) => {
                                this.setState({time: text})
                            }} 
                        />
                        <TextInput style={styles.formTextearea} placeholder="Descrição" multiline onChangeText={(text) => this.setState({description: text})} value={this.state.description} /> 
                        <TouchableOpacity style={styles.formButton} onPress={this.save}>
                            <Text style={styles.formButtonText}>Salvar</Text>
                        </TouchableOpacity>
                    </>
                </View>
            </KeyboardAvoidingView>
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
        height: 50,
        borderColor: "grey",
        borderWidth: 1,
        borderRadius: 15,
        padding: 10,
        marginVertical: 10
    },
    formTextearea: {
        height: 80,
        justifyContent: "flex-start", 
        borderColor: "grey",
        borderWidth: 1,
        borderRadius: 15,
        padding: 10,
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