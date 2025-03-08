import React from "react"

const Header: React.FC = () => {

    const name = "Guest";

    return (
        <>
            <header className="flex justify-between">
                <div className="flex gap-2 text-lg font-semibold capitalize bg-amber-300 px-2 pr-4 py-1 rounded-lg">
                    <img src="" alt="" className="h-12 w-12 bg-white rounded-full" />
                    <div className="flex flex-col">
                        <p>hello</p>
                        <p>{name}</p>
                    </div>
                </div>
                <div className="text-lg font-bold">
                    <h2>websites name</h2>
                </div>
            </header>
        </>
    )
}

export default Header;