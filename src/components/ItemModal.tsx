import { ShoppingItem } from "@prisma/client";
import { QueryObserverResult } from "@tanstack/react-query";
import React, { Dispatch, SetStateAction, useState } from "react";
import { api } from "~/utils/api";

type Props = {
  setModalOpen: Dispatch<SetStateAction<boolean>>;
  setItems: Dispatch<SetStateAction<ShoppingItem[]>>;
  refetch: () => Promise<QueryObserverResult<any, unknown>>;
};

function ItemModal({ setModalOpen, setItems, refetch }: Props) {
  const [input, setInput] = useState<string>("");
  const { mutate: addItem } = api.item.addItem.useMutation({
    async onSuccess(shoppingItem) {
      setItems((prev) => [...prev, shoppingItem]);
      console.log("Refetching items...");
      await refetch();
    },
  });
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-black/75">
      <div className="min-w-[300px] space-y-6 bg-white py-8 px-12">
        <h3 className="text-center text-2xl font-medium">Name of Item</h3>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="decoration-none text-md w-full rounded-md border-gray-300 bg-slate-100 p-2 text-lg shadow-sm shadow-slate-300 focus:border-green-300 focus:ring focus:ring-green-300"
        />
        <div className="grid grid-cols-2 gap-6">
          <button
            type="button"
            onClick={() => setModalOpen(false)}
            className="rounded-md bg-gray-500 p-2 text-sm text-white transition hover:bg-gray-600"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => {
              addItem({ name: input });
              setModalOpen(false);
            }}
            className="rounded-md bg-green-300 p-2 text-sm text-black transition hover:bg-green-400"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
