import Image from 'next/image'
import Link from 'next/link'

import { getAllAuthors, getAuthorBySlug } from '../../lib/authors'
import { getSortedPostsData  } from '../../lib/posts'

export default function Author({ author }) {
  return (
    <div className="author">
      <h1>{author.name}</h1>

      {/* <Image alt={author.name} src={author.profilePictureUrl} height="80" width="80" /> */}
      <h2>Posts</h2>

      <ul>
        {author.posts.map(post => (
          <li>
            <Link href={`/${post.id}`}>
              <a>
                {post.title}
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export function getStaticProps({ params }) {
  const author = getAuthorBySlug(params.slug)

  return {
    props: {
      author: {
        ...author,
        posts: getSortedPostsData().filter(post => post.author.slug === author.slug),
      },
    },
  }
}

export function getStaticPaths() {
  return {
    fallback: false,
    paths: getAllAuthors().map(author => ({
      params: {
        slug: author.slug,
      },
    })),
  }
}
