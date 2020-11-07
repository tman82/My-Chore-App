import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

export default class HeaderComponent extends Component {
    render() {
        return(
            <Router>
                <div className="container-fluid top-nav">
                    <Link className="link-style" to="/">Chores</Link>
                    <Route path="/:id" />
                </div>
            </Router>
        )
    }
}