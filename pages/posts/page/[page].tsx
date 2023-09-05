import { GetStaticPaths, GetStaticProps } from 'next'
import Head from 'next/head'

import SinglePost from '../../../components/Post/SinglePost'
import { getNumberOfPages, getPostsByPage } from '../../../lib/notionAPI'

// eslint-disable-next-line @typescript-eslint/require-await
export const getStaticPaths: GetStaticPaths = async () => {
    const numberOfPages = await getNumberOfPages()

    const params = []
    for (let i = 1; i <= numberOfPages; i++) {
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

    return {
        props: {
            postsByPage,
        },
        revalidate: 60 * 60 * 6, // 6時間ごとに更新
    }
}

const BlogPageList = ({ postsByPage }) => {
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
                <section className="sm:grid grid-cols-2 w-5/6 gap-3 mx-auto">
                    {postsByPage.map((post) => (
                    <div>
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
            </main>
        </div>
    )
}

export default BlogPageList