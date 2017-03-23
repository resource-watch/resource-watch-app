import React from 'react';
import { Link } from 'react-router';
import Banner from 'components/common/Banner';
import CardStatic from 'components/common/CardStatic';

const cards = [
  {
    tag: 'Explore datasets',
    title: 'Dive into the data',
    intro: 'Create and download custom visualisations using our collection of over [XX] datasets related to natural resources.',
    buttons: [
      {
        text: 'Explore datasets',
        path: '/explore',
        className: '-primary'
      }
    ],
    background: 'url(/images/backgrounds/jellyfish.jpg)'
  },
  {
    tag: 'Dashboards',
    title: 'Review the topic or country you care about most',
    intro: 'Find all the data about a country or topic, or build your own dashboard to monitor the data you care about.',
    buttons: [
      {
        text: 'Check dashboards',
        path: '/dashboards',
        className: '-primary'
      }
    ],
    background: 'url(/images/backgrounds/jellyfish.jpg)'
  },
  {
    tag: 'Planet Pulse',
    title: 'Take the pulse of our planet',
    intro: 'A global picture of key impacts on livelihoods over the last 30 days.',
    buttons: [
      {
        text: 'Launch planet pulse',
        path: '/planet-pulse',
        className: '-primary'
      }
    ],
    background: 'url(/images/backgrounds/jellyfish.jpg)'
  }
];

function Home() {
  const cardsStatic = cards.map((c, i) => 
    <div key={i} className="column small-12 medium-4">
      <CardStatic className='-light' background={c.background}>
        <div>
          <h5 className="tag c-text -small -bold -uppercase">{c.tag}</h5>
          <h3 className="title c-text -extra-big -bold">{c.title}</h3>
          <p className="c-text -big">{c.intro}</p>
        </div>
        <div className="buttons">
            {c.buttons.map((b, i) => (
              <button key={i} className={`c-btn ${b.className}`}>
                <Link to={b.path}>{b.text}</Link>
              </button>
            ))}
        </div>
      </CardStatic>
    </div>
  );

  return (
    <div className="p-home">
      <div className="c-page">
        <Banner className="intro">
          <h3 className="title c-text -header-huge -thin">Quick and easy access<br/>to a world of resource data</h3>
          <p className="c-text -huge -thin">Explore the latest data, make insights, and help build a more sustainable planet</p>
        </Banner>

        <section className="l-section -bg-grey">
          <div className="l-container">
            <header className="row">
              <div className="column small-12 medium-8">
                <h1 className="c-text -header-big -primary -thin">Explore the data</h1>
              </div>
            </header>

            <div className="row">
              <article className="column small-12 medium-5">
                <p className="c-text -extra-big">Explore, create visualizations, receive updates and contribute with your data.</p>
              </article>
            </div>

            <div className="row">
              {cardsStatic}
            </div>
          </div>
        </section>
        
        <Banner className="get-involved">
          <div className="row">
            <div className="column small-12 medium-6">
              <h3 className="title c-text -header-huge -thin">Get Involved</h3>
              <p className="c-text -big">We've brought together the best datasets related to natural resources, so you can find new insights, influence decisions and change the world. There's a world of opportunity to take this futher; here’s some ideas to get you started...</p>
            </div>
          </div>
          <div className="row">
            <div className="column small-12 medium-3">
              <button className="c-btn -transparent"><Link to="/get-involved#">Submit an insight</Link></button>
            </div>
            <div className="column small-12 medium-3">
              <button className="c-btn -transparent"><Link to="/get-involved#">Contribute data</Link></button>
            </div>
            <div className="column small-12 medium-3">
              <button className="c-btn -transparent"><Link to="/get-involved#">Join the community</Link></button>
            </div>
            <div className="column small-12 medium-3">
              <button className="c-btn -transparent"><Link to="/get-involved#">Develop your app</Link></button>
            </div>
          </div>
        </Banner>        
      </div>
    </div>
  );
}

export default Home;
