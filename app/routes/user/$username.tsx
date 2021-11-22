import { Link, LoaderFunction, useLoaderData } from "remix";
import React, { ReactElement } from "react";
import { formatDistance } from "date-fns";

interface Props {}


export let loader: LoaderFunction = async ({ params }) => {
  const username = params.username;

 return fetch(
    `https://hacker-news.firebaseio.com/v0/user/${username}.json`
  );

};

export default function Post({}: Props): ReactElement {
  const data = useLoaderData();
  return (
    <>
    <h2>{data.id}</h2>
    <h4>Joined: {formatDistance(new Date(data.created * 1000), new Date(), {addSuffix:true})}</h4>
      <h4>Karma: {data.karma}</h4>
    </>
  );
}
