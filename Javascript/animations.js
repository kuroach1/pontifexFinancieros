document.addEventListener('DOMContentLoaded', () => {
    const title = document.querySelector('.titulo-soluciones');
    const solutions = document.querySelectorAll('.solucion');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                title.classList.add('focused');
            }
        });
    }, { threshold: 0.5 });

    observer.observe(title);

    const solutionObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, index * 200);
            }
        });
    }, { threshold: 0.5 });

    solutions.forEach(solution => solutionObserver.observe(solution));
});


//Animación de los numeros
document.addEventListener('DOMContentLoaded', () => {
    const numbers = document.querySelectorAll('.number');
    const activeAnimations = new Map();

    function startAnimation(element) {
        if (activeAnimations.has(element)) {
            clearInterval(activeAnimations.get(element));
        }
        const originalText = element.dataset.original || element.textContent.trim();
        element.dataset.original = originalText;
        const letters = [...originalText];
        let iterations = 0;
        const originalWidth = element.offsetWidth;
        element.style.width = `${originalWidth}px`;
        element.style.display = 'inline-block';

        const interval = setInterval(() => {
            const newText = letters
                .map((char, index) => {
                    if (Math.random() > 0.7 || iterations > index) {
                        return char;
                    }
                    return getRandomChar();
                })
                .join('');
            element.textContent = newText;
            iterations++;
            if (iterations > letters.length) {
                clearInterval(interval);
                element.textContent = originalText;
                element.style.width = '';
                activeAnimations.delete(element);
            }
        }, 120);

        activeAnimations.set(element, interval);
    }

    function stopAnimation(element) {
        if (activeAnimations.has(element)) {
            clearInterval(activeAnimations.get(element));
            activeAnimations.delete(element);
        }

        if (element.dataset.original) {
            element.textContent = element.dataset.original;
            element.style.width = '';
        }
    }

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                const number = entry.target;
                if (entry.isIntersecting) {
                    startAnimation(number);
                } else {
                    stopAnimation(number);
                }
            });
        },
        {
            threshold: 0.5,
        }
    );

    numbers.forEach((number) => observer.observe(number));
});

function getRandomChar() {
    const chars = '0123456789';
    return chars[Math.floor(Math.random() * chars.length)];
}


//animación de los videos
document.addEventListener("DOMContentLoaded", () => {
    const solutions = document.querySelectorAll(".solucion");

    solutions.forEach((card) => {
        const video = card.querySelector("[data-video]");
        let rewindInterval;

        card.addEventListener("mouseover", () => {
            if (video) {
                clearInterval(rewindInterval);
                video.play();
            }
        });

        card.addEventListener("mouseout", () => {
            if (video) {
                video.pause();
                rewindInterval = setInterval(() => {
                    if (video.currentTime > 0) {
                        video.currentTime -= 0.05;
                    } else {
                        clearInterval(rewindInterval); 
                    }
                }, 70);
            }
        });
    });
});

