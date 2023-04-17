import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { apiNotePad } from "../api/apiNotePad";
import { message } from "../utils/message";
import { NavigationSteps } from "../components/NavigationSteps";

export function NotePadUpdate() {
  const params = useParams();
  const navigate = useNavigate();
  const [createdAt, setCreatedAt] = useState("");
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [content, setContent] = useState("");
  useEffect(() => {
    apiNotePad.get(`/notepads/${params.id}`).then((item) => {
      setCreatedAt(item.data.created_at);
      setTitle(item.data.title);
      setSubtitle(item.data.subtitle);
      setContent(item.data.content);
    });
  }, []);

  return (
    <div className="w-full md:w-3/5 m-auto flex flex-col gap-3">
      <NavigationSteps
        steps={[
          { to: "/", title: "Home" },
          { to: "/notepad-update/", title: "Atualizar" },
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
          console.log(sendObject);

          const res = await apiNotePad.put(
            `/notepads/${params.id}`,
            sendObject
          );
          const updateNotepadResponse = res.data;

          if (updateNotepadResponse.success) {
            message("O notepad foi alterado com sucesso", true);
            navigate(`/notepad-view/${params.id}`);
          } else {
            message("Houve algum erro na alteração do notepad", false);
          }
        }}
        className="w-full m-auto flex flex-col gap-3 shadow-2xl p-5"
      >
        <div className="text-slate-500">
          <strong>Id:</strong> {params.id}
        </div>
        <div className="text-slate-500">
          <strong>Criado em:</strong> {createdAt}
        </div>
        <div>
          <label className="text-gray-500 text-sm">
            Título
            <input
              type="text"
              id="title"
              value={title}
              onChange={(event) => {
                setTitle(event.target.value);
              }}
              className="text-2xl bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </label>
        </div>
        <div>
          <label className="text-gray-500 text-sm">
            Subtítulo
            <input
              type="text"
              value={subtitle}
              onChange={(event) => {
                setSubtitle(event.target.value);
              }}
              className="font-normal text-1 bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </label>
        </div>
        <div>
          <label className="text-gray-500 text-sm">
            Conteúdo
            <textarea
              value={content}
              className="w-full h-36 resize-none font-normal text-1 bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              onChange={(event) => {
                event.preventDefault();
                setContent(event.target.value);
              }}
            ></textarea>
          </label>
        </div>
        <div className="text-center">
          <button
            type="submit"
            className="w-full bg-emerald-400 text-white px-4 rounded-xl h-12 my-auto"
          >
            Alterar
          </button>
        </div>
      </form>
    </div>
  );
}
