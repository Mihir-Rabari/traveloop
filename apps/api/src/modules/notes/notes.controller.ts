import { Request, Response } from "express";
import { notesService } from "./notes.service";
import { sendResponse } from "../../utils/response-handler";
import { asyncHandler } from "../../utils/async-handler";

export class NotesController {
  getNotes = asyncHandler(async (req: Request, res: Response) => {
    const { tripId } = req.params;
    const notes = await notesService.getTripNotes(tripId);
    return sendResponse(res, 200, "Notes retrieved successfully", notes);
  });

  createNote = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.user!.userId;
    const note = await notesService.createNote(userId, req.body);
    return sendResponse(res, 201, "Note created successfully", note);
  });

  updateNote = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const userId = req.user!.userId;
    const note = await notesService.updateNote(id, userId, req.body);
    return sendResponse(res, 200, "Note updated successfully", note);
  });

  deleteNote = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const userId = req.user!.userId;
    await notesService.deleteNote(id, userId);
    return sendResponse(res, 200, "Note deleted successfully");
  });
}

export const notesController = new NotesController();
