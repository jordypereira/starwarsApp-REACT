import * as React from 'react';
import PropTypes from 'prop-types';
import PlanetPropertyItem from "./PlanetPropertyItem";


class PlanetHeader extends React.Component {

    renderProperties(){
        return this.props.properties.map((property, i) => (
          <PlanetPropertyItem onAdd={(e) => this.props.onAdd(e)} name={property} key={i}/>
        ));
    }

    render(){
        const properties = this.props.properties.length ? this.renderProperties() : '' ;

        return (
          <div>
              <h4 className="card-header text-center">
                  {this.props.name}
              </h4>
              <div className="text-center dropdown">
                  <button className="btn btn-dark dropdown-toggle" type="button" data-toggle="dropdown" id="dropdownMenuButton" aria-haspopup="true" aria-expanded="false">
                      Add <span className="caret"></span>
                  </button>
                  <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                      {properties}
                  </div>
              </div>
          </div>

        );
    }
}

PlanetHeader.propTypes = {
    name: PropTypes.string
};

export default PlanetHeader;
