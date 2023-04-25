import KY from "./api";

interface ClearMessagesParams {
  personality: string;
}

export const clearMessages = ({ personality = "" }: ClearMessagesParams) =>
  KY.post(`init/${personality}`).json();
