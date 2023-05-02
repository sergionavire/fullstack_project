type CommentTextType = {
  date: string;
  comment: string;
};

export function CommentText({ date, comment }: CommentTextType) {
  return (
    <div className="mt-4 mb-8">
      <h4 className="text-sm text-slate-600 pl-5">{date}</h4>
      <div className="rounded-xl bg-slate-100 px-5 py-2 mx-4">{comment}</div>
    </div>
  );
}
