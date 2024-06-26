document.querySelector("#verify").addEventListener("click", async (event) => {
  event.preventDefault();
  const data = {
    email: document.querySelector("#email").value,
    code: document.querySelector("#code").value,
  };
  const opts = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };
  let response = await fetch("/api/sessions/verify", opts);
  response = await response.json();

  if (response.statusCode === 200) {
    //console.log(response);
    //localStorage.setItem("token", response.token)
    return Swal.fire({
      title: response.message,
      icon: "success",
      timer: 5000,
      timerProgressBar: true,
      showConfirmButton: true,
      confirmButtonText: "OK",
      
    }).then(okay => {

      location.replace("/users/login")});
  } else {
    return Swal.fire({
      title: response.message,
      icon: "error",
      timer: 5000,
      timerProgressBar: true,
      confirmButtonColor: "#ff3b3c",
    })
  }
  
});
document
  .querySelector("#login-google")
  .addEventListener("click", async (event) => {
    event.preventDefault();
    window.location.href = "/users/google";
  });