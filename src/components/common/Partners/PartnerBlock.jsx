import React from 'react';
import { Link } from 'react-router';

function PartnerBlock(props) {
  return (
    <article className="c-partners-block column small-12 medium-6">
      <div className="logo-container">
        <Link to={`/partners/${props.attributes.name}`}>
          <img src={require(`../../../../public/images/partners/${props.attributes.logo.medium}`)} className="logo" />
        </Link>
      </div>
      <p className="description c-text -extra-big">{props.attributes.summary}</p>
      <a href={props.attributes.website} className="c-text -extra-big">Read more</a>
    </article>
  );
}

PartnerBlock.propTypes = {
  partner: React.PropTypes.object
};

export default PartnerBlock;
