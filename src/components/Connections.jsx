
import { useEffect, useState } from 'react'
import { BASE_URL } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addConnections } from '../utils/connectionsSlice'
import axiosInstance from '../context/AuthInterceptor'
import { useNavigate } from 'react-router-dom'

const Connections = () => {

    const connections = useSelector(store => store.connections)
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [selectedUser, setSelectedUser] = useState(null); // Ensure initial value is null

    const openModal = (user) => {
        setSelectedUser(user); // Set the selected user
    };

    useEffect(() => {
        if (selectedUser) {
            const modal = document.getElementById('my_modal_2');
            if (modal) {
                modal.showModal(); // Show the modal
            }
        }
    }, [selectedUser]);


    const viewConnections = async () => {
        try {
            const res = await axiosInstance.get(BASE_URL + "/user/requests/connected", { withCredentials: true });
            dispatch(addConnections(res.data.data));

        }
        catch (err) {
            console.log(err);
        }

    }

    useEffect(() => {
        viewConnections()
    }, [])

    const handleConnectionClick = (sender) => {
        navigate("/message/" + sender._id)
        // dispatch(senderProfile(sender));
    }

    return (
        <div className='flex-col justify-center my-4 md:mb-24 mb-36 mx-2 md:mx-0' >
            <h1 className='text-3xl text-center my-6'>Connections</h1>
            {connections && (connections.length > 0 ? (
                connections.map((connection, index) => {
                    const { firstName, lastName, photoURL, age, gender, about, skills } = connection;
                    return (
                        <div key={index} className='flex justify-center mb-4' >
                            <div className="card card-side bg-base-100 shadow-xl md:w-1/2 w-full cursor-default " onClick={() => openModal(connection)}>
                                <div className="avatar   my-4 mx-2">
                                    <div className="w-12 h-12 rounded-full">
                                        <img src={photoURL} />
                                    </div>
                                </div>
                                <div className="card-body ml-[-30px] mt-[-20px]">
                                    <h2 className="md:text-xl text-lg font-bold">
                                        {`${firstName} ${lastName}`}
                                        {age && `, ${age}`}
                                        {gender && `(${gender[0]})`}
                                    </h2>
                                    <p className='truncate md:w-[600px]  w-[280px] mt-[-10px] text-sm md:text-lg'>{about}</p>
                                    <button className='btn btn-primary md:w-[100px] w-[70px] mb-[-20px] text-md md:text-md ' onClick={() => handleConnectionClick(connection)}>Connect</button>
                                </div>
                            </div>


                            {/* Open the modal using document.getElementById('ID').showModal() method */}
                            {selectedUser && <dialog id="my_modal_2" className="modal">
                                <div className="modal-box md:w-6/12 w-11/12 max-w-5xl ">
                                    <div className="hero bg-base-200 ">
                                        <div className="hero-content flex-col lg:flex-row">
                                            <img
                                                src={selectedUser.photoURL}
                                                className="max-w-sm rounded-lg shadow-2xl" />
                                            <div>
                                                <h1 className="md:text-3xl text-xl font-bold">
                                                    {`${selectedUser.firstName} ${selectedUser.lastName}`}
                                                    {selectedUser.age && `, ${selectedUser.age}`}
                                                    {selectedUser.gender && `(${selectedUser.gender[0]})`}
                                                </h1>
                                                <p className="pt-6">
                                                    <span className='font-bold'>About: </span>{selectedUser.about}
                                                </p>
                                                <p className="py-4">
                                                    <span className='font-bold'>Sills: </span>{selectedUser.skills}
                                                </p>
                                                <div className='flex md:ml-[170px] md:block justify-center'>
                                                    <button className="btn btn-primary " onClick={() => { document.getElementById('my_modal_2').close(); setSelectedUser(null) }}>close</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <form method="dialog" className="modal-backdrop">
                                    <button onClick={() => setSelectedUser(null)}>close</button>
                                </form>
                            </dialog>}
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