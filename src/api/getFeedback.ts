import KY from "./api";

interface GetFeedpackParams {
  personality: string;
}

export const getFeedback = async ({ personality }: GetFeedpackParams) =>
  await KY.get(`ask/${personality}/end`).json();
