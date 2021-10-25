import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Button, Subheading, Surface, Text } from 'react-native-paper';
import { useRoute } from '@react-navigation/native';
import api from '../services/api';

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
  },
  viewHeader: {
    borderTopWidth: 1,
    width: 300,
    borderTopColor: '#000',
    borderStyle: 'solid',
    marginLeft: 10,
    marginBottom: 20,
    alignSelf: 'flex-start',
  },
  textHeader: {    
    alignSelf: 'center',
    marginTop: 10,
    fontSize: 18,
    fontWeight: 'bold'
  }
});

const Home = ({navigation}) => {

  const route = useRoute();
  const { gymkhana, participant, team } = route.params;
  const formDataModel = {
    gymkhana,
    team,
    participant
  };  
  const [data, setData] = React.useState(formDataModel);
  // const listGymkhanaAtivities = async () => {
  //   try {
  //     const gymkhanaActivities = await api.get(`activities/gymkhana/${data.gymkhana.id}`);
  //     data.gymkhana.activities = gymkhanaActivities.data;
  //     setData(data);   
  //   } catch (err) {
  //     alert(err.message);
  //   }
  // }
  // listGymkhanaAtivities();

  const onChangeForm = (field, value) => {
      setData({...data, [field] : value});
  }

  const onPressUnlinkedParticipant = async (participant) => {
    try {
      await api.delete(`users/${participant.id}/team`);      
      const usersTeam = await api.get(`users/team/${data.team.id}`);
      data.team.participants = usersTeam.data;
      setData(data);            
      navigation.navigate("Home", data);
    } catch (err) {
      alert(err.message);
    }
  }

  const onPressLeaveTeam = async () => {
    try {
      const userTeamUnlinked = await api.delete(`users/${data.participant.id}/team`);      
      
      data.participant = userTeamUnlinked.data;
      setData(data);
      navigation.navigate("Team", data);
    } catch (err) {
      alert(err.message);
    }
  }

  const statusRender = (item) => {
    switch (item) {
      case 'STARTED':
        return 'Iniciada';
      case 'FINISHED':
        return 'Finalizada';
      case 'PAUSED':
        return 'Pausada';
    }
  }

  return (
    <ScrollView style={styles.container}>
        <Subheading>
            Gincana: {data.gymkhana.name}.
        </Subheading>
        <Surface style={styles.paper}>
            <View style={styles.textButtons}>
                <Text style={styles.textCenter}>Time: {data.team.name}.</Text>
                <Text style={styles.textCenter}>{data.team.points} pontos.</Text>
            </View>            
            <View style={styles.viewHeader}>
                <Text style={styles.textHeader}>Participantes</Text>                
            </View>
            {data.team.participants.map((participant, index) =>
                <View style={styles.textButtons} key={"participant-"+index}>
                    <Text style={styles.textCenter}>{participant.name}</Text>
                    {
                      participant.id !== data.participant.id ?
                      <Button mode="contained" onPress={() => onPressUnlinkedParticipant(participant)}>
                          Excluir
                      </Button> : <></>
                    }
                </View>
            )}
            <View style={styles.textButtons}>
                <Button mode="contained" onPress={() => onPressLeaveTeam()}>
                    Sair do time
                </Button>
            </View>
        </Surface>
        <Surface style={styles.paper}>
          <View style={styles.viewHeader}>
            <Text style={styles.textHeader}>Atividades do time</Text>                
          </View>
          <View style={styles.textButtons}>
            <Text style={styles.textCenter}>Descrição</Text>
            <Text style={styles.textCenter}>Pontos</Text>
            <Text style={styles.textCenter}>Status</Text>
          </View>
          {data.team.activities.map((activity, index) =>
            <View style={styles.textButtons} key={"activity-"+index}>
              <Text style={styles.textCenter}>{activity.activity.name}</Text>
              <Text style={styles.textCenter}>{activity.points}</Text>
              <Text style={styles.textCenter}>{statusRender(activity.status)}</Text>
            </View>
          )}
        </Surface>
        <Surface style={styles.paper}>
          <View style={styles.viewHeader}>
              <Text style={styles.textHeader}>Atividades da gincana</Text>                
          </View>
          {data.gymkhana.activities.map((activity, index) =>
            <View style={styles.textButtons} key={"activity-"+index}>
              <Text style={styles.textCenter}>{activity.name}</Text>
                <Button mode="contained">
                  Iniciar
                </Button>
            </View>
          )}
        </Surface>
        <Text style={styles.input}></Text>
    </ScrollView>
  );
}

export default Home;
