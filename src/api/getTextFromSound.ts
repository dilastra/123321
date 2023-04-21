import KY from "./api";

export const getTextFromSound: (
  formData: FormData
) => Promise<{ result: string }> = async (formData: FormData) =>
  await KY.post("stt", {
    headers: undefined,
    body: formData,
  }).json();
