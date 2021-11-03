import React, { useEffect } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Button, Subheading, Surface, Text } from 'react-native-paper';
import { useRoute } from '@react-navigation/native';
import api from '../services/api';
import * as Linking from 'expo-linking';

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
  textCenterActivity: {
    alignSelf: 'center',    
    width: 115,    
  },
  textCenterName: {
    alignSelf: 'center',
    width: 100,
    textAlign: "center",
  },
  textCenterStatus: {
    alignSelf: 'center',
    width: 100,
    textAlign: "right"
  },
  textCenterHeader: {
    marginRight: 10,
    alignSelf: 'center',
    fontWeight: "bold"
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

  
  const listAtivities = async () => {
    try {
      const tas = await api.get(`/team/activities/team/${data.team.id}`);
      data.team.activities = tas.data;
      data.team.points = team.activities.reduce((total, item) => {        
        return total + item.points;
      }, 0);
      const gymkhanaActivities = await api.get(`activities/gymkhana/${data.gymkhana.id}`);
      data.gymkhana.activities = gymkhanaActivities.data.filter((activity) => {
        if (!data.team.activities){
          return true;
        }
        return !data.team.activities.some(a => a.activity_id === activity.id);
      });       
      setData({...data});   
    } catch (err) {
      alert(err.message);
    }
  }

  useEffect(() => {
    const handle = setInterval(listAtivities, 10000);
    return () => {
      clearInterval(handle);
    };      
  }, []);
  
  const onChangeForm = (field, value) => {
      setData({...data, [field] : value});
  }

  const onPressUnlinkedParticipant = async (participant) => {
    try {
      await api.delete(`users/${participant.id}/team`);      
      const usersTeam = await api.get(`users/team/${data.team.id}`);
      data.team.participants = usersTeam.data;      
      setData({...data});            
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

  const onPressStart = async (activity_id) => {
    const teamActivity = await api.post('team/activities', {
      status: "STARTED",
      team_id: data.team.id,
      activity_id,
      participant_id: data.participant.id,
    }).then((d) => {
      listAtivities();
      let url = 'unitydl://gymkhanar2?token='+d.data.id;      
      Linking.openURL(url);
    });
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
                <Button mode="contained" disabled={data.team.activities.some(
                  a => 
                  a.participant.id === data.participant.id &&
                  a.status !== "FINISHED")
                } onPress={() => onPressLeaveTeam()}>
                    Sair do time
                </Button>
            </View>
        </Surface>
        <Surface style={styles.paper}>
          <View style={styles.viewHeader}>
            <Text style={styles.textHeader}>Atividades do time</Text>                
          </View>
          <View style={styles.textButtons}>
            <Text style={styles.textCenterHeader}>Descrição (Pts)</Text>
            <Text style={styles.textCenterHeader}>Participante</Text>
            <Text style={styles.textCenterHeader}>Status</Text>
          </View>
          {data.team.activities.map((activity, index) =>
            <View style={styles.textButtons} key={"activity-"+index}>
              <Text style={styles.textCenterActivity}>{activity.activity.name+" ("+(activity.activity.points|0)+")"}</Text>
              <Text style={styles.textCenterName}>{activity.participant.name}</Text>
              <Text style={styles.textCenterStatus}>{statusRender(activity.status)}</Text>
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
                <Button mode="contained" onPress={() => onPressStart(activity.id)}>
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
