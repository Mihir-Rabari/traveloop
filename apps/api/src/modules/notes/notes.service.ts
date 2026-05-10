import { notesRepository } from "./notes.repository";
import { ForbiddenError, NotFoundError } from "../../utils/errors";
import { prisma } from "../../lib/prisma";

export class NotesService {
  async getTripNotes(tripId: string, userId: string) {
    const trip = await prisma.trip.findUnique({ where: { id: tripId } });
    if (!trip) throw new NotFoundError("Trip not found");
    if (trip.visibility === "PRIVATE" && trip.userId !== userId) throw new ForbiddenError();

    return notesRepository.getNotes(tripId);
  }

  async createNote(userId: string, data: any) {
    const trip = await prisma.trip.findUnique({ where: { id: data.tripId } });
    if (!trip) throw new NotFoundError("Trip not found");
    if (trip.userId !== userId) throw new ForbiddenError();

    return notesRepository.createNote(data);
  }

  async updateNote(noteId: string, userId: string, data: any) {
    const note = await notesRepository.findNoteById(noteId);
    if (!note) throw new NotFoundError("Note not found");
    if (note.trip.userId !== userId) throw new ForbiddenError();

    return notesRepository.updateNote(noteId, data);
  }

  async deleteNote(noteId: string, userId: string) {
    const note = await notesRepository.findNoteById(noteId);
    if (!note) throw new NotFoundError("Note not found");
    if (note.trip.userId !== userId) throw new ForbiddenError();

    return notesRepository.deleteNote(noteId);
  }
}

export const notesService = new NotesService();
