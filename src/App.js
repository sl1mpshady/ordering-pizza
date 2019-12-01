import React, {Component} from 'react';
import {ApolloProvider} from "react-apollo";
import client from './apollo';
import AddOrder from './components/AddOrder';
import Orders from './components/Orders';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {}

    render() {
        return (
            <ApolloProvider client={client}>
                <div className="container">
                    <div className="row justify-content-md-center main">
                        <div className="col col-lg-5 col-12">
                            <AddOrder/>
                        </div>
                        <div className="col col-lg-5 col-12">
                            <Orders/>
                        </div>
                    </div>
                </div>
            </ApolloProvider>
        )
    }
}

export default App;
