import { GetStaticPaths, GetStaticProps } from 'next'
import Head from 'next/head'

import SinglePost from '../../../components/Post/SinglePost'
import { getPostsForTopPage } from '../../../lib/notionAPI'

// eslint-disable-next-line @typescript-eslint/require-await
export const getStaticPaths: GetStaticPaths = async () => {
    return {
        paths: [{ params: { page: "1" } }, { params: { page: "2" } }, { params: { page: "3" } }],
        fallback: 'blocking',
    }
}

export const getStaticProps: GetStaticProps = async () => {
    const fourPosts = await getPostsForTopPage()

    return {
        props: {
            fourPosts,
        },
        revalidate: 60 * 60 * 6, // 6時間ごとに更新
    }
}

  const BlogPageList =({ fourPosts }) => {
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
                {fourPosts.map((post) => (
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

export default BlogPageList