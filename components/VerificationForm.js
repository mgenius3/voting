import React, { useState } from "react";
import styles from "../styles/Home.module.css";

const VerificationForm = ({
  verificationId,
  onVerificationIdChange,
  onVerify,
  loading,
}) => {
  return (
    <div className={styles.verification}>
      <input
        type="text"
        id="verification-id"
        placeholder="Enter Voter PIN"
        value={verificationId}
        onChange={onVerificationIdChange}
      />
      <button id={styles.verifybutton} onClick={onVerify}>
        {!loading ? "Verify" : "..."}
      </button>
    </div>
  );
};

export default VerificationForm;
