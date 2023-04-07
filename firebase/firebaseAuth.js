import {
createUserWithEmailAndPassword,
GoogleAuthProvider,
OAuthProvider,
sendPasswordResetEmail,
signInWithEmailAndPassword,
signInWithPopup,
signOut,
} from "firebase/auth";
import { auth } from "./config";

const sendPasswordReset = async ({ email }) => {
  try {
    await sendPasswordResetEmail(auth, email);
    alert("Password reset link sent!");
  } catch (err) {
    errorHandling(err);
  }
};

const registerWithEmailAndPassword = async ({
  email,
  password,
}) => {
  try {
     await createUserWithEmailAndPassword(auth, email, password);
  } catch (err) {
    errorHandling(err);
    console.log("error inside registeringWithEmailAndPassword " + err);
  }
};

const logInWithEmailAndPassword = async ({
  email,
  password,
}) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    errorHandling(err);
  }
};

const signInWithGoogle = async () => {
  try {
     const googleProvider = new GoogleAuthProvider();
     await signInWithPopup(auth, googleProvider);
  } catch (err) {
    errorHandling(err);
  }
};

const signInWithApple = async () => {
  try {
    const appleProvider = new OAuthProvider('apple.com');
    await signInWithPopup(auth, appleProvider);
  } catch (error) {
    errorHandling(err);
  }
};

const logout = async () => {
  await signOut(auth);
};

const errorHandling = (err) => {
  if (err.code === "auth/account-exists-with-different-credential") {
    alert(
      "You have already signed up with a different auth provider for that email."
    );
  }

  if (err.code === "auth/popup-blocked") {
    alert("Please allow popups for this website");
  }

  if (err.code === "auth/popup-closed-by-user") {
    alert("Please sign in again");
  }

  if (err.code === "auth/unauthorized-domain") {
    alert("Please sign in again");
  }

  if (err.code === "auth/user-disabled") {
    alert("Your account has been disabled");
  }

  if (err.code === "auth/user-not-found") {
    alert("No user found");
  }

  if (err.code === "auth/wrong-password") {
    alert("Wrong password");
  }

  if (err.code === "auth/invalid-email") {
    alert("Invalid email");
  }

  if (err.code === "auth/operation-not-allowed") {
    alert("Operation not allowed");
  }

  if (err.code === "auth/weak-password") {
    alert("Password should be at least 6 characters");
  }

  if (err.code === "auth/email-already-in-use") {
    alert("Email already in use");
  }

  if (err.code === "auth/invalid-credential") {
    alert("Invalid credential");
  }

  if (err.code === "auth/invalid-verification-code") {
    alert("Invalid verification code");
  }
};

export {
  signInWithGoogle,
  signInWithApple,
  logInWithEmailAndPassword,
  registerWithEmailAndPassword,
  sendPasswordReset,
  logout,
};