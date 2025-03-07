let currentStep = 1
let isInstalled = false
let trialCredentials = null

const stepContent = {
  1: `
        <h2>Install the WordPress Plugin</h2>
        <p>Download and install the AI Blog Agent plugin on your WordPress site</p>
        <button id="downloadButton" class="pulse-button">
          <i class="fa-solid fa-download"></i> Download Plugin
        </button>
        <div class="installation-guide">
            <h3>Installation Instructions:</h3>
            <ol>
                <li>Go to your WordPress Admin Dashboard</li>
                <li>Click Plugins > Add New > Upload Plugin</li>
                <li>Select the downloaded file and click Install Now</li>
                <li>Activate the plugin</li>
            </ol>
        </div>
        <div class="button-container">
            <button id="helpButton">
              <i class="fa-solid fa-circle-question"></i> Need help?
            </button>
            <button id="continueButton" disabled>
              <i class="fa-solid fa-arrow-right"></i> Continue
            </button>
        </div>
    `,
  2: `
        <h2>Connect Your Site</h2>
        <p>Configure your AI Blog Agent settings</p>
        <div class="setup-form">
            <div class="input-group">
                <label for="siteUrl">WordPress Site URL</label>
                <input type="url" id="siteUrl" placeholder="https://yoursite.com">
            </div>
            <div class="input-group">
                <label for="adminUsername">Admin Username</label>
                <input type="text" id="adminUsername" placeholder="Your WordPress username">
            </div>
            <div class="input-group">
                <label for="appPassword">Application Password</label>
                <input type="password" id="appPassword" placeholder="Your application password">
                <p class="input-help">
                  <i class="fa-solid fa-circle-info"></i> 
                  Generate this in WordPress under Users > Profile > Application Passwords
                </p>
            </div>
        </div>
        <div class="setup-guide">
            <h3>Quick Setup Guide:</h3>
            <ol>
                <li>Enter your WordPress site URL</li>
                <li>Add your admin username for authentication</li>
                <li>Generate and add an application password for secure access</li>
                <li>Test the connection to ensure everything works</li>
            </ol>
        </div>
        <div class="button-container">
            <button id="backButton">
              <i class="fa-solid fa-arrow-left"></i> Back
            </button>
            <button id="continueButton">
              <i class="fa-solid fa-arrow-right"></i> Continue
            </button>
        </div>
    `,
  3: `
        <h2>Set Your Preferences</h2>
        <p>Customize your content generation settings</p>
        <div class="setup-form">
            <div class="input-group">
                <label for="postCategory">Post Category</label>
                <select id="postCategory">
                    <option value="">Select a category</option>
                    <option value="blog">Blog</option>
                    <option value="news">News</option>
                    <option value="technology">Technology</option>
                    <option value="business">Business</option>
                    <option value="lifestyle">Lifestyle</option>
                </select>
            </div>
            <div class="input-group">
                <label for="aiAgentUrl">AI Agent URL</label>
                <input type="url" id="aiAgentUrl" placeholder="https://your-ai-agent-url.com">
            </div>
            <div class="input-group">
                <label for="aiPrompt">AI Prompt Topic</label>
                <textarea id="aiPrompt" placeholder="Write about technology trends, focus on AI advancements..."></textarea>
            </div>
            <div class="schedule-settings">
                <h3>Posting Schedule</h3>
                <div class="input-group">
                    <label for="postingTime">Posting Time</label>
                    <input type="time" id="postingTime" value="09:00">
                </div>
                <div class="input-group">
                    <label>Frequency</label>
                    <div class="radio-group">
                        <label class="radio-label">
                            <input type="radio" name="frequency" value="daily" checked> Daily
                        </label>
                        <label class="radio-label">
                            <input type="radio" name="frequency" value="weekly"> Weekly
                        </label>
                    </div>
                </div>
                <div class="input-group">
                    <label class="checkbox-label">
                        <input type="checkbox" id="enableAutomation" checked>
                        Enable automatic posting
                    </label>
                </div>
            </div>
        </div>
        <div class="button-container">
            <button id="backButton">
              <i class="fa-solid fa-arrow-left"></i> Back
            </button>
            <button id="continueButton">
              <i class="fa-solid fa-arrow-right"></i> Continue
            </button>
        </div>
    `,
  4: `
        <h2>Start Your Free Trial</h2>
        <p>Begin generating AI-powered blog content</p>
        <div class="automation-status">
            <h3>Automation Status</h3>
            <div class="status-indicator">
                <span class="status-badge enabled">
                  <i class="fa-solid fa-circle-check"></i> Status: Enabled
                </span>
            </div>
            <div class="status-details">
                <p>
                  <i class="fa-solid fa-calendar-day"></i> 
                  Next scheduled post: <span id="nextPostTime">Tomorrow, 9:00 AM</span>
                </p>
                <p>
                  <i class="fa-solid fa-clock"></i> 
                  Current time: <span id="currentTime">Loading...</span>
                </p>
            </div>
        </div>
        <div class="action-buttons">
            <button id="fetchBlogButton" class="action-button">
              <i class="fa-solid fa-cloud-download-alt"></i> Fetch Blog
            </button>
            <button id="generatePostButton" class="action-button">
              <i class="fa-solid fa-wand-magic-sparkles"></i> Generate Post Now
            </button>
        </div>
        <div id="generationStatus" class="generation-status" style="display: none;">
            <div class="loading-spinner"></div>
            <p>Generating your first blog post...</p>
        </div>
        <div id="successMessage" class="success-message" style="display: none;">
            <i class="fa-solid fa-check-circle"></i>
            <h3>Success!</h3>
            <p>Your first blog post has been generated and scheduled.</p>
            <a href="#" class="btn-primary">View Post</a>
        </div>
        <div class="trial-info">
            <h3>Your Trial Details</h3>
            <p>Your 14-day free trial has started. You can generate up to 10 blog posts during this period.</p>
            <div class="trial-progress">
                <div class="progress-bar">
                    <div class="progress" style="width: 0%"></div>
                </div>
                <p>0/10 posts generated</p>
            </div>
            <p class="trial-expiry">Trial expires on: <span id="trialEndDate">Loading...</span></p>
        </div>
        <div class="button-container">
            <button id="backButton">
              <i class="fa-solid fa-arrow-left"></i> Back
            </button>
            <a href="index.html" class="btn-outline">
              <i class="fa-solid fa-home"></i> Return to Homepage
            </a>
        </div>
    `,
}

