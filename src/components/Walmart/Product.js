import * as React from 'react';
import * as walmartService from '../../services/swapi.service';

export default class Product extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            product: []
        };
    }

    // React lifecycle event
    // https://reactjs.org/docs/react-component.html#the-component-lifecycle
    componentWillMount() {
      walmartService.getAll().then(
        //   response => console.log(response)
          response => this.setState({ product: response })
        );
    }

    // renderProduct() {
    //     return this.state.product.map((product, i) => (<li key={i}><Student avatar={student.avatar} name={student.name} id={student.id} /></li>));
    // }

    render() {
        return (
            <section>
                <div>
                    {this.state.product}
                </div>
            </section>
            );
    }
};
        