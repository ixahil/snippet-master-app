import Header from "@/components/public/header/header";
import { Code } from "lucide-react";
import Link from "next/link";

export default function PublicHomePage() {
  return (
    <div className="m-16 space-y-16 bg-white dark:bg-dark-accent">
      <Header />
      <section className="flex flex-col items-center gap-6">
        <h2 className="text-center font-bold text-xl sm:text-2xl">
          Organize Your Code Snippets
          <span className="text-accent"> Efficiently</span>
        </h2>
        <p className="text-center text-sm w-full sm:w-[450px] text-slate-500">
          With our advanced tagging and search features, you can quickl find the
          snipped you need, right when you need it. Spend less time searching
          for code and more time writing it.
        </p>
        <Link
          href={"/login"}
          className="flex gap-2 border-2 border-accent p-2 hover:bg-accent hover:text-white rounded-md transition ease-in duration-400"
        >
          Let's get started <Code />
        </Link>
      </section>
    </div>
  );
}
