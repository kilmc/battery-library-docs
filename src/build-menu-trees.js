const alphabetical = (key) => (a,b) =>
  a[key].toLowerCase() < b[key].toLowerCase() ? -1 : 1;

const buildBranch = ({
  config,
  filterFn,
  parent = '',
  titleKey
}) => {
  return (
    config
      .filter(filterFn)
      .map(item => ({
        title: item[titleKey],
        path: `${parent}/${item[titleKey]}`.toLowerCase()
      }))
  );
};

export const buildMenuTree = ({
  config,
  rootTitle,
  titleKey,
  groupKey
}) => {
  const topLevelItems = buildBranch({
    config,
    filterFn: item => !item[groupKey],
    parent: `/${rootTitle}`.toLowerCase(),
    titleKey
  });

  const groupTitles = [...new Set(config
    .filter(item => item[groupKey])
    .map(item => item[groupKey]))
  ];

  let itemGroups = [];
  if (groupTitles.length > 0) {
    itemGroups = groupTitles
      .reduce((xs,x) => xs.concat({
        title: x,
        items: buildBranch({
          config,
          filterFn: item => item[groupKey] === x,
          parent: `/${rootTitle.toLowerCase()}/${x}`,
          titleKey
        }).sort(alphabetical('title'))
      }),[]);
  };

  return {
    title: rootTitle,
    items: topLevelItems
      .concat(itemGroups)
      .sort(alphabetical('title'))
  };
};

export const flattenMenuTree = (tree) => tree
  .map(item => item.items
    ? [...flattenMenuTree(item.items)]
    : item
  )
  .reduce((xs,x) => xs.concat(x),[]);