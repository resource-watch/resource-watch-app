import React from 'react';
import { Link } from 'react-router';

import './style.scss';

function PartnerBlock(props) {
  return (
    <article className="c-partners-block column small-12 medium-6">
      <div className="logo-container">
        <Link to={`/partners/${props.partner.name}`}>
          <img src={require(`images/partners/${props.partner.img}`)} className="logo" />
        </Link>
      </div>
      <p className="description c-text -extra-big">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate.</p>
      <a href={props.partner.url} className="c-text -extra-big">Read more</a>
    </article>
  );
}

PartnerBlock.propTypes = {
  partner: React.PropTypes.object
};

export default PartnerBlock;
