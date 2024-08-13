document.querySelector("#registration").addEventListener("click", register);

async function register(e) {
  e.preventDefault();
  const data = {
    email: document.querySelector("#email").value,
    password: document.querySelector("#password").value,
    photo: document.querySelector("#photo").value,
    name: document.querySelector("#name").value,
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
        return location.replace("/users/verify");
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
