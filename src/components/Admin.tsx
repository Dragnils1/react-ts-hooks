import React, { useContext, useEffect, useState } from "react";
import { Context } from "./Context";

interface ReqData { id: number, name: string, year: number, pantone_value: string, color: string }

const Admin: React.FC = () => {

    const [data, setData] = useState<ReqData[]>([]);
    const [repeatReq, setRepeactReq] = useState(false)
    const cont = useContext(Context)

    const getData = async() => {
        const response = await fetch("https://reqres.in/api/products/");
        const data = await response.json();
        console.log(data.data);
        
        setData(data.data)
    }

    useEffect(() => {
        getData()
    }, [repeatReq])

    return(
        <>
            <h1>Data:</h1>
            <ul>
                {data.map((el) => {
                    return (
                        <li key={el.id} style={{color: el.color}}>
                            Name: {el.name}, age: {el.year}
                        </li>
                    )
                })}
            </ul>
            <div>
                <span>Wanna take one more request?</span>
                <p>
                    {/* it will work even it is true or false and i kniw it */}
                    <button onClick={() => (setRepeactReq(!repeatReq))} style={cont}>Take it</button>
                </p>
            </div>
            
        </>
    )
}


export default Admin