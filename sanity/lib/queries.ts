import { defineQuery } from 'next-sanity'

// All articles (for listing page)
export const ARTICLES_QUERY = defineQuery(`
  *[_type == "article"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    publishedAt,
    featured,
    mainImage,
    "author": author->{ name, slug, photo },
    "category": category->{ title, slug }
  }
`)

// Single article by slug
export const ARTICLE_BY_SLUG_QUERY = defineQuery(`
  *[_type == "article" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    excerpt,
    publishedAt,
    body,
    mainImage,
    tags,
    "author": author->{ name, slug, photo, bio },
    "category": category->{ title, slug }
  }
`)

// Featured articles (for homepage)
export const FEATURED_ARTICLES_QUERY = defineQuery(`
  *[_type == "article" && featured == true] | order(publishedAt desc)[0..5] {
    _id,
    title,
    slug,
    excerpt,
    publishedAt,
    mainImage,
    "author": author->{ name, slug },
    "category": category->{ title, slug }
  }
`)

// Articles by category
export const ARTICLES_BY_CATEGORY_QUERY = defineQuery(`
  *[_type == "article" && category->slug.current == $slug] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    publishedAt,
    mainImage,
    "author": author->{ name, slug },
    "category": category->{ title, slug }
  }
`)

// Articles by tag
export const ARTICLES_BY_TAG_QUERY = `
  *[_type == "article" && $tag in tags] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    publishedAt,
    mainImage,
    "author": author->{ name, slug },
    "category": category->{ title, slug }
  }
`

// Articles by author
export const ARTICLES_BY_AUTHOR_QUERY = defineQuery(`
  *[_type == "article" && author->slug.current == $slug] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    publishedAt,
    mainImage,
    "category": category->{ title, slug }
  }
`)

// All categories
export const CATEGORIES_QUERY = defineQuery(`
  *[_type == "category"] | order(title asc) {
    _id,
    title,
    slug,
    description
  }
`)

// Single author by slug
export const AUTHOR_BY_SLUG_QUERY = defineQuery(`
  *[_type == "author" && slug.current == $slug][0] {
    _id,
    name,
    slug,
    photo,
    bio
  }
`)

// All slugs (for generateStaticParams)
export const ARTICLE_SLUGS_QUERY = defineQuery(`
  *[_type == "article" && defined(slug.current)] {
    "slug": slug.current
  }
`)

export const CATEGORY_SLUGS_QUERY = defineQuery(`
  *[_type == "category" && defined(slug.current)] {
    "slug": slug.current
  }
`)

export const AUTHOR_SLUGS_QUERY = defineQuery(`
  *[_type == "author" && defined(slug.current)] {
    "slug": slug.current
  }
`)