// messages_users
// user_name
// user_email
// user_title
// user_message

const enviarMensaje = document.getElementById('btnSubmit');
const statusForm = document.getElementById('status-form');
const contenidoUsuarios = document.getElementById('contenido-usuarios');

const supabaseClient = supabase.createClient(
    'https://uhpxxyojejihpvvrptpf.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVocHh4eW9qZWppaHB2dnJwdHBmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA0NTM3NzksImV4cCI6MjA3NjAyOTc3OX0.k3-OeYyjYSVWpv_nuUqryIW17QIdpCgZ0QEPbX7W7QM'
);

enviarMensaje.addEventListener('click', async (e) => {
    e.preventDefault()
    const nombre = document.getElementById('Nombre').value.trim();
    const correo = document.getElementById('Correo').value.trim();
    //const titulo = document.getElementById('Titulo').value.trim();
    const mensaje = document.getElementById('Mensaje').value.trim();

    if (!nombre || !mensaje) {
        statusForm.textContent = 'Agrega los valores necesarios';
    } else {
        const {data, error} = await supabaseClient
        .from('messages_users')
        .insert({
            user_name: nombre, 
            user_email: correo, 
            //user_title: titulo, 
            user_message: mensaje
        });
        statusForm.innerHTML = `Comentario guardado exitosamente <br> <img src="imgSocial/like-logo.png" alt="exito al guardar" class="img-like" loading="lazy" decoding="async"> <br> Recarga la pagína!!!`;
    }
});

// Informacion en el Front-End
async function mostrarMensajes() {
    const {data, error} = await supabaseClient
    .from('messages_users')
    .select('id, user_name, user_message')
    .order('id', {ascending: false})
    .gt('id', 4)

    data.forEach(contentData => {
        const contenido = document.createElement('p');
        contenido.className = 'textStyle';
        contenido.innerHTML = `Comentario: ${contentData.user_message} <br> Usuario: ${contentData.user_name}`;
        contenidoUsuarios.appendChild(contenido);
    });
}
mostrarMensajes();