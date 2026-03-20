import { Request, Response } from "express";
import StudySession from "../models/studySession";

export const createStudySession = async (
  req: Request & { user?: { id: string } },
  res: Response
) => {
  try {

    if (!req.user?.id) {
      return res.status(401).json({ message: "Usuário não autenticado" });
    }

    if (!req.body.technology || !req.body.duration) {
      return res.status(400).json({ message: "technology e duration são obrigatórios" });
    }

    const session = await StudySession.create({
      ...req.body,
      user: req.user.id
    });

    res.status(201).json(session);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao registrar estudo" });
  }
};

export const getStudySessions = async (
  req: Request & { user?: { id: string } },
  res: Response
) => {
  try {

    if (!req.user?.id) {
      return res.status(401).json({ message: "Usuário não autenticado" });
    }

    const sessions = await StudySession
      .find({ user: req.user.id })
      .sort({ createdAt: -1 });

    res.json(sessions);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao buscar sessões" });
  }
};

export const getStudyStats = async (
  req: Request & { user?: { id: string } },
  res: Response
) => {
  try {

    if (!req.user?.id) {
      return res.status(401).json({ message: "Usuário não autenticado" });
    }

    const sessions = await StudySession.find({ user: req.user.id });

    const totalMinutes = sessions.reduce(
      (acc: number, s: any) => acc + s.duration,
      0
    );

    const totalHours = (totalMinutes / 60).toFixed(2);

    const uniqueDays = new Set(
      sessions.map((s: any) => new Date(s.date).toDateString())
    );

    const daysStudied = uniqueDays.size;

    // calcular streak
    const studyDays = Array.from(uniqueDays)
      .map((d: any) => new Date(d))
      .sort((a, b) => b.getTime() - a.getTime());

    let currentStreak = 0;

    for (let i = 0; i < studyDays.length; i++) {

      if (i === 0) {

        const diff =
          (new Date().setHours(0,0,0,0) - studyDays[i].setHours(0,0,0,0)) /
          (1000 * 60 * 60 * 24);

        if (diff > 1) break;

        currentStreak++;

      } else {

        const diff =
          (studyDays[i - 1].setHours(0,0,0,0) -
           studyDays[i].setHours(0,0,0,0)) /
          (1000 * 60 * 60 * 24);

        if (diff === 1) {
          currentStreak++;
        } else {
          break;
        }

      }

    }

    res.json({
      totalHours,
      daysStudied,
      totalSessions: sessions.length,
      streak: currentStreak
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao calcular estatísticas" });
  }
};