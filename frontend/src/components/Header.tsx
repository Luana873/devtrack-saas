import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="bg-dark text-white p-4 flex justify-between">

      <h1 className="font-bold">DevTrack</h1>

      <nav className="flex gap-4">
        <Link to="/">Dashboard</Link>
        <Link to="/study">Estudar</Link>
        <Link to="/notes">Notas de estudo</Link>
      </nav>

    </header>
  );
}