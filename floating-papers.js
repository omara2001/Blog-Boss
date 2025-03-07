document.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector(".floating-papers-container")
  const paperCount = 6

  function createFloatingPapers() {
    for (let i = 0; i < paperCount; i++) {
      const paper = document.createElement("div")
      paper.className = "floating-paper"

      const icon = document.createElement("i")
      icon.className = "fa-solid fa-file-lines"
      paper.appendChild(icon)

      // Set random initial position
      const x = Math.random() * window.innerWidth
      const y = Math.random() * window.innerHeight

      paper.style.left = `${x}px`
      paper.style.top = `${y}px`

      // Add animation with random duration and delay
      const duration = 20 + Math.random() * 10
      const delay = Math.random() * 5

      paper.style.animation = `floatingPaper ${duration}s linear ${delay}s infinite`

      container.appendChild(paper)

      // Create keyframe animation for this specific paper
      animatePaper(paper, duration)
    }
  }

  function animatePaper(paper, duration) {
    let startTime = null
    const totalFrames = duration * 60 // Assuming 60fps

    // Generate random waypoints
    const waypoints = []
    for (let i = 0; i < 5; i++) {
      waypoints.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        rotation: Math.random() * 360,
      })
    }

    function animate(timestamp) {
      if (!startTime) startTime = timestamp
      const elapsed = timestamp - startTime
      const progress = (elapsed / (duration * 1000)) % 1

      // Calculate current frame
      const frameIndex = Math.floor(progress * waypoints.length)
      const nextFrameIndex = (frameIndex + 1) % waypoints.length

      // Interpolate between waypoints
      const frameProgress = (progress * waypoints.length) % 1

      const currentX = interpolate(waypoints[frameIndex].x, waypoints[nextFrameIndex].x, frameProgress)

      const currentY = interpolate(waypoints[frameIndex].y, waypoints[nextFrameIndex].y, frameProgress)

      const currentRotation = interpolate(
        waypoints[frameIndex].rotation,
        waypoints[nextFrameIndex].rotation,
        frameProgress,
      )

      // Apply position and rotation
      paper.style.left = `${currentX}px`
      paper.style.top = `${currentY}px`
      paper.style.transform = `rotate(${currentRotation}deg)`

      requestAnimationFrame(animate)
    }

    requestAnimationFrame(animate)
  }

  function interpolate(start, end, progress) {
    return start + (end - start) * progress
  }

  // Create keyframe animation for floating papers
  const style = document.createElement("style")
  style.textContent = `
    @keyframes floatingPaper {
      0%, 100% {
        transform: translate(0, 0) rotate(0deg);
      }
      25% {
        transform: translate(100px, 100px) rotate(90deg);
      }
      50% {
        transform: translate(0, 200px) rotate(180deg);
      }
      75% {
        transform: translate(-100px, 100px) rotate(270deg);
      }
    }
  `
  document.head.appendChild(style)

  // Initialize floating papers
  createFloatingPapers()

  // Handle window resize
  window.addEventListener("resize", () => {
    container.innerHTML = ""
    createFloatingPapers()
  })
})

