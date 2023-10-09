import { GetStaticProps } from 'next'
import Head from 'next/head'
import Link from 'next/link'

import SinglePost from '../components/Post/SinglePost'
import Tag from '../components/Tag/Tag'
import { NUMBER_OF_POSTS_PER_PAGE } from '../constants/constants'
import { getAllTags, getPostsForTopPage } from '../lib/notionAPI'

/**
 * SG
 * @returns
 */
export const getStaticProps: GetStaticProps = async () => {
  const fourPosts = await getPostsForTopPage(NUMBER_OF_POSTS_PER_PAGE)
  const allTags = await getAllTags()

  return {
    props: {
      fourPosts,
      allTags,
    },
    revalidate: 10,
  }
}

/**
 * トップページ
 * @param fourPosts トップページに表示する記事(4件)
 * @param allTags 全てのタグ
 */
export default function Home({ fourPosts, allTags }) {
  return (
    <div className="container mx-auto h-full w-full">
      <Head>
        <title>Tech-Blog</title>
        <meta name="description" content="個人の技術ブログです。" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mt-4 w-full lg:mt-16">
        <h1 className="mb-8 text-center text-5xl font-medium lg:mb-16">
          Notion Blog🚀
        </h1>
        {fourPosts.map((post) => (
          <div className="mx-4" key={post.id}>
            <SinglePost
              title={post.title}
              description={post.description}
              date={post.date}
              tags={post.tags}
              slug={post.slug}
              isPaginationPage={false}
            />
          </div>
        ))}
        <Link
          href="/posts/page/1"
          className="mx-auto mb-6 block px-5 text-right lg:w-1/2"
        >
          ...もっと見る
        </Link>
        <Tag tags={allTags} />
      </main>
    </div>
  )
}
