import { useForm } from "../hooks/useForm";
import { useState } from "react";

function UserForm() {

    const {values, handleChange, handleSubmit} = useForm({
        name: "",
        email: "",
        age: "",
    })
    const [show, setShow] = useState(false);

    return (
        <div>
            <h2 onClick={() => setShow(!show)}>Заполните свою анкету (жми сюда):</h2>
            <div className={show ? "form__content--show" : "form__content--hide"} >
            <form onSubmit={handleSubmit((vals => console.log(vals)))}>
                <input 
                type="text"
                name="name"
                value={values.name}
                onChange={handleChange}
                placeholder="Name"
                />
                <br/>
                <input 
                type="email"
                name="email"
                value={values.email}
                onChange={handleChange}
                placeholder="Email"
                />
                <br/>
                <input 
                type="text"
                name="age"
                value={values.age}
                onChange={handleChange}
                placeholder="Age"
                />
                <br/>
                <button type="Submit">Отправить</button>
            </form>
        </div>
        </div>
      );
}

export default UserForm;