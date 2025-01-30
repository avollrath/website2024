// Create a new file: src/scripts/navigationHandler.js
export function initializeNavigation() {
	// Store last underline position
	let lastUnderlinePosition = { left: 0, width: 0 }

	function saveUnderlinePosition() {
		const underline = document.querySelector('#nav-underline')
		if (underline) {
			const style = window.getComputedStyle(underline)
			lastUnderlinePosition = {
				left: parseFloat(style.left),
				width: parseFloat(style.width)
			}
		}
	}

	function updateUnderline() {
		const underline = document.querySelector('#nav-underline')
		const activeItem = document.querySelector('.nav-item.gradient-underline')

		if (!underline || !activeItem) return

		const navMenu = document.querySelector('#nav-menu')
		if (!navMenu) return

		const navMenuRect = navMenu.getBoundingClientRect()
		const activeItemRect = activeItem.getBoundingClientRect()

		// Calculate new position relative to nav menu
		const newLeft = activeItemRect.left - navMenuRect.left + 10 // Add padding
		const newWidth = activeItemRect.width - 20 // Subtract padding

		// Determine animation direction
		const movingRight = newLeft > lastUnderlinePosition.left

		// Set initial position for animation
		if (movingRight) {
			underline.style.left = `${lastUnderlinePosition.left}px`
			underline.style.width = `${lastUnderlinePosition.width}px`
		} else {
			underline.style.left = `${lastUnderlinePosition.left + lastUnderlinePosition.width - newWidth}px`
			underline.style.width = `${lastUnderlinePosition.width}px`
		}

		// Trigger animation
		requestAnimationFrame(() => {
			underline.style.transition = 'left 0.3s ease-out, width 0.3s ease-out'
			underline.style.left = `${newLeft}px`
			underline.style.width = `${newWidth}px`
		})
	}

	// Mobile menu handler
	// Add this to your initMobileMenu function
	function initMobileMenu() {
		const hamburger = document.getElementById('hamburger')
		const navMenu = document.getElementById('nav-menu')
		const body = document.body

		if (hamburger && navMenu) {
			hamburger.addEventListener('click', () => {
				hamburger.classList.toggle('active')
				navMenu.classList.toggle('invisible')
				navMenu.classList.toggle('mobile-menu-active')

				// Update ARIA attributes
				const isExpanded = hamburger.getAttribute('aria-expanded') === 'true'
				hamburger.setAttribute('aria-expanded', !isExpanded)

				// Toggle body scroll
				body.style.overflow = isExpanded ? '' : 'hidden'
			})
		}
	}

	// Project iframe handler
	function initializeProjectIframes() {
		function handleImageClick(imageElement) {
			const projectContainer = imageElement.closest('.wrapper')
			if (!projectContainer) return

			const imageContainer = projectContainer.querySelector('.image-container')
			const iframeContainer = projectContainer.querySelector('.iframe-container')
			const iframe = iframeContainer?.querySelector('iframe')

			if (iframe && iframe.getAttribute('data-src')) {
				iframe.src = iframe.getAttribute('data-src')
				imageContainer.classList.add('hidden')
				iframeContainer.classList.remove('hidden')
			}
		}

		const clickableImages = document.querySelectorAll('.iframe-trigger')
		clickableImages.forEach((img) => {
			img.addEventListener('click', () => handleImageClick(img))
		})
	}

	// Initialize all handlers
	function initializeAll() {
		updateUnderline()
		initMobileMenu()
		initializeProjectIframes()
	}

	// Event listeners
	document.addEventListener('astro:before-swap', saveUnderlinePosition)
	document.addEventListener('astro:after-swap', initializeAll)
	window.addEventListener('resize', updateUnderline)

	// Initial setup
	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', initializeAll)
	} else {
		initializeAll()
	}
}
