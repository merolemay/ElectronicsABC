import React, {Component} from 'react';
import ReactDOM from 'react-dom/client';
import Book from './CreateBook.jsx'
import AuthorCreation from '../components/AuthorCreation.jsx';
import Add from '../components/CreateUser.jsx'

class MyComponent extends Component {

    handleShowBook = () => {
        ReactDOM.createRoot(document.getElementById('root')).render(
            <React.StrictMode>
                <Book/>
            </React.StrictMode>
        );
    }

    handleShowAuthor = () => {
        ReactDOM.createRoot(document.getElementById('root')).render(
            <React.StrictMode>
                <AuthorCreation/>
            </React.StrictMode>
        );
    }

    handleShowAdd = () => {
        ReactDOM.createRoot(document.getElementById('root')).render(
            <React.StrictMode>
                <Add/>
            </React.StrictMode>
        );
    }

    render() {
        return (
            <div>
                <style>
                    {`
            

            section {
              position: relative;
              width: 640px;
              margin: 50px auto;
            }

            nav {
              width: 100%;
            }

            nav ul li {
              display: inline-block;
              list-style: none;
              width: 160px;
              text-align: center;
              font-family: Helvetica, sans-serif;
              border: 1px dashed rgba(255, 255, 255, 0);
              color: #fff;
              padding: 10px 0 10px 0;
              margin: -1px -5px -1px -1px;
              cursor: pointer;
              transition: all 0.2s;
              -webkit-transition: all 0.2s;
            }

            nav ul li:hover {
              background: rgba(60, 65, 60, 0.1);
            }

            nav ul {
              border: 1px solid #fff;
              position: absolute;
              width: 100%;
              padding: 0;
              z-index: 100;
            }

            nav div {
              position: absolute;
              left: 0;
              top: 16px;
              background: #fff;
              width: 162px;
              height: 40px;
              z-index: 99;
            }

            .active {
              color: rgba(240, 240, 240);
              backgraound: black;
            }
            body {
                background-color: #000;
                color: white;
                font-family: Arial, sans-serif;
                margin: 0; /* Elimina el margen predeterminado */
                padding: 0; /* Elimina el espacio de relleno predeterminado */
            }

          `}
                </style>
                <div id="bg"></div>
                <h1>ABC Electronics</h1>
                <section>
                    <nav>
                        <ul>
                            <li data-xcoord="0px" className="active" onClick={() => this.handleNavClick("0px")}>
                                Home Page
                            </li>
                            <li data-xcoord="160px" onClick={() => this.handleShowBook()}>
                                Customers
                            </li>
                            <li data-xcoord="320px" onClick={() => this.handleShowAuthor()}>
                                Orders
                            </li>
                            <li data-xcoord="320px" onClick={() => this.handleShowAdd()}>
                                Additional info
                            </li>
                        </ul>
                    </nav>
                </section>
            </div>
        );
    }
}

export default MyComponent;
