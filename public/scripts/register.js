document.querySelector("#registration").addEventListener("click", register);

async function register() {
  const data = {
    email: document.querySelector("#email").value,
    password: document.querySelector("#password").value,
    photo: document.querySelector("#photo").value,
    //role: document.querySelector("#role").value,
  };
  const url = "/api/sessions/register";
  const opts = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };
  let response = await fetch(url, opts);
  response = await response.json();
  if (response.statusCode === 201) {
    return Swal.fire({
        title: "REGISTER",
        confirmButtonText: "Ok",
      }).then((result) => {
        if (result.isConfirmed) {
      return location.replace("/users/login");
        }
    });
  }
  return Swal.fire({
    title: response.message,
    icon: "error",
    timer: 5000,
    timerProgressBar: true,
  });
}