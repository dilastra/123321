import { Avatar, Button, Divider, Layout } from "antd";
import { Content, Footer, Header } from "antd/es/layout/layout";
import {
  ChatCompletionResponseMessage,
  Configuration,
  OpenAIApi,
} from "openai";
import { useCallback, useMemo, useState } from "react";
import { Chat, InputMessage } from "../../components";
import { Emotions } from "../../components/Emotions";
import styles from "./DialogTrainer.module.scss";
import ManAvatar from "../../assets/images/ManAvatar.svg";
import { useNavigate } from "react-router-dom";
import { useAsyncEffect, useEventListener } from "ahooks";

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

  const sendMessageInChatOpenAi = useCallback(
    async (messages: ChatCompletionResponseMessage[]) =>
      (
        await openAi.createChatCompletion({
          model: "gpt-3.5-turbo-0301",
          messages: messages.reverse(),
        })
      ).data,
    [openAi]
  );

  useAsyncEffect(async () => {
    if (!currentPrompt) {
      navigate("/");
      return;
    }
    const newUserMessage: ChatCompletionResponseMessage = {
      role: "user",
      content: "Здравствуйте. Чем я могу вам помочь?",
    };
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
  }, [currentPrompt, navigate, sendMessageInChatOpenAi]);

  useEventListener("keypress", (event) => {
    if (event.key.toLowerCase() === "enter" && userMessage.trim().length > 0) {
      onClickSendMessage();
    }
  });

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
