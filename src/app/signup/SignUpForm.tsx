"use client";
import Link from "next/link";
import { FormEvent, useContext, useRef, useState } from "react";
import ErrorIcon from "@mui/icons-material/Error";
import CancelIcon from "@mui/icons-material/Cancel";
import { useRouter } from "next/navigation";
import UserContext from "@/context/UserContext";
import { toast } from "react-toastify";

export default function SignUpForm() {
  const router = useRouter();
  const { userData } = useContext(UserContext) as any;

  if (userData.authed) {
    router.push("/");
  }

  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const addressRef = useRef<HTMLInputElement>(null);
  const districtRef = useRef<HTMLInputElement>(null);
  const phoneNumberRef = useRef<HTMLInputElement>(null);

  const [warning, setWarning] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let phoneNumber = phoneNumberRef.current?.value;
    let district;

    if (districtRef.current?.value) {
      district = +districtRef.current.value;

      if (district > 99 || district < 1) {
        return setWarning("District number must be between 1 and 99!");
      }
    }

    if (phoneNumber?.length !== 10) {
      return setWarning("Phone number must be 10 numbers only.");
    }

    if (phoneNumber.includes("+")) {
      return setWarning("Phone number only includes numbers.");
    }

    setWarning("");

    try {
      const data = {
        phoneNumber,
        username: usernameRef.current?.value,
        password: passwordRef.current?.value,
        address: addressRef.current?.value,
        district,
      };

      const id = toast.loading("Please wait...");

      const res = await fetch("http://localhost:8080/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const msg = (await res.json())?.msg || "Please try again later.";
        toast.update(id, {
          render: msg,
          type: "error",
          isLoading: false,
          autoClose: 1000,
        });
        throw new Error(msg);
      } else {
        setError("");
        toast.update(id, {
          render: "Account was created!",
          type: "success",
          isLoading: false,
          autoClose: 1000,
        });
        console.log(await res.json());
        router.push("/signin");
      }
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <div className="form__container">
      <form onSubmit={handleSubmit}>
        <h1>Sign up</h1>
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

        <input
          type="text"
          name="username"
          placeholder="Your Name"
          required
          ref={usernameRef}
        />
        <div className="address__input">
          <input
            type="text"
            name="address"
            placeholder="Your Address"
            required
            ref={addressRef}
          />
          <input
            type="number"
            name="district"
            placeholder="1-99"
            ref={districtRef}
            required
          />
        </div>
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
          name="password"
          placeholder="Password"
          ref={passwordRef}
          required
        />

        <button type="submit">Sign up</button>

        <p>
          Already have an account? <Link href={"/signin"}>Sign in</Link>.
        </p>
      </form>
    </div>
  );
}
