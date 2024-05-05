import { useState, useRef } from "react";
type AnecdoteProps = {
  title: string;
};

const Anecdote: React.FC<AnecdoteProps> = ({ title }) => {
  const formModal = useRef<HTMLDialogElement | null>(null);

  const [proposition, setProposition] = useState<string>("");
  const [input, setInput] = useState<string>(proposition);

  function openForm() {
    formModal.current?.showModal();
  }

  function closeForm() {
    formModal.current?.close();
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    const value = e.currentTarget.value;
    setInput(value);
  }

  function submitForm(e: React.FormEvent) {
    e.preventDefault();
    setProposition(input);
    closeForm();
  }

  return (
    <div
      className={`text-xs h-32 flex border border-gray-700 ${
        proposition === "" ? "bg-slate-50" : "bg-emerald-600"
      }`}
    >
      <button onClick={openForm}>
        <div className="italic">{title}</div>
        <div className="font-semibold">{proposition}</div>
      </button>
      <dialog ref={formModal} className="p-1 h-52 w-64">
        <div className="h-full w-full flex flex-col gap-2 justify-center items-center text-center">
          <div className="italic text-xl">"{title}"</div>
          <div className="flex flex-col">
            <label htmlFor="proposition">Proposition:</label>
            <input
              type="text"
              id="proposition"
              value={input}
              onChange={handleChange}
              className="border border-gray-300 rounded-lg p-1"
            />
          </div>
          <button
            onClick={submitForm}
            className="bg-blue-800 text-white font-semibold px-3 py-1 rounded-lg"
          >
            Soumettre
          </button>
          <button onClick={closeForm}>Fermer</button>
        </div>
      </dialog>
    </div>
  );
};

export default Anecdote;
