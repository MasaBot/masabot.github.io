const canvas = document.getElementById("weather-canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particles = [];

for (let i = 0; i < 350; i++) {
    particles.push(createParticle());
}

const mouse = {x: 0, y: 0}

window.addEventListener("mousemove", (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
})

function loop() {
    canvas.width = window.innerWidth;


    for (let i = 0; i < particles.length; i++) {
        let particle = particles[i];
        

        particle.y += .5;

        if (particle.y > canvas.height) {
            particles[i] = createParticle()
            particles[i].y = -30;
        }

        const frequency = 20;
        particle.sineX += .5;

        

        const transparency = (1 - particle.y / canvas.height) / 2;

        ctx.fillStyle = `rgba(255, 255, 255, ${transparency})`

        const sineOffset = particle.sineAmplitude * Math.sin(particle.sineX/frequency);

        let mouseOffsetX = (mouse.x / window.innerWidth) * 20;
        ctx.fillRect(sineOffset + particle.x + mouseOffsetX, particle.y, 5, 5);
    }

    window.requestAnimationFrame(loop)
}

function createParticle() {
    const x = Math.round(Math.random() * canvas.width);
    const y = Math.round(Math.random() * canvas.height);
    const sineX = Math.random() * 99;
    const sineAmplitude = Math.random() * 30 + 20;

    return {x, y, sineX, sineAmplitude};
}

loop();