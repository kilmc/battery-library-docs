import React, { Fragment } from 'react';
import Heading from './components/Heading';

const SectionHeader = ({ heading, subHeading }) => (
  <Fragment>
    <Heading level='2' className='mb2'>{heading}</Heading>
    <Heading level='4' className='mb4 grey-600 mono'>.{subHeading}</Heading>
  </Fragment>
);

export default SectionHeader;