import z from "zod";

export const SearchInputSchema = z.object({
  q: z.string().min(5, "Please ask a specific query"),
});

export type SearchInput = z.infer<typeof SearchInputSchema>;
