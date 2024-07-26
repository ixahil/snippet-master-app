"use client";

import { SingleNote } from "@/components/dashboard/snippets/single-note";
import NothingToShow from "@/components/nothing-to-show/nothing-to-show";
import { useGetNotesByLanguageQuery } from "@/services/redux/api/snippet-api";

const LanguagePage = ({ params }) => {
  const { data } = useGetNotesByLanguageQuery(params.slug);

  return (
    <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
      {data?.length ? (
        data?.map((v, k) => {
          return <SingleNote key={v._id} data={v} />;
        })
      ) : (
        <NothingToShow />
      )}
    </div>
  );
};

export default LanguagePage;
