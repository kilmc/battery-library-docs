import React from 'react';

const ContentBlock = ({ children, code = true, className }) => {
  const Tag = code ? 'pre' : 'div';
  const classNames = ['bg-grey-100 p3 lh4 border rounded mono'].concat(className).join(' ')
  return(
    <Tag className={classNames}>{children}</Tag>
  )
};

export default ContentBlock