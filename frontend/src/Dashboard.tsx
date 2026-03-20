import { useEffect, useState } from "react";
import { api } from "./services/api";

interface Study {
  duration: number;
  createdAt: string;
}

export default function Dashboard() {
  const [studies, setStudies] = useState<Study[]>([]);
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    fetchStudies();
  }, []);

  async function fetchStudies() {
    const res = await api.get("/study");
    setStudies(res.data);

    calculateStreak(res.data);
  }

  // 📊 agrupar horas por dia
  function groupByDay() {
    const map: Record<string, number> = {};

    studies.forEach((s) => {
      const date = new Date(s.createdAt).toLocaleDateString();

      map[date] = (map[date] || 0) + s.duration;
    });

    return map;
  }

  // 🔥 calcular streak
  function calculateStreak(data: Study[]) {
    const days = new Set(
      data.map((s) =>
        new Date(s.createdAt).toDateString()
      )
    );

    let currentStreak = 0;
    let today = new Date();

    while (true) {
      const dayString = today.toDateString();

      if (days.has(dayString)) {
        currentStreak++;
        today.setDate(today.getDate() - 1);
      } else {
        break;
      }
    }

    setStreak(currentStreak);
  }

  const grouped = groupByDay();

  return (
    <div className="min-h-screen bg-gray-50 p-10">

      <h1 className="text-3xl font-bold text-dark mb-6">
        Dashboard 📊
      </h1>

      {/* 🔥 Streak */}
      <div className="bg-white p-6 rounded-2xl shadow mb-6">
        <h2 className="text-xl font-semibold mb-2">
          🔥 Streak atual
        </h2>

        <p className="text-4xl font-bold text-primary">
          {streak} dias
        </p>
      </div>

      {/* 📊 Horas por dia */}
      <div className="bg-white p-6 rounded-2xl shadow">

        <h2 className="text-xl font-semibold mb-4">
          Horas estudadas por dia
        </h2>

        {Object.entries(grouped).map(([date, minutes]) => (
          <div key={date} className="mb-3">

            <div className="flex justify-between text-sm mb-1">
              <span>{date}</span>
              <span>{Math.floor(minutes / 60)}h {minutes % 60}m</span>
            </div>

            <div className="w-full bg-gray-200 h-3 rounded">
              <div
                className="bg-primary h-3 rounded"
                style={{
                  width: `${Math.min(minutes / 3, 100)}%`
                }}
              />
            </div>

          </div>
        ))}

      </div>

    </div>
  );
}