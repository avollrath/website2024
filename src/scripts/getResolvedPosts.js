import { resolveImage } from './resolveImage'

export async function getResolvedPosts() {
	const blogImages = import.meta.glob('../images/blog/*', { eager: true })
	const allPosts = await import.meta.glob('../pages/posts/*.md')
	const postEntries = Object.values(allPosts).map((postModule) => postModule())
	const posts = await Promise.all(postEntries)

	posts.forEach((post) => {
		const { frontmatter } = post
		if (!frontmatter.image?.src) {
			frontmatter.image = {
				src: blogImages['../images/blog/default.jpg']?.default || '',
				alt: 'Default blog post image'
			}
		} else {
			resolveImage(frontmatter)
		}
	})

	posts.sort((a, b) => new Date(b.frontmatter.pubDate) - new Date(a.frontmatter.pubDate))
	return posts
}
