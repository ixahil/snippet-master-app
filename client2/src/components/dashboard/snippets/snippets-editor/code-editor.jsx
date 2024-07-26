import React, { useState } from "react";
import { highlight, languages } from "prismjs/components/prism-core";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
import "prismjs/themes/prism.css";
import "prismjs/components/prism-css";
import "prismjs/components/prism-python";
import "prismjs/components/prism-java";
import { Tooltip } from "react-tooltip";
import toast from "react-hot-toast";
import { Code, Copy } from "lucide-react";
import Editor from "react-simple-code-editor";

const supportedLanguages = ["javascript", "python", "java", "css"];

const languageMapping = {
  javascript: languages.javascript,
  css: languages.css,
  python: languages.python,
  java: languages.java,
};

function NoteCodeEditor({
  setNote,
  data,
  language: existingLanguage = "javascript",
}) {
  const [language, setLanguage] = useState(existingLanguage);
  const [codeString, setCodeString] = useState(data?.snippet || ``);

  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
    setNote((prev) => ({ ...prev, language: e.target.value }));
  };

  const handleCodeChange = (code) => {
    setCodeString(code);
    setNote((prev) => ({ ...prev, snippet: code, language: language }));
  };

  const copyToClipboard = (code) => {
    navigator.clipboard.writeText(code).then(
      () => {
        toast.success("Code copied to clipboard!");
      },
      (err) => {
        console.error("Could not copy text: ", err);
      }
    );
  };

  return (
    <div className="rounded-md overflow-hidden text-sm flex items-start gap-3">
      <Code className="text-slate-400" />
      <div className="rounded-md border-2 w-full p-2 dark:border-gray-700">
        <div className="flex items-center justify-between px-2">
          <select
            className="bg-gray-100 dark:bg-dark-accent border border-gray-300 dark:border-gray-700 rounded-md p-2 px-3 outline-none text-sm"
            value={language}
            onChange={handleLanguageChange}
          >
            {supportedLanguages.map((lang) => (
              <option key={lang} value={lang}>
                {lang}
              </option>
            ))}
          </select>
          <Tooltip id="copy-tooltip" />
          <button
            onClick={copyToClipboard}
            data-tooltip-id="copy-tooltip"
            data-tooltip-content="Copy to clipboard"
            data-tooltip-place="top"
          >
            <Copy />
          </button>
        </div>
        <Editor
          value={codeString}
          name="snippet"
          onValueChange={(code) => handleCodeChange(code)}
          highlight={(code) =>
            highlight(code, languageMapping[language], language)
          }
          padding={20}
          style={{
            fontFamily: '"Fira code", "Fira Mono", monospace',
            fontSize: 16,
            rowGap: 10,
          }}
          className="h-72"
        />
      </div>
    </div>
  );
}

export default NoteCodeEditor;
