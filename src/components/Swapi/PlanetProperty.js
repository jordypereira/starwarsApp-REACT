import * as React from 'react';
import PropTypes from 'prop-types';

class PlanetProperty extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        hide: false,
    };
  }

  onDelete () {
    this.setState({ hide: true })
  }

  render() {
    if(!this.state.hide){
      return (
        <li className="list-group-item">{this.props.name}: {this.props.value}<span className="float-right"><button className="btn btn-danger btn-sm" onClick={() => this.onDelete()}>Delete</button></span></li>  
      );
    }else{
      return '';
    }
  }
}

PlanetProperty.propTypes = {
  name: PropTypes.string,
  value: PropTypes.string
};

export default PlanetProperty;
