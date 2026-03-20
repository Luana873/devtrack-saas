import { useState } from "react";
import { api } from "./services/api";

export default function Study() {
  const [technology, setTechnology] = useState("");
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [difficulty, setDifficulty] = useState("medium");
  const [notes, setNotes] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const duration = hours * 60 + minutes;

    try {
      await api.post("/study", {
        technology,
        duration,
        difficulty,
        notes
      });

      alert("Sessão salva!");

      // reset
      setTechnology("");
      setHours(0);
      setMinutes(0);
      setDifficulty("medium");
      setNotes("");

    } catch (err) {
      alert("Erro ao salvar");
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center items-center">

      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-lg w-[400px] flex flex-col gap-4"
      >

        <h2 className="text-2xl font-bold text-dark text-center">
          Registrar Estudo
        </h2>

        {/* matéria */}
        <input
          type="text"
          placeholder="Matéria / Tecnologia"
          className="border p-3 rounded-lg focus:outline-primary"
          value={technology}
          onChange={(e) => setTechnology(e.target.value)}
        />

        {/* tempo */}
        <div className="flex gap-2">

          <input
            type="number"
            placeholder="Horas"
            className="border p-3 rounded-lg w-1/2"
            value={hours}
            onChange={(e) => setHours(Number(e.target.value))}
          />

          <input
            type="number"
            placeholder="Minutos"
            className="border p-3 rounded-lg w-1/2"
            value={minutes}
            onChange={(e) => setMinutes(Number(e.target.value))}
          />

        </div>

        {/* dificuldade */}
        <select
          className="border p-3 rounded-lg focus:outline-primary"
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
        >
          <option value="easy">Fácil</option>
          <option value="medium">Médio</option>
          <option value="hard">Difícil</option>
        </select>

        {/* notas */}
        <textarea
          placeholder="Observações (opcional)"
          className="border p-3 rounded-lg resize-none"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />

        {/* botão */}
        <button
          className="bg-primary text-white p-3 rounded-lg font-semibold hover:opacity-90 transition"
        >
          Salvar
        </button>

      </form>

    </div>
  );
}