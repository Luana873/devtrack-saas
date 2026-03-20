import { useState } from "react";
import { api } from "./services/api";
import { Link } from "react-router-dom";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleRegister(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      await api.post("/auth/register", {
        name,
        email,
        password
      });

      alert("Conta criada com sucesso!");
    } catch {
      alert("Erro ao registrar");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-purple-600">

      <form
        onSubmit={handleRegister}
        className="
          w-[380px]
          bg-black
          p-8
          rounded-2xl
          border border-purple-500
          shadow-[0_0_30px_rgba(124,58,237,0.6)]
          flex flex-col gap-4
        "
      >

        <h1 className="text-3xl font-bold text-white text-center mb-2">
          Criar Conta
        </h1>

        <p className="text-sm text-center text-gray-400 mb-4">
          Comece sua jornada de estudos 🚀
        </p>

        <input
          type="text"
          placeholder="Nome"
          className="
            p-3 rounded-lg
            bg-gray-900 text-white
            border border-gray-700
            focus:outline-none
            focus:ring-2
            focus:ring-purple-500
          "
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="email"
          placeholder="Email"
          className="
            p-3 rounded-lg
            bg-gray-900 text-white
            border border-gray-700
            focus:outline-none
            focus:ring-2
            focus:ring-purple-500
          "
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Senha"
          className="
            p-3 rounded-lg
            bg-gray-900 text-white
            border border-gray-700
            focus:outline-none
            focus:ring-2
            focus:ring-purple-500
          "
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          className="
            mt-2
            bg-purple-600
            text-white
            p-3
            rounded-lg
            font-semibold
            hover:bg-purple-700
            transition
          "
        >
          Cadastrar
        </button>

        <p className="text-sm text-center text-gray-400 mt-3">
          Já tem conta?{" "}
          <Link
            to="/"
            className="text-purple-400 font-semibold hover:underline"
          >
            Fazer login
          </Link>
        </p>

      </form>

    </div>
  );
}