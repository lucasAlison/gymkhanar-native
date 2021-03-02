import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Button, Subheading, Surface, Text } from 'react-native-paper';
import InputWithError from '../components/InputWithError';

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
  button: {
    width: 130,
    alignSelf: 'flex-end'
    //alignSelf: 'center'
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

const Team = ({navigation}) => {
  const formDataModel = {
      gymkhanaName: "<nome da gincana>",
      teamName: null,
      invitations: [
          {
            id: 0,
            teamName: '<nome do time>'
          },
          {
            id: 1,
            teamName: '<nome do time>'
          },
      ],
      teams: [
          {
            id: 0,
            teamName: '<nome do time>'
          },
          {
            id: 1,
            teamName: '<nome do time>'
          },
      ]
  };

  const [data, setData] = React.useState(formDataModel);

  const onChangeForm = (field, value) => {
      setData({...data, [field] : value});
  }

  const onPressConfirm = () => {
      navigation.navigate("Home", {screen: "Home"});
  }

  const onPressInvitation = (index) => {
      navigation.navigate("Home", {screen: "Home"});
  }

  const onPressTeam = (index) => {
      navigation.navigate("Home", {screen: "Home"});
  }

  return (
    <ScrollView style={styles.container}>
        <Subheading style={styles.input}>
            Gincana: {data.gymkhanaName}.
        </Subheading>
        <Subheading>
            Você ainda não faz parte de um time. Para criar um time, basta
            informar o nome e confirmar. Depois do time criado, você pode
            convidar outros participantes. Você pode ainda escolher participar
            de um time já cadastrado ou aceitar um convite recebido.
        </Subheading>
        <Surface style={styles.paper}>
            <InputWithError type={"text"}
                            label={"Nome do time"}
                            name={"teamName"}
                            value={data.teamName}
                            onChange={onChangeForm}
                            visibleError={!data.teamName}
                            labelError={"Nome de time invalido"}
            />
            <Button mode="contained" onPress={onPressConfirm} style={styles.button}>
                Confirmar
            </Button>
        </Surface>
        <Surface style={styles.paper}>
            <Text style={styles.input}>Convites recebidos de outros times</Text>
            {data.invitations.map((invitation, index) =>
                <View style={styles.textButtons} key={"invitation-"+index}>
                    <Text style={styles.textCenter}>{invitation.teamName}</Text>
                    <Button mode="contained" onPress={() => onPressInvitation(index)}>
                        Aceitar
                    </Button>
                </View>
            )}
        </Surface>
        <Surface style={styles.paper}>
            <Text style={styles.input}>Times existentes</Text>
            {data.teams.map((team, index) =>
                <View style={styles.textButtons} key={"team-"+index}>
                    <Text style={styles.textCenter}>{team.teamName}</Text>
                    <Button mode="contained" onPress={() => onPressTeam(index)}>
                        Entrar
                    </Button>
                </View>
            )}
        </Surface>
        <Text style={styles.input}></Text>
    </ScrollView>
  );
}

export default Team;
