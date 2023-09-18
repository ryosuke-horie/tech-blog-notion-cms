/* eslint-disable react/no-children-prop */
import Link from 'next/link'
import React from 'react'
import { ReactMarkdown } from 'react-markdown/lib/react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/cjs/styles/prism'

import { getAllPosts, getSinglePost } from '../../lib/notionAPI'
import styles from '../../styles/posts/ReactMarkdown.module.css'

export const getStaticPaths = async () => {
  const allPosts = await getAllPosts()
  const paths = allPosts.map(({ slug }) => ({ params: { slug } }))

  return {
    paths,
    fallback: 'blocking',
  }
}

export const getStaticProps = async ({ params }) => {
  const post = await getSinglePost(params.slug)

  return {
    props: {
      post,
    },
    revalidate: 60 * 60 * 6, // 6時間ごとに更新
  }
}

const Post = ({ post }) => {
  return (
    <section className="container mx-auto mt-20 h-screen px-5 lg:w-2/5 lg:px-2">
      <h1 className="w-full text-4xl font-medium">{post.metadata.title}</h1>
      <div className="mt-1 w-1/3 border-b-2 border-sky-900"></div>
      <span className="text-gray-500">Posted date at {post.metadata.date}</span>
      <br />
      {post.metadata.tags.map((tag: string) => (
        <p className="mr-2 mt-2 inline-block rounded-xl bg-sky-900 px-2 font-medium text-white">
          {tag}
        </p>
      ))}

      <div className={`mt-10 font-medium ${styles.markdownContent}`}>
        <ReactMarkdown
          components={{
            code({ node, inline, className, children }) {
              const match = /language-(\w+)/.exec(className || '')
              return !inline && match ? (
                <SyntaxHighlighter
                  style={vscDarkPlus}
                  language={match[1]}
                  PreTag="div"
                >
                  {String(children).replace(/\n$/, '')}
                </SyntaxHighlighter>
              ) : (
                <code>{children}</code>
              )
            },
          }}
        >
          {post.markdown.parent}
        </ReactMarkdown>
      </div>

      <Link href="/">
        <span className="mt-3 block pb-20 text-sky-900">←ホームに戻る</span>
      </Link>
    </section>
  )
}

export default Post
