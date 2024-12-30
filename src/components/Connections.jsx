import axios from 'axios'
import { useEffect, useState } from 'react'
import { BASE_URL } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addConnections } from '../utils/connectionsSlice'
import UserCard from './UserCard'

const Connections = () => {

    const connections = useSelector(store => store.connections)
    const dispatch = useDispatch();

    const [selectedUser, setSelectedUser] = useState(null); // State to store the selected user's details

    const openModal = (user) => {
        setSelectedUser(user); // Set the selected user when a card is clicked
        document.getElementById('my_modal_5').showModal(); // Open the modal
    };



    const viewConnections = async () => {
        try {
            const res = await axios.get(BASE_URL + "/user/requests/connected", { withCredentials: true });
            dispatch(addConnections(res.data.data));

        }
        catch (err) {
            console.log(err);
        }

    }

    useEffect(() => {
       !connections && viewConnections()
    }, [])

    console.log(selectedUser)

    return (
        <div className='flex-col justify-center my-4 md:mb-24 mb-36' >
            <h1 className='text-3xl text-center my-6'>Connections</h1>
            {connections && (connections.length > 0 ? (
                connections.map((connection, index) => {
                    const { firstName, lastName, photoURL, age, gender, about } = connection;
                    return (
                        <div key={index} className='flex justify-center mb-4' >
                            <div className="card card-side bg-base-100 shadow-xl w-[600px] cursor-default" onClick={() => openModal(connection)}>
                                <div className="avatar h-[100px] my-4 mx-2">
                                    <div className="w-24 rounded-full">
                                        <img src={photoURL} />
                                    </div>
                                </div>
                                <div className="card-body ml-[-30px]">
                                    <h2 className="card-title">
                                        {`${firstName} ${lastName}`}
                                        {age && `, ${age}`}
                                        {gender && ` (${gender[0]})`}
                                    </h2>
                                    <p>{about}</p>
                                </div>
                            </div>


                            <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle py-16 mt-0   ">
                                <div className="modal-box pb-4 p-0 md:pt-8  ">
                                    {selectedUser && (
                                        <div className='w-64 md:w-96 md:px-[10%]'>
                                            <UserCard user={selectedUser} disabled={true} />
                                        </div>
                                    )}
                                    <div className="modal-action flex justify-center">
                                        <form method="dialog">
                                            {/* if there is a button in form, it will close the modal */}
                                            <button className="btn">Close</button>
                                        </form>
                                    </div>
                                </div>
                            </dialog>
                        </div>
                    );
                })
            ) : (
                <div className='flex justify-center'>
                <div className="card bg-base-100 md:w-1/2 w-full mx-4  shadow-xl">
                    <div className="card-body flex justify-center items-center">
                        <h2 className="card-title text-center ">No Connections Found</h2>

                    </div>
                </div>
                </div>
            ))}
        </div>
    );

}

export default Connections