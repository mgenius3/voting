import React, { useState, useEffect } from "react";
import { getDatabase, ref, get, onValue } from "firebase/database";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../configdb/db";
import styles from "../styles/Home.module.css";

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const pinsRef = ref(db, "votersPin");

// ... (previous code)

// ... (previous code)

export default function Pins() {
  const [pins, setPins] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const snapshot = await get(pinsRef);
      if (snapshot.exists()) {
        const pinsData = [];
        snapshot.forEach((childSnapshot) => {
          const pinData = childSnapshot.val();
          pinsData.push(pinData);
        });
        setPins(pinsData);
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>List of Pins and Vote Counts</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table
          style={{
            borderCollapse: "collapse",
            width: "100%",
            margin: "20px 0",
          }}
        >
          <thead style={{ background: "#f2f2f2" }}>
            <tr>
              <th style={cellStyles}>#</th>
              <th style={cellStyles}>Pin</th>
              <th style={cellStyles}>Vote Count</th>
            </tr>
          </thead>
          <tbody>
            {pins.map((pinData, index) => (
              <tr key={index} style={{ borderBottom: "1px solid #ddd" }}>
                <td style={cellStyles}>{index + 1}</td>
                <td style={cellStyles}>{pinData.pin}</td>
                <td style={cellStyles}>{pinData.voteCount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

const cellStyles = {
  padding: "12px",
  textAlign: "left",
};
