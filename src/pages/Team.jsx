import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Button, Subheading, Surface, Text } from 'react-native-paper';
import InputWithError from '../components/InputWithError';
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
  const route = useRoute();
  const { gymkhana, participant } = route.params;

  
  const formDataModel = {
    gymkhana: gymkhana,
    participant: participant,
    teamName: null,
    teams: gymkhana.teams
  };
  
  
  const [data, setData] = React.useState(formDataModel);
  
  const onChangeForm = (field, value) => {
      setData({...data, [field] : value});
  }

  const onPressConfirm = async () => {    
    try {
      const teamResponse = await api.post('teams', {
        name: data.teamName
      });  
      await api.post(`/teams/${teamResponse.data.id}/gymkhana`,{ 
        gymkhana_id: data.gymkhana.id
      });      
      const userTeamLinked = await api.post(`users/${data.participant.id}/team`,{
        team_id: teamResponse.data.id
      });
      const usersTeam = await api.get(`users/team/${teamResponse.data.id}`);
      const team = teamResponse.data;

      team.participants = usersTeam.data;
      team.points = 0;
      team.activities = [];

      const gymkhanaActivities = await api.get(`activities/gymkhana/${data.gymkhana.id}`);
      gymkhana.activities = gymkhanaActivities.data;

      const teamActivities = await api.get(`/team/activities/team/${team.id}`);
      team.activities = teamActivities.data;
      team.points = team.activities.reduce((total, item) => {
        return total + item.points;
      }, 0);

      navigation.navigate("Home", {
        gymkhana,
        participant: userTeamLinked.data,
        team
      });

    } catch (err) {
      alert(err.message);
    } 
    
    
  }

  const onPressTeam = async (team) => {
    try {
      const userTeamLinked = await api.post(`users/${data.participant.id}/team`,{
        team_id: team.id
      });
      const usersTeam = await api.get(`users/team/${team.id}`);
      
      team.participants = usersTeam.data;
      team.activities = [];
      
      const gymkhanaActivities = await api.get(`activities/gymkhana/${data.gymkhana.id}`);
      
      const teamActivities = await api.get(`/team/activities/team/${team.id}`);
      team.activities = teamActivities.data;
      team.points = team.activities.reduce((total, item) => {
        return total + item.points;
      }, 0);

      gymkhana.activities = gymkhanaActivities.data.filter((activity) => {
        if (!team.activities){
          return true;
        }
        return !team.activities.some(a => a.activity_id === activity.id);
      });
      
      navigation.navigate("Home", {
        gymkhana,
        participant: userTeamLinked.data,
        team
      });
    } catch (err) {
      alert(err.message);
    } 
  }

  return (
    <ScrollView style={styles.container}>
        <Subheading style={styles.input}>
            Gincana: {data.gymkhana.name}.
        </Subheading>
        <Subheading>
            Você ainda não faz parte de um time. Para criar um time, basta
            informar o nome e confirmar. Depois do time criado, outros participantes poderão entrar no seu time. 
            Você pode ainda escolher participar de um time já cadastrado.
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
            <Button 
              mode="contained" 
              onPress={onPressConfirm} 
              style={styles.button}
              disabled={!data.teamName ? true : false}
            >
                Confirmar
            </Button>
        </Surface>
        <Surface style={styles.paper}>
            <Text style={styles.input}>Times existentes</Text>
            {data.teams.map((team, index) =>
                <View style={styles.textButtons} key={"team-"+team.id}>
                    <Text style={styles.textCenter}>{team.name}</Text>
                    <Button mode="contained" onPress={() => onPressTeam(team)}>
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
