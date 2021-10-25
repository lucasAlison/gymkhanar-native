import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Button, Subheading } from 'react-native-paper';
import InputWithError from '../components/InputWithError';
import DialogPolicy from '../components/DialogPolicy';
import api from '../services/api';
import { useRoute } from '@react-navigation/native';

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  input: {
    paddingBottom: 20,
  }
});

const Register = ({navigation}) => {
  const route = useRoute();
  const { gymkhana, email } = route.params;
  const formDataModel = {
      password: null,
      confirmPassword: null,
      name: null,
      email,
      gymkhana: gymkhana
  };  
  
  const [openDialog, setOpenDialog] = React.useState(false);
  const [data, setData] = React.useState(formDataModel);
  
  const onChangeForm = (field, value) => {
      setData({...data, [field] : value});
  }

  const onPressConfirm = async () => {
    try {
      const userData = {
        "name": data.name,
        "username": data.email,
        "email": data.email,
        "password": data.password,
      }

      const userResponse = await api.post('users', userData);
      data.participant = userResponse.data;
      api.get(`/teams/gymkhana/${gymkhana.id}`)
      .then((response) => {
        if (response && response.data) {
          data.gymkhana.teams = response.data;
        }      
        setData(data);
        navigation.navigate("Team", data);
      });
    } catch (err) {
      alert(err.message);
    }
    // let returnData = {registredTeam: false};
    // if(returnData.registredTeam){
    //     navigation.navigate("Home", {screen: "Home"});
    // }else {
    //     navigation.navigate("Team");
    // }
  }

  return (
    <ScrollView style={styles.container}>
      <Subheading style={styles.input}>
          Olá. Você está acessando a gincana {data.gymkhana.name}.
          Como este é seu primeiro acesso no GymkhanarAR,
          por favor, cadastre uma senha e informe seu nome completo.
      </Subheading>
      <Subheading style={styles.input}>
          E-mail: {data.email}.
      </Subheading>
      <InputWithError type={"text"}
                      label={"Senha"}
                      secureTextEntry
                      name={"password"}
                      value={data.password}
                      onChange={onChangeForm}
                      visibleError={false}
                      labelError={null}
      />
      <InputWithError type={"text"}
                      label={"Confirmação da Senha"}
                      secureTextEntry
                      name={"confirmPassword"}
                      value={data.confirmPassword}
                      onChange={onChangeForm}
                      visibleError={!data.password || data.password !== data.confirmPassword}
                      labelError={"Senha invalido"}
      />
      <InputWithError type={"text"}
                      label={"Nome Completo"}
                      name={"name"}
                      value={data.name}
                      onChange={onChangeForm}
                      visibleError={!data.name}
                      labelError={"Nome invalido"}
      />

      <InputWithError type={"checkbox"}
                      label={"Concordo com os Termos de Serviço e a Política de Privacidade do GymkhanarAR."}
                      name={"confirmTerm"}
                      value={data.confirmTerm}
                      onChange={onChangeForm}
                      visibleError={!data.confirmTerm}
                      labelError={"Você deve concordar com os termos de serviço e politica de privacidade."}
      />
      <View style={{flexDirection:'row-reverse', flexWrap:'wrap', ...styles.input}}>
          <Button 
            mode="contained" 
            onPress={onPressConfirm} 
            style={{marginLeft: 10}}
            disabled={data.password && data.name && data.confirmTerm === true ? false : true}
          >
            Confirmar
          </Button>
          <Button mode="contained" onPress={() => navigation.goBack()}>Cancelar</Button>
      </View>
      <Subheading style={styles.input}>
          Para confirmar, você precisa concordar com os termos de serviço
          e a nossa politica de privacidade.
      </Subheading>
      <Button mode="contained" onPress={() => setOpenDialog(true)}>
          Termos de Serviço e Política de Privacidade
      </Button>
      <Subheading style={styles.input}></Subheading>
      <DialogPolicy visible={openDialog}
              hideDialog={() => setOpenDialog(false)}
      />
    </ScrollView>
  );
}

export default Register;
