function receiveData(methodUse, divId) {
  fetch("http://localhost:8080/api/user", { method: methodUse }).then(
    async (data) => {
      const response = await data.json();
      const divGet = document.querySelector(divId);
      divGet.innerHTML = response.message;
    }
  );
}
receiveData("GET", "#method-get");
receiveData("POST", "#method-post");
receiveData("PUT", "#method-put");
receiveData("PATCH", "#method-patch");
receiveData("DELETE", "#method-delete");
// fetch("http://localhost:8080/api/user", { method: "GET" }).then(
//   async (data) => {
//     const response = await data.json();
//     const divGet = document.querySelector("#method-get");
//     divGet.innerHTML = response.message;
//   }
// );

// fetch("http://localhost:8080/api/user", { method: "POST" }).then(
//   async (data) => {
//     const response = await data.json();
//     const divGet = document.querySelector("#method-post");
//     divGet.innerHTML = response.message;
//   }
// );

// const { json } = await fetch("http://localhost:8080/api/user");
// const response = json();

// const url = "http://localhost:8080/api/user";
// const response = await fetch(url, { method: "GET" });
// const responseJson = await response.json();
// console.log(responseJson);
