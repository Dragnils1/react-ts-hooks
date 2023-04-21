import React, { ChangeEvent, Suspense, useContext, useEffect, useState, useTransition } from "react";
import { Context } from "./Context";

interface ReqData { id: number, name: string, year: number, pantone_value: string, color: string }

const filterBySearch = (entities: ReqData[], search: string): ReqData[] => 
    entities.filter(item => item.name.includes(search))


const Admin: React.FC = () => {

    const [data, setData] = useState<ReqData[]>([]);
    const [repeatReq, setRepeactReq] = useState(false)
    const [countData, setCountData] = useState(0)
    const [search, setSearch] = useState('')
    const cont = useContext(Context)
    const [isPending, startTransition] = useTransition();

    const getData = async(returnable: boolean=false): Promise<ReqData | undefined> => {
        const response = await fetch("https://reqres.in/api/products/");
        const data = await response.json();
        console.log(data.data);
        
        startTransition(() => setData(data.data))

        if (returnable) return data.data 
    }

    const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value)
    }

    useEffect(() => {
        // here react using batching for asink actions
        setTimeout(() => {
            getData(true)
            setCountData(countData + 1)
        }, 500)
        
    }, [repeatReq])

    return(
        <>
            <h2>Enter kay words to filter array</h2>
            <input type="text" onChange={handleSearch} value={search}/>
            <h1>{isPending ? 'Lazy loading...' : 'Data:'}</h1>
            <ul>
                <Suspense fallback={<h1>Loading with suspence component ...</h1>} >
                    {filterBySearch(data, search).map((el) => {
                        return (
                            <li key={el.id} style={{color: el.color}}>
                                Name: {el.name}, age: {el.year}
                            </li>
                        )
                    })}
                </Suspense>
                
            </ul>
            <div>
                <span>Wanna take one more request?</span>
                <p>
                    {/* it will work even it is true or false and i kniw it */}
                    <button onClick={() => (setRepeactReq(!repeatReq))} style={cont}>Take it</button>
                    <span>You have taken {countData} queries (watch in console)</span>
                </p>
            </div>
            
        </>
    )
}


export default Admin