import React from "react";
import SignInForm from "./SignInForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign in",
  description: "Sign in to BagStock",
};

export default function SignInPage() {
  return <SignInForm />;
}
