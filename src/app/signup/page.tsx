import { Metadata } from "next";
import SignUpForm from "./SignUpForm";

export const metadata: Metadata = {
  title: "Sign up",
  description: "Sign up and explore BagStock",
};

export default function SignUpPage() {
  return <SignUpForm />;
}
