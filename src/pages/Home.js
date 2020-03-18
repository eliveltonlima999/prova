import React, { Component } from "react";
import AsyncStorage from '@react-native-community/async-storage';
import { View, Text, StyleSheet, FlatList } from "react-native";

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            assignment: []
        };
    }
    
    static navigationsOptions = {
        title: "Tarefas"
    }

    componentDidMount() {
        this.loadAssignment();
    }

    loadAssignment = () => {
        var assignment = {
            name: "",
            date: "",
            time: "",
            createDate: "",
            createTime: ""
        }
        
        AsyncStorage.getItem("tarefa", (err, value) => {
            let values = JSON.parse(value);
            assignment.name = values.name;
            assignment.date = values.date;
            assignment.time = values.time;
            assignment.createDate = values.createDate;
            assignment.createTime = values.createTime;
        });
        // console.log(assignment);

        // this.setState([...this.state.assignment, ...assignment]);
        console.log(this.state.assignment);
        // AsyncStorage.multiRemove(["tarefas"]);

        
        // AsyncStorage.getAllKeys((err, keys) => {
        //     AsyncStorage.multiGet(keys, (err, stores) => {
        //         stores.map((result, i, store) => {
        //             console.log(stores);
        //         });
        //     });
        // });
        // console.log(search);
        // this.setState([...this.state.assignments]);
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
                {item.dateCreation} {item.timeCreation}
            </Text>
            <Text>
                <Text style={styles.item}>Situação: </Text> 
                { 
                     item.situation == 1 ? "Aberto": item.situation == 2 ? "Fechado":item.situation == 3 ? "Cancelado":""
                }
            </Text>
            <Text style={styles.item}>
                Descrição:  
                <Text style={styles.description}>{item.description}</Text>
            </Text>
        </View>
    );

    render() {
        return(
            <View style={styles.container}>
                <FlatList 
                    contentContainerStyle={styles.list} 
                    data={this.state.assignment} 
                    keyExtractor={ item => item.id.toString() } 
                    renderItem={this.listAssignment}
                />
            </View>
        );
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fafafa"
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
    }
});