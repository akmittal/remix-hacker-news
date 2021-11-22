import { Link, LoaderFunction, useLoaderData, LinksFunction } from "remix";
import { ReactElement } from "react";
import { formatDistance } from "date-fns";

import postStyles from "~/styles/post.css";
import Comment from "~/components/Comment";
import { fetchPost } from "~/lib/api";

interface Props {}

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: postStyles }];
};

export let loader: LoaderFunction = async ({ params }) => {
  const id = params.id;

  const res = await fetch(
    `https://hacker-news.firebaseio.com/v0/item/${id}.json`
  );
  let data = await res.json();
  data = await fetchPost(data);

  return data;
};

export default function Post({}: Props): ReactElement {
  const data = useLoaderData();
  return (
    <div>
      { !data.url && <h2>{data.title}</h2>}
      { data.url && <h2><a href={data.url}>{data.title}</a></h2>}
      {data.text && <p dangerouslySetInnerHTML={{__html:data.text}}></p>}
      <div className="dim">{data.score} points by <Link to={`/user/${data.by}`}>{data.by}</Link>{" "}
      {formatDistance(new Date(data.time * 1000), new Date(), {
        addSuffix: true,
      })}</div>
      <hr />
      <div style={{ marginLeft: "20px" }}>
        {data.comments &&
          data.comments.map((comment: any) => {
            return <Comment comment={comment} />;
          })}
      </div>
    
    </div>
  );
}
