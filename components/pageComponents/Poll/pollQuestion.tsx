import React, { useState } from "react";
import { AiOutlineHeart, AiTwotoneHeart } from "react-icons/ai";
import styles from "../../../appStyles/appStyles.module.css";
import pollStyles from '../../../appStyles/pollStyles.module.css'

const PollQuestion = ({ question }: { question: string }) => {
  const [btnState, toggleBtn] = useState(false);

  const likeIcon = btnState ? (
    <AiTwotoneHeart
      size={25}
      color="red"
      onClick={() => toggleBtn(!btnState)}
    />
  ) : (
    <AiOutlineHeart size={25} onClick={() => toggleBtn(!btnState)} />
  );

  return (
    <div className={`alert alert-danger ${pollStyles.questionWindow}`} role="alert">
      <h3 className={`${styles.cursor}`}>{likeIcon}</h3>
      <p className={`${pollStyles.questionTxt}`}>{question}</p>
    </div>
  );
};

export default PollQuestion;
