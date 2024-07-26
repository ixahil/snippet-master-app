import { CheckIcon } from "lucide-react";
import { Modal } from "./modal";
import { Trash } from "lucide-react";
import LoadingButton from "../ui/loading-button";

function ConfirmationModal({
  showModal,
  toggleModal,
  handleConfirm,
  isLoading,
}) {
  const handleCancel = () => {
    toggleModal();
  };
  return (
    <Modal showModal={showModal} toggleModal={toggleModal}>
      <div className="space-y-8 text-base w-[500px] h-full flex flex-col">
        <h4>{"Move to Trash?"}</h4>
        <div className="flex items-center gap-2">
          <LoadingButton
            className={
              "bg-red-500 border-2 border-red-500 text-white w-full flex items-center justify-center gap-2 p-2 rounded-md"
            }
            onClick={handleConfirm}
            isLoading={isLoading}
          >
            Move to Trash <Trash />
          </LoadingButton>

          <button
            className={
              "border-2 border-accent w-full flex items-center justify-center gap-2 p-2 rounded-md"
            }
            variant={"outline"}
            onClick={handleCancel}
          >
            Cancel
          </button>
        </div>
      </div>
    </Modal>
  );
}

export default ConfirmationModal;
