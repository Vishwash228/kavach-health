import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  serverTimestamp,
} from "firebase/firestore";

import { db } from "./firebase";

export async function generateToken(
  hospitalId: string,
  hospitalName: string,
  doctorId: string,
  doctorName: string,
  department: string,
  mode: string,
  date: string,
  time: string
) {
  console.log("Inside generateToken");
  const snapshot = await getDocs(
    query(
      collection(db, "appointments"),
      where("hospitalId", "==", hospitalId)
    )
  );

  const queueNumber = snapshot.size + 1;

  const prefix = hospitalName.substring(0, 1).toUpperCase();

  const tokenNumber =
    prefix + String(queueNumber).padStart(3, "0");

  await addDoc(collection(db, "appointments"), {
    hospitalId,
    hospitalName,
    doctorId,
    doctorName,
    department,
    mode,
    date,
    time,
    queueNumber,
    tokenNumber,
    status: "waiting",
    createdAt: serverTimestamp(),
  });
  await addDoc(collection(db, "tokens"), {
  hospitalId,
  hospitalName,
  doctorId,
  doctorName,
  tokenNumber,
  queueNumber,
  status: "waiting",
  createdAt: serverTimestamp(),
});

  return {
    tokenNumber,
    queueNumber,
  };
}