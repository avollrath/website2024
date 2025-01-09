const blogImages = import.meta.glob('../images/blog/*', { eager: true })

export function resolveImage(frontmatter) {
	if (!frontmatter || !frontmatter.image) return

	const { image } = frontmatter

	if (typeof image.src === 'string' && !image.src.startsWith('http')) {
		const imageFilename = image.src.split('/').pop()
		const imagePath = `../images/blog/${imageFilename}`
		const resolvedImage = blogImages[imagePath]
		if (resolvedImage) {
			frontmatter.image.src = resolvedImage.default || resolvedImage.src || ''
		} else {
			console.error(`Image resolution failed for ${imagePath}`)
			frontmatter.image.src = ''
		}
	}
}
