import {
  doc,
  updateDoc,
  getDoc,
  serverTimestamp,
} from "firebase/firestore";

import { db } from "./firebase";

export async function nextPatient() {
  const ref = doc(db, "liveQueue", "Apollo");

  const snapshot = await getDoc(ref);

  if (!snapshot.exists()) {
    throw new Error("Queue not found");
  }

  const data = snapshot.data();

  // Current token can be: A-198 or A198
  const currentToken = String(data.currentToken || "A-198");

  const currentNumber =
    parseInt(currentToken.replace(/\D/g, ""), 10) || 198;

  const nextNumberValue = currentNumber + 1;

  const nextToken = `A-${String(nextNumberValue).padStart(3, "0")}`;

  const currentPatientsAhead =
    Number(data.patientsAhead ?? 0);

  const nextPatientsAhead = Math.max(
    0,
    currentPatientsAhead - 1
  );

  const nextWaitingMinutes = Math.max(
    0,
    nextPatientsAhead * 3
  );

  await updateDoc(ref, {
    currentToken: nextToken,
    currentNumber: nextNumberValue,
    patientsAhead: nextPatientsAhead,
    waitingTime: `${nextWaitingMinutes} mins`,
    updatedAt: serverTimestamp(),
  });

  return {
    currentToken: nextToken,
    patientsAhead: nextPatientsAhead,
    waitingTime: `${nextWaitingMinutes} mins`,
  };
}