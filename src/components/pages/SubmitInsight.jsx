import React from 'react';
import { Link } from 'react-router';
import Banner from 'components/common/Banner';
import Intro from 'components/common/Intro';

class SubmitInsight extends React.Component {
  componentWillMount() {
    this.props.getStaticData('submit-an-insight', 'submitInsight');
  }

  render() {
    const { data } = this.props;
    const styles = {};
    if (data.photo) {
      styles['backgroundImage'] = `url(${config.CMS_API_URL}${data.photo.medium})`;
    }

    return (
      <div className="p-submit-insight">
        <div className="c-page">
          <Intro title={data.title} intro={data.summary} styles={styles} />
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

export default SubmitInsight;
