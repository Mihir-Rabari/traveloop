import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { noteService } from "../services/note.service";

export const useNotes = (tripId: string) => {
  const queryClient = useQueryClient();

  const useNotesQuery = () =>
    useQuery({
      queryKey: ["notes", tripId],
      queryFn: () => noteService.getNotes(tripId),
      enabled: !!tripId,
    });

  const useCreateNoteMutation = () =>
    useMutation({
      mutationFn: (data: { title: string, content: string }) => 
        noteService.createNote({ ...data, tripId }),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["notes", tripId] });
      },
    });

  const useUpdateNoteMutation = () =>
    useMutation({
      mutationFn: ({ id, data }: { id: string, data: any }) => noteService.updateNote(id, data),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["notes", tripId] });
      },
    });

  return {
    useNotesQuery,
    useCreateNoteMutation,
    useUpdateNoteMutation,
  };
};
