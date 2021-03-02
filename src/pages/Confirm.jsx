import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Subheading } from 'react-native-paper';
import InputWithError from '../components/InputWithError';

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
  const formDataModel = {
      password: null,
      name: "<apelido>",
      email: "<email informado>",
      code: "sdga",
      gymkhana: "<nome da gincana>"
  };

  const [data, setData] = React.useState(formDataModel);

  const onChangeForm = (field, value) => {
      setData({...data, [field] : value});
  }

  return (
    <View style={styles.container}>
        <Subheading style={styles.input}>
            Olá {data.name}. Você está acessando a gincana {data.gymkhana}.
            Por favor, informe sua senha para continuar
        </Subheading>
        <InputWithError type={"text"}
                        label={"Senha"}
                        name={"password"}
                        value={data.password}
                        onChange={onChangeForm}
                        visibleError={!data.password}
                        labelError={"Senha invalido"}
                        style={styles.input}
        />
        <Button mode="contained"  style={styles.button}
                onPress={() => navigation.navigate("Home", {screen: 'Home'})}>
            Confirmar
        </Button>
    </View>
  );
}

export default Confirm;
