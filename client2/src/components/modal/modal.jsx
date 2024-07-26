"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { createPortal } from "react-dom";

export function Modal({ children, showModal, toggleModal }) {
  const dialogRef = useRef(null);

  useEffect(() => {
    if (!dialogRef.current?.open) {
      dialogRef.current?.showModal();
    }
    const handler = (event) => {
      if (!dialogRef.current) return;
      if (!dialogRef.current.contains(event.target)) {
        toggleModal();
      }
    };
    document.addEventListener("mousedown", handler, true);
    return () => document.removeEventListener("mousedown", handler, true);
  }, []);

  function onDismiss() {
    toggleModal();
  }

  return showModal
    ? createPortal(
        <div className="modal-backdrop">
          <dialog
            ref={dialogRef}
            className="modal dark:bg-dark-accent"
            onClose={onDismiss}
          >
            {children}
            <button
              onClick={onDismiss}
              className="close-button dark:hover:bg-gray-700"
            />
          </dialog>
        </div>,
        document.getElementById("modal-root")
      )
    : null;
}
