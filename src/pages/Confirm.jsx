import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useHistory } from "react-router-native";
import { Button, Subheading } from 'react-native-paper';
import InputWithError from '../components/InputWithError';

const styles = StyleSheet.create({
  info: {
    padding: 30,
    fontSize: 18,
  },
});

const Login = () => {
  const formDataModel = {
      password: null,
      name: "<apelido>",
      email: "<email informado>",
      code: "sdga",
      gymkhana: "<nome da gincana>"
  };

  const history = useHistory();

  const [data, setData] = React.useState(formDataModel);

  const onChangeForm = (field, value) => {
      setData({...data, [field] : value});
  }

  return (
    <View>
        <Subheading style={styles.info}>
            Olá {data.name}. Você está acessando a gincana {data.gymkhana}.
            Por favor, informe sua senha para continuar
        </Subheading>
        <View>
            <InputWithError type={"text"}
                            label={"Senha"}
                            name={"password"}
                            value={data.password}
                            onChange={onChangeForm}
                            visibleError={!data.password}
                            labelError={"Senha invalido"}
            />
            <Button mode="contained" onPress={() => history.push("/home/")}>Confirmar</Button>
        </View>
    </View>
  );
}

export default Login;
