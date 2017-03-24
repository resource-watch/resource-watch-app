import React from 'react';
import partners from 'json/partners.json';
import PartnerBlock from 'components/common/Partners/PartnerBlock';
import Banner from 'components/common/Banner';

function PartnerDetail(props) {
  return (
    <div className="c-page partner-detail">
      <Banner className="intro">
         <div className="row">
          <div className="column small-12">
            <h4 className="title c-text -default -bold -uppercase">RESOURCE WATCH PARTNER</h4>
            <div className="logo-container">
              <img src={`/images/partners/${props.partner.img}`} className="logo" />
            </div>
            <div className="description">
              <div className="row">
                <div className="column small-12 medium-6">
                  <p className="c-text -extra-big">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate.</p>
                </div>

                <div className="column small-12 medium-6">
                  <p className="c-text -extra-big">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Banner>

      <Banner className="learn-more">
        <div className="row">
          <div className="column small-12">
            <h3 className="c-text -header-big -thin">Important work,<br/> beautifully crafted</h3>
            <button className="c-btn -primary -filled">
              LEARN ABOUT OUR WORK
            </button>
          </div>
        </div>
      </Banner>
    </div>
  );
}

PartnerDetail.propTypes = {
  partner: React.PropTypes.object
};

PartnerDetail.defaultProps = {
  partner: {}
};

export default PartnerDetail;
