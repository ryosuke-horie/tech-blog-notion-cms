import { Client } from '@notionhq/client'
import { NotionToMarkdown } from 'notion-to-md'

import { NUMBER_OF_POSTS_PER_PAGE } from '../constants/constants'

/**
 * Notion API クライアント
 */
const notion = new Client({
  auth: process.env.NOTION_TOKEN,
})

/**
 * NotionToMarkdown クライアント
 * @param notionClient Notion API クライアント
 */
const n2m = new NotionToMarkdown({ notionClient: notion })

/**
 * 全記事の取得関数
 */
export const getAllPosts = async () => {
  const posts = await notion.databases.query({
    database_id: process.env.NOTION_DATABASE_ID,
    page_size: 100,
    filter: {
      property: 'Published',
      checkbox: {
        equals: true,
      },
    },
    sorts: [
      {
        property: 'Date',
        direction: 'descending',
      },
    ],
  })

  const allPosts = posts.results

  return allPosts.map((post) => {
    return getPageMetaData(post)
  })
}

/**
 * ページメタデータの取得関数
 * @param post
 */
const getPageMetaData = (post) => {
  const getTags = (tags) => {
    const allTags = tags.map((tag) => {
      return tag.name
    })

    return allTags
  }

  return {
    id: post.id,
    title: post.properties.Name.title[0].plain_text,
    description: post.properties.Description.rich_text[0].plain_text,
    date: post.properties.Date.date.start,
    slug: post.properties.Slug.rich_text[0].plain_text,
    tags: getTags(post.properties.Tags.multi_select),
  }
}

/**
 * 記事詳細ページの取得関数
 * @param slug
 */
export const getSinglePost = async (slug) => {
  const response = await notion.databases.query({
    database_id: process.env.NOTION_DATABASE_ID,
    filter: {
      property: 'Slug',
      formula: {
        string: {
          equals: slug,
        },
      },
    },
  })

  const page = response.results[0]
  const metadata = getPageMetaData(page)

  const mdBlocks = await n2m.pageToMarkdown(page.id)
  const mdString = n2m.toMarkdownString(mdBlocks)

  return {
    metadata,
    markdown: mdString,
  }
}

/**
 * Topページ用記事の取得(4つ)
 * @param pageSize
 */
export const getPostsForTopPage = async (pageSize: number) => {
  const allPosts = await getAllPosts()
  const fourPosts = allPosts.slice(0, pageSize)
  return fourPosts
}

/**
 * ページ番号に応じた記事取得
 * @param page
 */
export const getPostsByPage = async (page: number) => {
  const allPosts = await getAllPosts()

  const startIndex = (page - 1) * NUMBER_OF_POSTS_PER_PAGE
  const endIndex = startIndex + NUMBER_OF_POSTS_PER_PAGE

  return allPosts.slice(startIndex, endIndex)
}

/**
 * 記事の総数を取得
 */
export const getNumberOfPages = async () => {
  const allPosts = await getAllPosts()

  return (
    Math.floor(allPosts.length / NUMBER_OF_POSTS_PER_PAGE) +
    (allPosts.length % NUMBER_OF_POSTS_PER_PAGE > 0 ? 1 : 0)
  )
}

/**
 * タグページ用記事の取得
 * @param tagName
 * @param page
 * @returns
 */
export const getPostsByTagAndPage = async (tagName: string, page: number) => {
  const allPosts = await getAllPosts()
  const posts = allPosts.filter((post) =>
    post.tags.find((tag: string) => tag === tagName)
  )

  const startIndex = (page - 1) * NUMBER_OF_POSTS_PER_PAGE
  const endIndex = startIndex + NUMBER_OF_POSTS_PER_PAGE

  return posts.slice(startIndex, endIndex)
}

/**
 * タグページ用記事の総数を取得
 * @param tagName
 */
export const getNumberOfPagesByTag = async (tagName: string) => {
  const allPosts = await getAllPosts()
  const posts = allPosts.filter((post) =>
    post.tags.find((tag: string) => tag === tagName)
  )

  return (
    Math.floor(posts.length / NUMBER_OF_POSTS_PER_PAGE) +
    (posts.length % NUMBER_OF_POSTS_PER_PAGE > 0 ? 1 : 0)
  )
}

/**
 * 全タグの取得
 */
export const getAllTags = async () => {
  const allPosts = await getAllPosts()

  const allTagsDuplicationLists = allPosts.flatMap((post) => post.tags)
  const set = new Set(allTagsDuplicationLists)
  const allTagsList = Array.from(set)

  return allTagsList
}
