export interface Article {
  _id: string
  title: string
  slug: { current: string }
  excerpt?: string
  publishedAt?: string
  featured?: boolean
  mainImage?: SanityImage
  body?: Block[]
  tags?: string[]
  author?: Author
  category?: Category
}

export interface Author {
  _id?: string
  name: string
  slug?: { current: string }
  photo?: SanityImage
  bio?: string
}

export interface Category {
  _id?: string
  title: string
  slug?: { current: string }
  description?: string
}

export interface SanityImage {
  _type: 'image'
  asset: {
    _ref: string
    _type: 'reference'
  }
  hotspot?: {
    x: number
    y: number
  }
}

export interface Block {
  _type: 'block' | 'image'
  _key: string
  [key: string]: unknown
}