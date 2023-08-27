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

        // Assign ranks based on the sorted order
        const rankedResults = sortedResults.map((vote, index) => ({
          ...vote,
          rank: index + 1,
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
              <tr key={index}>
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
