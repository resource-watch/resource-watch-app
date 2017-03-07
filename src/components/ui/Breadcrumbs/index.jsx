import React from 'react';

function Breadcrumbs(props) {
  return (
    <ul className="c-breadcrumbs">
      {props.items.map((item, i) => {
        if (!props.current) {
          return <li key={i} className="item"><a href={item.url}>{item.name}</a></li>;
        } else {
          return i < (props.items.length - 1) ?
            <li key={i} className="item"><a href={item.url}>{item.name}</a></li> :
            <li key={i} className="item -current">{item.name}</li>;
        }
      })}
    </ul>
  );
}

Breadcrumbs.propTypes = {
  items: React.PropTypes.array,
  /* Current page present on breadcrumbs */
  current: React.PropTypes.bool
};

Breadcrumbs.defaultProps = {
  items: []
};

export default Breadcrumbs;
