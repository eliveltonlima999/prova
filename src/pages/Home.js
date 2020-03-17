import React, { useState } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";

function Home() {
    const [assignment, setAssignment] = useState([
        {
            id: 1,
            name: "Estudar",
            date: "31/07/1998",
            time: "15:00",
            dateCreation: "30/07/1998",
            timeCreation: "14:00", 
            dateUpdate: "31/17/1998",
            timeUpdate: "14:00",
            description: "Estudar React native.",
            situation: 1
        },
        {
            id: 2,
            name: "Treinar",
            date: "31/07/1998",
            time: "15:00",
            dateCreation: "30/07/1998",
            timeCreation: "14:00", 
            dateUpdate: "31/17/1998",
            timeUpdate: "14:00",
            description: "Treinar ReactJS.",
            situation: 2
        },
        {
            id: 3,
            name: "Dar uma olhada",
            date: "31/07/1998",
            time: "15:00",
            dateCreation: "30/07/1998",
            timeCreation: "14:00", 
            dateUpdate: "31/17/1998",
            timeUpdate: "14:00",
            description: "Dar uma olhada na linguagem JavaScript.",
            situation: 3
        },
    ]);

    const checkSituation = (situation) => {
        switch(situation) {
            case "1":
                return {
                    color: "green",
                    msg: "Aberta"
                };
            case "2":
                return {
                    color: "Yelow",
                    msg: "Fechada"
                };
            case "3":
                return {
                    color: "color:red",
                    msg: "Cancelada"
                };
        }
    }

    listAssignment = ({ item }) => (
        <View style={styles.listContainer}>
            <Text style={styles.name}>{item.name}</Text>
            <Text><Text style={styles.item}>Data e Hora do Agendamento:</Text> {item.date}:{item.time}</Text>
            <Text><Text style={styles.item}>Data e Hora da Criação:</Text> {item.dateCreation}:{item.timeCreation}</Text>
            <Text><Text style={styles.item}>Data e Hora da Atualização:</Text> {item.dateUpdate}:{item.timeUpdate}</Text>
            <>
            
            </>
            <Text style={styles.description}>{item.description}</Text>
        </View>
    );

    return(
        <View style={styles.container}>
            <FlatList 
                contentContainerStyle={styles.list} 
                data={assignment} 
                keyExtractor={ item => item.id.toString() } 
                renderItem={listAssignment}
            />
        </View>
    );
}

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
        lineHeight: 24
    },
    item: {
        fontWeight: "bold"
    }
})

export default Home;