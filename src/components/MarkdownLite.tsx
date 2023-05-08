import Link from "next/link";
import React, { FC } from "react";

interface MarkdownLiteProps {
  text: string;
}

const MarkdownLite: FC<MarkdownLiteProps> = ({ text }) => {
  const linkRegex = /\[(.+?)\]\((.+?)\)/g;
  const parts = [];

  let lastIndex = 0;
  let match;

  while ((match = linkRegex.exec(text)) !== null) {
    const [fullMatch, linkText, linkUrl] = match;
    const matchStart = match.index;
    const matchEnd = matchStart + fullMatch.length;
    // create the actural link component from nextjs
    if (lastIndex < matchStart) {
      parts.push(text.slice(lastIndex, matchStart));
    }
    parts.push(
      <Link
        target="_blank"
        rel="noopener noreferrer"
        className="break-words underline underline-offset-2 text-blue-300"
        key={linkUrl}
        href={linkUrl}
      >
        {linkText}
      </Link>
    );
    lastIndex = matchEnd;
  }

  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return (
    <>
      {parts.map((part, i) => (
        <React.Fragment key={i}>{part}</React.Fragment>
      ))}
    </>
  );
};

export default MarkdownLite;