function updateStepContent() {
  document.getElementById("stepContent").innerHTML = stepContent[currentStep]
  updateStepIndicators()
  attachEventListeners()
  updateDynamicContent()
}

function updateStepIndicators() {
  for (let i = 1; i <= 4; i++) {
    const stepElement = document.getElementById(`step${i}`)
    stepElement.classList.remove("active", "completed")
    if (i === currentStep) {
      stepElement.classList.add("active")
    } else if (i < currentStep) {
      stepElement.classList.add("completed")
    }
  }
}

function attachEventListeners() {
  const downloadButton = document.getElementById("downloadButton")
  if (downloadButton) {
    downloadButton.addEventListener("click", handleDownload)
  }

  const continueButton = document.getElementById("continueButton")
  if (continueButton) {
    continueButton.addEventListener("click", () => {
      currentStep++
      updateStepContent()
    })
  }

  const backButton = document.getElementById("backButton")
  if (backButton) {
    backButton.addEventListener("click", () => {
      currentStep--
      updateStepContent()
    })
  }

  const fetchBlogButton = document.getElementById("fetchBlogButton")
  if (fetchBlogButton) {
    fetchBlogButton.addEventListener("click", handleFetchBlog)
  }

  const generatePostButton = document.getElementById("generatePostButton")
  if (generatePostButton) {
    generatePostButton.addEventListener("click", handleGeneratePost)
  }

  const helpButton = document.getElementById("helpButton")
  if (helpButton) {
    helpButton.addEventListener("click", () => {
      alert("Our support team is available 24/7. Please email support@blogai.com or call us at 1-800-BLOG-AI.")
    })
  }

  const copyButtons = document.querySelectorAll(".copy-button")
  copyButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const targetId = button.getAttribute("data-target")
      const targetElement = document.getElementById(targetId)
      copyToClipboard(targetElement.value)
    })
  })
}

