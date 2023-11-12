import { useState } from "react"
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { assets } from "../../../../assets/Assets";
import { fetchRegister } from "../../../../redux/sliceRedux/SliceAuth";
import ValidInput from "./ValidInput";

export default function PostForm() {
    const [username, setUserName] = useState('');
    const [nickname, setNickName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [ConfirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate()
    const dispatch = useDispatch();

    const [ErrorMsg, setErrorMsg] = useState('');
    const [IsError, setIsError] = useState(false);

    const placeholderName = {
        UserName: "Username",
        NickName: "Nickname",
        Email: "E-mail",
        Password: "Password",
        ConfirmPassword: "Confirm Password"
    }

    async function RegisterPost() {
        const RegisterData = await dispatch(fetchRegister({
            username,
            nickname,
            email,
            password,
        }));

        if ('token' in RegisterData.payload) {
            localStorage.setItem('token', RegisterData.payload.token);
            navigate('/')
            setIsError(false)
        } else {
            setIsError(true)
            setErrorMsg(RegisterData.payload.ErrorMsg);
        }
    }
    return (
        <form className="SingUp_right_content" onSubmit={(event) => {
            event.preventDefault();
            RegisterPost(event)
        }}>
            <ValidInput
                Id={"Username"}
                Type={"text"}
                Value={username}
                Placehloder={placeholderName.UserName}
                ContorlInput={setUserName}
                GetStyle={{
                    backgroundImage: `url(${assets.SingUp.svg.User})`
                }}
            />

            <ValidInput
                Id={"nickname"}
                Type={"text"}
                UnderTpye={"nickname"}
                Value={nickname}
                Placehloder={placeholderName.NickName}
                ContorlInput={setNickName}
                GetStyle={{
                    backgroundImage: `url(${assets.SingUp.svg.User})`
                }}
            />
            {/* <input 
                type="text"
                value={username}
                onChange={(event) => {setUserName(event.target.value)}}
            /> */}
            {/* <label htmlFor="Username">
                <input
                    id="Username"
                    type="text" 
                    value={username}
                    placeholder={placeholderName.UserName}
                    onChange={(event) => {setUserName(event.target.value)}}
                    style={{
                        backgroundImage: `url(${assets.SingUp.svg.User})`
                    }}
                />
            </label>
            <label htmlFor="Nickname">
                    <input 
                        id="Nickname"
                        type="text"
                        value={nickname}
                        placeholder={placeholderName.NickName}
                        onChange={(event) => {setNickName(event.target.value)}}
                        style={{
                            backgroundImage: `url(${assets.SingUp.svg.User})`
                        }}
                    />
            </label>
            <label htmlFor="Email">
                <input
                    id="Email"
                    type="email" 
                    value={email}
                    placeholder={placeholderName.Email}
                    onChange={(event) => {setEmail(event.target.value)}}
                    style={{
                        backgroundImage: `url(${assets.SingUp.svg.Email})`
                    }}
                />

            </label>
            <label htmlFor="Password">
                <input
                    id="Password" 
                    type="password" 
                    value={password}
                    placeholder={placeholderName.Password}
                    onChange={(event) => {setPassword(event.target.value)}}
                    style={{
                        backgroundImage: `url(${assets.SingUp.svg.Password})`
                    }}
                />
            </label>
            <label htmlFor="Confirm_Password">
                <input
                    id="Confirm_Password"
                    type="password" 
                    value={ConfirmPassword}
                    placeholder={placeholderName.ConfirmPassword}
                    onChange={(event) => {setConfirmPassword(event.target.value)}}
                    style={{
                        backgroundImage: `url(${assets.SingUp.svg.Password})`
                    }}
                />
            </label> */}
            {IsError ? <span>*{ErrorMsg}</span> : null}

            <button >Create account</button>
        </form>
    )
}