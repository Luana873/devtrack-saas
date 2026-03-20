import { useEffect, useState } from "react";
import { api } from "./services/api";

interface Note {
  _id: string;
  title: string;
  content: string;
  favorite: boolean;
}

export default function Notes() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    fetchNotes();
  }, []);

  async function fetchNotes() {
    const res = await api.get("/notes");
    setNotes(res.data);
  }

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();

    if (content.length > 300) {
      return alert("Máximo de 300 caracteres!");
    }

    await api.post("/notes", {
      title,
      content,
    });

    setTitle("");
    setContent("");
    fetchNotes();
  }

  async function toggleFavorite(id: string) {
    await api.patch(`/notes/${id}/favorite`);
    fetchNotes();
  }

  const favorites = notes.filter((n) => n.favorite);

  return (
    <div className="min-h-screen bg-gray-50 p-10">

      <h1 className="text-3xl font-bold text-dark mb-6">
        Notas de estudo 📚
      </h1>

      {/* criar nota */}
      <form
        onSubmit={handleCreate}
        className="bg-white p-6 rounded-2xl shadow mb-6 flex flex-col gap-3"
      >
        <input
          type="text"
          placeholder="Título"
          className="border p-3 rounded-lg"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          placeholder="Resumo (máx 300 caracteres)"
          className="border p-3 rounded-lg resize-none"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <button className="bg-primary text-white p-3 rounded-lg">
          Salvar nota
        </button>
      </form>

      {/* favoritas */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-3">
          ⭐ Favoritas
        </h2>

        {favorites.map((note) => (
          <div key={note._id} className="bg-white p-4 rounded-lg shadow mb-2">

            <div className="flex justify-between">
              <h3 className="font-bold">{note.title}</h3>

              <button onClick={() => toggleFavorite(note._id)}>
                ⭐
              </button>
            </div>

            <p className="text-sm mt-2">{note.content}</p>

          </div>
        ))}
      </div>

      {/* todas */}
      <div>
        <h2 className="text-xl font-semibold mb-3">
          Todas as notas
        </h2>

        {notes.map((note) => (
          <div key={note._id} className="bg-white p-4 rounded-lg shadow mb-2">

            <div className="flex justify-between">
              <h3 className="font-bold">{note.title}</h3>

              <button onClick={() => toggleFavorite(note._id)}>
                {note.favorite ? "⭐" : "☆"}
              </button>
            </div>

            <p className="text-sm mt-2">{note.content}</p>

          </div>
        ))}
      </div>

    </div>
  );
}