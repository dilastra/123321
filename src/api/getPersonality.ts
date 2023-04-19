import KY from "./api";

interface GetPersonalityResponse {
  label: string;
  name: string;
}

export const getPersonality = async ({
  personality,
}: {
  personality: string;
}): Promise<GetPersonalityResponse> =>
  await KY.get(`whois/${personality}`).json();
