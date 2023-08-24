import React, { useState } from "react";
import { getDatabase, ref, set } from "firebase/database";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../configdb/db";
import styles from "../styles/Home.module.css";

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

const generateRandomPin = () => {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let randomPin = "";
  for (let i = 0; i < 10; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    randomPin += characters.charAt(randomIndex);
  }
  return randomPin;
};

export default function AdminPurchase() {
  const [pin, setPin] = useState(generateRandomPin());
  const [voteCount, setVoteCount] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handlePurchase = () => {
    for (let i = 0; i < 50; i++) {
      setLoading(true);
      if (voteCount && (voteCount === "5" || voteCount === "10")) {
        const pinRef = ref(db, `votersPin/${generateRandomPin()}`);
        set(pinRef, {
          // pin: generateRandomPin(),
          voteCount: parseInt(voteCount),
          used: false,
        })
          .then(() => {
            setMessage("Pin added successfully.");
            setPin(generateRandomPin());
            setVoteCount("");
            setLoading(false);
          })
          .catch((error) => {
            setMessage("Error adding pin: " + error.message);
            setLoading(false);
          });
      } else {
        setMessage("Invalid input.");
        setLoading(false);
      }
    }
  };

  return (
    <div className={styles.contain}>
      <h1 className={styles.title}>Pin Purchase</h1>
      <br />
      <div>
        <label className={styles.label}>Pin:</label>
        <input type="text" value={pin} readOnly className={styles.input} />
      </div>
      <div>
        <label className={styles.label}>Vote Count:</label>
        <select
          value={voteCount}
          onChange={(e) => setVoteCount(e.target.value)}
          className={styles.select}
        >
          <option value="">Select Vote Count</option>
          <option value="5">5 Votes</option>
          <option value="10">10 Votes</option>
        </select>
      </div>
      <button onClick={handlePurchase} className={styles.button}>
        {loading ? "..." : "Purchase Pin"}
      </button>
      <br />
      <br />
      {message && <p>{message}</p>}
    </div>
  );
}
