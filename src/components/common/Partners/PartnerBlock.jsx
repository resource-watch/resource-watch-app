import React from 'react';
import { Link } from 'react-router';

function PartnerBlock(props) {
  const partner = props.item.attributes;
  const imgPath = `${config.CMS_API_URL}${partner.logo.medium}`;

  return (
    <article className="c-partners-block column small-12 medium-6">
      <div className="logo-container">
        <Link to={`/about/partners/${props.item.id}`}>
          <img src={imgPath} className="logo" title={partner.name} alt={partner.name} />
        </Link>
      </div>
      <p className="description c-text -extra-big">{partner.summary}</p>
      <Link to={`/about/partners/${props.item.id}`} className="c-btn -transparent -primary c-text -extra-big">Read more</Link>
    </article>
  );
}

PartnerBlock.propTypes = {
  item: React.PropTypes.object
};

export default PartnerBlock;
