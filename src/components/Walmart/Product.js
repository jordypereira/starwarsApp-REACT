import * as React from 'react';
import * as walmartService from '../../services/walmart.service';

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
      walmartService.get().then(response => this.setState({ product: response.message }));
    }

    renderProduct() {
        return this.state.product.map((product, i) => (<li key={i}><Student avatar={student.avatar} name={student.name} id={student.id} /></li>));
    }

    render() {
        return (
            <section>
                <div className="wrapper">
                    <h2>Alle studenten</h2>

                    <ul className="people">
                        {this.state.students.length ? this.renderStudents() : (<p>Geen studenten gevonden</p>)}
                    </ul>
                </div>
            </section>);
    }
};
        