import ConfirmationModal from "@/components/modal/confirmation-modal";
import { languagesIcons } from "@/data/icon-set";
import useStatus from "@/hooks/useStatus";
import {
  useMoveToTrashMutation,
  useUndoFromTrashMutation,
} from "@/services/redux/api/snippet-api";
import { Loader } from "lucide-react";
import { Copy, Heart, Trash, Undo } from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";
import toast from "react-hot-toast";
import SyntaxHighlighter from "react-syntax-highlighter/dist/esm/default-highlight";
import { lightfair } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Tooltip } from "react-tooltip";

const SingleNote = ({ data }) => {
  return (
    <div className="bg-white dark:bg-dark-accent dark:border-gray-700 w-[400px] rounded-md p-4 border-2 flex flex-col">
      <div className="flex-grow flex flex-col space-y-4">
        <NoteHeader data={data} />
        <NoteDate title={data?.title} />
        <NoteTags tags={data?.tags} />
        <NoteDescription description={data?.description} />
        <NoteCodeBlock language={"javascript"} snippet={data?.snippet} />
      </div>
      <NoteFooter data={data} />
    </div>
  );
};

function NoteHeader({ data }) {
  return (
    <div className="flex justify-between">
      <Link
        href={`/dashboard/snippet/${data._id}`}
        className="font-extrabold text-xl w-[87%] cursor-pointer hover:text-accent focus:outline-accent focus:text-accent"
      >
        {data.title}
      </Link>

      <Heart
        className={`text-slate-400 cursor-pointer`}
        fill={`${data.isFavorite ? "red" : "white"}`}
        stroke={`${data.isFavorite ? "red" : "gray"}`}
      />
    </div>
  );
}

function NoteDate() {
  return (
    <div className="text-xs text-slate-400">
      Last updated: <span>2022-08-15</span>
    </div>
  );
}

function NoteTags({ tags }) {
  return (
    <div className="flex gap-2 text-xs text-slate-500">
      {tags.map((v, k) => (
        <span
          key={v + k}
          className="bg-purple-100 text-accent p-1 rounded-md px-2"
        >
          {v}
        </span>
      ))}
    </div>
  );
}

function NoteDescription({ description }) {
  return <div className="text-slate-600 text-sm">{description}</div>;
}

function NoteCodeBlock({ language, snippet }) {
  const { resolvedTheme } = useTheme();

  const ContainerStyle = {
    "border-radius": " 0.375rem",
    overflow: "hidden",
    "font-size": "0.875rem",
    "background-color": resolvedTheme === "light" ? "#fff" : "#121212",
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(snippet).then(
      () => {
        toast.success("Code copied to clipboard!");
      },
      (err) => {
        console.error("Could not copy text: ", err);
      }
    );
  };

  return (
    <div className="rounded-md overflow-hidden text-sm relative">
      <Tooltip id="copy-tooltip" />
      <button
        onClick={copyToClipboard}
        data-tooltip-id="copy-tooltip"
        data-tooltip-content="Copy to clipboard"
        data-tooltip-place="top"
        className="absolute right-4 top-4"
      >
        <Copy />
      </button>
      {snippet && (
        <SyntaxHighlighter
          language={language}
          style={resolvedTheme === "dark" ? oneDark : lightfair}
        >
          {snippet}
        </SyntaxHighlighter>
      )}
    </div>
  );
}

function NoteFooter({ data }) {
  const { status, toggleStatus } = useStatus();
  const [moveToTrash, { isLoading }] = useMoveToTrashMutation(data._id);
  const [undoFromTrash, { isLoading: undoLoading }] =
    useUndoFromTrashMutation();

  const handleConfirmTrash = async () => {
    await moveToTrash(data._id);
    toggleStatus();
  };

  const handleUndo = async () => {
    undoFromTrash(data._id);
  };

  return (
    <div className="flex justify-between text-xs text-slate-400 justify-self-end pt-4 mt-auto">
      <div className="flex gap-1 items-center justify-center">
        {languagesIcons[data.language]}
        {data.language}
      </div>
      <Tooltip id="undo-tooltip" />
      {data.isTrashed ? (
        <div className="flex gap-4 items-center">
          {undoLoading && <Loader className="animate-spin" />}
          <Undo
            onClick={handleUndo}
            className="cursor-pointer"
            data-tooltip-id="undo-tooltip"
            data-tooltip-content="Undo from Trash?"
          />
        </div>
      ) : (
        <Trash onClick={toggleStatus} className="cursor-pointer" />
      )}
      <ConfirmationModal
        showModal={status}
        toggleModal={toggleStatus}
        handleConfirm={handleConfirmTrash}
        isLoading={isLoading}
      />
    </div>
  );
}

export {
  NoteCodeBlock,
  NoteDate,
  NoteDescription,
  NoteFooter,
  NoteHeader,
  NoteTags,
  SingleNote,
};
