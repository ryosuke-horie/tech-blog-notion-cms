import { GetStaticPaths, GetStaticProps } from 'next'
import Head from 'next/head'

import Pagination from '../../../components/Pagination/Pagination'
import SinglePost from '../../../components/Post/SinglePost'
import Tag from '../../../components/Tag/Tag'
import {
  getAllTags,
  getNumberOfPages,
  getPostsByPage,
} from '../../../lib/notionAPI'

export const getStaticPaths: GetStaticPaths = async () => {
  const numberOfPage = await getNumberOfPages()

  const params = []
  for (let i = 1; i <= numberOfPage; i++) {
    params.push({ params: { page: i.toString() } })
  }

  return {
    paths: params,
    fallback: 'blocking',
  }
}

export const getStaticProps: GetStaticProps = async (context) => {
  const currentPage = context.params?.page
  const postsByPage = await getPostsByPage(parseInt(currentPage.toString(), 10))
  const numberOfPage = await getNumberOfPages()

  const allTags = await getAllTags()

  return {
    props: {
      postsByPage,
      numberOfPage,
      allTags,
    },
    revalidate: 10,
  }
}

const BlogPageList = ({ postsByPage, numberOfPage, allTags }) => {
  return (
    <div className="container mx-auto h-full w-full">
      <Head>
        <title>Notion-Blog</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mt-4 w-full lg:mt-16">
        <h1 className="mb-8 text-center text-5xl font-medium lg:mb-16">
          Blog Posts🚀
        </h1>
        <section className="mx-auto w-5/6 grid-cols-2 gap-3 sm:grid">
          {postsByPage.map((post) => (
            <div key={post.id}>
              <SinglePost
                title={post.title}
                description={post.description}
                date={post.date}
                tags={post.tags}
                slug={post.slug}
                isPaginationPage={true}
              />
            </div>
          ))}
        </section>
        <Pagination numberOfPage={numberOfPage} tag={''} />
        <Tag tags={allTags} />
      </main>
    </div>
  )
}

export default BlogPageList
