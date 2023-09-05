import { Client } from "@notionhq/client";

const notion = new Client({
    auth: process.env.NOTION_TOKEN,
})

export const getAllPost = async () => {
    const posts = await notion.databases.query({
        database_id: process.env.NOTION_DATABASE_ID as string,
        page_size: 100,
    })

    const allPosts = posts.results;

    return allPosts;
}