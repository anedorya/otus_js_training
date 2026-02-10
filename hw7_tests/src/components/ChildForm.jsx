import { useForm } from "../hooks/useForm";
import { useState } from "react";

function ChildForm() {

    const {values, handleChange, handleSubmit} = useForm({
        name: "",
        email: "",
        age: "",
    })
    const [show, setShow] = useState(false);

    return (
        <div>
            <h2 onClick={() => setShow(!show)}>Заполните анкету на вашего ребенка (жми сюда):</h2>
            <div className={show ? "form__content--show" : "form__content--hide"} >
            <form onSubmit={handleSubmit((vals => console.log(vals)))}>
                <label htmlFor="name">Имя: </label>
                <input 
                id="name"
                type="text"
                name="name"
                value={values.name}
                onChange={handleChange}
                />
                <br/>
                <label htmlFor="email">Email: </label>
                <input 
                id="email"
                type="text"
                name="email"
                value={values.email}
                onChange={handleChange}
                />
                <br/>
                <label htmlFor="age">Age:  </label>
                <input 
                id="age"
                type="text"
                name="age"
                value={values.age}
                onChange={handleChange}
                />
                <br/>
                <button type="Submit">Отправить</button>
            </form>
            </div>
        </div>
      );
}

export default ChildForm;