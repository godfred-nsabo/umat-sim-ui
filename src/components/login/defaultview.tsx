"use client";

import { Label } from "@radix-ui/react-label";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import Image from "next/image";
import { FormEvent, useState, useEffect } from "react";
import { AuthService } from "../../server/actions/auth";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import React from "react";

const DefaultView: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  //const [toastId, setToastId] = useState<string | undefined>();

  //   const showSuccessToast = () => toast.success("This is a success toast!");
  //   const showErrorToast = () => toast.error("This is an error toast!");
  //   const showLoadingToast = () => {
  //     const id = toast.loading("Loading...");
  //     setToastId(id);
  //   };
  //   const updateLoadingToast = () => {
  //     if (toastId) {
  //       toast.success("Loaded successfully!", { id: toastId });
  //     }
  //   };

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  // const delay = (ms: number) =>
  //   new Promise((resolve) => setTimeout(resolve, ms));

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    try {
      setLoading(true);
      event.preventDefault();

      //await delay(2000);

      const data = await AuthService.Authenticate(username, password);
      if (data.isSuccessful && router) {
        router.push("/dashboard");
      } else {
        toast.error(data.message);
      }
    } finally {
      setLoading(false);
    }
  };

  if (!isClient) {
    return null;
  }

  return (
    <div className="min-h-screen bg-[#f5f5f5]">
      <Toaster position="top-right" />
      <div className="relative">
        {/* Decorative waves */}
        <div className="absolute inset-x-0 top-0 h-[400px] bg-[#004c23] overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-0 transform -skew-y-12">
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTQ0MCIgaGVpZ2h0PSIxMjAwIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXRoIGQ9Ik0wIDBoMTQ0MHY4MDBTMTEyMCA2NDAgNzIwIDY0MFMwIDgwMCAwIDgwMFoiIGZpbGw9IiNmZmYiLz48L3N2Zz4=')] bg-no-repeat bg-cover"></div>
            </div>
            <div className="absolute inset-0 transform -skew-y-6">
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTQ0MCIgaGVpZ2h0PSIxMjAwIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXRoIGQ9Ik0wIDBoMTQ0MHY4MDBTMTEyMCA2NDAgNzIwIDY0MFMwIDgwMCAwIDgwMFoiIGZpbGw9IiNmZmYiLz48L3N2Zz4=')] bg-no-repeat bg-cover"></div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="relative flex items-center justify-between p-4 text-white"></nav>

        {/* Main Content */}
        <main className="relative container mx-auto px-4 py-12">
          <div className="text-center text-white mb-8">
            <center>
              <Image
                src="/logo-light.png"
                alt="Logo"
                width={200}
                height={300}
              />
            </center>
          </div>

          {/* Registration Form */}
          <div className="max-w-md mx-auto bg-white rounded-2xl p-8 shadow-lg">
            <form onSubmit={handleSubmit}>
              <div className="space-y-6">
                <div className="text-center">
                  <h2 className="text-xl font-semibold text-gray-900">
                    Student Information Manager (SIM)
                  </h2>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="name">Reference Number </Label>
                    <Input
                      id="username"
                      placeholder="Enter Reference Number"
                      className="text-gray-500"
                      value={username}
                      onChange={handleUsernameChange}
                    />
                  </div>
                  <div>
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="Enter Password"
                      className="text-gray-500"
                      value={password}
                      onChange={handlePasswordChange}
                    />
                  </div>
                </div>

                <Button
                  disabled={loading}
                  className="w-full bg-[#004c23] hover:bg-[#357d5b] text-white relative flex items-center justify-center"
                >
                  {loading ? (
                    <div className="border-4 border-t-4 border-gray-300 border-t-[#3498db] rounded-full w-5 h-5 animate-spin mr-2"></div>
                  ) : null}

                  {!loading && "SIGN IN"}
                </Button>
              </div>
            </form>
            <p className="text-center text-sm p-5">
              &copy; {new Date().getFullYear()} University ICT Services
            </p>

            {/* <div className="flex flex-col gap-4">
              <Button onClick={showSuccessToast}>Show Success Toast</Button>
              <Button onClick={showErrorToast} variant="destructive">
                Show Error Toast
              </Button>
              <Button onClick={showLoadingToast} variant="outline">
                Show Loading Toast
              </Button>
              <Button onClick={updateLoadingToast} variant="secondary">
                Update Loading Toast
              </Button>
            </div> */}
          </div>
        </main>
      </div>
    </div>
  );
};

// Spinner animation
//   const globalStyles = `
//     @keyframes spin {
//       0% { transform: rotate(0deg); }
//       100% { transform: rotate(360deg); }
//     }
//   `;

export default DefaultView;
