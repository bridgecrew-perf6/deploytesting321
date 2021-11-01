import {
  ContentModeratorClientContext,
  TextModeration,
} from "@azure/cognitiveservices-contentmoderator";
import { CognitiveServicesCredentials } from "@azure/ms-rest-azure-js";
import { roundValue } from "_components/globalFuncs";
import configs from "../../../endpoints.config";

const { ModeratorAPIKey, ModeratorEndPoint } = configs;

export const moderateText = async (content: string) => {
  const cognitiveServiceCredentials = new CognitiveServicesCredentials(
    ModeratorAPIKey
  );
  const client = new ContentModeratorClientContext(
    cognitiveServiceCredentials,
    ModeratorEndPoint
  );

  const textmoderator = new TextModeration(client);

  try {
    const moderationResults = await textmoderator.screenText(
      "text/plain",
      content,
      {
        classify: true,
      }
    );

    if (moderationResults) {
      const { classification, terms, language } = moderationResults;
      const sexuallyExplicitCat = roundValue(classification?.category1?.score);
      const sexuallySugestiveCat = roundValue(classification?.category2?.score);
      const offensiveLangCat = roundValue(classification?.category3?.score);

      let blockContent: boolean = false;

      if (
        sexuallyExplicitCat > 80 ||
        sexuallySugestiveCat > 80 ||
        offensiveLangCat > 80
      ) {
        blockContent = true;
      }

      return {
        moderationType: "text",
        sexuallyExplicitCat,
        sexuallySugestiveCat,
        offensiveLangCat,
        terms,
        language,
        reviewRecommended: classification?.reviewRecommended,
        blockContent,
      };
    }
  } catch (err) {
    return null;
  }
};
