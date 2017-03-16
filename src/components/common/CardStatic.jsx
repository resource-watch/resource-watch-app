import React from 'react';
import { Link } from 'react-router';
import classNames from 'classnames';

const drawButtons = buttons => {
  return buttons.map((b, i) => (
    <button key={i} className={`c-btn ${b.className}`}>
      <Link to={b.path}>{b.text}</Link>
    </button>
  ));
};

const drawIntro = intro => {
  return intro.map((line, i) => (
    <span key={i}>
      {line}{(i !== intro.length - 1) && <br/>}
    </span>));
};

function CardStatic(props) {
  const isIntroString = typeof props.intro === 'string';
  const style = { background: props.background };
  const className = classNames({
    'c-card-static': true,
    [props.className]: props.className
  });

  return (
    <div className={className} style={style}>
      <div>
        <h2 className="title c-text -header-normal -thin">{props.title}</h2>
        <p className="c-text -big">
          {!isIntroString ?
            drawIntro(props.intro) :
            props.intro
          }
        </p>
      </div>
      <div className="buttons">
        {drawButtons(props.buttons)}
      </div>
    </div>
  );
}

CardStatic.propTypes = {
  title: React.PropTypes.string.isRequired,
  intro: React.PropTypes.any,
  buttons: React.PropTypes.array.isRequired
};

CardStatic.defaultProps = {
  title: '',
  intro: '',
  buttons: []
};

export default CardStatic;
