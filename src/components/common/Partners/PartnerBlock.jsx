import React from 'react';
import { Link } from 'react-router';

function PartnerBlock(props) {
  const partner = props.item.attributes;
  const imgPath = `${config.CMS_API_URL}${partner.logo.medium}`;

  return (
    <article className="c-partners-block column small-12 medium-6">
      <div className="logo-container">
        <Link to={`/about/partners/${partner.name}`}>
          <img src={imgPath} className="logo" title={partner.name} />
        </Link>
      </div>
      <p className="description c-text -extra-big">{partner.summary}</p>
      <a href={partner.website !== '' ? partner.website : "#"} className="c-text -extra-big" target="_blank">Read more</a>
    </article>
  );
}

PartnerBlock.propTypes = {
  item: React.PropTypes.object
};

export default PartnerBlock;
