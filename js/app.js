
// =========================================
// 1. FECHA ACTUAL
// =========================================

const currentDate = document.getElementById("currentDate");

if (currentDate) {

    const fecha = new Date();

    currentDate.textContent = fecha.toLocaleDateString("es-PE", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric"
    });

}


// =========================================
// 2. MODO OSCURO
// =========================================

const themeBtn = document.getElementById("themeBtn");

if (themeBtn) {

    themeBtn.addEventListener("click", () => {

        document.body.classList.toggle("dark");

        themeBtn.textContent =
            document.body.classList.contains("dark") ? "☾" : "☼";

    });

}


// =========================================
// 3. CARRUSEL PRINCIPAL
// =========================================

const slides = document.querySelectorAll(".slide");

const prevSlide = document.getElementById("prevSlide");
const nextSlide = document.getElementById("nextSlide");

const indicatorsContainer =
    document.getElementById("sliderIndicators");

const slideNumber = document.getElementById("slideNumber");

let currentSlide = 0;

let sliderInterval;


function showSlide(index) {

    if (!slides.length) return;

    currentSlide = (index + slides.length) % slides.length;

    slides.forEach((slide, i) => {
        slide.classList.toggle("active", i === currentSlide);
    });

    const indicators =
        document.querySelectorAll(".slider-indicators button");

    indicators.forEach((indicator, i) => {
        indicator.classList.toggle("active", i === currentSlide);
    });

    if (slideNumber) {

        slideNumber.textContent =
            `0${currentSlide + 1} / 0${slides.length}`;

    }

}


// CREAR INDICADORES

if (indicatorsContainer && slides.length) {

    slides.forEach((slide, index) => {

        const button = document.createElement("button");

        button.setAttribute("aria-label", `Ir a diapositiva ${index + 1}`);

        button.addEventListener("click", () => {

            showSlide(index);
            restartSlider();

        });

        indicatorsContainer.appendChild(button);

    });

}


// BOTÓN ANTERIOR

if (prevSlide) {

    prevSlide.addEventListener("click", () => {

        showSlide(currentSlide - 1);
        restartSlider();

    });

}


// BOTÓN SIGUIENTE

if (nextSlide) {

    nextSlide.addEventListener("click", () => {

        showSlide(currentSlide + 1);
        restartSlider();

    });

}


// REPRODUCCIÓN AUTOMÁTICA

function startSlider() {

    if (slides.length > 1) {

        sliderInterval = setInterval(() => {

            showSlide(currentSlide + 1);

        }, 5000);

    }

}


function restartSlider() {

    clearInterval(sliderInterval);
    startSlider();

}


showSlide(0);
startSlider();


// =========================================
// 4. FLECHAS DE NAVEGACIÓN VERTICAL
// =========================================

const scrollDown = document.getElementById("scrollDown");
const scrollUp = document.getElementById("scrollUp");

const topicSection = document.getElementById("tema-social");


if (scrollDown && scrollUp) {

    // BAJAR AL CONTENIDO

    scrollDown.addEventListener("click", () => {

        if (topicSection) {

            topicSection.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        }

    });


    // REGRESAR AL INICIO

    scrollUp.addEventListener("click", () => {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });


    // CONTROLAR VISIBILIDAD DE LAS FLECHAS

    function updateScrollButtons() {

        const scrollPosition = window.scrollY;

        const windowHeight = window.innerHeight;

        const pageHeight = document.documentElement.scrollHeight;

        // Si hay poco contenido, ocultar las flechas

        if (pageHeight <= windowHeight + 50) {

            scrollDown.style.display = "none";
            scrollUp.style.display = "none";

            return;

        }

        // Si estamos arriba

        if (scrollPosition < 300) {

            scrollDown.style.display = "flex";
            scrollUp.style.display = "none";

        }

        // Si estamos abajo

        else {

            scrollDown.style.display = "none";
            scrollUp.style.display = "flex";

        }

    }


    window.addEventListener("scroll", updateScrollButtons);

    window.addEventListener("resize", updateScrollButtons);

    updateScrollButtons();

}
