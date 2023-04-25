import { NotepadList, NotepadListType } from "../components/NotepadList";
import { PaginationList } from "../components/PaginationList";
import { apiNotepad } from "../api/apiNotepad";
import { useEffect, useState } from "react";
import { getNotepadListType } from "../../../shared/types/notepad.type";
import { useParams } from "react-router-dom";

// const params = useParams();
// const page = params.page === undefined ? 1 : parseInt(params.page);

async function getNotepadList(page: number) {
  const res = await apiNotepad.get(`/notepads?page=${page}`);
  const data = await res.data;
  return data;
}

export function Home() {
  const params = useParams();
  const page = params.page === undefined ? 1 : parseInt(params.page);
  console.log(page);

  const valorInicial: NotepadListType[] = [];
  const [loading, setLoading] = useState(true);
  const [pageTotal, setPageTotal] = useState(1);
  const loadingTextStatus = loading ? "Carregando" : "";
  const [notepadList, setNotepadList] = useState(valorInicial);
  useEffect(() => {
    setLoading(true);
    getNotepadList(page).then((notepads: getNotepadListType) => {
      setNotepadList(notepads.notepads);
      setPageTotal(notepads.totalPages);
      setLoading(false);
    });
  }, [params]);

  return (
    <div>
      <h2 className="font-bold mb-3 text-2xl ml-2">Lista de anotações:</h2>
      <div>{loadingTextStatus}</div>
      <NotepadList
        notepad_list={notepadList}
        onDelete={(id) => {
          const newNotepads = notepadList.filter(
            (notepad) => notepad.id !== id
          );
          setNotepadList(newNotepads);
        }}
      />
      <PaginationList totalPages={pageTotal} />
    </div>
  );
}
