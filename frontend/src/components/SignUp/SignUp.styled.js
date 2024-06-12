import styled from 'styled-components';

const Form = styled.form`
  width: 400px;
  position: absolute;
  top: 30%;
  left: 40%;
  background-color: #d9d9d9;
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const LabelForm = styled.label`
  display: block;
  margin-bottom: 10px;
  color: #000000;
  font-size: 16px;
  font-weight: bold;
`;

const InputForm = styled.input`
  width: 100%;
  padding: 8px;

  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
`;

const BtnForm = styled.button`
  background-color: #8f8f8f;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  width: 100%;
  cursor: pointer;
  transition: background-color 0.5s ease, transform 0.3s ease,
    box-shadow 0.3s ease;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  &:hover {
    background-color: black;
    transform: translateY(-2px) scale(1.05);
    box-shadow: 0 8px 12px rgba(0, 0, 0, 0.2);
  }
`;

export { BtnForm, InputForm, LabelForm, Form };
