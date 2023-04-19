import KY from "./api";

interface GetPersonalitiesResponse {
  personalities: string[];
}

export const getPersonalities: () => Promise<GetPersonalitiesResponse> =
  async () => await KY.get("whois").json();
