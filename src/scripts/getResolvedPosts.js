const blogImages = import.meta.glob('../images/blog/*', { eager: true })

export async function getResolvedPosts() {
	const allPosts = await import.meta.glob('../pages/posts/*.md')
	const postEntries = Object.values(allPosts).map((postModule) => postModule())
	const posts = await Promise.all(postEntries)

	posts.forEach((post) => {
		const { image } = post.frontmatter || {}
		if (!image?.src) {
			post.frontmatter.image = {
				src: blogImages['../images/blog/default.jpg']?.default || '',
				alt: 'Default blog post image'
			}
		} else if (typeof image.src === 'string' && !image.src.startsWith('http')) {
			const imagePath = `../images/blog/${image.src.split('/').pop()}`
			const resolvedImage = blogImages[imagePath]
			if (resolvedImage) {
				image.src = resolvedImage.default || resolvedImage.src || ''
			} else {
				image.src = ''
			}
		}
	})

	posts.sort((a, b) => new Date(b.frontmatter.pubDate) - new Date(a.frontmatter.pubDate))
	return posts
}
