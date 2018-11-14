import React from 'react';
import Heading from '../components/Heading';
import ContentBlock from '../components/ContentBlock';

const PluginView = ({ plugin, config }) => {
  return (
    <div className='p5'>
      <Heading level='2' className='mb3'>{plugin.name}</Heading>
      <ContentBlock>
        {JSON.stringify(plugin,null,2)}
      </ContentBlock>
    </div>
  );
};

export default PluginView;