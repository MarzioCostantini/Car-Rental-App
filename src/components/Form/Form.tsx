import { useContext, useEffect, useState } from "react";
import Arrows from "../../assets/svg/Arrows";
import "./Form.css"
import { FormDataContext } from "../../Context/context";
import { FormDataInterface } from '../../FromData';

const Form = () => {
    const [locData, setLocData] = useState<string[]>([])

    const [picLoc, setPicLoc] = useState<string>("")

    const [picDate, setPicDate] = useState<string>("")
    const [dropDate, setDropDate] = useState<string>("")

    const [picTime, setPicTime] = useState<string>("")
    const [dropTime, setDropTime] = useState<string>("")

    // Import des Context
    const formContext = useContext(FormDataContext);


    // Fetch Locations
    useEffect(() => {
        fetch("https://raw.githubusercontent.com/MarzioCostantini/cars/main/vehicleLocations.json")
            .then(res => res.json())
            .then(data => setLocData(data))
            .catch(err => console.error(err))
    }, [])



    // schreib objekt in state mit allesn daten
    useEffect(() => {
        const formDataInput: FormDataInterface = {
            picUpLocation: picLoc,
            picUpDate: picDate,
            picUpTime: picTime,
            dropOffLocation: picLoc, // picLoc wird direkt als dropLoc verwendet
            dropOffDate: dropDate,
            dropOffTime: dropTime,
        }

        formContext?.setFormData(formDataInput)

    }, [picLoc, picDate, dropDate, picTime, dropTime])



    return (
        <section className="form">
            <article>

                <h5>Pickup</h5>
                <div className="inner">
                    <div>
                        <label htmlFor="loc">Location:</label>
                        <select name="loc" id="loc" onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setPicLoc(e.target.value)} value={picLoc} >
                            <option value="" disabled defaultValue={""} hidden>Please select</option>
                            {locData.map((item, index) => (
                                <option key={index} value={item}>{item}</option>
                            ))}
                        </select>
                    </div>
                    <div className="line"></div>
                    <div>
                        <label htmlFor="date">Date</label>
                        <input onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPicDate(e.target.value)} type="date" id="date" value={picDate} />
                    </div>
                    <div className="line"></div>
                    <div>
                        <label htmlFor="time">Time</label>
                        <input onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPicTime(e.target.value)} type="time" id="time" value={picTime} />
                    </div>

                </div>
            </article>
            <div>

                <Arrows />
            </div>
            <article>
                <h5>Drop-Off</h5>
                <div className="inner">
                    <div>
                        <label htmlFor="loc">Location:</label>
                        <select name="loc" id="loc" disabled value={picLoc} >
                            <option value="" disabled defaultValue={""} hidden>Please select</option>
                            {locData.map((item, index) => (
                                <option key={index} value={item}>{item}</option>
                            ))}
                        </select>
                    </div>
                    <div className="line"></div>
                    <div>
                        <label htmlFor="date">Date</label>
                        <input onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDropDate(e.target.value)} type="date" id="date" value={dropDate} />
                    </div>
                    <div className="line"></div>
                    <div>
                        <label htmlFor="time">Time</label>
                        <input onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDropTime(e.target.value)} type="time" id="time" value={dropTime} />
                    </div>

                </div>
            </article>
        </section>
    );
}

export default Form;
