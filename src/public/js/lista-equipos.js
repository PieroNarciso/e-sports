window.addEventListener('DOMContentLoaded', () => {
  const toggleBtns = document.querySelectorAll('.toggle-integrantes');

  toggleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const integrantesList = btn.querySelector('.integrantes');
      integrantesList.classList.toggle('hidden');
      integrantesList.classList.toggle('absolute');
      const btnLabel = btn.querySelector('.toggle-label');
      if (btnLabel.innerHTML === 'Ver Integrantes') {
        btnLabel.innerHTML = 'Ocultar Integrantes';
      } else {
        btnLabel.innerHTML = 'Ver Integrantes';
      }
    });
  });
});
