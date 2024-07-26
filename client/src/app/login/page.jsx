"use client";
import Header from "@/components/public/header/header";
import { useLoginUserMutation } from "@/services/redux/api/user-api";
import { Eye, EyeOff, LoaderIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const LoginPage = () => {
  const [show, setShow] = useState(false);
  const router = useRouter();
  const [login, { error, isLoading }] = useLoginUserMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const body = {};
    for (const [key, value] of form.entries()) {
      body[key] = value;
    }
    const { data } = await login(body);
    if (data) router.push("/dashboard/home");
  };

  return (
    <div className="m-16 space-y-16">
      <Header />
      <form
        className="flex flex-col gap-2 w-[500px] mx-auto p-8 rounded-md"
        onSubmit={handleSubmit}
      >
        <h2 className="text-xl my-2 mb-4">Login to your account</h2>
        <label className="mt-2">Username</label>
        <input type="username" name="username" className="input" />
        <label className="mt-2">Password</label>
        <div className="relative">
          <input
            type={!show ? "password" : "text"}
            name="password"
            className="input"
          />
          {show ? (
            <Eye
              className="absolute top-2 right-2 cursor-pointer"
              size={24}
              onClick={() => setShow((prev) => !prev)}
            />
          ) : (
            <EyeOff
              className="absolute top-2 right-2 cursor-pointer"
              size={24}
              onClick={() => setShow((prev) => !prev)}
            />
          )}
        </div>
        {error?.data && (
          <span className="text-red-500 text-sm">{error?.data?.message}</span>
        )}
        {error?.status === "FETCH_ERROR" && (
          <span className="text-red-500 text-sm">
            {"Internal Server Error, Try again Later."}
          </span>
        )}
        <button
          type="submit"
          className="bg-accent text-white mt-4 p-2 rounded-md flex items-center justify-center gap-4"
        >
          {isLoading && <LoaderIcon className="animate-spin" />}
          Login
        </button>
        <p>
          Don't have an account?{" "}
          <Link href="/signup" className="text-accent font-bold">
            Sign Up
          </Link>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;
