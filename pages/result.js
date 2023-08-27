import React, { useState, useEffect } from "react";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import { firebaseConfig } from "../configdb/db";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, get } from "firebase/database";
import resultsStyles from "../styles/Results.module.css";

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

const ResultsPage = () => {
  const [results, setResults] = useState([]);
  const [winner, setWinner] = useState(null); // State to store the winner

  useEffect(() => {
    const fetchData = async () => {
      const votesRef = ref(db, "votes");

      try {
        const snapshot = await get(votesRef);

        const votesData = [];

        snapshot.forEach((childSnapshot) => {
          const vote = childSnapshot.val();
          votesData.push(vote);
        });

        // Sort the results by the number of votes in descending order
        const sortedResults = votesData.sort(
          (a, b) => b.noCandidateVote - a.noCandidateVote
        );

        // Set the winner based on the first element in the sortedResults array
        if (sortedResults.length > 0) {
          setWinner(sortedResults[0]);
        }

        // Map numeric ranks to their corresponding strings (1st, 2nd, 3rd, etc.)
        const rankStrings = ["1st", "2nd", "3rd", "4th", "5th" /* ... */];

        // Assign ranks based on the sorted order
        const rankedResults = sortedResults.map((vote, index) => ({
          ...vote,
          rank: rankStrings[index] || `${index + 1}th`,
        }));

        setResults(rankedResults);
      } catch (error) {
        console.error("Error fetching vote results:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>Vote Results</title>
        <link rel="icon" href="/images/contestant1.jpeg" />
      </Head>

      <div className={resultsStyles.results}>
        {/* Display the winner */}
        {winner && (
          <div className={resultsStyles.winner}>
            <h2>
              Winner: <b style={{ color: "green" }}>{winner.candidateId}</b>
            </h2>
            <p
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "start",
              }}
            >
              Number of Votes:{" "}
              <b style={{ color: "red", fontSize: "40px" }}>
                {" "}
                {winner.noCandidateVote ?? 0}
              </b>{" "}
            </p>
          </div>
        )}

        {/* Display the results table */}
        <table className={resultsStyles.resultsTable}>
          <thead>
            <tr>
              <th>RANK</th>
              <th>CANDIDATE NAME</th>
              <th>NO OF VOTES</th>
            </tr>
          </thead>
          <tbody>
            {results.map((vote, index) => (
              <tr
                key={index}
                style={{
                  color:
                    index === 0 ? "goldenrod" : index === 1 ? "gold" : "white",

                  fontWeight:
                    index === 0 || index === 1 || index === 2
                      ? "bolder"
                      : "normal",
                }}
              >
                <td>{vote.rank}</td>
                <td>{vote.candidateId}</td>
                <td>{vote.noCandidateVote ?? 0}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ResultsPage;
