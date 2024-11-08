"use client";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import Api from "../../Api's";
const ActivationCode: React.FC = () => {
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const activation_token = sessionStorage.getItem("activation_token");
  console.log(activation_token);

  const [activationCode, setActivationCode] = useState<string[]>([
    "",
    "",
    "",
    "",
  ]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

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

    try {
      const response = await fetch(Api.activate_user, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          activation_code: code,
          activation_token: activation_token,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        console.log("Account activated successfully!", result);
      } else {
        setError(
          result?.message || "An error occurred while activating the account."
        );
      }
    } catch (err) {
      setError("An error occurred while connecting to the server.");
      console.error(err);
    } finally {
      setLoading(false);
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

                {error && (
                  <div className="text-red-500 text-center">{error}</div>
                )}

                <div className="flex flex-col space-y-5">
                  <div>
                    <button
                      onClick={handleActivationCode}
                      disabled={loading}
                      className={`flex flex-row items-center justify-center text-center w-full border rounded-xl outline-none py-5 ${
                        loading ? "bg-gray-400" : "bg-blue-700"
                      } border-none text-white text-sm shadow-sm`}
                    >
                      {loading ? "Verifying..." : "Verify Account"}
                    </button>
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

export default ActivationCode;
