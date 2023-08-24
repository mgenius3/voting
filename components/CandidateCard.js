import React from "react";
import styles from "../styles/Home.module.css";

const CandidateCard = ({ id, imageUrl, onClick, selected }) => (
  <div
    className={`${styles.candidate} ${selected ? styles.el : ""}`}
    onClick={() => onClick(id)}
  >
    <img src={imageUrl} alt={`Client ${id}`} />
    <button className={`${styles.votebutton}`}>
      Vote <b className={styles.client}>{id}</b>
    </button>
  </div>
);

export default CandidateCard;
