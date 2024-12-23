import axios from 'axios'
import { useEffect } from 'react'
import { BASE_URL } from './utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addConnections } from './utils/connectionsSlice'

const Connections = () => {

    const connections = useSelector(store => store.connections)
    const dispatch = useDispatch();

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
        viewConnections()
    }, [])



    return (
        <div className='flex-col justify-center my-4 md:mb-24 mb-36'>
            <h1 className='text-3xl text-center my-6'>Connections</h1>
            {connections && (connections.length > 0 ? (
                connections.map((connection, index) => {
                    const { firstName, lastName, photoUrl, age, gender, about } = connection;
                    return (
                        <div key={index} className='flex justify-center mb-4'>
                            <div className="card card-side bg-base-100 shadow-xl w-[600px]">
                                <div className="avatar h-[100px] my-4 mx-2">
                                    <div className="w-24 rounded-full">
                                        <img src={photoUrl} alt="photo" />
                                    </div>
                                </div>
                                <div className="card-body ml-[-30px]">
                                    <h2 className="card-title">
                                        {firstName + " " + lastName}{age && <span>{", " + age}</span>}{gender && <span>{"(" + gender[0] + ")"}</span>}
                                    </h2>
                                    <p>{about}</p>
                                </div>
                            </div>
                        </div>
                    );
                })
            ) : (
                <div className='flex justify-center'>
                    <div className="card bg-base-100 w-96 shadow-xl">
                        <div className="card-body">
                            <h2 className="card-title text-center px-20">No Connections Found</h2>

                        </div>
                    </div>
                </div>
            ))}
        </div>
    );

}

export default Connections