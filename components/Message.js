import React from "react";
import styles from "../styles/Home.module.css";

const Message = ({ text }) => (
  <div id="message" className={styles.client}>
    {text}
  </div>
);

export default Message;
