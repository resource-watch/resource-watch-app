import React from 'react';
import partners from 'components/common/Partners/partners.json';
import PartnerBlock from 'components/common/Partners/PartnerBlock';
import './style.scss';

function Partners(props) {
  return (
    <div className="c-page">
      <section className="l-section -header">
        <div className="l-container">
          <header>
            <h1 className="c-text -header-big -thin">Partners</h1>
          </header>
        </div>
      </section>

      <section className="l-section -bg-grey">
        <div className="l-container">
          <header className="row">
            <div className="column small-12 medium-8">
              <h1 className="c-text -header-big -primary -thin">We have a massive opportunity to build a sustainable society</h1>
            </div>
          </header>

          <div className="row">
            <article className="column small-12 medium-6">
              <p className="c-text -extra-big">Mauris non tempor quam, et lacinia sapien. Mauris accumsan eros eget libero posuere vulputate. Etiam elit elit, elementum sed varius at, adipiscing vitae est. Sed nec felis pellentesque, lacinia dui sed, ultricies sapien. Pellentesque orci lectus, consectetur vel posuere posuere, rutrum eu ipsum. Aliquam</p>
            </article>
            <article className="column small-12 medium-6">
              <p className="c-text -extra-big">eget odio sed ligula iaculis consequat at eget orci. Mauris molestie sit amet metus mattis varius.  Mauris non tempor quam, et lacinia sapien. Mauris accumsan eros eget libero posuere vulputate. Etiam elit elit, elementum sed varius at, adipiscing vitae est. Sed nec felis pellentesque.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="l-section">
        <div className="l-container">
          <div className="row">
            {partners.map((p, i) => (
              <PartnerBlock key={i} partner={p} />
            ))}
          </div>
        </div>
      </section>

      <section className="l-section -bg -bg-dark -light">
        <div className="l-container">
          <div className="row">
            <div className="c-banner column small-12">
              <h3 className="c-text -header-normal -normal">See yourself as part<br/> of this team?</h3>
              <button className="c-btn -primary -filled">
                Get in touch
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

Partners.propTypes = {
  partnersList: React.PropTypes.array
};

Partners.defaultProps = {
  partnersList: []
};

export default Partners;
