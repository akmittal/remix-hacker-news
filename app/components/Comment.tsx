import { formatDistance } from "date-fns";
import React, { ReactElement, useState } from "react";
import { Link } from "remix";

interface Props {
  comment: any;
}

export default function Comment({ comment }: Props): ReactElement {
  const [collapse, setCollapse] = useState(false);
  return (
    <div className="comment">
      <div
        style={{
          borderLeft: "4px solid var(--color-primary)",
          paddingLeft: "10px",
        }}
      >
        <div className="meta dim">
          <Link to="">{comment.by}</Link>
          <div >
            {formatDistance(new Date(comment.time * 1000), new Date(), {
              addSuffix: true,
            })}
          </div>
          {comment.comments && <button onClick={() => setCollapse(!collapse)}>{collapse ? "+" : "-"}</button>}
        </div>
        <div dangerouslySetInnerHTML={{ __html: comment.text }}></div>
        <hr />
      </div>
      {comment.comments && !collapse &&
        comment.comments.map((comment: any) => {
          return <Comment comment={comment} />;
        })}
    </div>
  );
}
