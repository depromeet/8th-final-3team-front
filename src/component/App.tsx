import React from 'react';
import { ContextProvider } from './context/Context';
import Home from './home/Home';
import Router from './router/Router';

function App() {
    return (
        <div className="App">
            <ContextProvider>
                <Router>
                    <Home></Home>
                </Router>
            </ContextProvider>
        </div>
    );
}

export default App;
