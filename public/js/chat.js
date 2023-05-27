const txtUid = document.querySelector("#txtUid");
const txtMensaje = document.querySelector("#txtMensaje");
const listarUsuarios = document.querySelector("#listar-usuarios");
const chats = document.querySelector("#chats-body");
const private = document.querySelector("#private");
const btnEnviar = document.querySelector("#btnEnviar"); // Agregado: Obtener referencia al botón de enviar

socket.on("usuarios-activos", (payload) => {
  let userHtml = "";
  payload.forEach((element) => {
    if (socket.id === element) return;
    userHtml += `<li> ${element} </li>`;
  });
  listarUsuarios.innerHTML = userHtml;
});

txtMensaje.addEventListener("keyup", ({ keyCode }) => {
  const uId = txtUid.value;
  const mensaje = txtMensaje.value;

  const payload = {
    from: socket.id,
    to: uId,
    mensaje,
  };

  if (keyCode != 13) {
    return;
  }
  if (mensaje.length == 0) {
    return;
  }

  socket.emit("enviar-mensaje", payload);
});

socket.on("recibir-mensaje", (payload) => {
  console.log(payload);
  const className =
    payload.from == socket.id ? "text-end" : "text-start text-primary";

  if (!payload.to) {
    chats.innerHTML += `<li class="${className}"> <small> ${payload.mensaje} </small> </li>`;
  } else {
    private.innerHTML += `<li class="${className}"> <small> ${payload.mensaje} </small> </li>`;
  }
});

// Agregado: Agregar evento de click al botón de enviar
btnEnviar.addEventListener("click", enviarMensaje);

// Agregado: Función para enviar el mensaje
// Agregado: Función para enviar el mensaje
function enviarMensaje() {
  const uId = txtUid.value;
  const mensaje = txtMensaje.value;

  const payload = {
    from: socket.id,
    to: uId,
    mensaje,
  };

  if (mensaje.length == 0) {
    return;
  }

  socket.emit("enviar-mensaje", payload);
  
  // Agregar el mensaje enviado al chat
  const className = "text-end"; // El mensaje enviado siempre se mostrará alineado a la derecha
  chats.innerHTML += `<li class="${className}"> <small> ${mensaje} </small> </li>`;
  
  // Limpiar campo de mensaje después de enviar
  txtMensaje.value = "";
}

