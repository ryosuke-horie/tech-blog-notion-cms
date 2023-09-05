import { Client } from '@notionhq/client'

const notion = new Client({
  auth: process.env.NOTION_TOKEN,
})

export const getAllPosts = async () => {
  try {
    const posts = await notion.databases.query({
      database_id: process.env.NOTION_DATABASE_ID || '',
    })
    const allPosts = posts.results
    console.log(allPosts)

    return allPosts
  } catch (error) {
    console.error(error)
    throw new Error('Failed to retrieve posts from Notion API.')
  }
}
