import Link from 'next/link'
import React from 'react'

import { getPageLink } from '../../lib/blog-helper'

/**
 * ページネーション用Props
 * @param numberOfPage ページ数
 * @param tag タグ
 */
interface Props {
  numberOfPage: number
  tag: string
}

/**
 * ページネーションコンポーネント
 * @param props
 */
const Pagination = (props: Props) => {
  const { numberOfPage, tag } = props

  const pages: number[] = []
  for (let i = 1; i <= numberOfPage; i++) {
    pages.push(i)
  }

  return (
    <section className="mx-auto mb-8 rounded-md p-5 lg:w-1/2">
      <ul className="flex items-center justify-center gap-4">
        {pages.map((page) => (
          <li className="relative h-8 w-6 rounded-lg bg-sky-900" key={page}>
            <Link
              href={getPageLink(tag, page)}
              className="absolute left-2/4 top-2/4 -translate-x-2/4 -translate-y-2/4 text-gray-100"
            >
              {page}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default Pagination
