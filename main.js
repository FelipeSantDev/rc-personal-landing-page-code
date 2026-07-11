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

//Carrossel
const track = document.querySelector('.depoimentos__track');
const cards = document.querySelectorAll('.depoimentos__cards');
const dots = document.querySelectorAll('.depoimentos__dots span');

let currentIndex = 0;

function updateCarousel() {
  track.style.transform = `translateX(-${currentIndex * 100}%)`;

  dots.forEach((dot) => {
    dot.classList.remove('active');
  });

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

const wrapper = document.querySelector('.depoimentos__wrapper');

wrapper.addEventListener('touchstart', (event) => {
  startX = event.touches[0].clientX;
});

wrapper.addEventListener('touchend', (event) => {
  endX = event.changedTouches[0].clientX;

  handleSwipe();
});

function handleSwipe() {
  const distance = startX - endX;

  // Arrastou para esquerda
  if (distance > 50) {
    if (currentIndex < cards.length - 1) {
      currentIndex++;
    }
  }

  // Arrastou para direita
  if (distance < -50) {
    if (currentIndex > 0) {
      currentIndex--;
    }
  }

  updateCarousel();
}
