import fetch from 'node-fetch'
import fs from 'fs'

let apiKey = GOOGLE_API_KEY

const favoriteBookISBNs = [
	'9781936976225', // Wir Kinder vom Bahnhof Zoo
	'9780452295292', // City of Thieves
	'9781626251229', // Upward Spiral
	'9780738212562', // Time
	'9781101904220', // Dark Matter
	'9780593138779', // Comfort Crisis
	'9780007263516', // The Giver
	'9780316739924', // All Quiet on the Western Front
	'9780857523471', // The Heart's Invisible Furies
	'9780593135204', // Project Hail Mary
	'0983748427', // A Short Stay in Hell
	'9780749707231', // The Little Prince
	'9780802144270' // The Physicists
]

const nowPageBookISBNs = [
	'9780451529701', // The Count of Monte Cristo
	'9781984862075', // How to Win at Chess
	'9780063251922', // Demon Copperhead
	'9780374104092', // Annihilation
	'9780671690090', // Anne Frank
	'9780671211356' // Logical Chess Move by move
]

async function fetchBookDetails(isbn) {
	const url = `https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}&key=${apiKey}`
	try {
		const response = await fetch(url)
		const data = await response.json()
		console.log(`Response status for ISBN ${isbn}: ${response.status}`)
		console.log(`Data received for ISBN ${isbn}:`, data)

		if (response.ok && data.items && data.items.length > 0) {
			const book = data.items[0].volumeInfo
			const imageLinks = book.imageLinks || {}
			const coverURL =
				imageLinks.extraLarge ||
				imageLinks.large ||
				imageLinks.medium ||
				imageLinks.small ||
				imageLinks.thumbnail ||
				''
			return {
				isbn,
				title: book.title,
				authors: book.authors ? book.authors.join(', ') : 'Unknown author',
				coverURL
			}
		} else {
			// Log when no data is found for an ISBN or response is not OK
			console.log(`No data found for ISBN ${isbn}, Response Status: ${response.status}`)
			return { isbn, title: 'No title available', authors: 'Unknown author', coverURL: '' }
		}
	} catch (error) {
		// Log any network or other errors
		console.error(`Error fetching data for ISBN ${isbn}:`, error)
		return { isbn, title: 'No title available', authors: 'Unknown author', coverURL: '' }
	}
}

// async function saveBooksData(bookISBNs, fileName) {
// 	const booksData = await Promise.all(bookISBNs.map((isbn) => fetchBookDetails(isbn)))
// 	fs.writeFileSync(fileName, JSON.stringify(booksData, null, 2))
// }

async function saveBooksData(bookISBNs, fileName, date) {
	const booksData = await Promise.all(bookISBNs.map((isbn) => fetchBookDetails(isbn)))
	const dataWithDate = {
		date: date,
		books: booksData
	}
	fs.writeFileSync(fileName, JSON.stringify(dataWithDate, null, 2))
}

// saveBooksData(favoriteBookISBNs, 'favoriteBooks.json')
saveBooksData(nowPageBookISBNs, 'nowPageBooks.json', '2024-02-06')
