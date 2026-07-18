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

  if (!snapshot.exists()) return;

  const data = snapshot.data();

  const nextToken = (data.currentToken || 1) + 1;

  const nextNumber =
    "A" + String(nextToken).padStart(3, "0");

  await updateDoc(ref, {
    currentToken: nextToken,
    currentNumber: nextNumber,
    updatedAt: serverTimestamp(),
  });
}