/* eslint-env jest, node */
import {
  buildMenuTree,
  flattenMenuTree
} from './build-menu-trees';

describe('buildMenuTree', () => {
  it('generates a menu tree structure from a propsConfig', () => {
    const propsConfig = [
      { prop: 'display' },
      { prop: 'background-color' },
      { prop: 'z-index' },
    ];
    expect(buildMenuTree({
      config: propsConfig,
      rootTitle: 'Props',
      titleKey: 'prop',
      groupKey: 'propGroup'
    })).toEqual({
      title: 'Props',
      items: [
        {
          title: 'background-color',
          path: '/props/background-color'
        },
        {
          title: 'display',
          path: '/props/display'
        },
        {
          title: 'z-index',
          path: '/props/z-index'
        },
      ]
    });
  });

  it('generates a nested menu tree structure from a propsConfig with grouped props', () => {
    const propsConfig = [
      { prop: 'display' },
      { prop: 'flex', propGroup: 'Flexbox' },
      { prop: 'align-items', propGroup: 'Flexbox' },
      { prop: 'top', propGroup: 'Positions' },
      { prop: 'bottom', propGroup: 'Positions' },
      { prop: 'z-index' },
    ];
    expect(buildMenuTree({
      config: propsConfig,
      rootTitle: 'Props',
      titleKey: 'prop',
      groupKey: 'propGroup'
    })).toEqual({
      title: 'Props',
      items: [
        {
          title: 'display',
          path: '/props/display'
        }
        ,
        { title: 'Flexbox', items: [
          {
            title: 'align-items',
            path: '/props/flexbox/align-items'
          },
          {
            title: 'flex',
            path: '/props/flexbox/flex'
          }
        ]},
        { title: 'Positions', items: [
          {
            title: 'bottom',
            path: '/props/positions/bottom'
          },
          {
            title: 'top',
            path: '/props/positions/top'
          }
        ]},
        {
          title: 'z-index',
          path: '/props/z-index'
        }
      ]
    });
  });
});

describe('flattenMenuTree', () => {
  it('flattens a menu tree to be an array of objects', () => {
    const propsConfig = [
      { prop: 'display' },
      { prop: 'flex', propGroup: 'Flexbox' },
      { prop: 'align-items', propGroup: 'Flexbox' },
      { prop: 'top', propGroup: 'Positions' },
      { prop: 'bottom', propGroup: 'Positions' },
      { prop: 'z-index' },
    ];
    const menuTree = buildMenuTree({
      config: propsConfig,
      rootTitle: 'Props',
      titleKey: 'prop',
      groupKey: 'propGroup'
    });

    expect(flattenMenuTree([menuTree])).toEqual([
      { title: 'display', path: '/props/display' },
      { title: 'align-items', path: '/props/flexbox/align-items' },
      { title: 'flex', path: '/props/flexbox/flex' },
      { title: 'bottom', path: '/props/positions/bottom' },
      { title: 'top', path: '/props/positions/top' },
      { title: 'z-index', path: '/props/z-index' }
    ]);
  });
});