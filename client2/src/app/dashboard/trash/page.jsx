"use client";
import { SingleNote } from "@/components/dashboard/snippets/single-note";
import Spinner from "@/components/loader";
import NothingToShow from "@/components/nothing-to-show/nothing-to-show";
import { useGetAllNotesQuery } from "@/services/redux/api/snippet-api";
import { useSearchParams } from "next/navigation";
import React from "react";

const TrashPage = () => {
  const searchParams = useSearchParams();
  const tags = searchParams.get("tags");

  const query = tags ? `?istrashed=true&tags=${tags}` : "?istrashed=true";

  const { data, isLoading } = useGetAllNotesQuery(query);

  if (isLoading) return <Spinner />;

  return (
    <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
      {data.length ? (
        data?.map((v, k) => {
          return <SingleNote key={v._id} data={v} />;
        })
      ) : (
        <NothingToShow />
      )}
    </div>
  );
};

export default TrashPage;
