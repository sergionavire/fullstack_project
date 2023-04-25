import { NotePadList } from "../components/NotePadList";
import { NotePadListType } from "../components/NotePadList";
import { apiNotePad } from "../api/apiNotePad";
import { useEffect, useState } from "react";
import { getNotepadListType } from "../../../shared/types/notepad.type";
import { LinkButton } from "../components/LinkButton";

async function getNotePadList() {
  const res = await apiNotePad.get("/notepads");
  const data = await res.data;
  return data;
}

export function Home() {
  const valorInicial: NotePadListType[] = [];
  const [loading, setLoading] = useState(true);
  const loadingTextStatus = loading ? "Carregando" : "";
  const [notepadList, setNotepadList] = useState(valorInicial);
  useEffect(() => {
    setLoading(true);

    getNotePadList().then((notepads: getNotepadListType) => {
      setNotepadList(notepads.notepads);
      setLoading(false);
    });
  }, []);

  return (
    <div>
      <h2 className="font-bold mb-3 text-2xl ml-2">Lista de anotações:</h2>
      <div>{loadingTextStatus}</div>
      <NotePadList
        notepad_list={notepadList}
        onDelete={(id) => {
          const newNotepads = notepadList.filter(
            (notepad) => notepad.id !== id
          );
          setNotepadList(newNotepads);
        }}
      />
      <div>
        <LinkButton key={"id"} to="" className="" children="Teste"></LinkButton>
      </div>
    </div>
  );
}
