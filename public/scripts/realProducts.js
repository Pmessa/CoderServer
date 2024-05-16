const socket = io();
socket.on("products", (data) => {
  console.log(data);
  let template = ``;
  template = data
    .map(
      (each) => ` <div class="card m-3"
    style="width: 15rem; margin:.5rem;box-shadow: 0 5px 5px rgb(81, 115, 175)"> <img style="height:10rem" src="${each.photo}"
    class="card-img-top" alt="imagen del producto ${each.id}"> <div
    class="card-body"> <h5 class="card-title">${each.title}</h5> <p
    class="card-text">Category: ${each.category}</p> 
    <p class="card-text">stock: ${each.stock}</p>
    <p class="card-text">Price $ ${each.price}</p>
    <a href=/products/${each._id} class="btn btn-success">DETAILS</a> </div> </div>`
    )
    .join("");
  document.querySelector("#products").innerHTML = template;
});

document.querySelector("#create").addEventListener("click", (event) => {
  const title = document.querySelector("#title").value;
  const photo = document.querySelector("#photo").value;
  const category = document.querySelector("#category").value;
  const stock = document.querySelector("#stock").value;
  const price = document.querySelector("#price").value;
  socket.emit("createProduct", { title, photo, category, stock, price });
});
