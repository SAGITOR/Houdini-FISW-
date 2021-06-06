import React, { useContext, useState, useEffect } from 'react';
//import { Redirect } from 'react-router-dom';
import './index.scss';
import { toast } from 'react-toastify';
import { userInformation, deleteToken, AuthContext } from '../../services';
//import { Link } from 'react-router-dom';
import './index.scss'

const Dashboard = (props) => {
    const { setCurrentUser } = useContext(AuthContext);
    const [information, setInformation] = useState(null);
    const [dataMeeting] = useState([{name:'1',date:'05-12-2019',link:'https://www.youtube.com/watch?v=OA_WriDCdWQ'},
                                                    {name:'2',date:'08-14-2064',link:'https://www.youtube.com/watch?v=8gQ6dAZDLhU'},
                                                    {name:'3',date:'04-16-20145',link:'https://www.youtube.com/watch?v=XZ5Uv4JKTU4'},
                                                    {name:'4',date:'08-14-2064',link:'https://www.youtube.com/watch?v=DNFeB_6WeIo'}])
    const [outPutDataMeeting, setOutPutDataMeeting] = useState([]);
    const [searchName, setSearchName] = useState('');

    useEffect( () => {
        setOutPutDataMeeting(dataMeeting);
    }, [dataMeeting])

    const meetingFilter = (eventTarget) =>{
        setSearchName(eventTarget.value);
        if(eventTarget.value !== ''){
            setOutPutDataMeeting(dataMeeting.filter(({name, date}) => name === eventTarget.value || date === eventTarget.value));
        }else{setOutPutDataMeeting(dataMeeting);}
    }

    const logOut = async () => {
        try {
            const result = await deleteToken();
            const nameOfWeb = '--name of web--';
            if (!result.hasError) {
                toast.success(`logged out from ${nameOfWeb}`);
                setCurrentUser(null);
                props.history.push(`/`);
            } else {
                console.log(result.error);
            }

        } catch (error) {
            toast.error('Error del servidor');
            console.log(error);
        }
    }

    const userInfo = async () => {
        try {
            const response = await userInformation();
            setInformation(response.data.name);
        } catch (error) {
            toast.error('Error ');
            console.log(error);
        }
    }

    return (
        <>
            <div className="row dasboard">
                <div className="dashboard-container">
                    <div className="card">
                        <input type='text' name = "searchName" value = {searchName} onChange = {(event) => meetingFilter(event.target)} placeholder="search name or date..."/>
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th scope="col">name meeting</th>
                                    <th scope="col">date</th>
                                    <th scope="col">link</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    outPutDataMeeting.map((meeting, index) => (
                                        <tr key={index}>
                                            <td>{meeting.name}</td>
                                            <td>{meeting.date}</td>
                                            <td><a href={meeting.link} target="_blank" rel="noreferrer">link meeting</a></td>
                                        </tr>
                                    ))   
                                }
                            </tbody>
                        </table>
                    </div>
                    <p>Dashboard</p>
                    <p>name: {information}</p>
                    <button onClick={() => logOut()}>Log Out</button>
                    <button onClick={() => userInfo()}>User info</button>
                </div>
            </div>
        </>
    )

}

export default Dashboard;