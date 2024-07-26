"use client";
import { SingleNote } from "@/components/dashboard/snippets/single-note";
import Spinner from "@/components/loader";
import NothingToShow from "@/components/nothing-to-show/nothing-to-show";
import { useGetAllNotesQuery } from "@/services/redux/api/snippet-api";
import { useSearchParams } from "next/navigation";

const HomePage = () => {
  const searchParams = useSearchParams();

  // const queries = tags ? `?tags=${tags}` : "";

  const newParams = new URLSearchParams(searchParams.toString());

  const { data, isLoading } = useGetAllNotesQuery(`?${newParams.toString()}`);

  if (isLoading) return <Spinner />;

  return (
    <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
      {data?.length ? (
        data?.map((v, k) => {
          return !v.isTrashed && <SingleNote key={v._id} data={v} />;
        })
      ) : (
        <NothingToShow />
      )}
    </div>
  );
};

export default HomePage;
