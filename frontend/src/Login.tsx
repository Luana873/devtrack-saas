import { useState } from "react";
import { api } from "./services/api";
import logo from "./assets/icon.png";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin(e: React.SyntheticEvent<HTMLFormElement>) {
  e.preventDefault();

  try {
    const res = await api.post("/auth/login", {
      email,
      password
    });

    localStorage.setItem("token", res.data.token);

    navigate("/dashboard"); 

  } catch {
    alert("Erro ao logar");
  }
}
  return (
    <div className="min-h-screen flex">

      {/* LADO DEVTRACK */}
      <div className="w-1/2 relative bg-dark text-white flex flex-col justify-center items-center p-10 overflow-hidden">

        {/* camada animada */}
        <div className="absolute inset-0 bg-primary slide-purple"></div>

        {/* conteúdo */}
        <div className="relative z-10 flex flex-col items-center">

          <div className="flex items-center gap-4 mb-6">

          <img
           src={logo}
           alt="icon.png"
           className="w-12 h-12"
           />

           <h1 className="text-5xl font-bold">
            DevTrack
           </h1>

           </div>

          <p className="text-lg text-center max-w-md">
            Bem-vindo ao DevTrack 👋
          </p>

          <p className="text-center mt-4 opacity-90 max-w-md">
            Um site que te ajuda a organizar seus estudos,
            acompanhar seu progresso e manter consistência
            todos os dias.
          </p>

        </div>

      </div>

      {/* LADO LOGIN */}
      <div className="w-1/2 flex items-center justify-center bg-black">

        <form
          onSubmit={handleLogin}
          className="w-[350px] flex flex-col gap-4"
        >

          <h2 className="text-3xl font-bold text-white mb-4">
            Login
          </h2>

          <input
            type="email"
            placeholder="Email"
            className="border p-3 rounded-lg focus:outline-primary"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Senha"
            className="border p-3 rounded-lg focus:outline-primary"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            className="bg-primary text-white p-3 rounded-lg font-semibold hover:opacity-90 transition"
          >
            Entrar
          </button>

          <p className="text-white text-center mt-2">
         Não tem uma conta?{" "}
          <Link
           to="/register"
           className="text-white-600 font-semibold hover:underline"
           >
           Cadastre-se!
          </Link>
          </p>

        </form>

      </div>

    </div>
  );
}