import { useState } from "react";
import { api } from "./services/api";

export default function Reminder() {

  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [date, setDate] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    await api.post("/reminders", {
      email,
      message,
      remindAt: new Date(date)
    });

    alert("Lembrete criado!");
  }

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-50">

      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow flex flex-col gap-4 w-[400px]"
      >

        <h2 className="text-2xl font-bold text-dark">
          Criar Lembrete ⏰
        </h2>

        <input
          type="email"
          placeholder="Seu email"
          className="border p-3 rounded-lg"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <textarea
          placeholder="Mensagem"
          className="border p-3 rounded-lg"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        <input
          type="datetime-local"
          className="border p-3 rounded-lg"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        <button className="bg-primary text-white p-3 rounded-lg">
          Salvar lembrete
        </button>

      </form>

    </div>
  );
}