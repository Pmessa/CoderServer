process.on("exit", (code) => {
    console.log("justo antes de cerrarse");
    console.log(code);
  });
  process.on("uncaughtException", (exc) => {
    console.log("Exepción no cacheada");
    console.log(exc);
  });
  process.on("message", (message)=>{
    console.log("Cuando reciba un mensaje de otro proceso")
    console.log(message)
  })
  
  process.exit();