import { NotePadList } from "../components/NotePadList";
import { NotePadListType } from "../components/NotePadList";
import { apiNotePad } from "../api/apiNotePad";
import { useEffect, useState } from "react";

async function getNotePadList() {
  console.log("aqui 03");

  const res = await apiNotePad.get("/notepads");
  console.log("aqui 04");
  const data = await res.data;
  console.log("aqui 05");
  return data;
}

export function Home() {
  const valorInicial: NotePadListType[] = [];
  const [loading, setLoading] = useState(true);
  const loadingTextStatus = loading ? "Carregando" : "";
  const [notepadList, setNotepadList] = useState(valorInicial);
  useEffect(() => {
    setLoading(true);
    console.log("aqui 02");

    getNotePadList().then((notepads) => {
      console.log("aqui");

      setNotepadList(notepads);
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
    </div>
  );
}
