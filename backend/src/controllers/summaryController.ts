import { Request, Response } from "express";
import Summary from "../models/Summary";

export const createSummary = async (
  req: Request & { user?: { id: string } },
  res: Response
) => {

  try {

    if (!req.user?.id) {
      return res.status(401).json({ message: "Usuário não autenticado" });
    }

    const summary = await Summary.create({
      ...req.body,
      user: req.user.id
    });

    res.status(201).json(summary);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao criar resumo" });
  }

};

export const getSummaries = async (
  req: Request & { user?: { id: string } },
  res: Response
) => {

  try {

    const summaries = await Summary
      .find({ user: req.user?.id })
      .sort({ createdAt: -1 });

    res.json(summaries);

  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar resumos" });
  }

};

export const toggleFavorite = async (
  req: Request,
  res: Response
) => {

  try {

    const summary = await Summary.findById(req.params.id);

    if (!summary) {
      return res.status(404).json({ message: "Resumo não encontrado" });
    }

    summary.isFavorite = !summary.isFavorite;

    await summary.save();

    res.json(summary);

  } catch (error) {
    res.status(500).json({ message: "Erro ao favoritar" });
  }

};