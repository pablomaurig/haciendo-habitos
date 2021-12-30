import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'
import utilStyles from '../styles/utils.module.css'
import { getSortedPostsData } from '../lib/posts'
import { getAuthorBySlug } from '../lib/authors'
import Link from 'next/link'
import Date from '../components/date'
import { GetStaticProps } from 'next'

export default function Home({
  allPostsData
}: {
  allPostsData: {
    date: string
    title: string
    id: string
    author?: {
      profilePictureUrl: string,
      name: string,
      permalink: string
    },
    categories: [
      {
        name: string,
        slug?: string,
        permalink: string,
        imageUrl?: string
      }
    ]
  }[]
}) {
  console.log(allPostsData)
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>…</section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title, author, categories }) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href="/[id]" as={`/${id}`}>
                <a>
                  {title}
                </a>
              </Link>
              <div>
                {/* <Image alt={post.author.name} src={post.author.profilePictureUrl} height="40" width="40" /> */}

                  <Link href={author.permalink}>
                    <a>{author.name}</a>
                  </Link>
              </div>
              <br />
              <small className={utilStyles.lightText}>
                <Date dateString={date} />
              </small>
              <br />
              {categories.map(({name, permalink}) => (
                <Link href={permalink}>
                  <a>{name}</a>
                </Link>
              ))}
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const allPostsData = await getSortedPostsData()
  // const author = await getAuthorBySlug(allPostsData.author)

  return {
    props: {
      allPostsData 
    }
  }
}