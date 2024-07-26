"use client";
import SnippetEditor from "@/components/dashboard/snippets/snippets-editor/snippet-editor";
import { useGetANoteQuery } from "@/services/redux/api/snippet-api";
import { Loader } from "lucide-react";
import { Modal } from "./modal";

export default function SnippetModal({ params }) {
  const { data, isLoading } = useGetANoteQuery(params.id);

  return (
    <Modal>
      {isLoading ? (
        <Loader className="animate-spin" />
      ) : (
        <SnippetEditor type={"update"} data={data} />
      )}
    </Modal>
  );
}
