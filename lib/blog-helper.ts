/**
 * ページリンクを取得する
 * tagがある場合はタグページへのリンクを返す
 * ない場合は通常のページへのリンクを返す
 * @param tag
 * @param page
 * @returns
 */
export const getPageLink = (tag: string, page: number) => {
  return tag ? `/posts/tag/${tag}/page/${page}` : `/posts/page/${page}`
}
