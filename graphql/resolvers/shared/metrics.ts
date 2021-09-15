import { Answer } from "../../../components/appTypes/appType";
import IAnswer from "../../../models/interfaces/answer";

// export const getNumRanking = (answers: Answer[]) => {
export const getNumRanking = (answers: IAnswer[]) => {
  if (answers.length > 0) {
    const totalFeedBackNum = answers.reduce((total, answer: IAnswer) => {
      // const totalFeedBackNum = answers.reduce((total, answer: Answer) => {
      return total + answer._doc.likes.length + answer._doc.dislikes.length;
    }, 0);

    const answersWithScore = answers.map((item) => {
      const answerScore =
        (item._doc.likes.length - item._doc.dislikes.length) *
        ((item._doc.likes.length + item._doc.dislikes.length) /
          totalFeedBackNum);

      return { ...item, _doc: { ...item._doc, score: answerScore } };
    });

    answersWithScore.sort((a, b) => b._doc.score - a._doc.score);

    let uniqueScores = answersWithScore.map((item) => item._doc.score);
    uniqueScores = uniqueScores.filter(
      (val: number, idx: number) => uniqueScores.indexOf(val) === idx
      // uniqueScores.indexOf(val) === idx && val !== 0
    );

    const answersWithRank = answersWithScore.map((item) => {
      const itemMatchIdx = uniqueScores.indexOf(item._doc.score);

      let rank: string;
      if (item._doc.likes.length === 0 && item._doc.dislikes.length === 0) {
        rank = "Not Ranked";
      } else rank = `${itemMatchIdx + 1}`;

      const { score, ...rest } = item._doc;
      return { ...item, _doc: { ...rest, rank } };
    });

    return answersWithRank.sort((a, b) => {
      return a._doc.rank.toString().localeCompare(b._doc.rank.toString());
    });
  }

  return [];
};
