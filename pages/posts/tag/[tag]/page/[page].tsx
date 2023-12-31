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

/**
 * 動的ルーティングのためのパスを生成
 * @returns
 */
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

/**
 * 動的ルーティングのためのデータを取得(ISR)
 * 24時間ごとに更新
 * @param context
 */
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
    revalidate: 60 * 60 * 24,
  }
}

/**
 * タグ別ページ
 * @param numberOfPagesByTag タグ別のページ数
 * @param posts タグ別の記事
 * @param currentTag 現在のタグ
 * @param allTags 全てのタグ
 */
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

      <main className="container mt-4 w-full lg:mt-16">
        <h1 className="mb-8 text-center text-5xl font-medium lg:mb-16">
          Notion Blog🚀
        </h1>
        <section className="mx-2 lg:mx-auto lg:w-1/2">
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
