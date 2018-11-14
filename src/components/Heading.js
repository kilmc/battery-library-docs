import React from 'react';

const Heading = ({ level, children, className }) => {
  const Tag = `h${level}`;
  const headings = {
    'H1': ['type-48'],
    'H2': ['type-34','text-bold'],
    'H3': ['type-24']
  }
  const classNames = headings[`H${level}`].concat(className).join(' ');
  return <Tag className={classNames}>{children}</Tag>
};

export default Heading;