import KY from "./api";

interface SendMessageToPesonalityParams {
  message: string;
  personality: string;
}

export const sendMessageToPesonality = ({
  message,
  personality,
}: SendMessageToPesonalityParams) =>
  KY.post(`ask/${personality}`, {
    body: JSON.stringify({
      message,
    }),
  });
