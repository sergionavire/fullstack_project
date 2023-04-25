export type notepadType = {
  id: number;
  title: string;
  subtitle: string;
  content: string;
  created_at: string;
};

export type getNotepadListType = {
  notepads: notepadType[];
  notepadsTotal: number;
};
