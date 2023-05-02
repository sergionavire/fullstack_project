import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { apiNotepad } from "../api/apiNotepad";
import { message } from "../utils/message";
import { Button } from "../components/Button";
import { ButtonDelete } from "../components/ButtonDelete";
import { NavigationSteps } from "../components/NavigationSteps";
import { CommentContent } from "../components/CommentContent";
import { commentType } from "../../../shared/types/comment.type";

type NotepadViewType = {
  id: number;
  title: string;
  subtitle: string;
  content: string;
  created_at: string;
};

const initialComments: commentType[] = [];

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
  const [comments, setComments] = useState(initialComments);
  const [newComment, setNewComment] = useState("");
  useEffect(() => {
    apiNotepad.get(`/notepads/${params.id}`).then((res) => {
      const notepad = res.data;
      setNotepad(notepad);
    });
    apiNotepad.get(`/comments/${params.id}`).then((res) => {
      const commentsData = res.data;
      setComments(commentsData);
    });
  }, []);
  // useEffect(() => {
  //   setComments(commentsData);
  // }, [comments]);
  return (
    <div className="w-full md:w-3/5 m-auto flex flex-col gap-3">
      <NavigationSteps
        steps={[
          { to: "/", title: "Home" },
          { to: `/notepad-view/${notepad.id}`, title: "Notepad" },
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
      <div className="mt-5 bg-slate-200">
        <h2 className="bg-slate-400 text-center text-lg font-bold rounded-md">
          Comentários:
        </h2>
        <div>
          <form
            onSubmit={async (event) => {
              event.preventDefault();
              // event.preventDefault();
              const newCommentToSend = {
                content: newComment,
                notepad_id: notepad.id,
              };
              const res = await apiNotepad.post("/comments/", newCommentToSend);
              const createdCommentResponse = res.data;
              if (createdCommentResponse.success) {
                message("O comentário foi criado com sucesso", true);
              } else {
                message("Ocorreu algum erro na criação do comentário", false);
              }
              setComments([...comments, createdCommentResponse.data]);
              setNewComment("");
            }}
          >
            <textarea
              className="w-full h-36 resize-none font-normal text-1 bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              onChange={(event) => {
                event.preventDefault();
                setNewComment(event.target.value);
                console.log(event.target.value);
              }}
              placeholder="Digite o comentário"
              value={newComment}
              key="1"
            ></textarea>
            <input
              type="submit"
              className="w-full mt-2 bg-sky-300"
              value="Inserir Comentário"
            />
          </form>
        </div>
        <CommentContent comment_list={comments} />
      </div>
    </div>
  );
}
