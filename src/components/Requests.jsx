import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { addRequests, removeRequests } from "../utils/requestsSlice";
import { useEffect } from "react";


const Requests = () => {

    const requests = useSelector(store => store.requests)

    const dispatch = useDispatch();

    const viewRequests = async () => {
        try {
            const res = await axios.get(BASE_URL + "/user/requests/received", { withCredentials: true });
            dispatch(addRequests(res?.data?.data));

        }
        catch (err) {
            console.log(err);
        }

    }

    useEffect(() => {
       !requests && viewRequests()
    }, [])

    const approveRequest = async (status, _id) => {
        try {
            await axios.post(BASE_URL + "/request/review/" + status + "/" + _id, {}, { withCredentials: true });
            dispatch(removeRequests(_id));
        }
        catch (err) {
            console.log(err);
        }


    }


    return (

        <div className='flex-col justify-center my-4 md:mb-24 mb-36 '>
            <h1 className='text-3xl text-center my-6'>Requests</h1>
            {requests && (requests.length > 0 ? requests.map((request) => {
                const { firstName, lastName, photoURL, age, gender, about } = request.fromUserId;
                return (
                    <>
                        <div key={request._id} className='flex justify-center items-center  '>
                            <div className="card card-side bg-base-100 shadow-xl  w-[600px] my-2">

                                <div className="avatar h-[100px]  my-4 mx-2">
                                    <div className="w-24 rounded-full">
                                        <img src={photoURL} />
                                    </div>
                                </div>

                                <div className="card-body ml-[-30px] mt-[-15px]">
                                    <h2 className="card-title">
                                        {`${firstName} ${lastName}`}
                                        {age && `, ${age}`}
                                        {gender && ` (${gender[0]})`}
                                    </h2>
                                    <p>{about}</p>
                                    <div className="flex ">
                                        <button className="mr-2  btn bg-black text-white" onClick={() => approveRequest("accepted", request._id)}>Accept</button>
                                        <button className="btn btn-secondary mr-2 " onClick={() => approveRequest("rejected", request._id)}>Reject</button>
                                    </div>

                                </div>

                            </div>

                        </div>
                    </>)


            }) : <div className='flex justify-center'>
                <div className="card bg-base-100 md:w-1/2 w-full mx-4  shadow-xl">
                    <div className="card-body flex justify-center items-center">
                        <h2 className="card-title text-center ">No Requests Found</h2>

                    </div>
                </div>
            </div>)}
        </div>
    )
}

export default Requests