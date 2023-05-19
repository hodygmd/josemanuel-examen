import * as React from "react";
import {Routes, Route, Outlet, Link} from "react-router-dom";
import {useState} from "react";
import {Button, Modal, ModalBody, ModalFooter, ModalHeader, Table} from "reactstrap";
import './style.css'

export default function SubjectsCareers() {
    // These routes are defined when this component is loaded on demand via
    // dynamic import() on the home page!
    return (
        <Routes>
            <Route path="/" element={<SCLayout/>}>
                <Route index element={<Subjects/>}/>
                <Route path="careers" element={<Careers/>}/>
            </Route>
        </Routes>
    );
}

function SCLayout() {
    return (
        <>
            <div className={"d-flex justify-content-around"}>
                <Link to="/sc"><Button color={"warning"} outline>Subjects</Button></Link>
                <Link to="/sc/careers"><Button color={"warning"} outline>Careers</Button></Link>
            </div>
            <Outlet/>
        </>
    );
}

function Subjects() {
    const [key, setKey] = useState('')
    const [name, setName] = useState('')
    const [thours, setThours] = useState(0)
    const [phours, setPhours] = useState(0)
    const [credits, setCredits] = useState(0)

    const handleKeyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setKey(event.target.value)
    }
    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value)
    }
    const handleThoursChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setThours(parseInt(event.target.value))
    }
    const handlePhoursChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPhours(parseInt(event.target.value))
    }
    const handleCreditsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCredits(parseInt(event.target.value))
    }

    const subjects: Array<{ key: string, name: string, thours: number, phours: number, credits: number }> = []
    const [subject, setSubject] = useState(subjects)
    const [showModal, setShowModal] = useState(false)
    const handleShowModal = () => {
        setShowModal(true)
    }
    const handleCloseModal = () => {
        setShowModal(false)
        setButtonSubmitText('Add')
        setNull()
    }
    const [edit, setEdit] = useState(false)
    const [buttonSubmitText, setButtonSubmitText] = useState('Add')
    const [indexToEdit, setIndexToEdit] = useState(0)

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (thours === 0 || phours === 0 || credits === 0) {
            alert('These fields cannot be 0')
        } else {
            if (edit === false) {
                setSubject([...subject, {key: key, name: name, thours: thours, phours: phours, credits: credits}])
            } else {
                subject[indexToEdit] = {
                    ...subject[indexToEdit],
                    key: key,
                    name: name,
                    thours: thours,
                    phours: phours,
                    credits: credits
                }
                setSubject(subject)
                setButtonSubmitText('Add')
                setEdit(false)
            }
            setShowModal(false)
            setNull()
        }
    }

    const deleteElement = (key: string) => {
        setSubject(subject.filter(obj => obj.key !== key))
    }
    const editElement = (index: number) => {
        setKey(subject[index].key)
        setName(subject[index].name)
        setThours(subject[index].thours)
        setPhours(subject[index].phours)
        setCredits(subject[index].credits)
        setEdit(true)
        setButtonSubmitText('Edit')
        setIndexToEdit(index)
        handleShowModal()
    }
    const setNull = () => {
        setKey('')
        setName('')
        setThours(0)
        setPhours(0)
        setCredits(0)
    }
    return (
        <>
            <div className={"container"}>
                <h2 className={"text-center mt-5 text-warning fw-bold text-decoration-underline"}>SUBJECTS</h2>
                <div className={"info"}>
                    <div className={"text-center py-4"}>
                        <Button color={"info"} outline onClick={() => handleShowModal()}>Add New</Button>
                    </div>
                    <div>
                        {showModal &&
                            <Modal isOpen={showModal} toggle={() => handleShowModal()}>
                                <form onSubmit={handleSubmit}>
                                    <ModalHeader style={{backgroundColor: "#347094"}}>SUBJECT</ModalHeader>
                                    <ModalBody style={{backgroundColor: "#4e86a9"}}>
                                        <label>
                                            Key:<input className={"ms-3"} type={"text"} value={key}
                                                       onChange={handleKeyChange} required/>
                                        </label>
                                        <br/><br/>
                                        <label>
                                            Name:<input className={"ms-3"} type={"text"} value={name}
                                                        onChange={handleNameChange} required/>
                                        </label>
                                        <br/><br/>
                                        <label>
                                            Theoretical Hours:<input className={"ms-3"} type={"number"} value={thours}
                                                                     onChange={handleThoursChange} required/>
                                        </label>
                                        <br/><br/>
                                        <label>
                                            Practical Hours:<input className={"ms-3"} type={"number"} value={phours}
                                                                   onChange={handlePhoursChange} required/>
                                        </label>
                                        <br/><br/>
                                        <label>
                                            Total Credits:<input className={"ms-3"} type={"number"} value={credits}
                                                                 onChange={handleCreditsChange} required/>
                                        </label>
                                    </ModalBody>
                                    <ModalFooter style={{backgroundColor: "#347094"}}>
                                        <Button color={"success"} type={"submit"}>{buttonSubmitText}</Button>
                                        <Button color={"danger"} onClick={() => handleCloseModal()}>Cancel</Button>
                                    </ModalFooter>
                                </form>
                            </Modal>
                        }
                    </div>
                    <div className={"mx-5 fondo-tabla border border-5 border-secondary rounded-5"}>
                        <Table className={"text-center table table-striped"}>
                            <thead>
                            <tr>
                                <th>#</th>
                                <th>KEY</th>
                                <th>NAME</th>
                                <th>THEORETICAL HOURS</th>
                                <th>PRACTICAL HOURS</th>
                                <th>TOTAL CREDITS</th>
                                <th></th>
                                <th></th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                subject.map((item, index: number) => (
                                    <tr className={"align-middle"}>
                                        <td>{index}</td>
                                        <td>{item.key}</td>
                                        <td>{item.name}</td>
                                        <td>{item.thours}</td>
                                        <td>{item.phours}</td>
                                        <td>{item.credits}</td>
                                        <td><Button color={"success"}
                                                    onClick={() => editElement(index)}>Edit</Button></td>
                                        <td><Button color={"danger"}
                                                    onClick={() => deleteElement(item.key)}>Delete</Button></td>
                                    </tr>
                                ))
                            }
                            </tbody>
                        </Table>
                    </div>
                </div>
            </div>
        </>
    );
}

