import { connect } from 'react-redux';
import VegaChart from 'components/widgets/VegaChart';
import { toggleTooltip } from 'redactions/tooltip';

const mapStateToProps = ({ tooltip }) => ({
  tooltip
});

export default connect(mapStateToProps, {
  toggleTooltip
})(VegaChart);
