import React, { useState } from 'react';

export function useForm(initial) {
  const [values, setValues] = useState(initial);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e) => {
    const {name, value} = e.target;
    setValues(prev => ({
      ...prev,
      [name]: value
    }))
  }
  
  const handleSubmit = callback => async (e) => {
    e.preventDefault();
    setIsSuccess(true);


    try {
      await callback(values);
      setValues(initial);
      alert('Форма успешно отправлена!');
    } catch (error) {
      console.error('Ошибка отправки:', error);
    } finally {
      setIsSuccess(false);
    }
  };

  return { values, handleChange, handleSubmit};
}

