import { revalidatePath } from 'next/cache'
import { type NextRequest, NextResponse } from 'next/server'

const WEBHOOK_SECRET = process.env.SANITY_WEBHOOK_SECRET

export async function POST(req: NextRequest) {
  const secret = req.headers.get('x-webhook-secret')

  if (secret !== WEBHOOK_SECRET) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
  }

  const body = await req.json()
  const { _type, slug } = body

  try {
    switch (_type) {
      case 'article':
        revalidatePath('/')
        revalidatePath('/articles')
        if (slug?.current) {
          revalidatePath(`/articles/${slug.current}`)
        }
        break
      case 'category':
        revalidatePath('/')
        if (slug?.current) {
          revalidatePath(`/category/${slug.current}`)
        }
        break
      case 'author':
        if (slug?.current) {
          revalidatePath(`/author/${slug.current}`)
        }
        break
      default:
        revalidatePath('/')
    }

    return NextResponse.json({ revalidated: true, type: _type })
  } catch (err) {
    return NextResponse.json({ message: 'Error revalidating', err }, { status: 500 })
  }
}