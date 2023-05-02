import { CommentText } from "./CommentText";
import { commentType } from "../../../shared/types/comment.type";

type CommentContentProps = {
  comment_list: commentType[];
};

export function CommentContent({ comment_list }: CommentContentProps) {
  return (
    <div>
      {comment_list.map((comment) => (
        <CommentText date={comment.created_at} comment={comment.content} />
      ))}
    </div>
  );
}
