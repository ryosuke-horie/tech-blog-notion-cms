import { GetStaticPaths, GetStaticProps } from 'next'
import Head from 'next/head'

import Pagination from '../../../../../components/Pagination/Pagination'
import SinglePost from '../../../../../components/Post/SinglePost'
import Tag from '../../../../../components/Tag/Tag'
import {
  getAllTags,
  getNumberOfPagesByTag,
  getPostsByTagAndPage,
} from '../../../../../lib/notionAPI'

export const getStaticPaths: GetStaticPaths = async () => {
  const allTags = await getAllTags()
  const params = []

  await Promise.all(
    allTags.map((tag: string) => {
      return getNumberOfPagesByTag(tag).then((numberOfPagesByTag: number) => {
        for (let i = 1; i <= numberOfPagesByTag; i++) {
          params.push({ params: { tag: tag, page: i.toString() } })
        }
      })
    })
  )

  return {
    paths: params,
    fallback: 'blocking',
  }
}

export const getStaticProps: GetStaticProps = async (context) => {
  const currentPage: string = context.params?.page.toString()
  const currentTag: string = context.params?.tag.toString()

  const posts = await getPostsByTagAndPage(
    currentTag,
    parseInt(currentPage, 10)
  )

  const numberOfPagesByTag = await getNumberOfPagesByTag(currentTag)

  const allTags = await getAllTags()

  return {
    props: {
      posts,
      numberOfPagesByTag,
      currentTag,
      allTags,
    },
    revalidate: 60 * 60 * 6,
  }
}

const BlogTagPageList = ({
  numberOfPagesByTag,
  posts,
  currentTag,
  allTags,
}) => {
  return (
    <div className="container mx-auto h-full w-full">
      <Head>
        <title>Notion-Blog</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mt-4 lg:mt-16 w-full">
        <h1 className="mb-8 lg:mb-16 text-center text-5xl font-medium">
          Notion Blog🚀
        </h1>
        <section className="mx-auto w-5/6 grid-cols-2 gap-3 sm:grid">
          {posts.map((post) => (
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
        <Pagination numberOfPage={numberOfPagesByTag} tag={currentTag} />
        <Tag tags={allTags} />
      </main>
    </div>
  )
}

export default BlogTagPageList
