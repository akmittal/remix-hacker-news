import { Link } from "remix";
import { ReactElement } from "react";

interface Props {}

export default function Navbar({}: Props): ReactElement {
  return (
    <nav className="main">
      <div className="logo"><Link to="/top">Remix HN</Link></div>
      <ul className="links">
        <li>
          <Link to="/top">Top</Link>
        </li>
        <li>
          <Link to="/new">New</Link>
        </li>
        <li>
          <Link to="/show">Show</Link>
        </li>
        <li>
          <Link to="/ask">Ask</Link>
        </li>
        <li>
          <Link to="/job">Jobs</Link>
        </li>
      </ul>
    </nav>
  );
}
