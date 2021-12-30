import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'

const authorsDirectory = path.join(process.cwd(), 'authors')

export function getAllAuthors() {
  const filenames = fs.readdirSync(authorsDirectory)

  return filenames.map(filename => {
    const file = fs.readFileSync(path.join(process.cwd(), 'authors', filename), 'utf8')

    // get data
    const data = JSON.parse(file)

    // get slug from filename
    const slug = filename.replace(/\.json/, '')

    // return combined frontmatter and slug; build permalink
    return {
      ...data,
      slug,
      permalink: `/authors/${slug}`,
      profilePictureUrl: `${slug}.jpg`,
    }
  })
}

export function getAuthorBySlug(slug) {
  const file = fs.readFileSync(path.join(process.cwd(), 'authors', `${slug}.json`), 'utf8')

  const data = JSON.parse(file)

  return {
    ...data,
    permalink: `/authors/${slug}`,
    profilePictureUrl: `/${slug}.jpg`,
    slug,
  }
}