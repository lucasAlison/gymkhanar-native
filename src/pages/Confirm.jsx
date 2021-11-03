import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Subheading } from 'react-native-paper';
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
  button: {
    width: 150,
    //alignSelf: 'flex-end'
    alignSelf: 'center'
  }
});

const Confirm = ({navigation}) => {
  const route = useRoute();
  const { gymkhana, participant } = route.params;  
  const formDataModel = {
    password: null,
    participant,      
    gymkhana
  };

  const [data, setData] = React.useState(formDataModel);

  const onChangeForm = (field, value) => {
      setData({...data, [field] : value});
  }

  const onPressConfirm = async () => {
    try {
      await api.post('sessions', {
        username: data.participant.username,
        password: data.password,
      });
      const teamsGymkhana = await api.get(`/teams/gymkhana/${data.gymkhana.id}`);
      if (teamsGymkhana && teamsGymkhana.data) {
        data.gymkhana.teams = teamsGymkhana.data;
      }
      if (data.participant.team_id) {
        const team = data.participant.team;
        const usersTeam = await api.get(`users/team/${team.id}`);

        team.participants = usersTeam.data;
        team.points = 0;
        team.activities = [];

        const gymkhanaActivities = await api.get(`activities/gymkhana/${data.gymkhana.id}`);
        gymkhana.activities = gymkhanaActivities.data.filter((activity) => {
          if (!team.activities){
            return true;
          }
          return !team.activities.some(a => a.activity_id === activity.id);
        });       

        const teamActivities = await api.get(`/team/activities/team/${team.id}`);
        team.activities = teamActivities.data;
        team.points = team.activities.reduce((total, item) => {
          return total + item.points;
        }, 0);
        setData(data);
        navigation.navigate("Home", {
          gymkhana: data.gymkhana,
          participant: data.participant,
          team
        });
      } else {
        setData(data);
        navigation.navigate("Team", data);
      }

    } catch (err) {      
      alert(err.message);
    }
    // console.log(user);
    // () => navigation.navigate("Home", {screen: 'Home'})
  }

  return (
    <View style={styles.container}>
        <Subheading style={styles.input}>
            Olá {data.participant.name}. Você está acessando a gincana {data.gymkhana.name}.
            Por favor, informe sua senha para continuar
        </Subheading>
        <InputWithError type={"text"}
                        label={"Senha"}
                        secureTextEntry
                        name={"password"}
                        value={data.password}
                        onChange={onChangeForm}
                        visibleError={!data.password}
                        labelError={"Senha invalido"}
                        style={styles.input}
        />
        <Button mode="contained"  style={styles.button} onPress={onPressConfirm}>
            Confirmar
        </Button>
    </View>
  );
}

export default Confirm;
