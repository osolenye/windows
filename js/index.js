document.addEventListener("DOMContentLoaded", function () {
            let isMenuOpen = false;
            let lastScrollPosition = 0;
            let headerVisible = true;

            // Анимация хедера при скролле
            const header = document.getElementById("header");
            window.addEventListener("scroll", function () {
                if (isMenuOpen) return;

                const currentScrollPosition = window.pageYOffset;
                
                // Определяем направление скролла
                if (currentScrollPosition > lastScrollPosition && currentScrollPosition > 100) {
                    // Скролл вниз
                    if (headerVisible) {
                        header.classList.add("hide");
                        headerVisible = false;
                    }
                } else {
                    // Скролл вверх
                    if (!headerVisible) {
                        header.classList.remove("hide");
                        headerVisible = true;
                    }
                    
                    // Класс shrink для изменения стилей
                    if (currentScrollPosition > 100) {
                        header.classList.add("shrink");
                    } else {
                        header.classList.remove("shrink");
                    }
                }
                
                lastScrollPosition = currentScrollPosition;
            });

            // Мобильное меню
            const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
            const mobileMenu = document.querySelector(".mobile-menu");

            mobileMenuBtn.addEventListener("click", function () {
                isMenuOpen = !isMenuOpen;
                mobileMenu.classList.toggle("active");
                mobileMenuBtn.innerHTML = mobileMenu.classList.contains("active")
                    ? '<i class="fas fa-times"></i>'
                    : '<i class="fas fa-bars"></i>';
                
                // Блокируем скролл при открытом меню
                document.body.style.overflow = isMenuOpen ? "hidden" : "";
            });

            // Закрытие мобильного меню при клике на ссылку
            document.querySelectorAll(".mobile-menu a").forEach((link) => {
                link.addEventListener("click", () => {
                    mobileMenu.classList.remove("active");
                    mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
                    document.body.style.overflow = "";
                    isMenuOpen = false;
                });
            });

            // Анимации при скролле для всех секций
            const sections = document.querySelectorAll(".section");
            const sectionObserver = new IntersectionObserver(
                (entries) => {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting) {
                            entry.target.classList.add("animate");
                        }
                    });
                },
                {
                    threshold: 0.1,
                }
            );

            sections.forEach(section => {
                sectionObserver.observe(section);
            });

            // Анимации для отдельных элементов
            const elementObserver = new IntersectionObserver(
                (entries) => {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting) {
                            entry.target.classList.add("animate");
                        } else {
                            // Убираем класс, чтобы анимация срабатывала каждый раз
                            entry.target.classList.remove("animate");
                        }
                    });
                },
                {
                    threshold: 0.1,
                }
            );

            // Наблюдаем за всеми элементами, которые должны анимироваться
            document
                .querySelectorAll(
                    ".feature-card, .step, .calculator-form, .calculator-result, .contact-info-box, .contact-map, .testimonial"
                )
                .forEach((element) => {
                    elementObserver.observe(element);
                });

            // Слайдер продукции
            const sliderContainer = document.querySelector(".slider-container");
            const slides = document.querySelectorAll(".slide");
            const prevBtn = document.querySelector(".prev-btn");
            const nextBtn = document.querySelector(".next-btn");
            const dots = document.querySelectorAll(".dot");

            let currentSlide = 0;
            const slideCount = slides.length;
            let sliderInterval;

            function goToSlide(index) {
                sliderContainer.style.transform = `translateX(-${index * 100}%)`;
                currentSlide = index;

                // Обновление точек
                dots.forEach((dot, i) => {
                    dot.classList.toggle("active", i === index);
                });
            }

            function startSlider() {
                sliderInterval = setInterval(() => {
                    currentSlide = (currentSlide + 1) % slideCount;
                    goToSlide(currentSlide);
                }, 5000);
            }

            function stopSlider() {
                clearInterval(sliderInterval);
            }

            nextBtn.addEventListener("click", () => {
                stopSlider();
                currentSlide = (currentSlide + 1) % slideCount;
                goToSlide(currentSlide);
                startSlider();
            });

            prevBtn.addEventListener("click", () => {
                stopSlider();
                currentSlide = (currentSlide - 1 + slideCount) % slideCount;
                goToSlide(currentSlide);
                startSlider();
            });
            
            // Навигация по точкам
            dots.forEach((dot, index) => {
                dot.addEventListener("click", () => {
                    stopSlider();
                    goToSlide(index);
                    startSlider();
                });
            });

            // Останавливаем автопрокрутку при наведении
            sliderContainer.addEventListener("mouseenter", stopSlider);
            sliderContainer.addEventListener("mouseleave", startSlider);

            startSlider();

            // Слайдер отзывов
            const testimonialContainer = document.querySelector(
                ".testimonial-container"
            );
            const testimonials = document.querySelectorAll(".testimonial");
            const testimonialPrev = document.querySelector(".testimonial-prev");
            const testimonialNext = document.querySelector(".testimonial-next");

            let currentTestimonial = 0;
            const testimonialCount = testimonials.length;
            let testimonialInterval;

            function goToTestimonial(index) {
                testimonialContainer.style.transform = `translateX(-${index * 100}%)`;
                currentTestimonial = index;
            }

            function startTestimonialSlider() {
                testimonialInterval = setInterval(() => {
                    currentTestimonial = (currentTestimonial + 1) % testimonialCount;
                    goToTestimonial(currentTestimonial);
                }, 7000);
            }

            function stopTestimonialSlider() {
                clearInterval(testimonialInterval);
            }

            testimonialNext.addEventListener("click", () => {
                stopTestimonialSlider();
                currentTestimonial = (currentTestimonial + 1) % testimonialCount;
                goToTestimonial(currentTestimonial);
                startTestimonialSlider();
            });

            testimonialPrev.addEventListener("click", () => {
                stopTestimonialSlider();
                currentTestimonial =
                    (currentTestimonial - 1 + testimonialCount) % testimonialCount;
                goToTestimonial(currentTestimonial);
                startTestimonialSlider();
            });

            testimonialContainer.addEventListener("mouseenter", stopTestimonialSlider);
            testimonialContainer.addEventListener("mouseleave", startTestimonialSlider);

            startTestimonialSlider();

            // Калькулятор
            const widthSlider = document.getElementById("width");
            const heightSlider = document.getElementById("height");
            const widthValue = document.getElementById("width-value");
            const heightValue = document.getElementById("height-value");
            const calculateBtn = document.getElementById("calculate-btn");
            const priceDisplay = document.querySelector(".price-display");

            widthSlider.addEventListener("input", () => {
                widthValue.textContent = widthSlider.value;
            });

            heightSlider.addEventListener("input", () => {
                heightValue.textContent = heightSlider.value;
            });

            calculateBtn.addEventListener("click", () => {
                // Простая логика расчета
                const width = parseInt(widthSlider.value);
                const height = parseInt(heightSlider.value);
                const area = (width * height) / 10000; // м²

                // Базовые цены для разных типов изделий
                const basePrices = {
                    window: 5000,
                    door: 10000,
                    "interior-door": 8000,
                    "stained-glass": 7000,
                    windowsill: 2000,
                    "mosquito-net": 1500,
                };

                const productType = document.getElementById("product-type").value;
                const basePrice = basePrices[productType];

                // Расчет стоимости
                let price = basePrice * area;

                // Корректировки
                const material = document.getElementById("material").value;
                if (material === "aluminum") price *= 1.3;
                if (material === "wood") price *= 1.5;
                if (material === "composite") price *= 1.8;

                const color = document.getElementById("color").value;
                if (color === "wood") price *= 1.2;
                if (color === "colored") price *= 1.3;

                // Форматирование и отображение
                price = Math.round(price / 100) * 100;
                priceDisplay.textContent = price.toLocaleString("ru-RU") + " ₽";

                // Анимация изменения цены
                priceDisplay.style.transform = "scale(1.1)";
                setTimeout(() => {
                    priceDisplay.style.transform = "scale(1)";
                }, 300);
            });

            // Плавная прокрутка для навигации
            document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
                anchor.addEventListener("click", function (e) {
                    e.preventDefault();

                    const target = document.querySelector(this.getAttribute("href"));
                    if (target) {
                        // Рассчитываем отступ с учетом высоты хедера
                        const headerHeight = header.clientHeight;
                        const targetPosition =
                            target.getBoundingClientRect().top +
                            window.pageYOffset -
                            headerHeight;

                        window.scrollTo({
                            top: targetPosition,
                            behavior: "smooth",
                        });

                        // Закрываем мобильное меню после клика
                        if (mobileMenu.classList.contains("active")) {
                            mobileMenu.classList.remove("active");
                            mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
                            document.body.style.overflow = "";
                            isMenuOpen = false;
                        }
                    }
                });
            });

            // FAQ Accordion
            const faqQuestions = document.querySelectorAll('.faq-question');
            faqQuestions.forEach(question => {
                question.addEventListener('click', () => {
                    const answer = question.nextElementSibling;
                    const isActive = question.classList.contains('active');
                    
                    // Закрываем все открытые ответы
                    document.querySelectorAll('.faq-answer').forEach(el => {
                        el.classList.remove('show');
                    });
                    document.querySelectorAll('.faq-question').forEach(el => {
                        el.classList.remove('active');
                    });
                    
                    // Открываем текущий, если он был закрыт
                    if (!isActive) {
                        question.classList.add('active');
                        answer.classList.add('show');
                    }
                });
            });
        });