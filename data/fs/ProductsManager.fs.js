const fs = require("fs");
// crypto se utiliza para crear ids aleatorios hexadecimales con id:crypto.randomBytes(12).toString('hex').
const crypto = require('crypto');
//path es la ruta donde se creará el archivo JSON
const path = "./fs/files/products.json";
//Este condicional evalúa si exixte el archivo JSON, si no existe crea un array vacío [].
if (!fs.existsSync(path)) {
  const array = JSON.stringify([]);
  fs.writeFileSync(path, array);
}
//products convierte los datos del array en objetos 
const products = JSON.parse(fs.readFileSync(path, "utf-8"));

//createProducts construye los productos
const createProducts = {
  "NUEVO PRODUCTO 1": {  id:crypto.randomBytes(12).toString('hex'), title:"Vegan Food 1" , photo:"https://img.freepik.com/foto-gratis/vista-superior-arreglo-vegetal-forma-corazon_23-2148287518.jpg?w=826&t=st=1710260892~exp=1710261492~hmac=630fd8a56369a2ed0c45d9fdaaa2b19f80b9e4c4dddc2eb0ccc43f4ea6d52c27", category:"Vegan", price:1500, stock:20 },
  "NUEVO PRODUCTO 2": {  id:crypto.randomBytes(12).toString('hex'), title:"Vegan Food 2" , photo:"https://img.freepik.com/foto-gratis/vista-superior-arreglo-vegetal-forma-corazon_23-2148287518.jpg?w=826&t=st=1710260892~exp=1710261492~hmac=630fd8a56369a2ed0c45d9fdaaa2b19f80b9e4c4dddc2eb0ccc43f4ea6d52c27", category:"Vegan", price:1500, stock:20 },
  "NUEVO PRODUCTO 3": {  id:crypto.randomBytes(12).toString('hex'), title:"Vegan Food 3" , photo:"https://img.freepik.com/foto-gratis/vista-superior-arreglo-vegetal-forma-corazon_23-2148287518.jpg?w=826&t=st=1710260892~exp=1710261492~hmac=630fd8a56369a2ed0c45d9fdaaa2b19f80b9e4c4dddc2eb0ccc43f4ea6d52c27", category:"Vegan", price:1500, stock:20 },
  "NUEVO PRODUCTO 4": {  id:crypto.randomBytes(12).toString('hex'), title:"Vegan Food 4" , photo:"https://img.freepik.com/foto-gratis/vista-superior-arreglo-vegetal-forma-corazon_23-2148287518.jpg?w=826&t=st=1710260892~exp=1710261492~hmac=630fd8a56369a2ed0c45d9fdaaa2b19f80b9e4c4dddc2eb0ccc43f4ea6d52c27", category:"Vegan", price:1500, stock:20 },
  "NUEVO PRODUCTO 5": {  id:crypto.randomBytes(12).toString('hex'), title:"Vegan Food 5" , photo:"https://img.freepik.com/foto-gratis/vista-superior-arreglo-vegetal-forma-corazon_23-2148287518.jpg?w=826&t=st=1710260892~exp=1710261492~hmac=630fd8a56369a2ed0c45d9fdaaa2b19f80b9e4c4dddc2eb0ccc43f4ea6d52c27", category:"Vegan", price:1500, stock:20 },
  "NUEVO PRODUCTO 6": {  id:crypto.randomBytes(12).toString('hex'), title:"Vegan Food 6" , photo:"https://img.freepik.com/foto-gratis/vista-superior-arreglo-vegetal-forma-corazon_23-2148287518.jpg?w=826t=st=1710260892~exp=1710261492~hmac=630fd8a56369a2ed0c45d9fdaaa2b19f80b9e4c4dddc2eb0ccc43f4ea6d52c27", category:"Vegan", price:1500, stock:20 },
  "NUEVO PRODUCTO 7": {  id:crypto.randomBytes(12).toString('hex'), title:"Vegan Food 7" , photo:"https://img.freepik.com/foto-gratis/vista-superior-arreglo-vegetal-forma-corazon_23-2148287518.jpg?w=826&t=st=1710260892~exp=1710261492~hmac=630fd8a56369a2ed0c45d9fdaaa2b19f80b9e4c4dddc2eb0ccc43f4ea6d52c27", category:"Vegan", price:1500, stock:20 },
  "NUEVO PRODUCTO 8": {  id:crypto.randomBytes(12).toString('hex'), title:"Vegan Food 8" , photo:"https://img.freepik.com/foto-gratis/vista-superior-arreglo-vegetal-forma-corazon_23-2148287518.jpg?w=826&t=st=1710260892~exp=1710261492~hmac=630fd8a56369a2ed0c45d9fdaaa2b19f80b9e4c4dddc2eb0ccc43f4ea6d52c27", category:"Vegan", price:1500, stock:20 },
  "NUEVO PRODUCTO 9": {  id:crypto.randomBytes(12).toString('hex'), title:"Vegan Food 9" , photo:"https://img.freepik.com/foto-gratis/vista-superior-arreglo-vegetal-forma-corazon_23-2148287518.jpg?w=826&t=st=1710260892~exp=1710261492~hmac=630fd8a56369a2ed0c45d9fdaaa2b19f80b9e4c4dddc2eb0ccc43f4ea6d52c27", category:"Vegan", price:1500, stock:20 },
  "NUEVO PRODUCTO 10": {  id:crypto.randomBytes(12).toString('hex'), title:"Vegan Food 10" , photo:"https://img.freepik.com/foto-gratis/vista-superior-arreglo-vegetal-forma-corazon_23-2148287518.jpg?w=826&t=st=1710260892~exp=1710261492~hmac=630fd8a56369a2ed0c45d9fdaaa2b19f80b9e4c4dddc2eb0ccc43f4ea6d52c27", category:"Vegan", price:1500, stock:20 },
};
//products.push envía los productos creados dentro del array productString 
products.push(createProducts);
//productString vuelve a formato JSON, lo transforma a texto plano.
const productString = JSON.stringify(products, null, 3);

fs.writeFileSync(path, productString);

//luego de hacer todo lo anterior se borra con fs.unlink
console.log(productString);

//fs.unlinkSync(path)

