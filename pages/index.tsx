import { getAllPosts } from "../lib/notionAPI";

export const getStaticProps = async () => {
  const allPosts = await getAllPosts();

  return {
    props: {
      allPosts,
    },
    revalidate: 60 * 60 * 6, // 6時間ごとに更新
  };
};

export default function Home({ allPosts }) {
  console.log(allPosts);
  return (
    <div>
      <h1>NotionBlogを作成予定です</h1>
    </div>
  );
}