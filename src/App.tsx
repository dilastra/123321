import styles from "./App.module.scss";
import {
  ChatCompletionResponseMessage,
  Configuration,
  OpenAIApi,
} from "openai";
import ManAvatar from "./assets/images/ManAvatar.svg";
import { Avatar, Button, Divider, Layout } from "antd";
import { Content, Footer, Header } from "antd/es/layout/layout";
import { Chat, InputMessage } from "./components";
import Title from "antd/es/typography/Title";
import { useMemo, useState } from "react";
import { Emotions } from "./components/Emotions";

function App() {
  const [currentEmotion, setCurrentEmotion] = useState<string>("удовлетворен");
  const [messages, setMessages] = useState<ChatCompletionResponseMessage[]>([
    {
      role: "system",
      content:
        "Ты покупатель в магазине. Ты хочешь купить iphone 12. В каждом своем сообщении передавай параметр эмоции, наиболее подходящий для реакции на высказываение User. Список доступных параметров эмоцию: {доволен}, {огорчен}, {удовлетворен}. По завершению диалога дай рекомендации для улучшения сообщения со стороны продавца чтобы повысить вероятность покупки клиентом.",
    },
  ]);

  const [userMessage, setUserMessage] = useState<string>("");

  const [isLoading, setIsloading] = useState<boolean>(false);

  const openAi = useMemo(() => {
    const openAiConfiguration = new Configuration({
      apiKey: "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",
    });

    return new OpenAIApi(openAiConfiguration);
  }, []);

  const sendMessageInChatOpenAi = async (
    messages: ChatCompletionResponseMessage[]
  ) =>
    (
      await openAi.createChatCompletion({
        model: "gpt-3.5-turbo-0301",
        messages: messages.reverse(),
      })
    ).data;
  const onClickSendMessage = async () => {
    setIsloading(true);
    const newUserMessage: ChatCompletionResponseMessage = {
      role: "user",
      content: userMessage,
    };
    setMessages((prev) => [newUserMessage, ...prev]);
    setUserMessage("");
    const newMessage: ChatCompletionResponseMessage = (
      await sendMessageInChatOpenAi([newUserMessage, ...messages])
    ).choices[0].message ?? { role: "assistant", content: "" };
    const regex = /({огорч(ё|е)н})|({удовлетвор(ё|е)н})|({доволен})/;
    if (regex.test(newMessage.content)) {
      const emotion = (newMessage.content.match(regex) ?? [])[0]
        ?.replace("{", "")
        .replace("}", "");
      setCurrentEmotion(emotion ?? "");
    }
    setMessages((prev) => [newMessage, ...prev]);
    setIsloading(false);
  };

  return (
    <Layout className={styles["app-container"]}>
      <Header
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#1677ff",
        }}
      >
        <Title level={2} style={{ color: "#fff", margin: 0 }}>
          Тема тренируемого диалога: Продажа Iphone 12
        </Title>
      </Header>
      <Content
        style={{ overflow: "auto", display: "flex", flexDirection: "column" }}
      >
        <Emotions currentEmotion={currentEmotion ?? ""} />
        <Chat messages={messages.filter(({ role }) => role !== "system")} />
      </Content>
      <Divider style={{ marginTop: "0" }} />
      <Footer className={styles["app-footer"]}>
        <Avatar
          size={64}
          icon={<img src={ManAvatar} alt="avatar" />}
          style={{ minWidth: "64px" }}
        />
        <InputMessage
          value={userMessage}
          onChange={(e) => setUserMessage(e.target.value)}
        />
        <Button
          type="primary"
          onClick={onClickSendMessage}
          disabled={isLoading}
        >
          Отправить
        </Button>
      </Footer>
    </Layout>
  );
}

export default App;
