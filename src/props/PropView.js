import React, { Fragment } from 'react';
import DisplaySampleClasses from './DisplaySampleClasses';
import PropHeader from '../headers/PropHeader';
import { createModifierClassNames } from '../class-generators/';
import DeprecatedClassNamesView from './DeprecatedClassNamesView';
import { Link } from 'react-router-dom';
import Heading from '../components/Heading';
import ContentBlock from '../components/ContentBlock';

const formatKeywordValues = ({ values, separator }) =>
  Object.keys(values).map(v => `${separator || ''}${v}`).join(`|`);

const getKeywordClasses = (propName, keywords) => {
  const { values, separator = '' } = keywords;
  return Object.keys(values)
    .map(value => `${propName}${separator}${value === 'default' ? '' : value}`);
};

const determineSampleClasses = ({ prop, plugin, modifierIndicator = ''}) => {
  const { propName, separator = '', sampleValues = [] } = prop;
  let returnSampleValues = [];

  if (sampleValues && plugin.type === 'lookup') {
    const shuffled = Object.keys(plugin.values)
      .sort(() => .5 - Math.random());
      returnSampleValues = shuffled.slice(0,5)
      .map(x => `${propName}${separator}${x}${modifierIndicator}`);
  } else if (plugin.sampleValues) {
    returnSampleValues = plugin.sampleValues.map(x => `${propName}${separator}${x}`);
  }

  return returnSampleValues;
};

const SampleModifierClasses = ({ prop, plugin }) => {
  return (
    <div>
      <h4>Value Modifiers</h4>
      { plugin.valueModifiers.map((modifier,i) => {
        const sampleClasses = createModifierClassNames({
          prop,
          modifier,
          sampleValues: plugin.sampleValues
        });

        return (
          <DisplaySampleClasses
            key={modifier.name+i}
            title={modifier.name}
            classNames={sampleClasses}
          />
        );
      })}
    </div>
  );
};

const SamplePluginClasses = ({ prop, plugin }) => {
  const sampleClasses = determineSampleClasses({ prop, plugin });

  return (
    <Fragment>
      <DisplaySampleClasses
        title='Sample Classes'
        classNames={sampleClasses}
      />

      { typeof plugin.valueModifiers === 'object' &&
        <SampleModifierClasses prop={prop} plugin={plugin} />
      }
    </Fragment>
  );
};

const determineKeywords = (prop) => {
  const { propName, keywordValues } = prop;
  if (!keywordValues) return false

  return `.${propName}[${formatKeywordValues(keywordValues)}]`
};

const determinePlugin = (prop) => {
  const { propName, separator = '', enablePlugin: plugin } = prop;
  if (!plugin) return false

  return (
    <Fragment>
      {`.${propName}${separator}`}
      <Link
        to={`/plugins/${plugin}`}
        className='soft-black'
      >
        [{plugin}]
      </Link>
    </Fragment>
  );
};

const determineSubProps = (prop) => {
  if (!prop.subProps) return false;
  const subProps = (propConfig) => {
    const { propName, subProps, subPropSeparator = '', prop } = propConfig;
    const obj = Object.keys(subProps).reduce((xs,x) => {
      xs[`${propName}${subPropSeparator}${x}`] = subProps[x]
        .split(' ')
        .map(x => `${prop}-${x}`)
        .join(' ')
      return xs;
    },{});

    return Object.keys(obj).map(x => `.${x}: ${obj[x]}\n`)
  };

  return (
    <div className='mb3'>
      <Heading level="3" className='mb1'>Sub Props:</Heading>
      <ContentBlock>{subProps(prop)}</ContentBlock>
    </div>
  );
}




const PropView = ({ prop, config }) => {
  const { propName, enablePlugin: plugin, keywordValues, deprecatedClassNames } = prop;

  return (
    <div className='p5'>
      <PropHeader
        prop={prop.prop}
        keywords={determineKeywords(prop)}
        plugin={determinePlugin(prop)}
        subProps={determineSubProps(prop)}
      />

      { deprecatedClassNames &&
        <DeprecatedClassNamesView propConfig={prop} />
      }
      { typeof keywordValues === 'object' &&
        <DisplaySampleClasses
          title='Keyword Classes'
          classNames={getKeywordClasses(propName,keywordValues)}
        />
      }
      { plugin !== undefined &&
        <SamplePluginClasses
          prop={prop}
          plugin={config.plugins.filter(x => x.name === plugin)[0]}
        />
      }
    </div>
  );
};

export default PropView;
