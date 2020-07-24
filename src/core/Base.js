import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { signout, isAuthenticated } from '../auth/helper';
// import Logo from '../images/mainlogosolo.png';
import { Container, Row,} from 'react-bootstrap';
import './Base.css';
function Base({children}) {
    const history = useHistory();
    const logout = () => {
        signout();
        history.push("/signin");
    }

    const currentTab = (history, path) => {
        if (history.location.pathname === path) {
            return {
                color: "white",
                backgroundColor: "rgba(0, 0, 0, 0.671)"
            };
        } else {
            return {
                color: "black"
            };
        }
    }

    return (
        <div>
            <nav className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
                <a className="navbar-brand col-md-3 col-lg-2 mr-0 px-3" href="/">SOLO-SOS</a>
                <button className="navbar-toggler position-absolute d-md-none collapsed" type="button" data-toggle="collapse" data-target="#sidebarMenu" aria-controls="sidebarMenu" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
            </nav>

            <Container fluid>
                <Row>
                    <nav id="sidebarMenu" className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
                        <div className="sidebar-sticky pt-3">
                            <ul className="nav flex-column">
                                <li className="nav-item">
                                    <Link className="nav-link" style={currentTab(history, "/")} to="/">
                                    <span data-feather="home"></span>
                                    Dashboard <span className="sr-only">(current)</span>
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" style={currentTab(history, "/allleads")}  to="/allleads">
                                    {/* <span data-feather="home"></span> */}
                                    All Lead <span className="sr-only">(current)</span>
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" style={currentTab(history, "/createlead")}  to="/createlead">
                                    <span data-feather="file"></span>
                                    Create Lead
                                    </Link>
                                </li>
                                <li className="nav-item border-bottom">
                                    <Link className="nav-link" style={currentTab(history, "/funnel")}  to="/funnel">
                                    <span data-feather="users"></span>
                                    Funnel
                                    </Link>
                                </li>
                                <li className="nav-item border-bottom">
                                    <Link className="nav-link" style={currentTab(history, "/allbd")}  to="/allbd">
                                    <span data-feather="users"></span>
                                    Call Team
                                    </Link>
                                </li>
                                {/* <li className="nav-item border-bottom" style={currentTab(history, "/sharelead")}>
                                    <Link className="nav-link" to="/sharelead">
                                    <span data-feather="bar-chart-2"></span>
                                    Lead shared
                                    </Link>
                                </li> */}
                                <li className="nav-item border-bottom">
                                    <p className="text-success pt-3 pl-3">
                                    <span data-feather="bar-chart-2"></span>
                                        Welcome! {isAuthenticated().user.name} 🥳
                                    </p>
                                </li>
                                <li className="nav-item mt-2">
                                    <button className="btn btn-outline-danger" onClick={logout} style={{ marginLeft: "4%"}}>
                                    <span data-feather="layers"></span>
                                    Logout
                                    </button>
                                </li>
                            </ul>
                            {/* <div className="text-center mt-5">
                                <img className="mt-3" src={Logo} alt="" width="150" />
                            </div> */}
                        </div>
                    </nav>

                <main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-md-4 mb-4">
                    {children}
                </main>
            </Row>
        </Container>
    </div>
    )
}

export default Base
