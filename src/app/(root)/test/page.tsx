"use client";
import { Button } from "@/components/ui/button";
import { useGlobalState } from "@/context/GlobalStateContext";

export default function ModalTrigger() {
  const { isModalOpen, openModal, closeModal, keyword, setKeyword } =
    useGlobalState();

  return (
    <div className="container mx-auto flex flex-col items-center flex-1 py-10 gap-10">
      <Button onClick={openModal}>Open Modal</Button>
      <input
        type="text"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        placeholder="Type keyword"
        className="border px-2 py-1"
      />
      <p>Current Keyword: {keyword}</p>
      {isModalOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-black/50 flex justify-center items-center">
          <div className="bg-white p-6 rounded">
            <h2 className="text-xl font-bold">Modal Content</h2>
            <Button onClick={closeModal} className="mt-4">
              Close
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
