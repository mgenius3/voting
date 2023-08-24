import React, { useState } from "react";
import Head from "next/head";
import CandidateCard from "../components/CandidateCard";
import VerificationForm from "../components/VerificationForm";
import Message from "../components/Message";
import styles from "../styles/Home.module.css";
import { firebaseConfig } from "../configdb/db";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import "firebase/database"; // Import the Realtime Database module
import { getDatabase, ref, update, get, set } from "firebase/database";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app); // Get a reference to the Realtime Database

export default function Home() {
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [verificationId, setVerificationId] = useState("");
  const [candidateselected, setCandidateSelected] = useState(false);
  const [message, setMessage] = useState("");
  const [verifyloading, setVerifyLoading] = useState(false);

  const handleCandidateSelect = (candidateId) => {
    setSelectedCandidate(candidateId);
    setMessage(`You have selected Candidate ${candidateId}`);
    setCandidateSelected(true);
  };
  // Rest of the code...

  const handleVerify = async () => {
    setVerifyLoading(true);
    if (selectedCandidate && verificationId.trim() !== "") {
      const votersPinRef = ref(db, `votersPin/${verificationId.trim()}`);

      const votersPinSnapshot = await get(votersPinRef);

      if (votersPinSnapshot.exists() && !votersPinSnapshot.val().used) {
        // Assuming you have a "votes" node in the Realtime Database
        const votesRef = ref(db, `votes/${selectedCandidate}`);

        const voteData = {
          candidateId: selectedCandidate,
          voterId: verificationId,
          timestamp: new Date().toISOString(),
          noCandidateVote: votersPinSnapshot.val().voteCount || 0, // Initialize vote count
        };

        // Fetch existing votesRef data to check for noCandidateVote
        const existingVotesSnapshot = await get(votesRef);
        const existingNoCandidateVote = existingVotesSnapshot.exists()
          ? existingVotesSnapshot.val().noCandidateVote || 0
          : 0;

        // Calculate updated noCandidateVote
        const updatedNoCandidateVote =
          existingNoCandidateVote + voteData.noCandidateVote;

        // Set the vote data directly to the Realtime Database
        set(votesRef, { ...voteData, noCandidateVote: updatedNoCandidateVote })
          .then(() => {
            toast.success(
              `Vote for Candidate ${selectedCandidate} successfully recorded.`
            );
            setVerifyLoading(false);

            // Set the voter's pin as used
            update(votersPinRef, { used: true });
          })
          .catch((error) => {
            toast.error("Error recording the vote.");
            console.error("Error recording vote:", error);
            setVerifyLoading(false);
          });
      } else {
        toast.error("Invalid voter ID or ID already used.");
        setVerifyLoading(false);
      }
    } else {
      toast.error("Please select a candidate and enter a valid ID.");
      setVerifyLoading(false);
    }
  };

  if (candidateselected)
    return (
      <div className={styles.container}>
        <Head>
          <title>Enter Voting ID</title>
          <link rel="icon" href="/images/contestant1.jpeg" />
        </Head>

        <h1 className={styles.title}>Enter Voting ID</h1>
        <VerificationForm
          verificationId={verificationId}
          onVerificationIdChange={(e) => setVerificationId(e.target.value)}
          onVerify={handleVerify}
          loading={verifyloading}
        />

        <Message text={message} />
        <ToastContainer position="bottom-center" />
      </div>
    );

  return (
    <div className={styles.container}>
      <Head>
        <title>Voting Website</title>
        <link rel="icon" href="/images/contestant1.jpeg" />
      </Head>

      <h1 className={styles.title}>Vote for Your Favorite Client</h1>
      <div className={styles.candidates}>
        <CandidateCard
          id={"Da Rex robot"}
          imageUrl="images/contestant1.jpeg"
          onClick={handleCandidateSelect}
          selected={selectedCandidate === "Da Rex robot"}
        />
        <CandidateCard
          id={"QueenAnder"}
          imageUrl="images/contestant2.jpeg"
          onClick={handleCandidateSelect}
          selected={selectedCandidate === "QueenAnder"}
        />
        <CandidateCard
          id={"Originaljioke"}
          imageUrl="images/contestant3.jpeg"
          onClick={handleCandidateSelect}
          selected={selectedCandidate === "Originaljioke"}
        />
        <CandidateCard
          id={"Anointed Dancer"}
          imageUrl="images/contestant4.jpeg"
          onClick={handleCandidateSelect}
          selected={selectedCandidate === "Anointed Dancer"}
        />
        <CandidateCard
          id={"Jemervy"}
          imageUrl="images/contestant5.jpeg"
          onClick={handleCandidateSelect}
          selected={selectedCandidate === "Jemervy"}
        />
        <CandidateCard
          id={"Worth B"}
          imageUrl="images/contestant6.jpeg"
          onClick={handleCandidateSelect}
          selected={selectedCandidate === "Worth B"}
        />
        <CandidateCard
          id={"GT BAE"}
          imageUrl="images/contestant7.jpeg"
          onClick={handleCandidateSelect}
          selected={selectedCandidate === "GT BAE"}
        />

        <CandidateCard
          id={"Faithfullness"}
          imageUrl="images/contestant8.jpeg"
          onClick={handleCandidateSelect}
          selected={selectedCandidate === "Faithfullness"}
        />
        <CandidateCard
          id={"Naomi"}
          imageUrl="images/contestant9.jpeg"
          onClick={handleCandidateSelect}
          selected={selectedCandidate === "Naomi"}
        />
        <CandidateCard
          id={"ZEALOTS 4 CHRIST"}
          imageUrl="images/contestant10.jpeg"
          onClick={handleCandidateSelect}
          selected={selectedCandidate === "ZEALOTS 4 CHRIST"}
        />
        <CandidateCard
          id={"Esther"}
          imageUrl="images/contestant11.jpeg"
          onClick={handleCandidateSelect}
          selected={selectedCandidate === "Esther"}
        />

        <CandidateCard
          id={"Igi Nelson"}
          imageUrl="images/contestant12.jpeg"
          onClick={handleCandidateSelect}
          selected={selectedCandidate === "Igi Nelson"}
        />
        <CandidateCard
          id={"The mantle"}
          imageUrl="images/contestant13.jpeg"
          onClick={handleCandidateSelect}
          selected={selectedCandidate === "The mantle"}
        />
        <CandidateCard
          id={"Abuwa Chioma"}
          imageUrl="images/contestant14.jpeg"
          onClick={handleCandidateSelect}
          selected={selectedCandidate === "Abuwa Chioma"}
        />
        {/* Add more CandidateCard components as needed */}
        <ToastContainer position="bottom-center" />
      </div>
    </div>
  );

  // Rest of the code...
}
