import KY from "./api";

interface GetFeedpackParams {
  personality: string;
}

export const getFeedback = async ({ personality }: GetFeedpackParams) => {
  console.log(personality);
  return await KY.post(`ask/${personality}/end`).json();
};
