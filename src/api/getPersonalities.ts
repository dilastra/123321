import KY from "./api";

interface PersonalitiesResponse {
  personalities: string[];
}

export const getPersonalities: () => Promise<PersonalitiesResponse> =
  async () => await KY.get("whois").json();
