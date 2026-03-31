import { useForm } from "../hooks/useForm";
import { useState } from "react";

function ChildForm() {

    const {values, handleChange, handleSubmit} = useForm({
        name: "",
        email: "",
        age: "",
    })
    const [show, setShow] = useState(false);

    const isInvalid = !values.name.trim() || !values.email.trim() || !values.email.includes('@');
    
    const [errors, setErrors] = useState({});

    const onSubmit = (vals) => {
        const newErrors = {};
        if (!vals.name.trim()) newErrors.name = "Имя обязательно";
        if (!vals.email.trim()) newErrors.email = "Email обязателен";
        setErrors(newErrors);
        if (Object.keys(newErrors).length === 0) console.log(vals);
    };

    return (
        <div>
            <h2 onClick={() => setShow(!show)}>Заполните анкету на вашего ребенка (жми сюда):</h2>
            <div className={show ? "form__content--show" : "form__content--hide"} data-testid="form-content">
            {/* // <form onSubmit={handleSubmit((vals => console.log(vals)))}> */}
            <form onSubmit={handleSubmit(onSubmit)}>
                <label htmlFor="name">Имя: </label>
                <input 
                id="name"
                type="text"
                name="name"
                value={values.name}
                onChange={handleChange}
                />
                {errors.name && <span style={{ color: 'red' }} role="alert">{errors.name}</span>}
                <br/>
                <label htmlFor="email">Email: </label>
                <input 
                id="email"
                type="text"
                name="email"
                value={values.email}
                onChange={handleChange}
                />
                {errors.email && <span style={{ color: 'red' }} role="alert">{errors.email}</span>}
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
                <button type="Submit" disabled={isInvalid}>Отправить</button>
            </form>
            </div>
        </div>
      );
}

export default ChildForm;