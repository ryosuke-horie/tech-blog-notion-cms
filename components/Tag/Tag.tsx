import Link from 'next/link'
import React from 'react'

type Props = {
  tags: string[]
}

const Tag = (props: Props) => {
  const { tags } = props

  return (
    <div className="mx-4">
      <section className="mx-auto mb-8 rounded-md bg-orange-200 p-5 shadow-2xl transition-all duration-300 hover:translate-y-1 hover:shadow-none lg:w-1/2">
        <div className="mb-4 font-medium">タグ検索</div>
        <div className="flex flex-wrap gap-5">
          {tags.map((tag: string, index: number) => (
            <Link href={`/posts/tag/${tag}/page/1`} key={index}>
              <span className="inline-block cursor-pointer rounded-xl bg-gray-400 px-2 pb-1 font-medium">
                {tag}
              </span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}

export default Tag
