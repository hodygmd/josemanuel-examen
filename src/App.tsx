import React, {useState} from 'react';
//import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Routes, Route, Outlet, Link} from "react-router-dom";
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
} from 'reactstrap';
import Users from "./Pages/Users";
const About = React.lazy(() => import("./Pages/About"));
//const Users = React.lazy(() => import("./Pages/Users"));
const SubjectsCareers = React.lazy(() => import("./Pages/Subjects-Careers"));
export default function App() {
    return (
        <div>
            <Router>
                <Routes>
                    <Route path="/" element={<Layout/>}>
                        <Route index element={<Home/>}/>
                        <Route
                            path="users/*"
                            element={
                                <React.Suspense fallback={<>...</>}>
                                    <Users/>
                                </React.Suspense>
                            }
                        />
                        <Route
                            path="sc/*"
                            element={
                                <React.Suspense fallback={<>...</>}>
                                    <SubjectsCareers/>
                                </React.Suspense>
                            }
                        />
                        <Route
                            path="about"
                            element={
                                <React.Suspense fallback={<>...</>}>
                                    <About/>
                                </React.Suspense>
                            }
                        />
                        <Route path="*" element={<NoMatch/>}/>
                    </Route>
                </Routes>
            </Router>
        </div>
    );
}

function Layout() {
    const [collapsed, setCollapsed] = useState(true);
    const toggleNavbar = () => setCollapsed(!collapsed);
    return (
        <>
            <div className={"container"}>
                <Navbar color="faded" light className={"mx-3"}>
                    <NavbarBrand href="#" className="me-auto text-danger fw-bold">
                        Menu
                    </NavbarBrand>
                    <NavbarToggler onClick={toggleNavbar} className="me-2 bg-danger"/>
                    <Collapse isOpen={!collapsed} navbar>
                        <Nav navbar>
                            <NavItem>
                                <NavLink className={"text-info fw-semibold"} href="/">Home</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink className={"text-info fw-semibold"} href="/users">Alumns/Teachers</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink className={"text-info fw-semibold"} href="/sc">Subjects/Careers</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink className={"text-info fw-semibold"} href="/about">About</NavLink>
                            </NavItem>
                        </Nav>
                    </Collapse>
                </Navbar>
            </div>
            <hr className={"text-light"}/>
            <Outlet/>
        </>
    );
}

function Home() {
    return (
        <>
            <div className={"container"}>
                <h2 className={"text-center mt-5 text-warning fw-bold text-decoration-underline"}>TESJI</h2>
                <div className={"mx-5 mt-4"}>
                    <p className={"mx-5 text-info fst-italic"}>¡Bienvenid@! Nuestro sitio web fomenta la excelencia académica, el desarrollo
                        del carácter y el amor por el aprendizaje. Explore nuestro sitio web, conéctese con nosotros y
                        emprenda un emocionante viaje educativo.</p>
                </div>
                <div id="carousel-controls" className="carousel slide mt-4" data-bs-ride="carousel">
                    <div className="carousel-inner">
                        <div className="carousel-item active">
                            <img height={"350px"} className="d-block w-100 border border-4 border-secondary rounded-5"
                                 src="https://cdn.discordapp.com/attachments/831740786638192653/1109180157513715772/t1.png"
                                 alt="..."/>
                        </div>
                        <div className="carousel-item">
                            <img height={"350px"} className="d-block w-100 border border-4 border-secondary rounded-5"
                                 src="https://cdn.discordapp.com/attachments/831740786638192653/1109180185246433300/t2.png"
                                 alt="..."/>
                        </div>
                        <div className="carousel-item">
                            <img height={"350px"} className="d-block w-100 border border-4 border-secondary rounded-5"
                                 src="https://cdn.discordapp.com/attachments/831740786638192653/1109180221053227088/t3.png"
                                 alt="..."/>
                        </div>
                    </div>
                    <button className="carousel-control-prev" type="button" data-bs-target="#carousel-controls"
                            data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#carousel-controls"
                            data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>
            </div>
        </>
    );
}

function NoMatch() {
    return (
        <>
            <div className={"d-flex align-items-center flex-column nomatch pt-5 mt-5"}>
                <h2 className={"pt-5"}>NOTHING TO SE HERE!</h2>
                <p className={"mt-3"}>
                    <Link to="/">Go to the home page</Link>
                </p>
            </div>
        </>
    );
}