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

function ajustarDelayAOS() {
  const camila = document.querySelector('.resultados__imagens-camila');
  const isDesktop = window.matchMedia('(min-width: 66.875em)').matches;

  if (isDesktop) {
    camila.setAttribute('data-aos-delay', '150');
  } else {
    camila.setAttribute('data-aos-delay', '300'); // volta ao valor original fora do breakpoint
  }

  // reinicia o AOS pra ele reconhecer o novo valor
  if (typeof AOS !== 'undefined') {
    AOS.refresh();
  }
}

// roda ao carregar a página
ajustarDelayAOS();

// roda de novo se a tela for redimensionada passando pelo breakpoint
window.addEventListener('resize', ajustarDelayAOS);

//Carrossel
const track = document.querySelector('.depoimentos__track');
const cards = document.querySelectorAll('.depoimentos__cards');
const dots = document.querySelectorAll('.depoimentos__dots span');
const wrapper = document.querySelector('.depoimentos__wrapper');

let currentIndex = 0;

function definirIndexInicial() {
  const isDesktop = window.matchMedia('(min-width: 66.875em)').matches;
  currentIndex = isDesktop ? 1 : 0; // Ana Paula no desktop, Juliana nos demais
}

function updateCarousel() {
  const isDesktop = window.matchMedia('(min-width: 66.875em)').matches;

  if (isDesktop) {
    const activeCard = cards[currentIndex];
    const wrapperWidth = wrapper.offsetWidth;
    const cardWidth = activeCard.offsetWidth;
    const cardLeft = activeCard.offsetLeft;

    let offset = cardLeft - (wrapperWidth - cardWidth) / 2;

    const maxOffset = track.scrollWidth - wrapperWidth;
    offset = Math.max(0, Math.min(offset, maxOffset));

    track.style.transform = `translateX(-${offset}px)`;

    cards.forEach((card, index) => {
      card.classList.toggle('active', index === currentIndex);
    });
  } else {
    track.style.transform = `translateX(-${currentIndex * 100}%)`;
  }

  dots.forEach((dot) => dot.classList.remove('active'));
  dots[currentIndex].classList.add('active');
}

dots.forEach((dot, index) => {
  dot.addEventListener('click', () => {
    currentIndex = index;
    updateCarousel();
  });
});

let startX = 0;
let endX = 0;

wrapper.addEventListener('touchstart', (event) => {
  startX = event.touches[0].clientX;
});

wrapper.addEventListener('touchend', (event) => {
  endX = event.changedTouches[0].clientX;
  handleSwipe();
});

function handleSwipe() {
  const distance = startX - endX;

  if (distance > 50) {
    currentIndex = (currentIndex + 1) % cards.length;
  }

  if (distance < -50) {
    currentIndex = (currentIndex - 1 + cards.length) % cards.length;
  }

  updateCarousel();
}

window.addEventListener('resize', updateCarousel);

window.addEventListener('load', () => {
  definirIndexInicial();
  updateCarousel();
});
