import React from 'react';
import { View, ScrollView } from 'react-native';
import { Button, Paragraph, Dialog, Portal } from 'react-native-paper';

const DialogPolicy = ({visible, hideDialog}) => {
  return (
    <View>
      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog}>
          <Dialog.Title>Termos de Serviço e Política de Privacidade</Dialog.Title>
          <Dialog.Content>
            <ScrollView style={{height: 470}}>
                <Paragraph>
                  Lorem ipsum dolor sit amet. Et nihil maiores et ipsum velit
                  asperiores molestias non maiores nobis rem sapiente voluptate!
                  Nam voluptates soluta qui dolorem labore ut expedita dolore ut
                  possimus voluptatem. Et molestias dolorem  fugiat unde quo
                  molestias eius sed dolor cupiditate aut dolores dolorem. Est
                  quisquam magnam ut dolorem molestiae sed sequi accusamus! Sed
                  totam nemo At consequuntur facere est harum autem ut vero totam
                  et sapiente facere. Eum nihil rerum et voluptas repellendus eos
                  repudiandae laboriosam. Ut quia saepe sed explicabo voluptatem
                  qui eveniet officia est molestiae inventore et dolorum omnis ad
                  obcaecati labore. Eos voluptatem voluptatem est voluptates itaque
                  accusantium enim. In rerum ducimus rem eligendi minus sed aliquam
                  distinctio et delectus corrupti. Est quae molestias et ducimus
                  consequuntur a necessitatibus alias et maiores eveniet a sint porro.
                  Ea commodi voluptatem sit nesciunt similique quo molestiae iure
                  et rerum nihil id sint saepe et nihil delectus aut aliquid consequatur.
                  Ut tenetur suscipit id libero blanditiis et placeat quasi sed animi
                  error aut obcaecati voluptatem quo blanditiis ullam ab numquam
                  repudiandae. Eos modi laudantium id rerum velit sed tenetur consequatur!
                  Et impedit aliquid est reiciendis omnis et asperiores itaque
                  rem accusantium necessitatibus. Ut porro reiciendis aut rerum
                  porro rem voluptate fugit aut sint enim ut obcaecati quia eum
                  repellat optio sed molestias nihil. Ut beatae eaque ab eveniet
                  tempore et pariatur voluptatibus ut consequatur aperiam sed dolorem
                  sint ea optio veniam. 33 cupiditate labore est dolor magni nam neque
                  magnam. Sit illum consequuntur At quos sequi quo deserunt tempora
                  et illum incidunt sed dolores fugit eum mollitia nihil non totam
                  temporibus. Hic consequatur harum qui facere obcaecati eos suscipit
                  internos qui accusantium consequatur qui molestiae cupiditate a
                  consectetur autem. Est veniam accusamus sit nihil sunt vel nihil
                  quod eum harum dolores ut nemo sunt nam tempora minus. Aut aliquid
                  necessitatibus non ducimus officia hic modi voluptatem.
                </Paragraph>
            </ScrollView>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={hideDialog}>Fechar</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
};

export default DialogPolicy;
