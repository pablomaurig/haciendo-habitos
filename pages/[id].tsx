import Layout from '../components/layout'
import { getAllPostIds, getPostData } from '../lib/posts'
import { getAuthorBySlug } from '../lib/authors'
import Head from 'next/head'
import Date from '../components/date'
import utilStyles from '../styles/utils.module.css'
import { GetStaticProps, GetStaticPaths } from 'next'
import Image from 'next/image'
import Link from 'next/link'

export default function Post({
  postData 
}: {
  postData: {
    title: string
    date: string
    contentHtml: string,
    author?: {
      profilePictureUrl: string,
      name: string,
      permalink: string
    }
  }
}) {
  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{postData.title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={postData.date} />
        </div>
        <div>
          <Image alt={postData.author.name} src={postData.author.profilePictureUrl} height="40" width="40" />

          <Link href={postData.author.permalink}>
            <a>
              {postData.author.name}
            </a>
          </Link>
        </div>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>
    </Layout>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getAllPostIds()
  return {
    paths,
    fallback: false
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const postData = await getPostData(params.id as string)
  const author = await getAuthorBySlug(postData.author)

  return {
    props: {
      postData: {
        ...postData,
        author
      }
    }
  }
}