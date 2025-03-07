document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("tsparticlesfullpage")
  if (!canvas) return

  const ctx = canvas.getContext("2d")
  if (!ctx) return

  // Set canvas dimensions
  function resizeCanvas() {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
  }

  resizeCanvas()
  window.addEventListener("resize", resizeCanvas)

  // Particle class
  class Particle {
    constructor() {
      this.x = Math.random() * canvas.width
      this.y = Math.random() * canvas.height
      this.size = Math.random() * (1.4 - 0.6) + 0.6
      this.speedX = Math.random() * 0.5 - 0.25
      this.speedY = Math.random() * 0.5 - 0.25
    }

    update(mouseX, mouseY) {
      this.x += this.speedX
      this.y += this.speedY

      // Wrap around edges
      if (this.x > canvas.width) this.x = 0
      if (this.x < 0) this.x = canvas.width
      if (this.y > canvas.height) this.y = 0
      if (this.y < 0) this.y = canvas.height

      // Mouse interaction
      if (mouseX && mouseY) {
        const dx = mouseX - this.x
        const dy = mouseY - this.y
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < 100) {
          const angle = Math.atan2(dy, dx)
          this.x -= Math.cos(angle) * 1
          this.y -= Math.sin(angle) * 1
        }
      }
    }

    draw() {
      ctx.fillStyle = "rgba(255, 255, 255, 0.5)"
      ctx.beginPath()
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
      ctx.fill()
    }
  }

  // Create particles
  const particleDensity = 100
  let particles = []

  function initParticles() {
    particles = []
    for (let i = 0; i < particleDensity; i++) {
      particles.push(new Particle())
    }
  }

  initParticles()

  // Mouse position tracking
  let mouseX
  let mouseY

  window.addEventListener("mousemove", (e) => {
    mouseX = e.clientX
    mouseY = e.clientY
  })

  window.addEventListener("mouseout", () => {
    mouseX = undefined
    mouseY = undefined
  })

  // Animation loop
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    particles.forEach((particle) => {
      particle.update(mouseX, mouseY)
      particle.draw()
    })

    // Connect particles with lines
    connectParticles()

    requestAnimationFrame(animate)
  }

  function connectParticles() {
    const maxDistance = 150
    for (let i = 0; i < particles.length; i++) {
      for (let j = i; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x
        const dy = particles[i].y - particles[j].y
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < maxDistance) {
          ctx.beginPath()
          ctx.strokeStyle = `rgba(255, 255, 255, ${1 - distance / maxDistance})`
          ctx.lineWidth = 0.5
          ctx.moveTo(particles[i].x, particles[i].y)
          ctx.lineTo(particles[j].x, particles[j].y)
          ctx.stroke()
        }
      }
    }
  }

  animate()
})