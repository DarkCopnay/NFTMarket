import { useState, useEffect, useRef } from "react";
import { useParams, NavLink, useNavigate } from "react-router-dom";
import { assets } from "../../../assets/Assets";
import { jwtDecode } from "jwt-decode";
import { motion } from "framer-motion";
import { AxiosInit, UploadFile } from "../../../axios/axiosInit";
import ProfilePageContent from "./components/ProfilePageContent";


export default function ProfilePage() {
    const navigate = useNavigate();
    const token = window.localStorage.getItem("token");
    const [IsLoading, setIsLoading] = useState(true);
    const [IsEditMode, SetIsEditMode] = useState(false);
    const [data, setData] = useState();
    const FileInputRef = useRef(null);
    const [NewDataForm, setNewDataFrom] = useState({
        NewName: undefined,
        NewAvatar: "",
        NewBio: undefined,
        DiscordLink: undefined,
        YouTubeLink: undefined,
        TwitterLink: undefined,
        InstagramLink: undefined,
    })

    const ContorlInput = (event) => {
        setNewDataFrom((data) => ({
            ...data,
            [event.target.name]: event.target.value
        }))
    }

    const { id } = useParams();

    useEffect(() => {
         AxiosInit.get(`profile/${id}`)
        .then(async (res) => {
            const response = await res.data;
            setData(response)
            setIsLoading(false);
        })
        .catch((err) => {
            console.log(err);
        })
        
    }, [])

    function ButtonEditMode() {
        SetIsEditMode(true);
        if (IsEditMode) {
            SetIsEditMode(false);
        }
    }

    async function UploadProfile(event) {
        event.preventDefault();

        AxiosInit.patch(`/profile/${id}/edit`, {
            nickname: NewDataForm.NewName,
            Bio: NewDataForm.NewBio
        })
    }


    function OnlyUserAuthRender() {
        if (token) {
            const decodeToken = jwtDecode(token)._id;
            if (decodeToken === id) {
                return (
                    <>
                        <NavLink to={`/market/create`}>Create NFT</NavLink>
                        <button onClick={ButtonEditMode}>{IsEditMode ? "Edit Off" : "Edit"}</button>
                        <button className="Logout" onClick={onLogout}>Logout</button>
                    </>
                )
            } else {
                return (
                    <button><span className="material-symbols-outlined">add</span>Follow</button>
                )
            }
        } else {
            return (
                <button><span className="material-symbols-outlined">add</span>Follow</button>
            )
        }

        function onLogout() {
            window.localStorage.removeItem('token');
            navigate('/')
        }
    }

    return (
        <>
            {
                IsLoading ? <h2>Profile Loading...</h2>
                :
                data.ErrorMsg ? navigate("/404")
                :
                <section className="Profile">
                    <section className="Profile_header_BG">
                    </section>
                    <header className="Profile_header">
                        <form className="Profile_header_left">

                        
                        {
                            !IsEditMode ?
                            <section className="Profile_Avatar" style={{backgroundImage: !data.avatarURL ? `url(${assets.Profile.NonAvatar})` : `url(${data.avatarURL})`}}></section>
                            :
                            <section className="Profile_Avatar" style={{backgroundImage: !NewDataForm.NewAvatar ? `url(${assets.Profile.NonAvatar})` : `url(${NewDataForm.NewAvatar})`}}>
                                {
                                    IsEditMode ?
                                    <section className="Profile_Avatar_blur">
                                        <input type="file" ref={FileInputRef} id="AvatarPhoto" name="NewAvatar" style={{display: "none"}} onChange={ContorlInput} accept="image/*"/>
                                        <label htmlFor="AvatarPhoto">
                                            <h3>Photo</h3>
                                        </label>
                                    </section>
                                    :
                                    null
                                }
                            </section>
                        }
                            {
                                IsEditMode ? <input type="text" name="NewName" defaultValue={data.nickname} onChange={ContorlInput}/> 
                                :
                                <h2>{data.nickname} {data.verify ? <span contextMenu="User verifed" className="material-symbols-outlined">verified</span>: null}</h2>
                            }
                            <ul className="Profile_header_left_stat_box">
                                <li>
                                    <h3>0</h3>
                                    <span>Volume</span>
                                </li>
                                <li>
                                    <h3>0</h3>
                                    <span>NFTs Create</span>
                                </li>
                                <li>
                                    <h3>{data.stat.followers}</h3>
                                    <span>Followers</span>
                                </li>
                            </ul>

                            <section className="Profile_header_left_bio">
                                <h3>Bio</h3>
                                {
                                    data.Bio == "" ?
                                    IsEditMode ? null : <span>Bio not found</span>
                                    :
                                    IsEditMode ? null : <p>{data.Bio}</p>
                                }
                                {
                                    IsEditMode ?
                                        <textarea name="NewBio" defaultValue={data.Bio} onChange={ContorlInput}></textarea>
                                    :
                                    null
                                }
                            </section>

                            {
                                data.social.DiscordLink == "#" &&
                                data.social.YouTubeLink == "#" &&
                                data.social.TwitterLink == "#" &&
                                data.social.InstagrmLink == "#"
                                ?
                                null
                                :
                                <section className="Profile_header_left_social">
                                <h3>Links</h3>
                                <section>
                                    {
                                        data.social.DiscordLink == "#" ? 
                                        null 
                                        :
                                        <a href={data.social.DiscordLink} target="_blank">
                                            <img src={assets.SocialLogo.Discord} alt="Discord"/>
                                        </a>
                                    }
                                    {
                                        data.social.YouTubeLink == "#" ?
                                        null
                                        :
                                        <a href={data.social.YouTubeLink} target="_blank">
                                            <img src={assets.SocialLogo.YouTube} alt="YouTube"/>
                                        </a>
                                    }
                                    {
                                        data.social.TwitterLink == "#" ?
                                        null
                                        :
                                        <a href={data.social.TwitterLink} target="_blank">
                                            <img src={assets.SocialLogo.Twitter} alt="Twitter"/>
                                        </a>
                                    }
                                    {
                                        data.social.InstagrmLink == "#" ?
                                        null
                                        :
                                        <a href={data.social.InstagrmLink} target="_blank">
                                            <img src={assets.SocialLogo.Instagram} alt="Instagram"/>
                                        </a>
                                    }
                                </section>
                            </section> 
                            }
                            {
                                IsEditMode ? 
                                <section className="Profile_Button_Save">
                                    <motion.button onClick={UploadProfile} whileHover={{
                                        backgroundColor: "rgb(11, 171, 11)",
                                    }}>Save</motion.button>
                                    <motion.button  whileHover={{
                                        backgroundColor: "rgb(231, 9, 9)",
                                    }}>Cancel</motion.button>
                                </section>
                                :
                                null
                            }
                        </form>
                        <section className="Profile_header_right">
                            <OnlyUserAuthRender/>
                        </section>
                    </header>
                    <ProfilePageContent ProfileData={data}/>
                </section>
            }
        </>
    )
}