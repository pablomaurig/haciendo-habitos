import fs from 'fs'
import path from 'path'

const categoriesDirectory = path.join(process.cwd(), 'categories')

export function getAllCategories() {
  const filenames = fs.readdirSync(categoriesDirectory)
  const file = fs.readFileSync(path.join(process.cwd(), 'categories', filenames[0]), 'utf8')
  const categories = JSON.parse(file)

  return categories.map(category => {
    return {
      name: category.name,
      slug: category.slug,
      permalink: `/categories/${category.slug}`,
      imageUrl: `${category.slug}.jpg`,
    }
  })
}

export function getCategoryBySlug(slug) {
  const filenames = fs.readdirSync(categoriesDirectory)
  const file = fs.readFileSync(path.join(process.cwd(), 'categories', filenames[0]), 'utf8')
  const categories = JSON.parse(file)
  const category = categories.find(category => category.slug === slug)

  return {
    name: category.name,
    slug: category.slug,
    permalink: `/categories/${category.slug}`,
    imageUrl: `${category.slug}.jpg`,
  }
}