import { useState, useEffect, useContext, useRef } from "react"
import { AxiosInit } from "../../../../axios/axiosInit";
import { FormContext } from "./PostForm";


export default function ValidInput( {Id, Type, UnderTpye, Value, Placehloder, GetStyle, ContorlInput, isDobule} ) {
    const [data, setData] = useState();
    const [dataEmail, setDataEmail] = useState();
    const [IsError, setIsError] = useState(false);
    const [ErrorMsg, setErrorMsg] = useState("");
    const ErrorRefInput = useRef();
    const GetValue = useContext(FormContext);


    useEffect(() => {
        AxiosInit.get("/users")
            .then(async (res) => {
                const responseData = await res.data;

                responseData.map(async (data) => {
                    const dataAwn = await data
                    setData(dataAwn);
                });

                setDataEmail(responseData);

            })
    
            .catch((err) => {
                console.error(err);
            })

            if (GetValue) {
                Validation();
            }
    }, [GetValue])

    const Validation = () => {
        if (Value === "") {
            setIsError(true);
            setErrorMsg("Field is empty");

        } else {
            setIsError(false);
        }
        
        function TextValid() {
            function NicknameValid() {
                if (Value.length >= 1 && Value.length < 4) {
                    setIsError(true);
                    setErrorMsg(`Nickname must be longer than 8 symbols.`)
                }

                if (!data) {
                    console.log("");
                } else {
                    if (Value === data.nickname) {
                        setIsError(true);
                        setErrorMsg(`That's the nickname already in use`)
                    }
                }

            }

            function UsernameValid() {
                if (Value.length > 1 && Value.length < 4) {
                    setIsError(true);
                    setErrorMsg(`Username must be longer than 8 symbols.`)
                }

                if (!data) {
                    console.log("");
                } else {
                    if (Value === data.username) {
                        setIsError(true);
                        setErrorMsg(`That's the nickname already in use`)
                    }
                }
            }


            switch (UnderTpye) {
                case "nickname":
                     NicknameValid();
                     break;

                case "username":
                    UsernameValid();
                    break;
            }
        }


        function EmailValid() {
            const EmailRegax = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

            if (Value === "") {
                setIsError(true);
                setErrorMsg("Field is empty");
    
            } else {
                if (EmailRegax.test(Value)) {
                    setIsError(false);
                } else {
                    setIsError(true);
                    setErrorMsg("Invalid water email")
                }
            }

            dataEmail.map((data) => {
                if (!data) {
                console.log("")
                } else {
                    if (Value === data.email) {
                        setIsError(true);
                        setErrorMsg("The email is already in use.");
                    }
                }
            })
        }

        function PasswordValid() {
            if (Value === "") {
                setIsError(true);
                setErrorMsg("Field is empty");
    
            } else {
                if (Value.length < 8) {
                    setIsError(true);
                    setErrorMsg("Password must be more than 8 characters")
                }
            } 
        }

        switch (Type) {
            case "text":
                TextValid();
                break;
            
            case "email":
                EmailValid();
                break;
            
            case "password":
                PasswordValid();
                break;
                
        }
    }

    return (
        <label htmlFor={Id}>
            <input 
                id={Id}
                name={Id}
                type={Type}
                value={Value}
                placeholder={Placehloder}
                onChange={ContorlInput}
                style={GetStyle}
                ref={ErrorRefInput}
            />

            {IsError ? <span>*{ErrorMsg}</span>: null}
        </label>
    )
}