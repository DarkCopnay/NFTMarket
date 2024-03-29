import { AxiosInit } from "../../../../axios/axiosInit";
import { CardLayout } from "../../../Layout/CardLayout/CardLayout";
import { useEffect, useState } from "react";

export default function ProfilePageContent( {ProfileData} ) {
    const [data, setData] = useState();

    useEffect(() => {
        AxiosInit.get('/market')
        .then((res) => {
            setData(res.data);
        })
        .catch((err) => {
            console.log(err)
        })
    }, []);
    return (
        <section className="Profile_medium">
            {/* <header className="Profile_medium_header">
                <button>Created <span>{data ? console.log(" "): data.length}</span></button>
            </header> */}
            <section className="Profile_medium_content">
                {
                    !data ?
                    <h2>You don't own any nft</h2>
                    :
                    data.filter((UserData) => UserData.Author.username === ProfileData.username).map((data, index) => 
                        <CardLayout
                            key={index + 1}
                            _id={data._id}
                            _AuthorID={data.Author._id}
                            isNeedAuthor={false}
                            NFTname={data.title}
                            AuthorName={data.Author.nickname}
                            Data={data}
                            IsDelButton={true}
                            Price={data.price}
                        />
                    )
                }
            </section>
        </section>
    )
}