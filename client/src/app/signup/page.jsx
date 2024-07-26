"use client";
import ProfileUpload from "@/components/profile-upload";
import Footer from "@/components/public/footer/footer";
import Header from "@/components/public/header/header";
import {
  useLoginUserMutation,
  useSignUpUserMutation,
} from "@/services/redux/api/user-api";
import { Eye, EyeOff, LoaderIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const RegisterPage = () => {
  const [show, setShow] = useState(false);
  const [profile, setProfile] = useState();
  const router = useRouter();
  const [signup, { error, isLoading }] = useSignUpUserMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const body = {};
    for (const [key, value] of form.entries()) {
      body[key] = value;
    }

    console.log(form.get("profile"));

    const { data } = await signup(form);
    if (data) router.push("/login");
  };

  return (
    <>
      <div className="m-16 space-y-16">
        <Header />
        <form
          className="flex flex-col gap-2 w-[500px] mx-auto p-8 rounded-md"
          onSubmit={handleSubmit}
        >
          <h2 className="text-xl my-2 mb-4">Create a New Account</h2>
          <ProfileUpload setProfile={setProfile} />
          <label className="mt-2">Email</label>
          <input type="email" required={true} name="email" className="input" />
          <label className="mt-2">Username</label>
          <input
            type="username"
            required={true}
            name="username"
            className="input"
          />
          <label className="mt-2">Password</label>
          <div className="relative">
            <input
              type={!show ? "password" : "text"}
              required={true}
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
            <Link href="/login" className="text-accent font-bold">
              Sign In
            </Link>
          </p>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default RegisterPage;
