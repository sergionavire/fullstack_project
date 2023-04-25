import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { apiNotepad } from "../api/apiNotepad";
import { Button } from "../components/Button";
import { ButtonDelete } from "../components/ButtonDelete";
import { NavigationSteps } from "../components/NavigationSteps";

type NotepadViewType = {
  id: number;
  title: string;
  subtitle: string;
  content: string;
  created_at: string;
};

export function NotepadView() {
  const params = useParams();
  const navigate = useNavigate();
  const initialNotepad: NotepadViewType = {
    id: 0,
    title: "",
    subtitle: "",
    content: "",
    created_at: "",
  };

  const [notepad, setNotepad] = useState(initialNotepad);
  useEffect(() => {
    apiNotepad.get(`/notepads/${params.id}`).then((res) => {
      const notepad = res.data;
      setNotepad(notepad);
      console.log(notepad);
    });
  }, []);

  return (
    <div className="w-full md:w-3/5 m-auto flex flex-col gap-3">
      <NavigationSteps
        steps={[
          { to: "/", title: "Home" },
          { to: "/notepad-view/", title: "Notepad" },
        ]}
      />
      <div className="w-full m-auto flex flex-col gap-3 shadow-2xl p-5">
        <div className="text-slate-500">
          <span className="font-bold">Id:</span> {notepad.id}
        </div>
        <div className="text-slate-500">
          <strong>Criado em:</strong> {notepad.created_at}
        </div>
        <div className="font-bold text-2xl">{notepad.title}</div>
        <div className="font-bold text-l">{notepad.subtitle}</div>
        <div>
          <textarea
            value={notepad.content}
            className="w-full h-36 bg-white resize-none"
            disabled
            readOnly
          ></textarea>
        </div>
        <div className="flex flex-row gap-5">
          <ButtonDelete id={notepad.id} className="w-1/2" />
          <Button
            className="w-1/2"
            onClick={() => {
              navigate(`/notepad-update/${notepad.id}`);
            }}
          >
            Alterar
          </Button>
        </div>
      </div>
    </div>
  );
}
