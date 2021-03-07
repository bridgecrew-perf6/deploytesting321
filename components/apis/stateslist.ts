import configs from "../../endpoints.config";
import { StatesUS } from "../appTypes/appType";

type getStatesUS = () => Promise<StatesUS[] | null>;

export const getStatesUS: getStatesUS = async () => {
  const response = await (
    await fetch(
      `https://v3.openstates.org/jurisdictions?classification=state&apikey=${configs.StatesAPIKey}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
  ).json();

  if (response.results) {
    return response.results;
  }
};
