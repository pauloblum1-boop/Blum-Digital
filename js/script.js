// js/script.js

document.addEventListener('DOMContentLoaded', () => {

    /* ==================================================
       1. NAVBAR SCROLL EFFECT
       ================================================== */
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) navbar.classList.add('scrolled');
        else navbar.classList.remove('scrolled');
    });

    /* ==================================================
       2. MOBILE MENU TOGGLE
       ================================================== */
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });

        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
            });
        });
    }

    /* ==================================================
       3. SMOOTH SCROLL PARA ANCORAS
       ================================================== */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    /* ==================================================
       4. FAQ ACCORDION
       ================================================== */
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const btn = item.querySelector('.faq-q');
        if (btn) {
            btn.addEventListener('click', () => {
                const isOpen = item.classList.contains('open');
                faqItems.forEach(f => f.classList.remove('open'));
                if (!isOpen) item.classList.add('open');
            });
        }
    });

    /* ==================================================
       5. PARTICLE NETWORK EFFECT (HERO) - Estilo Antigravity
       ================================================== */
    const canvas = document.getElementById('particle-canvas');
    if (!canvas) return; // Só roda se o canvas existir na página

    const ctx = canvas.getContext('2d');
    let width, height;
    let particles = [];

    // Configurações das partículas
    const config = {
        particleCount: window.innerWidth < 768 ? 40 : 100, // Menos no mobile pra não pesar
        particleRadius: 1.5,
        connectDistance: 130, // Qual a distância pra linha aparecer
        linkColor: 'rgba(255, 255, 255, 0.15)',
        particleColor: 'rgba(255, 255, 255, 0.4)',
        speed: 0.5,
        mouseRadius: 150 // Raio de atração/interação do mouse
    };

    let mouse = {
        x: null,
        y: null
    };

    // Ajusta o tamanho do canvas
    function resize() {
        width = canvas.parentElement.offsetWidth; // Pega o tamanho da seção hero
        height = canvas.parentElement.offsetHeight;
        canvas.width = width;
        canvas.height = height;
    }

    // Objeto Partícula
    class Particle {
        constructor() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.vx = (Math.random() - 0.5) * config.speed; // Velocidade aleatória X
            this.vy = (Math.random() - 0.5) * config.speed; // Velocidade aleatória Y
            this.radius = config.particleRadius;
        }

        update() {
            // Movimento constante
            this.x += this.vx;
            this.y += this.vy;

            // Rebate nas bordas
            if (this.x < 0 || this.x > width) this.vx = -this.vx;
            if (this.y < 0 || this.y > height) this.vy = -this.vy;

            // Interação com o mouse (Desvio sutil)
            if (mouse.x != null && mouse.y != null) {
                let dx = mouse.x - this.x;
                let dy = mouse.y - this.y;
                let distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < config.mouseRadius) {
                    // Efeito de movimento acompanhando o mouse (atração suave)
                    const forceDirectionX = dx / distance;
                    const forceDirectionY = dy / distance;
                    const force = (config.mouseRadius - distance) / config.mouseRadius;

                    this.vx += forceDirectionX * force * 0.05;
                    this.vy += forceDirectionY * force * 0.05;
                }
            }

            // Limitar velocidade pós-mouse pra não enlouquecer
            if (this.vx > config.speed * 2) this.vx = config.speed * 2;
            if (this.vx < -config.speed * 2) this.vx = -config.speed * 2;
            if (this.vy > config.speed * 2) this.vy = config.speed * 2;
            if (this.vy < -config.speed * 2) this.vy = -config.speed * 2;
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = config.particleColor;
            ctx.fill();
        }
    }

    // Inicialização
    function init() {
        resize();
        particles = [];
        for (let i = 0; i < config.particleCount; i++) {
            particles.push(new Particle());
        }
    }

    // Animação Loop
    function animate() {
        ctx.clearRect(0, 0, width, height);

        for (let i = 0; i < particles.length; i++) {
            particles[i].update();
            particles[i].draw();

            // Desenhar linhas entre as partículas próximas
            for (let j = i; j < particles.length; j++) {
                let dx = particles[i].x - particles[j].x;
                let dy = particles[i].y - particles[j].y;
                let distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < config.connectDistance) {
                    // Opacidade baseada na distância (mais longe, mais apagada)
                    let opacity = 1 - (distance / config.connectDistance);
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(255, 255, 255, ${opacity * 0.3})`;
                    ctx.lineWidth = 1;
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }

            // Conectar partículas ao mouse se ele estiver perto
            if (mouse.x != null && mouse.y != null) {
                let dmx = particles[i].x - mouse.x;
                let dmy = particles[i].y - mouse.y;
                let distanceMouse = Math.sqrt(dmx * dmx + dmy * dmy);

                if (distanceMouse < config.mouseRadius) {
                    let mouseOpacity = 1 - (distanceMouse / config.mouseRadius);
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(255, 255, 255, ${mouseOpacity * 0.5})`; // Linha mais forte pro mouse
                    ctx.lineWidth = 1.2;
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(mouse.x, mouse.y);
                    ctx.stroke();
                }
            }
        }
        requestAnimationFrame(animate);
    }

    // Eventos do Canvas
    window.addEventListener('resize', () => {
        resize();
        // Ajusta as partículas pro novo tamanho mantendo na tela
        particles.forEach(p => {
            if (p.x > width) p.x = width;
            if (p.y > height) p.y = height;
        });
    });

    const heroSection = document.getElementById('hero');
    if (heroSection) {
        // Captura o mouse apenas quando ele está sobre a seção do Canvas
        heroSection.addEventListener('mousemove', (e) => {
            let rect = canvas.getBoundingClientRect();
            mouse.x = e.clientX - rect.left;
            mouse.y = e.clientY - rect.top;
        });

        heroSection.addEventListener('mouseleave', () => {
            // Quando sai da seção, o mouse se perde (evita linhas voando sozinhas)
            mouse.x = null;
            mouse.y = null;
        });
    }

    // Dispara
    init();
    animate();

    /* ==================================================
       6. EVERGREEN COUNTDOWN TIMER
       ================================================== */
    function startCountdown() {
        const minsEl = document.getElementById('cd-minutes');
        const secsEl = document.getElementById('cd-seconds');

        if (!minsEl) return;

        // Definimos uma oferta de 30 minutos (1800 segundos)
        let totalSeconds = 30 * 60;

        const interval = setInterval(() => {
            totalSeconds--;

            if (totalSeconds < 0) {
                clearInterval(interval);
                // Mensagem persuasiva automática ao finalizar o tempo
                const autoMessage = encodeURIComponent("Olá, aqui é Paulo Daniel Blum. Notei que o tempo da nossa oferta de consultoria estratégica expirou enquanto você navegava. Na Blum Digital, valorizamos quem busca excelência. Como posso te ajudar a alcançar o sucesso financeiro através de uma Estratégia Digital de elite?");
                window.location.href = `https://wa.me/5548992212339?text=${autoMessage}`;
                return;
            }

            const m = Math.floor(totalSeconds / 60);
            const s = totalSeconds % 60;

            minsEl.innerText = m.toString().padStart(2, '0');
            secsEl.innerText = s.toString().padStart(2, '0');
        }, 1000);
    }

    startCountdown();

    /* ==================================================
       7. PIXEL MOUSE EFFECT (DIFERENCIAIS)
       ================================================== */
    function initPixelEffect() {
        const canvas = document.getElementById('pixel-canvas');
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        let particles = [];
        const mouse = { x: null, y: null, radius: 120 };

        const parentSection = canvas.closest('.creative-diferenciais');
        if (parentSection) {
            parentSection.addEventListener('mousemove', (e) => {
                const rect = canvas.getBoundingClientRect();
                mouse.x = e.clientX - rect.left;
                mouse.y = e.clientY - rect.top;
            });
            parentSection.addEventListener('mouseleave', () => {
                mouse.x = null;
                mouse.y = null;
            });
        }

        function resize() {
            canvas.width = canvas.parentElement.offsetWidth;
            canvas.height = canvas.parentElement.offsetHeight;
            init();
        }
        window.addEventListener('resize', resize);
        resize();

        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 2 + 1;
                this.baseX = this.x;
                this.baseY = this.y;
                this.density = (Math.random() * 30) + 5;
            }
            draw() {
                ctx.fillStyle = 'rgba(27, 139, 126, 0.4)';
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.closePath();
                ctx.fill();
            }
            update() {
                if (mouse.x !== null) {
                    let dx = mouse.x - this.x;
                    let dy = mouse.y - this.y;
                    let distance = Math.sqrt(dx * dx + dy * dy);
                    if (distance < mouse.radius) {
                        let forceDirectionX = dx / distance;
                        let forceDirectionY = dy / distance;
                        let maxDistance = mouse.radius;
                        let force = (maxDistance - distance) / maxDistance;
                        let directionX = forceDirectionX * force * this.density;
                        let directionY = forceDirectionY * force * this.density;
                        this.x -= directionX;
                        this.y -= directionY;
                    } else {
                        this.returnToBase();
                    }
                } else {
                    this.returnToBase();
                }
            }
            returnToBase() {
                if (this.x !== this.baseX) {
                    let dx = this.x - this.baseX;
                    this.x -= dx / 20;
                }
                if (this.y !== this.baseY) {
                    let dy = this.y - this.baseY;
                    this.y -= dy / 20;
                }
            }
        }

        function init() {
            particles = [];
            let numberOfParticles = (canvas.width * canvas.height) / 8000;
            for (let i = 0; i < numberOfParticles; i++) {
                particles.push(new Particle());
            }
        }

        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            for (let i = 0; i < particles.length; i++) {
                particles[i].draw();
                particles[i].update();
            }
            requestAnimationFrame(animate);
        }
        animate();
    }

    initPixelEffect();

});
