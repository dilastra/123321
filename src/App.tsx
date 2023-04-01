import styles from "./App.module.scss";
import { Configuration, OpenAIApi } from "openai";
import { useAsyncEffect } from "ahooks";
import ManAvatar from "./assets/images/ManAvatar.svg";
import { Avatar, Button, Col, Divider, Layout, Row, Space } from "antd";
import { Content, Footer } from "antd/es/layout/layout";
import { InputMessage } from "./components";

function App() {
  const openAiConfiguration = new Configuration({
    apiKey: "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",
  });

  const openAi = new OpenAIApi(openAiConfiguration);

  // useAsyncEffect(async () => {
  //   console.log(
  //     (
  //       await openAi.createChatCompletion({
  //         model: "gpt-3.5-turbo-0301",

  //         messages: [
  //           {
  //             role: "system",
  //             content:
  //               "Вы помогаете в тренировки диалога. Диалог тренирует продавец, который продаёт Iphone 12",
  //           },
  //           {
  //             role: "user",
  //             content: "Здравствуйте. Какой Iphone вы хотите купить?",
  //           },
  //         ],
  //       })
  //     ).data.choices[0].message
  //   );
  // }, []);

  console.log(styles);

  return (
    <Layout className={styles["app-container"]}>
      <Content>Content</Content>
      <Divider />
      <Footer className={styles["app-footer"]}>
        <Avatar
          size={64}
          icon={<img src={ManAvatar} alt="avatar" />}
          style={{ minWidth: "64px" }}
        />
        <InputMessage />
        <Button type="primary">Отправить</Button>
      </Footer>
    </Layout>
  );
}

export default App;
