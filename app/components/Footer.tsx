import React, { ReactElement } from 'react'

interface Props {
    
}

export default function Footer({}: Props): ReactElement {
    return (
        <footer className="footer">
            <a href="https://github.com/akmittal/remix-hacker-news">Github</a>
        </footer>
    )
}
