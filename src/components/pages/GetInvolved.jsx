import React from 'react';
import { Link } from 'react-router';
import Banner from 'components/common/Banner';
import Intro from 'components/common/Intro';
import CardStatic from 'components/common/CardStatic';

const cards = [
  {
    id: 'insights',
    title: 'Submit an insight',
    intro: ['Lorem ipsum sit amet casius sem', 'lacinia quam venenatis vestibulum'],
    buttons: [
      {
        text: 'Submit an insight',
        path: '/get-involved/submit-insight',
        className: '-filled'
      }
    ],
    className: 'insights'
  },
  {
    id: 'data',
    title: 'Contribute data',
    intro: ['Lorem ipsum sit amet casius sem', 'lacinia quam venenatis vestibulum'],
    buttons: [
      {
        text: 'Contribute data',
        path: '/get-involved/contribute-data',
        className: '-filled'
      }
    ],
    className: 'contribute'
  },
  {
    id: 'join',
    title: 'Join the community',
    intro: ['Lorem ipsum sit amet casius sem', 'lacinia quam venenatis vestibulum'],
    buttons: [
      {
        text: 'Join the community',
        path: '/get-involved/join-community',
        className: '-filled'
      }
    ],
    className: 'join'
  },
  {
    id: 'app',
    title: 'Develop your app',
    intro: ['Lorem ipsum sit amet casius sem', 'lacinia quam venenatis vestibulum'],
    buttons: [
      {
        text: 'Develop your app',
        path: '/get-involved/develop-app',
        className: '-filled'
      },
      {
        text: 'Apps gallery',
        path: '/get-involved/apps',
        className: '-transparent -secondary'
      }
    ],
    className: 'develop'
  }
];

class GetInvolved extends React.Component {
  componentWillMount() {
    this.props.getStaticData('get-involved', 'getInvolved');
  }

  render() {
    const { data } = this.props;
    const styles = {};
    if (data.photo) {
      styles.backgroundImage = `url(${config.CMS_API_URL}${data.photo.medium})`;
    }

    const introLines = intro => (
      intro.map((line, i) => (
        <span key={i}>
          {line}{(i !== intro.length - 1) && <br />}
        </span>))
    );

    const cardsStatic = cards.map((c, i) =>
      <div key={i} className="column small-12 medium-6">
        <CardStatic className={`-light ${c.className}`} background={c.background}>
          <div>
            <h2 className="title c-text -header-normal -thin">{c.title}</h2>
            <p className="c-text -big">{introLines(c.intro)}</p>
          </div>
          <div className="buttons">
            {c.buttons.map((b, j) => (
              <button key={j} className={`c-btn ${b.className}`}>
                <Link to={b.path}>{b.text}</Link>
              </button>
            ))}
          </div>
        </CardStatic>
      </div>
    );

    return (
      <div className="p-get-involved">
        <div className="c-page">
          <Intro title={data.title} intro={data.summary} styles={styles} />
          <section className="l-section -header">
            <div className="l-container">
              <div className="cards row collapse">
                {cardsStatic}
              </div>
            </div>
          </section>

          <div className="row collapse">
            <div className="column small-12">
              <Banner className="partners">
                <h3 className="c-text -header-normal -thin">
                  See yourself as part <br />of this team?
                </h3>
                <button className="c-btn -primary">
                  Get in touch
                </button>
              </Banner>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

GetInvolved.propTypes = {
  data: React.PropTypes.object,
  getStaticData: React.PropTypes.func
};

export default GetInvolved;
