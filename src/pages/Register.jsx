import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { useHistory } from "react-router-native";
import { Button, Subheading } from 'react-native-paper';
import InputWithError from '../components/InputWithError';
import DialogPolicy from '../components/DialogPolicy';

const styles = StyleSheet.create({
  info: {
    paddingTop: 50,
    paddingLeft: 30,
    paddingRight: 30,
    fontSize: 18,
  },
  email: {
    paddingLeft: 30,
    paddingRight: 30,
    paddingBottom: 20,
    fontSize: 18,
  },
  container: {
    paddingTop: 50,
  },
});

const Login = () => {
  const formDataModel = {
      password: null,
      confirmPassword: null,
      name: null,
      nick: null,
      email: "<email informado>",
      code: "sdga",
      gymkhana: "<nome da gincana>"
  };

  const history = useHistory();

  const [openDialog, setOpenDialog] = React.useState(false);
  const [data, setData] = React.useState(formDataModel);

  const onChangeForm = (field, value) => {
      setData({...data, [field] : value});
  }

  const onPressConfirm = () => {
      let returnData = {registredTeam: true};
      if(returnData.registredTeam){
          history.push("/home");
      }else {
          history.push("/team");
      }
  }

  return (
    <ScrollView>
      <Subheading style={styles.info}>
          Olá. Você está acessando a gincana {data.gymkhana}.
          Como este é seu primeiro acesso no GymkhanarAR,
          por favor, cadastre uma senha, seu nome completo e apelido.
      </Subheading>
      <View style={styles.container}>
          <Subheading style={styles.email}>
              E-mail: {data.email}
          </Subheading>
          <InputWithError type={"text"}
                          label={"Senha"}
                          name={"password"}
                          value={data.password}
                          onChange={onChangeForm}
                          visibleError={false}
                          labelError={null}
          />
          <InputWithError type={"text"}
                          label={"Confirmação da Senha"}
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
          <InputWithError type={"text"}
                          label={"Apelido usado pelo GymkhanarAR"}
                          name={"nick"}
                          value={data.nick}
                          onChange={onChangeForm}
                          visibleError={!data.nick}
                          labelError={"Apelido invalido"}
          />
          <InputWithError type={"checkbox"}
                          label={"Concordo com os Termos de Serviço e a Política de Privacidade do GymkhanarAR."}
                          name={"confirmTerm"}
                          value={data.confirmTerm}
                          onChange={onChangeForm}
                          visibleError={!data.confirmTerm}
                          labelError={"Você deve concordar com os termos de serviço e politica de privacidade."}
          />
          <Button mode="contained" onPress={onPressConfirm}>Confirmar</Button>
          <Button mode="contained" onPress={() => history.push("/")}>Cancelar</Button>
          <Subheading>
              Para confirmar, você precisa concordar com os termos de serviço
              e a nossa politica de privacidade.
          </Subheading>
          <Button mode="contained" onPress={() => setOpenDialog(true)}>
              Termos de Serviço e Política de Privacidade
          </Button>
      </View>
      <DialogPolicy visible={openDialog}
              hideDialog={() => setOpenDialog(false)}
      />
    </ScrollView>
  );
}

export default Login;
