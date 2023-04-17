import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { apiNotePad } from "../api/apiNotePad";
import { message } from "../utils/message";
import { Button } from "./Button";
import { ButtonDelete } from "./ButtonDelete";

export type NotePadListType = {
  id: number;
  title: string;
  subtitle: string;
};
type NotepadListProps = {
  notepad_list: NotePadListType[];
  onDelete: (id: number) => void;
};

export function NotePadList({ notepad_list, onDelete }: NotepadListProps) {
  const navigate = useNavigate();
  return (
    <div className="ml-4 divide-y">
      {notepad_list.map((notepad, index) => {
        return (
          <div
            key={notepad.id}
            className="flex cursor-pointer hover:bg-slate-100"
          >
            <Link
              to={`/notepad-view/${notepad.id}`}
              className="flex-grow py-4 hover:underline block "
            >
              <span>Id: {notepad.id}</span>
              <h3 className="font-semibold text-xl">{notepad.title}</h3>
              <p className="text-sm">{notepad.subtitle}</p>
            </Link>
            <div className="flex flex-col align-middle">
              <Button
                className={`bg-red-600 w-28`}
                onClick={async () => {
                  const res = await apiNotePad.delete(
                    `/notepads/${notepad.id}`
                  );
                  const deleteNotepadResponse = res.data;

                  if (deleteNotepadResponse.success) {
                    message("O notepad foi excluído com sucesso", true);
                    onDelete(notepad.id);
                  } else {
                    message("Houve algum erro na exclusão", false);
                  }
                }}
              >
                Delete
              </Button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
