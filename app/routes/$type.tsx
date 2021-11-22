import type { MetaFunction, LinksFunction, LoaderFunction } from "remix";
import { useLoaderData } from "remix";
import { Link, useParams, useSearchParams } from "react-router-dom";

import stylesUrl from "../styles/index.css";

import { formatDistance } from "date-fns";
import { fetchPosts } from "~/lib/api";

export let meta: MetaFunction = () => {
  return {
    title: "Remix Hacker News",
    description: "Remix hacker news on cloudflare",
  };
};

export let links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: stylesUrl }];
};

export let loader: LoaderFunction = async ({ params, request }) => {
  let url = new URL(request.url);
  const page = parseInt(url.searchParams.get("page") || "1");
  const type = params.type || "top";
  return fetchPosts(type, page);
};

export default function Index() {
  let data = useLoaderData();
  const params = useParams();
  const [searchParams] = useSearchParams();
  const page = searchParams.get("page") || "1";
  searchParams.set("page", (parseInt(page) + 1).toString());

  return (
    <>
      {data.map((post: any, index: number) => {
        return (
          <div className="post">
            <div className="index">{post.index}</div>
            <div className="post-meta">
              <h4>
                {!post.url && <Link to={`/post/${post.id}`}>{post.title} </Link>}
                {post.url && <a href={post.url}>{post.title}</a>}
              </h4>
              <div>
                {" "}
                {post.score} points by{" "}
                <Link to={`/user/${post.by}`}>{post.by}</Link>{" "}
                {formatDistance(new Date(post.time * 1000), new Date(), {
                  addSuffix: true,
                })}{" "}
                <Link to={`/post/${post.id}`}>{post.descendants} comments</Link>
              </div>
            </div>
          </div>
        );
      })}
      
      <Link to={`/${params.type}?${searchParams}`}>More</Link>
    </>
  );
}
