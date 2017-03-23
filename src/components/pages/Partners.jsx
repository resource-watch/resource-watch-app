import React from 'react';
import PartnerBlock from 'components/common/Partners/PartnerBlock';
import Banner from 'components/common/Banner';

class Partners extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.getPartners();
  }

  render() {
    return (
      <div className="c-page partners">
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
              {this.props.list.map((p, i) => <PartnerBlock key={i} item={p} />)}
            </div>
          </div>
        </section>

        <Banner>
          <h3 className="c-text -header-normal -normal">See yourself as part<br/> of this team?</h3>
          <button className="c-btn -primary -filled">
            Get in touch
          </button>
        </Banner>
      </div>
    );

  }
}

Partners.propTypes = {
  list: React.PropTypes.array.isRequired,
  getPartners: React.PropTypes.func
};

Partners.defaultProps = {
  list: []
};

export default Partners;
