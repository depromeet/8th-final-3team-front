import React from 'react';
import Home from './home/Home';
import Router from './router/Router';

function App() {
    return (
        <div className="App">
            <Router>
                <Home></Home>
            </Router>
        </div>
    );
}

export default App;
