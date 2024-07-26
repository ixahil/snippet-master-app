"use client";
import { JavaScriptIcon } from "developer-icons";
import { FileText, Heart, Plus, Tag, Trash, Type, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import NoteCodeEditor from "./code-editor";
import {
  useAddNoteMutation,
  useUpdateNoteMutation,
} from "@/services/redux/api/snippet-api";
import LoadingButton from "@/components/ui/loading-button";

const SnippetEditor = ({ type, data, toggleStatus }) => {
  const [note, setNote] = useState(data);
  const router = useRouter();

  const [addNote, { isLoading: addLoading }] = useAddNoteMutation();
  const [updateNote, { isLoading: updateLoading }] = useUpdateNoteMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (type === "add") {
      const { error } = await addNote(note);
      if (!error) toggleStatus();
    } else if (type === "update") {
      const { error } = await updateNote({ id: data._id, data: note });
      if (!error) router.back();
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col justify-center p-4 space-y-8 w-[500px]"
    >
      <NoteHeader setNote={setNote} data={note} />
      <NoteTags setNote={setNote} data={note} />
      <NoteDescription setNote={setNote} data={note} />
      <NoteCodeEditor setNote={setNote} language={data?.language} data={data} />
      {type === "add" ? (
        <LoadingButton
          type={"submit"}
          isLoading={addLoading}
          className={"text-xl text-white bg-accent p-2 rounded-md w-full"}
        >
          {" "}
          Add +
        </LoadingButton>
      ) : (
        <LoadingButton
          type={"submit"}
          isLoading={updateLoading}
          className={"text-xl text-white bg-accent p-2 rounded-md w-full"}
        >
          Update
        </LoadingButton>
      )}
    </form>
  );
};

function NoteHeader({ setNote, data }) {
  const [title, setTitle] = useState(data?.title);
  const [isFavorite, setIsFavorite] = useState(false);

  const handleTitleChange = (e) => {
    let { name, value } = e.target;

    value = titleCase(value);

    setTitle(value);
    setNote((prev) => ({ ...prev, [name]: value, isFavorite }));
  };

  const handleFavoriteToggle = () => {
    setIsFavorite((prev) => !prev);
    setNote((prev) => ({ ...prev, isFavorite: !prev.isFavorite }));
  };

  function titleCase(str) {
    return str.toLowerCase().replace(/(?:^|\s)\w/g, function (match) {
      return match.toUpperCase();
    });
  }

  return (
    <div className="flex justify-between items-center">
      <span className="font-extrabold text-xl w-[87%] cursor-pointer hover:text-accent focus:outline-accent focus:text-accent flex items-center gap-3">
        <Type className="text-slate-400" />
        <input
          name="title"
          className="w-full outline-none border-none text-lg capitalize"
          placeholder="Enter title..."
          value={title}
          onChange={handleTitleChange}
        />
      </span>
      <button type="button" onClick={handleFavoriteToggle}>
        <Heart
          className={`text-slate-400 cursor-pointer`}
          fill={`${isFavorite ? "red" : "white"}`}
          stroke={`${isFavorite ? "red" : "gray"}`}
        />
      </button>
    </div>
  );
}

function NoteTags({ setNote, data }) {
  const initialTags = data?.tags || []; // Initialize tags state with data.tags if available
  const [tags, setTags] = useState(initialTags);
  const [addTag, setAddTag] = useState("");

  const handleAddTag = () => {
    if (addTag.trim() === "") return; // Don't add empty tags

    const newTags = [...tags, addTag.trim()];

    setTags(newTags);
    setNote((prev) => ({ ...prev, tags: newTags }));
    setAddTag(""); // Clear input after adding tag
  };

  const handleRemoveTag = (tagToRemove) => {
    const updatedTags = tags.filter((tag) => tag !== tagToRemove);

    setTags(updatedTags);
    setNote((prev) => ({ ...prev, tags: updatedTags }));
  };

  return (
    <div className="flex gap-3 text-xs text-slate-500">
      <Tag className="text-slate-400" />{" "}
      {/* Not sure where Tag is coming from */}
      <div className="flex gap-2">
        {tags.map((tag) => (
          <span
            key={tag}
            className="bg-purple-100 text-accent p-1 rounded-md px-2 flex items-center"
          >
            {tag}
            <button
              className="ml-1 text-xs text-red-500 focus:outline-none"
              onClick={() => handleRemoveTag(tag)}
            >
              <X size={12} />
            </button>
          </span>
        ))}
      </div>
      <div className="flex items-center">
        <span className="bg-purple-100 text-accent p-1 rounded-md px-2">
          <input
            onChange={(e) => setAddTag(e.target.value)}
            value={addTag}
            className="border-none outline-none bg-transparent"
            placeholder="Add tag"
          />
        </span>
        <button
          type="button"
          className="ml-1 text-xs text-accent focus:outline-none"
          onClick={handleAddTag}
        >
          <Plus />
        </button>
      </div>
    </div>
  );
}

function NoteDescription({ setNote, data }) {
  const initialDescription = data?.description;

  const [description, setDescription] = useState(initialDescription);
  const [isEditing, setIsEditing] = useState(false);

  const handleDescriptionChange = (e) => {
    const { name, value } = e.target;
    setDescription(value);
    setNote((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveDescription = () => {
    // You can implement saving functionality here, e.g., send description to backend
    setIsEditing(false);
    console.log("Description saved:", description);
  };

  const handleEditDescription = () => {
    setIsEditing(true);
  };

  return (
    <div className="text-slate-600 text-sm flex items-start gap-3">
      <FileText className="text-slate-400" />
      <textarea
        className="w-full bg-white dark:bg-dark-accent border dark:border-gray-700 rounded-md p-2 resize-none"
        name="description"
        value={description}
        onChange={handleDescriptionChange}
        rows={4}
      />
    </div>
  );
}

function NoteFooter() {
  return (
    <div className="flex justify-between text-xs text-slate-400">
      <div className="flex gap-1 items-center justify-center">
        <JavaScriptIcon className="cursor-pointer" size={22} />
        Javascript
      </div>
      <Trash />
    </div>
  );
}

export default SnippetEditor;
