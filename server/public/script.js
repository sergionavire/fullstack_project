fetch("http://localhost:8080/user").then(async (data) => {
  const user = await data.json();
  //console.log(user);
  const userId = document.querySelector("#user");
  //   console.log(userId);
  userId.innerHTML = `User: ${user.user} / Name: ${user.name}`;
});
