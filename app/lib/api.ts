
export async function fetchComment(id: string): Promise<any> {
    const res = await fetch(
      `https://hacker-news.firebaseio.com/v0/item/${id}.json`
    );
    return res.json();
  }
  
  export async function fetchComments(ids: string[]): Promise<any> {
    if(!ids) return;
    return Promise.all(
      ids.map((id: string) => {
        return fetchComment(id);
      })
    );
  }
  
  export async function fetchPost(item: any): Promise<any> {
    if (item.kids) {
      let comments = await fetchComments(item.kids);
      comments = await Promise.all(comments.map((comment: any) => {
        return fetchPost(comment);
      }))
     
      return { ...item, comments };
    }
    return item;
  }

  const POST_PER_PAGE = 30;

  export async function fetchPosts(type:string, page: number = 1): Promise<any> {
    const res = await fetch(
      `https://hacker-news.firebaseio.com/v0/${type}stories.json`
    );
    const data = await res.json();
    const [start, end] = [POST_PER_PAGE * (page - 1), POST_PER_PAGE * page];
    const posts = data.slice(start, end).map(async (id: string) => {
      const postResponse = await fetch(
        `https://hacker-news.firebaseio.com/v0/item/${id}.json`
      );
      return postResponse.json();
    });
    return (await Promise.all(posts)).map((post: any, index) => ({...post, index:index+start+1}));
  }