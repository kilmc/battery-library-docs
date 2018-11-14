import React from 'react';
import DisplaySampleClasses from '../props/DisplaySampleClasses';

const StaticLibraryView = ({ lib }) => {
  return (
    <div className='p5'>
      <DisplaySampleClasses
        title={`Static Library: ${lib.length} classes`}
        classNames={lib}
      />
    </div>
  );
};

export default StaticLibraryView;