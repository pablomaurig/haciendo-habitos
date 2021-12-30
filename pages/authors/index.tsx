import Image from 'next/image'
import Link from 'next/link'
import { getAllAuthors } from '../../lib/authors'
import { getSortedPostsData } from '../../lib/posts'
import { GetStaticProps } from 'next'


export default function Authors({
  authors
}: {
  authors: {
    permalink: string
    slug: string
    name: string
    profilePictureUrl: string,
    posts: []
  }[]
}) {
  return (
    <div className="authors">
      <h1>Authors</h1>

      {authors.map(author => (
        <div key={author.slug}>
          <h2>
            <Link href={author.permalink}>
              <a>{author.name}</a>
            </Link>
          </h2>

          {/* <Image alt={author.name} src={author.profilePictureUrl} height="40" width="40" /> */}
          <p>{`${author.posts.length} ${author.posts.length > 1 ? 'artículos' : 'artículo'}`}</p>
          <Link href={author.permalink}>
            <a>Go to profile →</a>
          </Link>
        </div>
      ))}
    </div>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      authors: getAllAuthors().map(author => ({
          ...author,
          posts: getSortedPostsData().filter(post => post.author.slug === author.slug),
        })),
    }
  }
}
