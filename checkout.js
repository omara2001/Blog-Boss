document.addEventListener("DOMContentLoaded", () => {
  // Initialize Stripe
  const stripePublicKey = 'pk_test_51NxSample1234567890abcdefghijklmnopqrstuvwxyz';
  const stripe = Stripe(stripePublicKey);
  
  // Get URL parameters
  const urlParams = new URLSearchParams(window.location.search);
  const plan = urlParams.get('plan') || 'professional';
  const billing = urlParams.get('billing') || 'monthly';
  
  console.log("Selected plan:", plan); // Debug log
  
  // Set plan details based on URL parameter
  const planDetails = {
    starter: {
      name: 'Starter Plan',
      monthlyPrice: 16,
      annualPrice: 12 * 12
    },
    professional: {
      name: 'Professional Plan',
      monthlyPrice: 32,
      annualPrice: 30 * 12
    },
    enterprise: {
      name: 'Enterprise Plan',
      monthlyPrice: 48,
      annualPrice: 40 * 12
    }
  };
  
  // Update plan information on the page
  const selectedPlan = planDetails[plan.toLowerCase()] || planDetails.professional;
  
  console.log("Selected plan details:", selectedPlan); // Debug log
  
  document.getElementById('plan-name').textContent = selectedPlan.name;
  
  // Set billing cycle based on URL parameter
  const isAnnual = billing === 'annual';
  const price = isAnnual ? selectedPlan.annualPrice : selectedPlan.monthlyPrice;
  const cycle = isAnnual ? 'annually' : 'monthly';
  
  // Store billing preference
  localStorage.setItem('billingCycle', billing);
  localStorage.setItem('selectedPlanType', plan);
  
  document.getElementById('billing-cycle').textContent = `Billed ${cycle}`;
  document.getElementById('plan-price-display').innerHTML = 
    `$${price}<span>/${isAnnual ? 'year' : 'month'}</span>`;
  
  // Rest of the checkout.js code remains the same...
  
  // Handle form submission
  const form = document.getElementById('payment-form');
  form.addEventListener('submit', handleSubmit);
  
  async function handleSubmit(e) {
    e.preventDefault();
    
    // Show processing UI
    const submitButton = document.getElementById('submit-button');
    submitButton.disabled = true;
    document.getElementById('processing').style.display = 'flex';
    document.getElementById('error-message').style.display = 'none';
    
    // Collect form data
    const formData = {
      fullName: document.getElementById('fullName').value,
      email: document.getElementById('email').value,
      address: document.getElementById('address').value,
      city: document.getElementById('city').value,
      state: document.getElementById('state').value,
      zipCode: document.getElementById('zipCode').value,
      nameOnCard: document.getElementById('nameOnCard').value,
      cardNumber: document.getElementById('cardNumber').value.replace(/\s+/g, ''),
      expMonth: document.getElementById('expMonth').value,
      expYear: document.getElementById('expYear').value,
      cvv: document.getElementById('cvv').value
    };
    
    try {
      // In a real implementation, you would:
      // 1. Send the data to your server
      // 2. Create a payment intent with Stripe
      // 3. Confirm the payment
      
      // Simulate API call
      await simulatePaymentProcess();
      
      // Store user info in localStorage for the download page
      localStorage.setItem('userEmail', formData.email);
      localStorage.setItem('userName', formData.fullName);
      localStorage.setItem('selectedPlan', plan);
      localStorage.setItem('billingCycle', billing);
      
      // Redirect to download page on success
      window.location.href = 'download.html';
      
    } catch (error) {
      // Show error message
      const errorElement = document.getElementById('error-message');
      const errorTextElement = document.getElementById('error-text');
      
      errorTextElement.textContent = error.message || 'Payment failed. Please try again.';
      errorElement.style.display = 'flex';
      
      // Re-enable the submit button
      submitButton.disabled = false;
      document.getElementById('processing').style.display = 'none';
      
      // Scroll to error message
      errorElement.scrollIntoView({ behavior: 'smooth' });
    }
  }
  
  // Simulate payment processing (for demo purposes)
  function simulatePaymentProcess() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simulate success or failure based on card number
        // For demo: any card number ending with "0000" will fail
        const cardNumber = document.getElementById('cardNumber').value;
        
        if (cardNumber.endsWith('0000')) {
          reject(new Error('Your card was declined. Please try a different payment method.'));
        } else {
          resolve();
        }
      }, 2000);
    });
  }
  
  // Format credit card number with spaces
  const cardNumberInput = document.getElementById('cardNumber');
  cardNumberInput.addEventListener('input', (e) => {
    let value = e.target.value.replace(/\s+/g, '');
    if (value.length > 0) {
      value = value.match(new RegExp('.{1,4}', 'g')).join(' ');
    }
    e.target.value = value;
  });
  
  // Initialize particles background
  initParticles();
  
  function initParticles() {
    const canvas = document.getElementById('tsparticlesfullpage');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas dimensions
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    // Create particles (simplified version for checkout page)
    const particles = [];
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 2 + 0.5,
        speedX: Math.random() * 0.5 - 0.25,
        speedY: Math.random() * 0.5 - 0.25
      });
    }
    
    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(particle => {
        // Update position
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        
        // Wrap around edges
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;
        
        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
        ctx.fill();
      });
      
      requestAnimationFrame(animate);
    }
    
    animate();
    
    // Handle window resize
    window.addEventListener('resize', () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    });
  }
});