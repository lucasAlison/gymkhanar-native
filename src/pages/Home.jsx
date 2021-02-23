import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { useHistory } from "react-router-native";
import { Button, Subheading, Surface, Text } from 'react-native-paper';

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  input: {
    paddingBottom: 20,
  },
  paper: {
    marginTop: 20,
    elevation: 4,
    padding: 20,
    margin: 2
  },
  textButtons: {
    flexDirection:'row',
    flexWrap:'wrap',
    justifyContent: "space-between",
    paddingBottom: 20,
  },
  textCenter: {
    marginRight: 10,
    alignSelf: 'center'
  }
});

const Home = () => {
  const formDataModel = {
      gymkhanaName: "<nome da gincana>",
      teamName: '<nome do time>',
      points: 9999,
      participants: [
          {
            id: 0,
            name: '<nome do participante>'
          },
          {
            id: 1,
            name: '<nome do participante>'
          },
      ],
  };

  let history = useHistory();

  const [data, setData] = React.useState(formDataModel);

  const onChangeForm = (field, value) => {
      setData({...data, [field] : value});
  }

  const onPressParticipant = (index) => {

  }

  return (
    <ScrollView style={styles.container}>
        <Subheading>
            Gincana: {data.gymkhanaName}.
        </Subheading>
        <Surface style={styles.paper}>
            <View style={styles.textButtons}>
                <Text style={styles.textCenter}>Time: {data.teamName}.</Text>
                <Text style={styles.textCenter}>{data.points} pontos.</Text>
            </View>
            {data.participants.map((participant, index) =>
                <View style={styles.textButtons} key={"participant-"+index}>
                    <Text style={styles.textCenter}>{participant.name}</Text>
                    <Button mode="contained" onPress={() => onPressParticipant(index)}>
                        Excluir
                    </Button>
                </View>
            )}
            <View style={styles.textButtons}>
                <Button mode="contained" onPress={() => {}}>
                    Convidar
                </Button>
                <Button mode="contained" onPress={() => {}}>
                    Sair do time
                </Button>
            </View>
        </Surface>
        <Surface style={styles.paper}>
            <Text style={styles.input}>Eventos</Text>
        </Surface>
        <Text style={styles.input}></Text>
    </ScrollView>
  );
}

export default Home;
