import { client } from '@/sanity/lib/client'
import { CATEGORIES_QUERY } from '@/sanity/lib/queries'
import { Category } from '@/lib/types'
import { NavbarClient } from './NavbarClient'

export default async function Navbar() {
  const categories = await client.fetch<Category[]>(CATEGORIES_QUERY)
  return <NavbarClient categories={categories} />
}