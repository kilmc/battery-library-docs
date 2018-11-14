
const formatModifiers = (modifier) => {
  const {
    indicator,
    separator = '',
    sampleIndicatorValues,
  } = modifier;

  if (sampleIndicatorValues) {
    return sampleIndicatorValues.reduce((cx, indicatorValue) =>
      cx.concat(`${separator}${indicatorValue}`),[]);
  } else {
    return [`${separator}${indicator}`];
  }
};

export const createModifierClassNames = ({ prop, modifier, sampleValues }) => {
  let values;
  const { propName, separator = '' } = prop;
  const { sampleValues: sampleModifierValues } = modifier;

  if (sampleModifierValues) {
    values = sampleModifierValues;
  } else if (sampleValues) {
    values = sampleValues;
  } else {
    console.log(`No sample values passed to ${propName} - ${modifier.name}`);
    return [];
  }

  return values.reduce((classes, value) => classes
    .concat(formatModifiers(modifier)
      .reduce((cx, indicatorValue) =>
        cx.concat(`${propName}${separator}${value}${indicatorValue}`),[])
    ),[]);
};

