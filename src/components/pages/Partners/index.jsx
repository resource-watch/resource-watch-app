import React from 'react';
import './style.scss';
import partners from 'components/common/Partners/partners.json';

// Images

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
          <header>
            <h1 className="c-text -header-big -primary -thin">We have a massive opportunity to build a sustainable society</h1>
          </header>
          <article>
            <p className="c-text -extra-big">Mauris non tempor quam, et lacinia sapien. Mauris accumsan eros eget libero posuere vulputate. Etiam elit elit, elementum sed varius at, adipiscing vitae est. Sed nec felis pellentesque, lacinia dui sed, ultricies sapien. Pellentesque orci lectus, consectetur vel posuere posuere, rutrum eu ipsum. Aliquam</p>
          </article>
          <article>
            <p className="c-text -extra-big">eget odio sed ligula iaculis consequat at eget orci. Mauris molestie sit amet metus mattis varius.  Mauris non tempor quam, et lacinia sapien. Mauris accumsan eros eget libero posuere vulputate. Etiam elit elit, elementum sed varius at, adipiscing vitae est. Sed nec felis pellentesque.</p>
          </article>
        </div>
      </section>

      <section className="l-section">
        <div className="l-container">
          <div className="row">
            {partners.map((p, i) => (
              <article key={i} className="block column small-12 medium-6">
                <div className="logo-container">
                  <img src={require(`images/partners/${p.img}`)} className="logo" />
                </div>
                <p className="c-text -extra-big">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate.</p>
                <a href={p.url} className="c-text -extra-big">Read more</a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="l-section -bg-dark -light">
        <div className="l-container">
          <h3 className="c-text -header-normal -thin">See yourself as part of this team?</h3>
          <button className="c-btn -secondary -filled">
            Get in touch
          </button>
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
