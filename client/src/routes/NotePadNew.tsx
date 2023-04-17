import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiNotePad } from "../api/apiNotePad";
import { NavigationSteps } from "../components/NavigationSteps";
import { TextareaField } from "../components/TextareaField";
import { TextField } from "../components/TextField";
import { message } from "../utils/message";

type NotePadUpdateType = {
  id: number;
  title: string;
  subtitle: string;
  content: string;
  created_at: string;
};

export function NotePadNew() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [content, setContent] = useState("");

  return (
    <div className="w-full md:w-3/5 m-auto flex flex-col gap-3">
      <NavigationSteps
        steps={[
          { to: "/", title: "Home" },
          { to: "/notepad-new/", title: "Novo" },
        ]}
      />
      <form
        noValidate
        onSubmit={async (event) => {
          event.preventDefault();
          if (title.length === 0) {
            alert("O título deve ser preenchido");
            return;
          }
          if (subtitle.length === 0) {
            alert("O subtítulo deve ser preenchido");
            return;
          }
          if (content.length === 0) {
            alert("O conteúdo deve ser preenchido");
            return;
          }
          const sendObject = {
            title: title,
            subtitle: subtitle,
            content: content,
          };

          const res = await apiNotePad.post(`/notepads/`, sendObject);
          const createNotepadResponse = res.data;
          console.log(createNotepadResponse);
          console.log(createNotepadResponse.success);
          if (createNotepadResponse.success) {
            //alert("O notepad foi criado com sucesso");
            message("O notepad foi criado com sucesso", true);
            navigate("/");
          } else {
            //alert("Houve algum erro na criação.");
            message("Houve algum erro na criação", false);
          }
        }}
        className="w-full m-auto flex flex-col gap-3 shadow-2xl p-5"
      >
        <div className="text-slate-500">
          <strong>Id:</strong> Novo
        </div>
        <div>
          <label className="text-gray-500 text-sm">
            Título
            <TextField
              placeholder="Título"
              value={title}
              onChange={(title) => setTitle(title)}
            />
          </label>
        </div>
        <div>
          <label className="text-gray-500 text-sm">
            Subtítulo
            <TextField
              placeholder="Subtítulo"
              value={subtitle}
              onChange={(subtitle) => setSubtitle(subtitle)}
            />
          </label>
        </div>
        <div>
          <label className="text-gray-500 text-sm">
            Conteúdo
            <TextareaField
              placeholder="Digite o conteúdo"
              value={content}
              onChange={(content) => setContent(content)}
            />
          </label>
        </div>
        <div className="text-center">
          <button
            type="submit"
            className="w-full bg-emerald-400 text-white px-4 rounded-xl h-12 my-auto"
          >
            Criar
          </button>
        </div>
      </form>
    </div>
  );
}
