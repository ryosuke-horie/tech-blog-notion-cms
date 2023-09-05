import { Client } from '@notionhq/client'
import { NotionToMarkdown } from 'notion-to-md'

import { NUMBER_OF_POSTS_PER_PAGE } from '../constants/constants'

const notion = new Client({
  auth: process.env.NOTION_TOKEN,
})

const n2m = new NotionToMarkdown({ notionClient: notion })

export const getAllPosts = async () => {
  const posts = await notion.databases.query({
    database_id: process.env.NOTION_DATABASE_ID || '',
  })
  const allPosts = posts.results
  console.log(allPosts)

  return allPosts.map((post) => {
    return getPageMetaData(post)
  })
}

const getPageMetaData = (post) => {
  console.log(post.properties.Description)
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

export const getSinglePost = async (slug) => {
  const response = await notion.databases.query({
    database_id: process.env.NOTION_DATABASE_ID || '',
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
  // console.log(metadata);
  const mdBlocks = await n2m.pageToMarkdown(page.id)
  const mdString = n2m.toMarkdownString(mdBlocks)
  console.log(mdString)

  return {
    metadata,
    markdown: mdString,
  }
}

// Topページ用記事の取得
export const getPostsForTopPage = async (pageSize = 4) => {
  const allPosts = await getAllPosts()
  const fourPosts = allPosts.slice(0, 4)

  return fourPosts
}

// ページ番号に応じた記事の取得
export const getPostsByPage = async (page: number) => {
  const allPosts = await getAllPosts()

  const startIndex = (page - 1) * NUMBER_OF_POSTS_PER_PAGE
  const endIndex = startIndex + NUMBER_OF_POSTS_PER_PAGE

  return allPosts.slice(startIndex, endIndex)
}

// ページ数の取得
export const getNumberOfPages = async () => {
  const allPosts = await getAllPosts()

  return (
    Math.floor(allPosts.length / NUMBER_OF_POSTS_PER_PAGE) + (allPosts.length % NUMBER_OF_POSTS_PER_PAGE > 0 ? 1 : 0) // 余りがある場合はページ数を1増やす
  )
}