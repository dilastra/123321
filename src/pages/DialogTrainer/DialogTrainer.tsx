import { Avatar, Button, Divider, Layout } from "antd";
import { Content, Footer, Header } from "antd/es/layout/layout";
import {
  ChatCompletionResponseMessage,
  Configuration,
  OpenAIApi,
} from "openai";
import { useEffect, useMemo, useState } from "react";
import { Chat, InputMessage } from "../../components";
import { Emotions } from "../../components/Emotions";
import styles from "./DialogTrainer.module.scss";
import ManAvatar from "../../assets/images/ManAvatar.svg";
import { useNavigate } from "react-router-dom";

const DialogTrainer = ({ currentPrompt }: { currentPrompt: string }) => {
  const navigate = useNavigate();
  const [currentEmotion, setCurrentEmotion] = useState<string>("удовлетворен");
  const [messages, setMessages] = useState<ChatCompletionResponseMessage[]>([
    {
      role: "system",
      content: currentPrompt,
    },
  ]);

  const [userMessage, setUserMessage] = useState<string>("");

  const [isLoading, setIsloading] = useState<boolean>(false);

  const openAi = useMemo(() => {
    const openAiConfiguration = new Configuration({
      organization: "org-SM2qltV3Bg6oOX6HJ3b5tzAF",
      apiKey: "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",
    });

    return new OpenAIApi(openAiConfiguration);
  }, []);

  useEffect(() => {
    if (!currentPrompt) {
      navigate("/");
    }
  }, [currentPrompt, navigate]);

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

  const onClickBackButton = () => {
    navigate("/");
  };

  return (
    <Layout className={styles["chat-container"]}>
      <Header
        style={{
          display: "flex",
          alignItems: "center",
          backgroundColor: "#C861F9",
        }}
      >
        <Button
          style={{ color: "#C861F9", borderColor: "#C861F9" }}
          onClick={onClickBackButton}
        >
          Назад
        </Button>
      </Header>
      <Content
        style={{ overflow: "auto", display: "flex", flexDirection: "column" }}
      >
        <Emotions currentEmotion={currentEmotion ?? ""} />
        <Chat messages={messages.filter(({ role }) => role !== "system")} />
      </Content>
      <Divider style={{ marginTop: "0" }} />
      <Footer className={styles["chat-footer"]}>
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
          style={{ backgroundColor: "#C861F9" }}
        >
          Отправить
        </Button>
      </Footer>
    </Layout>
  );
};

export default DialogTrainer;
