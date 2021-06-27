import { ResolverMap } from "../../components/appTypes/appType";
import configs from "../../endpoints.config";

export const otherResolvers: ResolverMap = {
  Query: {
    statesUS: async (parent, args, ctx) => {
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
    },
  },
  Mutation: {},
};
