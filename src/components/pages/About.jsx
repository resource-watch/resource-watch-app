import React from 'react';
import { Link } from 'react-router';
import Banner from 'components/common/Banner';
import Intro from 'components/common/Intro';

class About extends React.Component {
  componentWillMount() {
    this.props.getStaticData('about');
  }

  render() {
    const { data } = this.props;

    return (
      <div className="p-about">
        <div className="c-page">
          <Intro title={data.title} intro={data.summary} background={data.photo && `${config.CMS_API_URL}${data.photo.medium}`} />
          <section className="l-section">
            <div className="l-container">
              <div className="row collapse">
                {/* Convert string content to html */}
                <div
                  className="description column small-12 medium-8 medium-offset-2"
                  dangerouslySetInnerHTML={{ __html: data.description }}
                >
                </div>
              </div>
            </div>
          </section>

          <div className="row collapse">
            <div className="column small-12">
              <Banner className="partners">
                <h3 className="c-text -header-normal -normal">We have a massive opportunity<br/>to build a sustainable society</h3>
                <button className="c-btn -primary -filled">
                  <Link to="/about/partners">Partners list</Link>
                </button>
              </Banner>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default About;
