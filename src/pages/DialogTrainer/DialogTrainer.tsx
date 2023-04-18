import {
  ChatCompletionResponseMessage,
  Configuration,
  OpenAIApi,
} from "openai";
import { useCallback, useMemo, useState } from "react";
import {
  Button,
  Chat,
  Footer,
  Header,
  InterlocutorCard,
} from "../../components";
import { Emotions } from "../../components/Emotions";
import styles from "./DialogTrainer.module.scss";
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
    {
      role: "user",
      content: "Здравствуйте. Чем я могу вам помочь?",
    },
    {
      role: "user",
      content: "Здравствуйте. Чем я могу вам помочь?",
    },
    {
      role: "user",
      content: "Здравствуйте. Чем я могу вам помочь?",
    },
  ]);

  const [userMessage, setUserMessage] = useState<string>("");

  const [isLoading, setIsloading] = useState<boolean>(true);

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

  // useAsyncEffect(async () => {
  //   if (!currentPrompt) {
  //     navigate("/");
  //     return;
  //   }
  //   const newUserMessage: ChatCompletionResponseMessage = {
  //     role: "user",
  //     content: "Здравствуйте. Чем я могу вам помочь?",
  //   };
  //   setMessages((prev) => [newUserMessage, ...prev]);
  //   const newMessage: ChatCompletionResponseMessage = (
  //     await sendMessageInChatOpenAi([newUserMessage, ...messages])
  //   ).choices[0].message ?? { role: "assistant", content: "" };
  //   const regex = /({огорч(ё|е)н})|({удовлетвор(ё|е)н})|({доволен})/;
  //   if (regex.test(newMessage.content)) {
  //     const emotion = (newMessage.content.match(regex) ?? [])[0]
  //       ?.replace("{", "")
  //       .replace("}", "");
  //     setCurrentEmotion(emotion ?? "");
  //   }
  //   setMessages((prev) => [newMessage, ...prev]);
  //   setIsloading(false);
  // }, [currentPrompt, navigate, sendMessageInChatOpenAi]);

  // useEventListener("keypress", (event) => {
  //   if (event.key.toLowerCase() === "enter" && userMessage.trim().length > 0) {
  //     onClickSendMessage();
  //   }
  // });

  // const onClickSendMessage = async () => {
  //   setIsloading(true);
  //   const newUserMessage: ChatCompletionResponseMessage = {
  //     role: "user",
  //     content: userMessage,
  //   };
  //   setMessages((prev) => [newUserMessage, ...prev]);
  //   setUserMessage("");
  //   const newMessage: ChatCompletionResponseMessage = (
  //     await sendMessageInChatOpenAi([newUserMessage, ...messages])
  //   ).choices[0].message ?? { role: "assistant", content: "" };
  //   const regex = /({огорч(ё|е)н})|({удовлетвор(ё|е)н})|({доволен})/;
  //   if (regex.test(newMessage.content)) {
  //     const emotion = (newMessage.content.match(regex) ?? [])[0]
  //       ?.replace("{", "")
  //       .replace("}", "");
  //     setCurrentEmotion(emotion ?? "");
  //   }
  //   setMessages((prev) => [newMessage, ...prev]);
  //   setIsloading(false);
  // };

  return (
    <div className={styles.container}>
      <Header></Header>
      <main className={styles.main}>
        <InterlocutorCard />
        <Chat messages={messages.filter(({ role }) => role !== "system")} />
      </main>
      <Footer className={styles.footer}>
        <Button className={styles["end-button"]}>Завершить</Button>
      </Footer>
    </div>
  );
};

export default DialogTrainer;
