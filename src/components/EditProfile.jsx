import { useState } from "react";
import UserCard from "./UserCard";
import { useDispatch } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";



const EditProfile = ({ user }) => {
    const dispatch = useDispatch();
    const errorField = ["about", "skills", "gender"]
    const [firstName, setFirstName] = useState(user.firstName);
    const [lastName, setLastName] = useState(user.lastName)
    const [photoURL, setPhotoURL] = useState(user.photoURL);
    const [gender, setGender] = useState(user.gender);
    const [age, setAge] = useState(user.age);
    const [skills, setSkills] = useState(user.skills);
    const [about, setAbout] = useState(user.about);
    const navigate = useNavigate();

    const [error, setError] = useState("")
    const [showToast, setShowToast] = useState(false)
    const editProfile = async () => {
        setError("")
        try {
            const res = await axios.patch(BASE_URL + "/profile/edit", {
                firstName: firstName,
                lastName: lastName,
                photoURL: photoURL,
                gender: gender,
                age: age,
                skills: skills,
                about: about

            }, { withCredentials: true })

            dispatch(addUser(res.data.data))
            setShowToast(true)
            setTimeout(() => {
                setShowToast(false)
            }, 3000)

        }
        catch (err) {
            errorField.forEach(field => {
                const errorMessage = err?.response?.data?.details?.[field]?.message;
                if (errorMessage) {
                    setError(errorMessage);
                }
            });
            console.log(err);
        }

    }



    return (


        <div className="md:flex md:justify-center md:items-center flex-row justify-center items-center md:my-16 mt-12 mb-10 overflow-y-scroll  ">
            
            <div className='card bg-base-100 w-96 shadow-xl    mb-10  md:mx-8 mx-1 '>
                <div className="card-body">
                    <h2 className="card-title  justify-center mb-8">Edit Profile</h2>
                    <div>
                        <label className="input input-bordered flex items-center gap-4 mb-4">
                            First Name
                            <input type="text" className="grow" placeholder="FirstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                        </label>
                        <label className="input input-bordered flex items-center gap-4 mb-4">
                            Last Name
                            <input type="text" className="grow" placeholder="LastName" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                        </label>
                        <div className="flex gap-4 mb-4">
                            <label className="input input-bordered flex items-center gap-3 grow">
                                Gender
                                <select
                                    className="grow w-[55px]"
                                    value={gender || ""}
                                    onChange={(e) => setGender(e.target.value)}
                                >
                                    <option value="" disabled>
                                        Select Gender
                                    </option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="Other">Other</option>
                                </select>
                            </label>
                            <label className="input input-bordered flex items-center gap-2 grow">
                                Age
                                <select
                                    className="grow w-[50px]"
                                    value={age || ""}
                                    onChange={(e) => setAge(e.target.value)}
                                >
                                    <option value="" disabled>
                                        Select Age
                                    </option>
                                    {Array.from({ length: 100 }, (_, i) => i + 18).map((ageValue) => (
                                        <option key={ageValue} value={ageValue}>
                                            {ageValue}
                                        </option>
                                    ))}
                                </select>
                            </label>
                        </div>

                        <label className="input input-bordered flex items-center gap-4 mb-4">
                            Photo URL
                            <input type="text" className="grow" placeholder="Photo URL" value={photoURL} onChange={(e) => setPhotoURL(e.target.value)} />
                        </label>
                        <label className="input input-bordered flex items-center gap-14 mb-4">
                            Skills
                            <input type="text" className="grow" placeholder="Skills" value={skills} onChange={(e) => setSkills(e.target.value)} />
                        </label>
                        <label className="form-control">
                            <div className="label">
                                <span className="label-text text-[16px]">About</span>

                            </div>
                            <textarea className="textarea textarea-bordered h-24 " placeholder="About" value={about} onChange={(e) => setAbout(e.target.value)}></textarea>

                        </label>




                    </div>
                    <p className="text-red-500">{error}</p>
                    <div className="card-actions justify-center">
                        <button className="btn btn-primary px-8" onClick={editProfile}>Save Profile</button>
                    </div>
                </div>
                {showToast && <div className="toast toast-top toast-end mt-14 z-10">

                    <div className="alert alert-success">
                        <span className="text-white">Profile Edited Successfully!</span>
                    </div>
                </div>}

            </div>
            <div className="">
                <UserCard user={user} disabled={true} />
            </div>

        </div>

    )
}

export default EditProfile