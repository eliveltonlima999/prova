import React, { Component } from "react";
import AsyncStorage from '@react-native-community/async-storage';
import { View, Text, StyleSheet, FlatList } from "react-native";

export default class Home extends Component {
    state = {
        assignments: []
    };

    componentDidMount() {
        this.loadAssignment();
    }

    componentWillUpdate(nextProps, nextState) {
        this.loadAssignment(); 
    }

    loadAssignment = async () => {
        try {
            let result = await AsyncStorage.getItem("tarefa");
            if (result !== null) {
                this.setState({
                    assignments: JSON.parse(result)
                });
            } else {
                this.setState({
                    assignments: [...this.state.assignments]
                });
            }
        } catch (erro) {
            console.log(erro);
        }
    
        // console.log(this.state);
        
        // AsyncStorage.getAllKeys((err, keys) => {
        //     AsyncStorage.multiGet(keys, (err, stores) => {
                // stores.map((result, i, store) => {
                    // console.log(stores);
                // });
        //     });
        // });
    }

    checkSituation = (date) => {
        let newDate = date.replace(/[^\w\-]+/g, '-');
        let dateFinish = newDate.split('').reverse().join('');

        let situation = new Date(dateFinish).getTime() >= new Date().getTime() ? "Aberto": "Fechado"

        return situation;
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
                    this.checkSituation(item.date)
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
                <FlatList 
                    contentContainerStyle={styles.list} 
                    data={this.state.assignments} 
                    keyExtractor={ item => item.name.toString() } 
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
    }
});