import React from "react";
import Layers from "../components/Layers";

const Clocks: React.FC = () => {

    const styling = "font-semibold bg-[#854836] px-3 py-2 w-full text-white"

    return (
        <>
            <section className="flex gap-4 flex-col" >
                <Layers text="08:26:23" stylings={styling}  />
                <Layers text="01:00:00" stylings={styling}  />
                <Layers text="Highest score : 300" stylings={styling}  />
            </section>
        </>
    )
}

export default Clocks;