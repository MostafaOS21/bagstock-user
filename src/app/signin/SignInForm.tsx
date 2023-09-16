"use client";
import Link from "next/link";
import { FormEvent, useContext, useRef, useState } from "react";
import ErrorIcon from "@mui/icons-material/Error";
import CancelIcon from "@mui/icons-material/Cancel";
import { useRouter } from "next/navigation";
import UserContext from "@/context/UserContext";
import { toast } from "react-toastify";

export default function SignInForm() {
  const { userData, setUserData } = useContext(UserContext) as any;
  const router = useRouter();

  if (userData.authed) {
    router.push("/");
  }

  const phoneNumberRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const [warning, setWarning] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let phoneNumber = phoneNumberRef.current?.value;
    const password = passwordRef.current?.value;

    if (phoneNumber?.length !== 10) {
      return setWarning("Phone number must be 10 numbers only.");
    }

    if (phoneNumber.includes("+")) {
      return setWarning("Phone number only includes numbers.");
    }

    try {
      const data = {
        phoneNumber,
        password,
      };

      const res = await toast.promise(
        fetch("http://localhost:8080/auth/signin", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
          credentials: "include",
        }),
        {
          success: "Signed in with success",
          pending: "Signing in...",
          error: "Signing in failed, please try again!",
        }
      );

      if (!res.ok) {
        const msg = (await res.json()).msg || "Error occured while signing in.";
        throw new Error(msg);
      }

      setError("");

      const result = await res.json();

      setUserData({ ...result, authed: true });

      router.push("/");
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <div className="form__container">
      <form onSubmit={handleSubmit}>
        <h1>Sign in</h1>

        {warning && (
          <p
            className="bg-yellow-100 text-yellow-800 p-2 text-sm rounded-sm flex
          items-center gap-3"
          >
            <ErrorIcon /> {warning}
          </p>
        )}

        {error && (
          <p className="bg-red-100 text-red-800 p-2 text-sm rounded-sm flex items-center gap-3">
            <CancelIcon /> {error}
          </p>
        )}

        <div className="phone__number__input">
          <div>+20</div>

          <input
            type="number"
            name="phoneNumber"
            placeholder="Phone Number"
            maxLength={10}
            minLength={10}
            ref={phoneNumberRef}
            required
          />
        </div>
        <input
          type="password"
          placeholder="Password"
          ref={passwordRef}
          required
        />

        <button type="submit">Sign in</button>

        <p>
          Don't have an account? <Link href={"/signup"}>Sign up</Link>.
        </p>
      </form>
    </div>
  );
}
