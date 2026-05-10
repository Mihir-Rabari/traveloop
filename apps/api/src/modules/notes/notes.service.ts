import { notesRepository } from "./notes.repository";
import { ForbiddenError, NotFoundError } from "../../utils/errors";

export class NotesService {
  async getTripNotes(tripId: string) {
    return notesRepository.getNotes(tripId);
  }

  async createNote(userId: string, data: any) {
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
