import React from 'react';
import ContentBlock from '../components/ContentBlock'
import Heading from '../components/Heading'

const DeprecatedClassNamesView = ({ propConfig }) => {
  const { deprecatedClassNames } = propConfig;
  return (
    <div className='mb3'>
      <Heading level='3' className='mb1'>Deprecation warning:</Heading>
      <p className='mb3'>Alternate values are listed below</p>
      <ContentBlock code={false}>
        { Object.keys(deprecatedClassNames).map(deprecation => (
          <p>
            Use <span className='text-bold'>{deprecatedClassNames[deprecation]}</span> in place of {deprecation}
          </p>
          )
        )}
      </ContentBlock>
    </div>
  );
};

export default DeprecatedClassNamesView;