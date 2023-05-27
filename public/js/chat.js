const txtUid = document.querySelector("#txtUid");
const txtMensaje = document.querySelector("#txtMensaje");
const listarUsuarios = document.querySelector("#listar-usuarios");
const chats = document.querySelector("#chats-body");
const private = document.querySelector("#private");
const btnEnviar = document.querySelector("#btnEnviar");
const txtNombre = document.querySelector("#txtNombre");

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
  const nombre = txtNombre.value;

  const payload = {
    from: nombre,
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

btnEnviar.addEventListener("click", enviarMensaje);

function enviarMensaje() {
  const uId = txtUid.value;
  const nombre = txtNombre.value;
  const mensaje = txtMensaje.value;

  const payload = {
    from: nombre,
    to: uId,
    mensaje,
  };

  if (mensaje.length == 0) {
    return;
  }

  socket.emit("enviar-mensaje", payload);

  const className = "text-end";
  chats.innerHTML += `<li class="${className}"> <small> ${mensaje} </small> </li>`;

  txtMensaje.value = "";
}
