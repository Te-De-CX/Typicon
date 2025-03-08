import React from "react";

interface Leaders {
    id: number,
    username: string,
    score: number,
    img: string
}

const LeaderBoard: React.FC = () => {

    const leaders : Leaders[] = [
        {
            id:1,
            username:"taiwo",
            score: 122,
            img:"stings"
        },
        {
            id:2,
            username:"taiwo",
            score: 122,
            img:"stings"
        },
        {
            id:3,
            username:"taiwo",
            score: 122,
            img:"stings"
        },
        {
            id:4,
            username:"taiwo",
            score: 122,
            img:"stings"
        },
        {
            id:5,
            username:"taiwo",
            score: 122,
            img:"stings"
        },
        {
            id:6,
            username:"taiwo",
            score: 122,
            img:"stings"
        },
        {
            id:7,
            username:"taiwo",
            score: 122,
            img:"stings"
        },
        {
            id:8,
            username:"taiwo",
            score: 122,
            img:"stings"
        },
        {
            id:9,
            username:"taiwo",
            score: 122,
            img:"stings"
        },
        {
            id:10,
            username:"taiwo",
            score: 122,
            img:"stings"
        },
    ]

    return (
        <>
            <section className="flex gap-2 flex-col p-3 bg-amber-950 rounded-lg m-3" >
                <p className="text-xl text-white items-center w-full bg-amber-600 rounded-3xl py-1 justify-center flex" >LeaderBoard</p>
                {
                    leaders.map((info) => (
                        <div key={info.id} className=" flex gap-2 text-lg capitalize py-2 px-4 rounded-[3rem] items-center bg-gray-500" >
                            <div className="h-10 rounded-full bg-white w-10"></div>
                            <div>{info.username}</div>
                        </div>
                    ))
                }
            </section>
        </>
    )
}

export default LeaderBoard;