import React, {useState} from "react";
import {Link, Outlet, Route, Routes} from "react-router-dom";
import {Button, Modal, ModalHeader, ModalBody, ModalFooter, Table} from 'reactstrap';
import './style.css'

export default function Users() {
    return (
        <Routes>
            <Route path="/" element={<UsersLayout/>}>
                <Route index element={<UsersAlumns/>}/>
                <Route path="teachers" element={<UsersTeachers/>}/>
            </Route>
        </Routes>
    );
}

function UsersLayout() {
    return (
        <>
            <div className={"d-flex justify-content-around"}>
                <Link to="/users"><Button color={"warning"} outline>Alumns</Button></Link>
                <Link to="/users/teachers"><Button color={"warning"} outline>Teachers</Button></Link>
            </div>
            <Outlet/>
        </>
    );
}

function UsersAlumns() {
    const [id, setId] = useState('')
    const [name, setName] = useState('')
    const [career, setCareer] = useState('ISIC')
    const [imageUrl, setImageUrl] = useState('')

    const handleIdChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setId(event.target.value)
    }
    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value)
    }
    const handleCareerChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setCareer(event.target.value)
    }
    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        const reader = new FileReader()
        reader.addEventListener('load', () => {
            setImageUrl(reader.result as string)
        })
        if (file) {
            reader.readAsDataURL(file)
        }
    }

    const alumnos: Array<{ id: string, name: string, career: string, image: string }> = []
    const [alumn, setAlumn] = useState(alumnos)
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
        if (imageUrl === '') {
            alert('Select an Image')
        } else {
            if (edit === false) {
                setAlumn([...alumn, {id: id, name: name, career: career, image: imageUrl}])
            } else {
                alumn[indexToEdit] = {...alumn[indexToEdit], id: id, name: name, career: career, image: imageUrl}
                setAlumn(alumn)
                setButtonSubmitText('Add')
                setEdit(false)
            }
            setShowModal(false)
            setNull()
        }
    }

    const deleteElement = (id: string) => {
        setAlumn(alumn.filter(obj => obj.id !== id))
    }
    const editElement = (index: number) => {
        setId(alumn[index].id)
        setName(alumn[index].name)
        setCareer(alumn[index].career)
        setImageUrl(alumn[index].image)
        setEdit(true)
        setButtonSubmitText('Edit')
        setIndexToEdit(index)
        handleShowModal()
    }
    const setNull = () => {
        setId('')
        setName('')
        setCareer('ISIC')
        setImageUrl('')
    }
    return (
        <>
            <div className={"container"}>
                <h2 className={"text-center mt-5 text-warning fw-bold text-decoration-underline"}>ALUMNS</h2>
                <div className={"fondo"}>
                    <div className={"text-center py-4"}>
                        <Button color={"info"} outline onClick={() => handleShowModal()}>Add New</Button>
                    </div>
                    <div>
                        {showModal &&
                            <Modal isOpen={showModal} toggle={() => handleShowModal()}>
                                <form onSubmit={handleSubmit}>
                                    <ModalHeader style={{backgroundColor: "#347094"}}>ALUMN</ModalHeader>
                                    <ModalBody style={{backgroundColor: "#4e86a9"}}>
                                        <label>
                                            NC:<input className={"ms-3"} type={"number"} value={id}
                                                      onChange={handleIdChange} required/>
                                        </label>
                                        <br/><br/>
                                        <label>
                                            Name:<input className={"ms-3"} type={"text"} value={name}
                                                        onChange={handleNameChange} required/>
                                        </label>
                                        <br/><br/>
                                        <label>
                                            Career:
                                            <select className={"ms-3"} value={career} onChange={handleCareerChange}>
                                                <option value={"ISIC"}>ISIC</option>
                                                <option value={"Quimica"}>Quimica</option>
                                                <option value={"TICs"}>TICs</option>
                                                <option value={"Civil"}>Civil</option>
                                                <option value={"Industrial"}>Industrial</option>
                                                <option value={"Administracion"}>Administracion</option>
                                                <option value={"Mecatronica"}>Mecatronica</option>
                                                <option value={"Logistica"}>Logistica</option>
                                            </select>
                                        </label>
                                        <br/><br/>
                                        <input type={"file"} accept={"image/*"} onChange={handleImageUpload}/>
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
                                <th>NC</th>
                                <th>NAME</th>
                                <th>CAREER</th>
                                <th>IMAGE</th>
                                <th></th>
                                <th></th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                alumn.map((item, index: number) => (
                                    <tr className={"align-middle"}>
                                        <td>{index}</td>
                                        <td>{item.id}</td>
                                        <td>{item.name}</td>
                                        <td>{item.career}</td>
                                        <td><img src={item.image} width={"200px"} height={"100px"}
                                                 className={"border border-4 border-secondary rounded-pill"}
                                                 alt={"uploaded"}/></td>
                                        <td><Button color={"success"}
                                                    onClick={() => editElement(index)}>Edit</Button></td>
                                        <td><Button color={"danger"}
                                                    onClick={() => deleteElement(item.id)}>Delete</Button></td>
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

function UsersTeachers() {
    const [name, setName] = useState('')
    const [career, setCareer] = useState('ISIC')
    const [imageUrl, setImageUrl] = useState('')

    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value)
    }
    const handleCareerChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setCareer(event.target.value)
    }
    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        const reader = new FileReader()
        reader.addEventListener('load', () => {
            setImageUrl(reader.result as string)
        })
        if (file) {
            reader.readAsDataURL(file)
        }
    }
    const teachers: Array<{ name: string, career: string, image: string }> = []
    const [teacher, setTeacher] = useState(teachers)
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
        if (imageUrl === '') {
            alert('Select an Image')
        } else {
            if (edit === false) {
                setTeacher([...teacher, {name: name, career: career, image: imageUrl}])
            } else {
                teacher[indexToEdit] = {...teacher[indexToEdit], name: name, career: career, image: imageUrl}
                setTeacher(teacher)
                setButtonSubmitText('Add')
                setEdit(false)
            }
            setShowModal(false)
            setNull()
        }
    }

    const deleteElement = (name: string) => {
        setTeacher(teacher.filter(obj => obj.name !== name))
    }
    const editElement = (index: number) => {
        setName(teacher[index].name)
        setCareer(teacher[index].career)
        setImageUrl(teacher[index].image)
        setEdit(true)
        setButtonSubmitText('Edit')
        setIndexToEdit(index)
        handleShowModal()
    }
    const setNull = () => {
        setName('')
        setCareer('ISIC')
        setImageUrl('')
    }
    return (
        <>
            <div className={"container"}>
                <h2 className={"text-center mt-5 text-warning fw-bold text-decoration-underline"}>TEACHERS</h2>
                <div className={"fondo"}>
                    <div className={"text-center py-4"}>
                        <Button color={"info"} outline onClick={() => handleShowModal()}>Add New</Button>
                    </div>
                    <div>
                        {showModal &&
                            <Modal isOpen={showModal} toggle={() => handleShowModal()}>
                                <form onSubmit={handleSubmit}>
                                    <ModalHeader style={{backgroundColor: "#347094"}}>TEACHER</ModalHeader>
                                    <ModalBody style={{backgroundColor: "#4e86a9"}}>
                                        <label>
                                            Name:<input className={"ms-3"} type={"text"} value={name}
                                                        onChange={handleNameChange} required/>
                                        </label>
                                        <br/><br/>
                                        <label>
                                            Career:
                                            <select className={"ms-3"} value={career} onChange={handleCareerChange}>
                                                <option value={"ISIC"}>ISIC</option>
                                                <option value={"Quimica"}>Quimica</option>
                                                <option value={"TICs"}>TICs</option>
                                                <option value={"Civil"}>Civil</option>
                                                <option value={"Industrial"}>Industrial</option>
                                                <option value={"Administracion"}>Administracion</option>
                                                <option value={"Mecatronica"}>Mecatronica</option>
                                                <option value={"Logistica"}>Logistica</option>
                                            </select>
                                        </label>
                                        <br/><br/>
                                        <input type={"file"} accept={"image/*"} onChange={handleImageUpload}/>
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
                                <th>NAME</th>
                                <th>CAREER</th>
                                <th>IMAGE</th>
                                <th></th>
                                <th></th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                teacher.map((item, index: number) => (
                                    <tr className={"align-middle"}>
                                        <td>{index}</td>
                                        <td>{item.name}</td>
                                        <td>{item.career}</td>
                                        <td><img src={item.image} width={"200px"} height={"100px"}
                                                 className={"border border-4 border-secondary rounded-pill"}
                                                 alt={"uploaded"}/></td>
                                        <td><Button color={"success"}
                                                    onClick={() => editElement(index)}>Edit</Button></td>
                                        <td><Button color={"danger"}
                                                    onClick={() => deleteElement(item.name)}>Delete</Button></td>
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