function Careers() {
    const [key, setKey] = useState('')
    const [name, setName] = useState('')

    const handleKeyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setKey(event.target.value)
    }
    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value)
    }

    const careers: Array<{ key: string, name: string }> = []
    const [career, setCareer] = useState(careers)
    const [showModal, setShowModal] = useState(false)
    const handleShowModal = () => {
        setShowModal(true)
    }
    const handleCloseModal = () => {
        setShowModal(false)
        setButtonSubmitText('Add')
        setNull()
    }
    const [edit, setEdit] = useState(false)
    const [buttonSubmitText, setButtonSubmitText] = useState('Add')
    const [indexToEdit, setIndexToEdit] = useState(0)

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (edit === false) {
            setCareer([...career, {key: key, name: name}])
        } else {
            career[indexToEdit] = {...career[indexToEdit], key: key, name: name}
            setCareer(career)
            setButtonSubmitText('Add')
            setEdit(false)
        }
        setShowModal(false)
        setNull()
    }

    const deleteElement = (key: string) => {
        setCareer(career.filter(obj => obj.key !== key))
    }
    const editElement = (index: number) => {
        setKey(career[index].key)
        setName(career[index].name)
        setEdit(true)
        setButtonSubmitText('Edit')
        setIndexToEdit(index)
        handleShowModal()
    }
    const setNull = () => {
        setKey('')
        setName('')
    }
    return (
        <>
            <div className={"container"}>
                <h2 className={"text-center mt-5 text-warning fw-bold text-decoration-underline"}>CAREERS</h2>
                <div className={"fondo"}>
                    <div className={"text-center py-4"}>
                        <Button color={"info"} outline onClick={() => handleShowModal()}>Add New</Button>
                    </div>
                    <div>
                        {showModal &&
                            <Modal isOpen={showModal} toggle={() => handleShowModal()}>
                                <form onSubmit={handleSubmit}>
                                    <ModalHeader style={{backgroundColor: "#347094"}}>CARRER</ModalHeader>
                                    <ModalBody style={{backgroundColor: "#4e86a9"}}>
                                        <label>
                                            Key:<input className={"ms-3"} type={"text"} value={key}
                                                       onChange={handleKeyChange} required/>
                                        </label>
                                        <br/><br/>
                                        <label>
                                            Name:<input className={"ms-3"} type={"text"} value={name}
                                                        onChange={handleNameChange} required/>
                                        </label>
                                    </ModalBody>
                                    <ModalFooter style={{backgroundColor: "#347094"}}>
                                        <Button color={"success"} type={"submit"}>{buttonSubmitText}</Button>
                                        <Button color={"danger"} onClick={() => handleCloseModal()}>Cancel</Button>
                                    </ModalFooter>
                                </form>
                            </Modal>
                        }
                    </div>
                    <div className={"mx-5 fondo-tabla border border-5 border-secondary rounded-5"}>
                        <Table className={"text-center table table-striped"}>
                            <thead>
                            <tr>
                                <th>#</th>
                                <th>KEY</th>
                                <th>NAME</th>
                                <th></th>
                                <th></th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                career.map((item, index: number) => (
                                    <tr className={"align-middle"}>
                                        <td>{index}</td>
                                        <td>{item.key}</td>
                                        <td>{item.name}</td>
                                        <td><Button color={"success"}
                                                    onClick={() => editElement(index)}>Edit</Button></td>
                                        <td><Button color={"danger"}
                                                    onClick={() => deleteElement(item.key)}>Delete</Button></td>
                                    </tr>
                                ))
                            }
                            </tbody>
                        </Table>
                    </div>
                </div>
            </div>
        </>
    );
}