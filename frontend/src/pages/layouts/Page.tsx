import React from "react";
import Button from "../components/Button"
import Dropdown from "../components/Dropdown"
import TimerComponent from "../components/Timer"

const Page : React.FC  = () => {

    const options = ["Option 1", "Option 2", "Option 3"];

    const handleSelect = (selectedOption: string) => {
    console.log("Selected:", selectedOption);
  };

    return (
        <>
            <section>
                <div>
                    <Button text = "hello world" color="blue" width="10rem" borderRadius="2px" />
                    <Dropdown options={options} onSelect={handleSelect} placeholder="Choose an option" />
                    <TimerComponent />
                </div>
            </section>
        </>
    )
}

export default Page;