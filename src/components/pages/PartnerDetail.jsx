import React from 'react';
import PartnerBlock from 'components/common/Partners/PartnerBlock';
import Banner from 'components/common/Banner';

class PartnerDetail extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.getPartnerData(this.props.params.id);
  }

  componentWillReceiveProps(newProps) {
    this.props.getPartnerData(this.props.params.id);
  }

  splitInTwoParts(str) {
    const strArray = str.split(' ');
    const midIndex = Math.floor(strArray.length / 2);
    return [
      strArray.slice(0, midIndex).join(' '),
      strArray.slice(midIndex + 1, strArray.length).join(' ')
    ];
  }

  render() {
    const { data } = this.props;
    const description = data.summary ? this.splitInTwoParts(data.summary): ['', ''];
    const imgPath = data['white-logo'] ? data['white-logo'].medium : '';
    const logo = data.website !== '' ? 
      <a href={data.website} target="_blank">
        <img src={`${config.CMS_API_URL}${imgPath}`} className="logo" title={data.name} />
      </a> :
      <img src={`${config.CMS_API_URL}${imgPath}`} className="logo" title={data.name} />;

    return (
      <div className="c-page partner-detail">
        <Banner className="intro">
           <div className="row">
            <div className="column small-12">
              <h4 className="title c-text -default -bold -uppercase">RESOURCE WATCH PARTNER</h4>
              <div className="logo-container">
                {logo}
              </div>
              <div className="description">
                <div className="row">
                  <div className="column small-12 medium-6">
                    <p className="c-text -extra-big">{description[0]}</p>
                  </div>

                  <div className="column small-12 medium-6">
                    <p className="c-text -extra-big">{description[1]}</p>
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

  
}

PartnerDetail.propTypes = {
  data: React.PropTypes.object
};

PartnerDetail.defaultProps = {
  data: {}
};

export default PartnerDetail;
