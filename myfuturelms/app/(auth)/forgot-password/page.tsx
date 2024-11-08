"use client";
import Api from "@/app/Api's";
import Button from "@/app/components/Button";
import axios from "axios";
import { redirect, useRouter } from "next/navigation";
import { useState } from "react";

interface IData {
  activationToken: string;
  success: Boolean;
}
const ForgotPassword: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const router = useRouter();

  const handleEmailChange = (e: any) => {
    setEmail(e.target.value);
  };

  const sendResetCode = async () => {
    const response = await axios.post(Api.forgot_password, { email });
    const res = response.data as IData;
    sessionStorage.setItem("activation_token", res.activationToken);
    if (res.success) {
      const url = new URL("/verification-code", window.location.origin);
      url.searchParams.append("email", email);
      router.push(url.toString());
    }
  };

  return (
    <div className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-gray-50 py-12">
      <div className="relative bg-white px-6 pt-10 pb-9 shadow-xl mx-auto w-full max-w-lg rounded-2xl">
        <div className="mx-auto flex w-full max-w-md flex-col space-y-16">
          <div className="flex flex-col items-center justify-center text-center space-y-2">
            <div className="font-semibold text-3xl">
              <p>Email Verification</p>
            </div>
            <div className="flex flex-row text-sm font-medium text-gray-400">
              <p>We have sent a code to your email</p>
            </div>
          </div>

          <div>
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="flex flex-col space-y-5">
                <div className="flex flex-col">
                  <label
                    htmlFor="email"
                    className="text-sm font-medium text-gray-600"
                  >
                    Enter your email address
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={handleEmailChange}
                    required
                    className="mt-2 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>

                <Button
                  text="Send Verification code"
                  onClicks={sendResetCode}
                />

                <div className="flex flex-row items-center justify-center text-sm font-medium space-x-1 text-gray-500 mt-4">
                  <p>Didn't receive code?</p>
                  <button
                    type="button"
                    disabled={loading}
                    className="text-blue-600"
                  >
                    Resend
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
