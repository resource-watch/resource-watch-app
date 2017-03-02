import React from 'react';

function Breadcrumbs(props) {
  return (
    <ul className="c-breadcrumbs">
      {props.items.map((item, i) => {
        return i < (props.items.length - 1) ?
          <li key={i} className="item"><a href={item.url}>{item.name}</a></li> :
          <li key={i} className="item -current">{item.name}</li>;
      })}
    </ul>
  );
}

Breadcrumbs.propTypes = {
  items: React.PropTypes.array
};

Breadcrumbs.defaultProps = {
  items: []
};

export default Breadcrumbs;
