//Menu NAvegação
const hamburguer = document.getElementById('hamburguer');
const menu = document.getElementById('menu');

hamburguer.addEventListener('click', () => {
  menu.classList.toggle('active');
  hamburguer.classList.toggle('active');
});

//Animação contador de alunos seção sobre
const contador = document.getElementById('contador-alunos');
let iniciou = false;

const observer = new IntersectionObserver((entries) => {
  if (entries[0].isIntersecting && !iniciou) {
    iniciou = true;
    let count = 0;
    const intervalo = setInterval(() => {
      count += 5;
      contador.textContent = count;
      if (count >= 300) clearInterval(intervalo);
    }, 40);
  }
});

observer.observe(document.querySelector('.sobre__icones-icone1'));

//Aparecer conteudo com scroll seção resultados
AOS.init();
