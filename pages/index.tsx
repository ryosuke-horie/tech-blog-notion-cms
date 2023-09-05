import Head from 'next/head'

import SinglePost from '../components/Post/SinglePost'
import { getAllPosts } from '../lib/notionAPI'

export const getStaticProps = async () => {
  const allPosts = await getAllPosts()

  return {
    props: {
      allPosts,
    },
    revalidate: 60 * 60 * 6, // 6時間ごとに更新
  }
}

export default function Home({ allPosts }) {
  console.log(allPosts)
  return (
    <div className="h-hull container mx-auto w-full font-mono">
      <Head>
        <title>Notion Blog</title>
        <meta name="description" content="Notion Blog" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="w-fulll container mt-16">
        <h1 className="mb-16 text-center text-5xl font-medium">
          Notion Blog🚀
        </h1>
        {allPosts.map((post) => (
          <div className="mx-4">
            <SinglePost
              title={post.title}
              description={post.description}
              date={post.date}
              tags={post.tags}
              slug={post.slug}
            />
          </div>
        ))}
      </main>
    </div>
  )
}
