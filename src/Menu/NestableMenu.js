import React from 'react';
import MenuItem from './MenuItem';

const NestableMenu = ({ data, parentRoute = '', indent = false }) => {
  const menuItems = data.map((item,i) => {
    const route = `${parentRoute}/${item.title}`.toLowerCase();
    if (item.items) {
      return (
        <li key={`${item.title}-${i}`}>
          <h3
            className='type-16 block soft-black text-decoration-none py1 border-bottom border-grey-500 w100p text-left'
          >
            {item.title}
          </h3>
          <NestableMenu
            data={item.items}
            parentRoute={route}
            indent={true}
          />
        </li>
      );
    } else {
      return (
        <MenuItem
          title={item.title}
          route={route}
          key={`${item.title}-${i}`}
        />
      );
    }
  });

  return (
    <ul className={indent ? 'pl2' : ''}>
      {menuItems}
    </ul>
  );
};

// class NestableMenu extends React.Component {
//   constructor(props) {
//     super(props)
//     this.state = {
//       expanded: true
//     }

//     this.toggleMenu = this.toggleMenu.bind(this)
//   }

//   toggleMenu() {
//     this.setState((prev) => ({ expanded: !prev.expanded}))
//   }

//   render() {
//     const menuItems = this.props.data.map((item,i) => {
//       const route = `${this.props.parentRoute || ''}/${item.title}`.toLowerCase();
//       if (item.items) {
//         return (
//           <li key={`${item.title}-${i}`}>
//             <button
//               className='block soft-black text-decoration-none py1'
//               onClick={this.toggleMenu}
//             >
//               {item.title}
//             </button>
//             <ul className={[
//               this.state.expanded ? '' : 'hide',
//               this.props.indent ? 'pl2' : ''
//             ].join(' ')}>
//               <NestableMenu
//                 data={item.items}
//                 parentRoute={route}
//                 indent={true}
//                 expanded={this.state.expanded}
//               />
//             </ul>
//           </li>
//         );
//       } else {
//         return (
//           <MenuItem
//             title={item.title}
//             route={route}
//             key={`${item.title}-${i}`}
//           />
//         );
//       }
//     });
//     return (
//       <ul>
//         {menuItems}
//       </ul>
//     );
//   }
// };

export default NestableMenu;