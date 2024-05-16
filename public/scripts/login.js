document.querySelector("#login").addEventListener("click", async (event) => {
  event.preventDefault();
  const data = {
    email: document.querySelector("#email").value,
    password: document.querySelector("#password").value,
  };
  const opts = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };
  let response = await fetch("/api/sessions/login", opts);
  response = await response.json();
  if (response.statusCode === 200) {
    return Swal.fire({
      title: "LOGGED IN",
      confirmButtonText: "Ok",
    }).then((result) => {
      if (result.isConfirmed) {
        return location.replace("/");
      }
    });
  }
  return Swal.fire({
    title: response.message,
    icon: "error",
    timer: 5000,
    timerProgressBar: true,
    confirmButtonColor: "#ff3b3c",
  });
});
