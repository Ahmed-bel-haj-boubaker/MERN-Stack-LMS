/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import Api from "@/app/Api's";
import Button from "@/app/components/Button";
import { useRouter, useSearchParams } from "next/navigation";
import { toast, Toaster } from "react-hot-toast";

import { useState } from "react";

const VerificationCode: React.FC = () => {
  const searchParams = useSearchParams();
  const email = searchParams.get("email") as string;
  const activation_token = sessionStorage.getItem("activation_token");

  const [activationCode, setActivationCode] = useState<string[]>([
    "",
    "",
    "",
    "",
  ]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const router = useRouter();

  const handleInputChange = (index: number, value: string) => {
    const newCode = [...activationCode];
    newCode[index] = value;
    setActivationCode(newCode);
  };

  const handleActivationCode = async () => {
    const code = activationCode.join("");
    if (code.length < 4) {
      setError("Please enter the full 4-digit activation code.");
      return;
    }

    setLoading(true);
    setError("");

    const response = await fetch(Api.verify_code, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        verificationCode: code,
        activationToken: activation_token,
      }),
    });

    const result = await response.json();

    if (response.ok) {
      toast.success("You Can Now Reset Your Password");
      const url = new URL("/change-password", window.location.origin);
      url.searchParams.append("email", email);
      router.push(url.toString());
    } else {
      toast.error(result.message);
    }
  };

  return (
    <div className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-gray-50 py-12">
      <Toaster containerStyle={{ position: "fixed" }} />
      <div className="relative bg-white px-6 pt-10 pb-9 shadow-xl mx-auto w-full max-w-lg rounded-2xl">
        <div className="mx-auto flex w-full max-w-md flex-col space-y-16">
          <div className="flex flex-col items-center justify-center text-center space-y-2">
            <div className="font-semibold text-3xl">
              <p>Email Verification</p>
            </div>
            <div className="flex flex-row text-sm font-medium text-gray-400">
              <p>We have sent a code to your email {email}</p>
            </div>
          </div>

          <div>
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="flex flex-col space-y-16">
                <div className="flex flex-row items-center justify-between mx-auto w-full max-w-xs">
                  {activationCode.map((value, index) => (
                    <div key={index} className="w-16 h-16">
                      <input
                        className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                        type="text"
                        value={value}
                        onChange={(e) =>
                          handleInputChange(index, e.target.value)
                        }
                        maxLength={1}
                      />
                    </div>
                  ))}
                </div>

                <div className="flex flex-col space-y-5">
                  <div className="flex justify-center ">
                    <Button
                      text="Verify Account"
                      onClicks={handleActivationCode}
                    />
                  </div>

                  <div className="flex flex-row items-center justify-center text-center text-sm font-medium space-x-1 text-gray-500">
                    <p>Didn't receive code?</p>{" "}
                    <a
                      className="flex flex-row items-center text-blue-600"
                      href="http://"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Resend
                    </a>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerificationCode;
