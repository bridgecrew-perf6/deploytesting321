import { Answer } from "../../../components/appTypes/appType";

export const getNumRanking = (answers: Answer[]) => {
  if (answers.length > 0) {
    const totalFeedBackNum = answers.reduce((total, answer: Answer) => {
      return total + answer.likes.length + answer.dislikes.length;
    }, 0);

    const answersWithScore = answers.map((item) => {
      const answerScore =
        (item.likes.length - item.dislikes.length) *
        ((item.likes.length + item.dislikes.length) / totalFeedBackNum);

      return { ...item, score: answerScore };
    });

    answersWithScore.sort((a, b) => b.score - a.score);

    let uniqueScores = answersWithScore.map((item) => item.score);
    uniqueScores = uniqueScores.filter(
      (val: number, idx: number) =>
        uniqueScores.indexOf(val) === idx && val !== 0
    );

    const answersWithRank = answersWithScore.map((item) => {
      const itemMatchIdx = uniqueScores.indexOf(item.score);

      let rank: string;
      if (itemMatchIdx > -1) {
        rank = `${itemMatchIdx + 1}`;
      } else rank = "Not Ranked";

      const { score, ...rest } = item;
      return { ...rest, rank };
    });

    return answersWithRank.sort((a, b) => {
      return a.rank.toString().localeCompare(b.rank.toString());
    });
  }

  return [];
};
