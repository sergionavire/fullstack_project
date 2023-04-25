import { LinkButton } from "./LinkButton";

type PaginationListType = {
  totalPages: number;
};

export function PaginationList({ totalPages }: PaginationListType) {
  const pageList = Array.from(
    { length: totalPages },
    (item, index) => index + 1
  );
  console.log(totalPages);

  return (
    <div className="flex gap-3 mb-5 justify-center">
      {pageList.map((page) => {
        return (
          <LinkButton
            key={page}
            to={`/page/${page}`}
            className=""
            children={page.toString()}
          ></LinkButton>
        );
      })}
    </div>
  );
}

// import { LinkButton } from "./LinkButton";

// type PaginationListType = {
//   totalPages: number;
// };

// export function PaginationList({ totalPages }: PaginationListType) {
//   const pageList = Array.from(
//     { length: totalPages },
//     (item, index) => index + 1
//   );
//   return (
//     <div>
//       {pageList.map((page, index) => {
//         return (
//           <LinkButton
//             key={"id"}
//             to=""
//             className=""
//             children={page.toString()}
//           ></LinkButton>
//         );
//       })}
//     </div>
//   );
// }
