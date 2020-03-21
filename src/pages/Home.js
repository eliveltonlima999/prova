import React, { Component } from "react";
import Select from "react-native-picker-select";
import AsyncStorage from '@react-native-community/async-storage';
import { View, Text, StyleSheet, FlatList } from "react-native";

export default class Home extends Component {
    state = {
        assignments: [],
        defaultSituation: null
    };

    componentDidMount() {
        this.loadAssignment();
    }

    componentDidUpdate() {
        this.loadAssignment(); 
    }

    search = (data, situation) => {
        var result = [];
        data.map((value, index) => {
            if (value.situation == situation) {
                result = [...result, value]
            }    
        });
        return result;
    }

    loadAssignment = async () => {
        try {
            let result = await AsyncStorage.getItem("tarefa");
            if (result !== null) {
                var search = null
                if (this.state.defaultSituation === null || this.state.defaultSituation === "0") {
                    search = JSON.parse(result)
                } else {
                    search = this.search(JSON.parse(result), this.state.defaultSituation);
                }

                this.setState({
                    assignments: search
                });
            } else {
                this.setState({
                    assignments: [...this.state.assignments]
                });
            }
        } catch (erro) {
            console.log(erro);
        }

        /** Trecho para lembrança quando necessário =)
            AsyncStorage.getAllKeys((err, keys) => {
                AsyncStorage.multiGet(keys, (err, stores) => {
                    stores.map((result, i, store) => {
                        console.log(stores);
                    });
                });
            });
        **/
    }

    checkSituation = (situation) => {
        /** Esta função faz uma verificação da do tipo de situação
            para litar o nome correto da situação.
        **/
        switch(situation) {
            case "1":
                return "Aberto";
            case "2":
                return "Fechado";
            case "3":
                return "Cancelado";
        }
    }

    listAssignment = ({ item }) => (
        <View style={styles.listContainer}>
            <Text style={styles.name}>
                {item.name}
            </Text>
            <Text>
                <Text style={styles.item}>Data e Hora do Agendamento: </Text> 
                {item.date} {item.time}
            </Text>
            <Text>
                <Text style={styles.item}>Data e Hora da Criação: </Text>  
                {item.createDate} {item.createTime}
            </Text>
            <Text>
                <Text style={styles.item}>Situação: </Text> 
                { 
                    this.checkSituation(item.situation)
                }
            </Text>
            <Text style={styles.item}>
                Descrição:   
                <Text style={styles.description}> {item.description}</Text>
            </Text>
        </View>
    );

    renderInit() {
        return ( 
            <View style={styles.containerInit}>
                <Text style={styles.textInit}>
                    Sua lista de tarefas está vazia.
                </Text>
            </View>
        )
    }

    render() {
        return(
            <View style={styles.container}>
                <View style={styles.containerSelect}>
                    <Select 
                        placeholder={{
                            label: 'Selecine o filtro de pesquisa por situação',
                            value: null,
                        }} 
                        style={pickerSelectStyles} 
                        useNativeAndroidPickerStyle={false} 
                        items={[
                            { label: "Todos", value: "0" },
                            { label: "Aberto", value: "1" },
                            { label: "Fechado", value: "2" },
                            { label: "Cancelado", value: "3" },
                        ]} 
                        value={this.state.defaultSituation}
                        onValueChange={(option) => {
                            this.setState({ defaultSituation: option })
                        }}
                    />
                </View>
                <FlatList 
                    contentContainerStyle={styles.list} 
                    data={this.state.assignments} 
                    keyExtractor={ item => item.id.toString() } 
                    renderItem={this.listAssignment} 
                    onEndReached={this.loadAssignment} 
                    onEndReachedThreshold={0.1} 
                    ListEmptyComponent={this.renderInit} 
                />
            </View>
        );
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fafafa",
    },
    list: {
        padding: 20
    },
    listContainer: {
        backgroundColor: "#FFF",
        borderWidth: 1,
        borderColor: "#DDD",
        borderRadius: 5,
        padding: 20,
        marginBottom: 10
    },
    name: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#333",
        marginBottom: 10
    },
    description: {
        fontSize: 16,
        color: "#999",
        marginTop: 5,
        lineHeight: 24,
    },
    item: {
        fontWeight: "bold"
    },
    containerInit: {
        justifyContent: "center",
        alignItems: "center",
    },
    textInit: {
        fontSize: 20
    },
    containerSelect: {
        backgroundColor: "#FFF",
        borderWidth: 1,
        borderColor: "#DDD",
        padding: 20,
        marginBottom: 5
    }
});

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
      fontSize: 16,
      paddingVertical: 12,
      paddingHorizontal: 10,
      borderWidth: 1,
      borderColor: 'gray',
      borderRadius: 4,
      color: 'black',
      paddingRight: 30, 
    },
    inputAndroid: {
      fontSize: 16,
      paddingHorizontal: 10,
      paddingVertical: 8,
      borderWidth: 0.5,
      borderColor: 'grey',
      borderRadius: 8,
      color: 'black',
      paddingRight: 30, 
    }
});