import React, { useState, useEffect } from 'react';
import Axios from 'axios';

const Home = (props) => {
    const [dataState, setDataState] = useState({ count: 0 });

    const plus = () => {
        setDataState({
            count: dataState.count + 1
        });
    }

    const minnus = () => {
        setDataState({
            count: dataState.count - 1
        });
    }

    const [userList, setUserList] = useState([]);

    function fetchUserData() {
        Axios.get("http://localhost:3001/api/user").then((Response) => {
            setUserList(Response.data);    
        })  
    }

    useEffect(() => {
        fetchUserData();
    }, [] );

    //Add user to database 
    const [Firstname, setFirstname] = useState()
    const [Lastname, setLastname] = useState()

    function newFirstname(event) {
        // console.log(event.target.value)
        setFirstname(event.target.value)
        console.log("Object " + JSON.stringify(Firstname) + "   " + JSON.stringify(Lastname));
    
    }
    function newLastname(event) {
        // console.log(event.target.value);
        setLastname(event.target.value);
        console.log("Object " + JSON.stringify(Firstname) + "   " + JSON.stringify(Lastname));
    }


    
    function addUser() {
        Axios.post("http://localhost:3001/api/user", {
            firstname : Firstname,
            lastname : Lastname
        }).then(res => {
            // fetchUserData();
            console.log(res)
        })
    }


    //delete User 
    const deleteUser = (id) => {
        Axios.delete("http://localhost:3001/api/user/"+id).then((res) => {
            setUserList(
                userList.filter((val) => {
                    return val.id !== id;
                })
            )
        })
    }
    
    const updateUser = (id) => {
        const dom = document.querySelector("div#n8epoV9Ar65DgzEMYxpB p.data-input");
        const dom1 = dom.getElementsByClassName(".data-input");
    }

    return (
        <div className="App container">
            <form className="mb-5 card col-6 p-5">
                <h3>Add User</h3>
                <div>
                    <label htmlFor="firstname">Firstname</label>
                    <input type="text" className="form-control" onChange={newFirstname}></input>
                </div>
                <div>
                    <label htmlFor="lastname">Lastname</label>
                    <input type="text" className="form-control" onChange={newLastname}></input>
                </div>
                <div className="mt-3">
                    <button className="btn btn-success btn-block" onClick={addUser}>Add</button>
                </div>
            </form>
            <div className="row">
                {userList.map((val, key) => (
                    <div key={key} id={val.id} className="col-4 mb-4">
                        <div className="card">
                            <div className="card-header">
                                <strong>No: {key}</strong>
                                <span className="float-right">
                                    <span className="btn-edit-user" onClick={() => updateUser(val.id)}>แก้ไข</span>
                                    &nbsp;&nbsp;&nbsp;&nbsp;
                                    <span className="btn-delete-user" onClick={() => deleteUser(val.id)}>ลบ</span>
                                </span> 
                                
                            </div>
                            <div className="card-body">
                                <p>ID: {val.id}  </p>
                                <p className="data-input">Firstname : {val.firstname}</p>
                                <p className="data-input">Lastname : {val.lastname}</p>
                            </div>

                        </div>
                        
                    </div>
                ))}
            </div>

            <h1>Product</h1>
            <div className="card m-5">
                <div className="card-header">
                    <h3>Bossza in bottle</h3>
                </div>
                <div className="card-body">
                    <h1>{dataState.count}</h1>
                </div>
                <div className="card-footer">
                    <span><button className="btn btn-success" onClick={plus}>เพิ่ม</button></span>
                    <span><button className="btn btn-danger" onClick={minnus}>ลด</button></span>
                </div>
            </div>
            
        </div>
    )
}

export default Home;