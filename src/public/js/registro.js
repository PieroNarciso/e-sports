const formulario = document.querySelector('#formulario');

/**
  * @param {{ target: HTMLFormElement } & Event} event
  *
  * Envia el email al usuario con informacion sobre su cuenta
  * Luego, envia el formulario al `backend`
  */
const sendMail = async (event) => {
  const service_id = event.target.service_id.value;
  const template_id = event.target.template_id.value;
  const user_id = event.target.user_id.value;
  const nombre = event.target.nombre.value;
  const correo = event.target.correo.value;
  const contrasena = event.target.contrasena.value;

  if (service_id && template_id && user_id) {
    try {
    emailjs.init(user_id);
    await emailjs.send(service_id, template_id,
      {
        to_name: nombre,
        password: contrasena,
        to_email: correo,
      },
    user_id); 
    } catch(err) {
      console.log(err);
    } finally {
      formulario.submit();
    }
  }
}


formulario.addEventListener("submit", async (event) => {
  event.preventDefault();
  await sendMail(event);
});
