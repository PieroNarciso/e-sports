window.addEventListener('DOMContentLoaded', () => {
  const drawerToggleBtns = document.querySelectorAll('.toggle-drawer');
  const drawerElement = document.querySelector('#drawer');

  const toggleDrawer = () => {
    drawerElement.classList.toggle('hidden');
    drawerElement.classList.toggle('flex');
  }

  drawerToggleBtns.forEach(btn => {
    btn.addEventListener('click', toggleDrawer);
  });

});
