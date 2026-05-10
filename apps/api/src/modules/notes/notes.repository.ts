import { prisma } from "../../lib/prisma";

export class NotesRepository {
  async getNotes(tripId: string) {
    return prisma.tripNote.findMany({
      where: { tripId },
      orderBy: { updatedAt: "desc" },
    });
  }

  async createNote(data: any) {
    return prisma.tripNote.create({ data });
  }

  async updateNote(id: string, data: any) {
    return prisma.tripNote.update({ where: { id }, data });
  }

  async deleteNote(id: string) {
    return prisma.tripNote.delete({ where: { id } });
  }

  async findNoteById(id: string) {
    return prisma.tripNote.findUnique({
      where: { id },
      include: { trip: true },
    });
  }
}

export const notesRepository = new NotesRepository();
