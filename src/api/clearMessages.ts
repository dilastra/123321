import KY from "./api";

interface ClearMessagesParams {
  personality: string;
}

export const clearMessages = ({ personality = "" }: ClearMessagesParams) =>
  KY.post(`ask/init/${personality}`);