function updateDynamicContent() {
  // Update current time
  const currentTimeElement = document.getElementById("currentTime")
  if (currentTimeElement) {
    updateCurrentTime()
    setInterval(updateCurrentTime, 1000)
  }

  // Update trial end date
  const trialEndDateElement = document.getElementById("trialEndDate")
  if (trialEndDateElement) {
    const endDate = new Date()
    endDate.setDate(endDate.getDate() + 14)
    trialEndDateElement.textContent = endDate.toLocaleDateString()
  }

  // Initialize testimonial slider
  initTestimonialSlider()
}

function updateCurrentTime() {
  const currentTimeElement = document.getElementById("currentTime")
  if (currentTimeElement) {
    const now = new Date()
    currentTimeElement.textContent = now.toLocaleTimeString()
  }
}

function handleDownload() {
  const pluginUrl = "./plugins/ai-auto-blog.zip"
  const filename = "ai-auto-blog.zip"

  // Create a temporary anchor element
  const downloadLink = document.createElement("a")
  downloadLink.href = pluginUrl
  downloadLink.download = filename

  // Append the anchor to the body (required for Firefox)
  document.body.appendChild(downloadLink)

  // Trigger the download
  downloadLink.click()

  // Remove the anchor from the DOM
  document.body.removeChild(downloadLink)

  // Show success message
  const downloadButton = document.getElementById("downloadButton")
  downloadButton.innerHTML = '<i class="fa-solid fa-check"></i> Downloaded'
  downloadButton.classList.add("success")

  // Enable the "Continue" button
  isInstalled = true
  document.getElementById("continueButton").disabled = false
}

function handleFetchBlog() {
  const fetchBlogButton = document.getElementById("fetchBlogButton")
  fetchBlogButton.disabled = true
  fetchBlogButton.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Fetching...'
  
  // Simulate API call
  setTimeout(() => {
    fetchBlogButton.disabled = false
    fetchBlogButton.innerHTML = '<i class="fa-solid fa-check"></i> Fetched Successfully'
    fetchBlogButton.classList.add("success")
    
    // Update progress bar
    const progressBar = document.querySelector(".progress")
    progressBar.style.width = "10%"
    document.querySelector(".trial-progress p").textContent = "1/10 posts generated"
  }, 2000)
}

function handleGeneratePost() {
  const generatePostButton = document.getElementById("generatePostButton")
  generatePostButton.disabled = true
  
  // Show generation status
  document.getElementById("generationStatus").style.display = "flex"
  
  // Simulate post generation
  setTimeout(() => {
    document.getElementById("generationStatus").style.display = "none"
    document.getElementById("successMessage").style.display = "block"
    
    // Update progress bar
    const progressBar = document.querySelector(".progress")
    progressBar.style.width = "20%"
    document.querySelector(".trial-progress p").textContent = "2/10 posts generated"
    
    // Re-enable button
    generatePostButton.disabled = false
  }, 3000)
}

function copyToClipboard(text) {
  navigator.clipboard
    .writeText(text)
    .then(() => {
      alert("Copied to clipboard!")
    })
    .catch((err) => {
      console.error("Failed to copy: ", err)
    })
}

function initTestimonialSlider() {
  const testimonials = document.querySelectorAll(".testimonial")
  const dots = document.querySelectorAll(".dot")
  let currentTestimonial = 0
  
  // Set first testimonial as active
  if (testimonials.length > 0) {
    testimonials[0].classList.add("active")
  }
  
  // Add click event to dots
  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      showTestimonial(index)
    })
  })
  
  // Auto rotate testimonials
  setInterval(() => {
    currentTestimonial = (currentTestimonial + 1) % testimonials.length
    showTestimonial(currentTestimonial)
  }, 5000)
  
  function showTestimonial(index) {
    // Hide all testimonials
    testimonials.forEach(testimonial => {
      testimonial.classList.remove("active")
    })
    
    // Remove active class from all dots
    dots.forEach(dot => {
      dot.classList.remove("active")
    })
    
    // Show selected testimonial
    testimonials[index].classList.add("active")
    dots[index].classList.add("active")
    currentTestimonial = index
  }
}

// Initialize the application
document.addEventListener("DOMContentLoaded", () => {
  updateStepContent()
})
