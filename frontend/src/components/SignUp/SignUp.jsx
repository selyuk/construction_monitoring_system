import { useState } from 'react';
import { Form, LabelForm, BtnForm, InputForm } from './SignUp.styled';
import { useNavigate } from 'react-router-dom';

export const SignUpForm = ({ signUp }) => {
  const [formData, setFormData] = useState({
    name: '',
    password: '',
    repeatPassword: '',
    username: '',
  });
  const navigate = useNavigate();
  const [errors, setErrors] = useState({
    name: '',
    password: '',
    repeatPassword: '',
    username: '',
  });

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = 'Ім\'я обов\'язкове';
    }
    if (!formData.username.trim()) {
      newErrors.username = 'Ім\'я користувача обов\'язкове';
    }
    if (!formData.password.trim()) {
      newErrors.password = 'Пароль обов\'язковий';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Пароль повинен містити принаймні 6 символів';
    }
    if (!formData.repeatPassword.trim()) {
      newErrors.repeatPassword = 'Повторіть пароль';
    } else if (formData.password !== formData.repeatPassword) {
      newErrors.password = 'Паролі не співпадають';
      newErrors.repeatPassword = 'Паролі не співпадають';
    }
    

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
    setErrors(prevErrors => ({
      ...prevErrors,
      [name]: '',
    }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (validateForm()) {
      signUp(formData);
    }
  };

  return (
    <Form onSubmit={handleSubmit} autoComplete="off">
      <LabelForm>
        Ім'я
        <InputForm
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
        {errors.name && <p style={{ color: 'red' }}>{errors.name}</p>}
      </LabelForm>
      <LabelForm>
        Ім'я Користувача
        <InputForm
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
        />
        {errors.username && <p style={{ color: 'red' }}>{errors.username}</p>}
      </LabelForm>
      <LabelForm>
        Пароль
        <InputForm
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          autoComplete="new-password"
        />
        {errors.password && <p style={{ color: 'red' }}>{errors.password}</p>}
      </LabelForm>
      <LabelForm>
        Повторіть пароль
        <InputForm
          type="password"
          name="repeatPassword"
          value={formData.repeatPassword}
          onChange={handleChange}
          autoComplete="new-password"
        />
        {errors.repeatPassword && (
          <p style={{ color: 'red' }}>{errors.repeatPassword}</p>
        )}
      </LabelForm>
      <BtnForm type="submit">Реєстрація </BtnForm>
      <BtnForm
        type="button"
        onClick={() => {
          navigate('/diploma_front/auth/login');
        }}
      >
        Сторінка авторизації
      </BtnForm>
    </Form>
  );
};
