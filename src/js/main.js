document.addEventListener('DOMContentLoaded', () => {
  var burger = document.querySelector('.burger');
  var nav = document.querySelector('.navbar-menu');

  burger.addEventListener('click', function(){
    burger.classList.toggle('is-active');
    nav.classList.toggle('is-active');
  });
});
