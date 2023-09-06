import Link from 'next/link'
import React from 'react'

type Props = {
  title: string
  description: string
  date: string
  tags: string[]
  slug: string
  isPaginationPage: boolean
}

const SinglePost = (props: Props) => {
  const { title, description, date, tags, slug, isPaginationPage } = props

  return (
    <>
      {isPaginationPage ? (
        <section className=" mx-auto mb-8 rounded-md bg-sky-900 p-5 shadow-2xl transition-all duration-300 hover:translate-y-1 hover:shadow-none">
          <div className="items-center lg:flex">
            <h2 className="mb-2 text-2xl font-medium text-gray-100">
              <Link href={`/posts/${slug}`}>{title}</Link>
            </h2>
            <div className="mr-2 text-gray-400">{date}</div>
            {tags.map((tag: string, index: number) => (
              <Link href={`/posts/tag/${tag}/page/1`} key={index}>
                <span className="mr-2 rounded-xl bg-gray-500 px-2 font-medium text-white">
                  {tag}
                </span>
              </Link>
            ))}
          </div>
          <p className="text-gray-100">{description}</p>
        </section>
      ) : (
        <section className="mx-auto mb-8 rounded-md bg-sky-900 p-5 shadow-2xl transition-all duration-300 hover:translate-y-1 hover:shadow-none lg:w-1/2">
          <div className="flex items-center gap-3">
            <h2 className="mb-2 text-2xl font-medium text-gray-100">
              <Link href={`/posts/${slug}`}>{title}</Link>
            </h2>
            <div className="text-gray-400">{date}</div>
            {tags.map((tag: string, index: number) => (
              <Link href={`/posts/tag/${tag}/page/1`} key={index}>
                <span className="rounded-xl bg-gray-500 px-2 font-medium text-white">
                  {tag}
                </span>
              </Link>
            ))}
          </div>
          <p className="text-gray-100">{description}</p>
        </section>
      )}
    </>
  )
}

export default SinglePost
