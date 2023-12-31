import Link from 'next/link'
import React from 'react'

/**
 * 記事コンポーネント用Props
 * @param title 記事タイトル
 * @param description 記事概要
 * @param date 記事投稿日
 * @param tags 記事タグ
 * @param slug 記事スラッグ
 * @param isPaginationPage ページネーションページかどうか
 */
type Props = {
  title: string
  description: string
  date: string
  tags: string[]
  slug: string
  isPaginationPage: boolean
}

/**
 * 記事コンポーネント
 * ページネーションページと個別記事ページで使用（若干仕様が異なる）
 * 違いはisPaginationPageで判定
 * ページネーションページではタグをクリックするとそのタグのページネーションページに遷移する
 * @param props
 */
const SinglePost = (props: Props) => {
  const { title, description, date, tags, slug, isPaginationPage } = props

  return (
    <>
      {isPaginationPage ? (
        <section className="mx-auto mb-8 rounded-md bg-sky-900 p-5 shadow-2xl transition-all duration-300 hover:translate-y-1 hover:shadow-none">
          <div className="items-center justify-between lg:flex">
            <h2 className="mb-2 w-4/6 text-2xl font-medium text-gray-100 lg:w-4/5">
              <Link href={`/posts/${slug}`}>{title}</Link>
            </h2>

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
          <div className="flex items-center justify-between">
            <h2 className="mb-2 w-4/6 text-2xl font-medium text-gray-100 lg:w-4/5">
              <Link href={`/posts/${slug}`}>{title}</Link>
            </h2>

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
