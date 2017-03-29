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
        path: '/get-involved/#',
        className: '-filled'
      }
    ],
    background: 'url(/images/backgrounds/jellyfish.jpg)'
  },
  {
    id: 'data',
    title: 'Contribute data',
    intro: ['Lorem ipsum sit amet casius sem', 'lacinia quam venenatis vestibulum'],
    buttons: [
      {
        text: 'Contribute data',
        path: '/get-involved/#',
        className: '-filled'
      }
    ],
    background: '#c32d7b url("/images/components/layout/header-bg-texture.png") no-repeat center'
  },
  {
    id: 'join',
    title: 'Join the community',
    intro: ['Lorem ipsum sit amet casius sem', 'lacinia quam venenatis vestibulum'],
    buttons: [
      {
        text: 'Join the community',
        path: '/get-involved/#',
        className: '-filled'
      }
    ],
    background: '#3bb2d0'
  },
  {
    id: 'app',
    title: 'Develop your app',
    intro: ['Lorem ipsum sit amet casius sem', 'lacinia quam venenatis vestibulum'],
    buttons: [
      {
        text: 'Develop your app',
        path: '/get-involved/#',
        className: '-filled'
      },
      {
        text: 'Apps gallery',
        path: '/get-involved/#',
        className: '-transparent -secondary'
      }
    ],
    background: 'rgba(0, 0, 0, .6)'
  }
];

function GetInvolved() {
  const title = 'Get Involved';
  const intro = ['Lorem ipsum sit amet casius sem', 'lacinia quam venenatis vestibulum'];

  return (
    <div className="p-get-involved">
      <div className="c-page about">
        <Intro title={title} intro={intro} />
        <section className="l-section -header">
          <div className="l-container">
            <div className="cards row collapse">
              {cards.map((c, i) => (
                <div id={c.id} key={i} className="column small-12 medium-6">
                  <CardStatic 
                    title={c.title}
                    intro={c.intro}
                    buttons={c.buttons}
                    className='-light'
                    background={c.background}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="row collapse">
          <div className="column small-12">
            <Banner className="partners">
              <h3 className="c-text -header-normal -thin">See yourself as part <br/>of this team?</h3>
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

export default GetInvolved;
