<<<<<<< HEAD
document.querySelector("#login").addEventListener("click", async () => {
=======
document.querySelector("#login").addEventListener("click", async (event) => {
  event.preventDefault();
>>>>>>> aa038a20601ff7162db969c3223076642dc46e72
  const data = {
    email: document.querySelector("#email").value,
    password: document.querySelector("#password").value,
  };
<<<<<<< HEAD

  const opts = {
    method: "POST",
    headers: { "content-type": "application/json" },
=======
  const opts = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
>>>>>>> aa038a20601ff7162db969c3223076642dc46e72
    body: JSON.stringify(data),
  };
  let response = await fetch("/api/sessions/login", opts);
  response = await response.json();
<<<<<<< HEAD
  console.log("login.js res " + response);
  if (response.statusCode === 200) {
    window.location.replace("/");
  }
  return alert(response.message)
});
=======

  if (response.statusCode === 200) {
    console.log(response);
    //localStorage.setItem("token", response.token)
    return Swal.fire({
      title: response.message,
      icon: "success",
      timer: 5000,
      timerProgressBar: true,
      showConfirmButton: true,
      confirmButtonText: "OK",
    });
  } else {
    return Swal.fire({
      title: response.message,
      icon: "error",
      timer: 5000,
      timerProgressBar: true,
      confirmButtonColor: "#ff3b3c",
    });
  }
  return location.replace("/");
});
document
  .querySelector("#login-google")
  .addEventListener("click", async (event) => {
    event.preventDefault();
    window.location.href = "/users/google";
  });
>>>>>>> aa038a20601ff7162db969c3223076642dc46e72
