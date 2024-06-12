import styled from 'styled-components';

const PaymentContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f9f9f9;
  padding: 20px;
`;

const FormWrapper = styled.form`
  background-color: #ffffff;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 500px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const TransactionDetails = styled.div`
  background-color: #ececec;
  padding: 20px;
  border-radius: 10px;
  flex-direction: column;
  display: flex;
  gap: 5px;
  margin-bottom: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const TransactionDetail = styled.span`
  font-size: 16px;
  color: #333;
`;

const InputField = styled.input`
  padding: 15px;
  border: 1px solid #d9d9d9;
  border-radius: 5px;
  font-size: 16px;
  -moz-appearance: textfield;

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  &:focus {
    outline: none;
    border-color: #6f6f6f;
  }
`;

const SubmitButton = styled.button`
  padding: 15px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s ease, transform 0.2s ease,
    box-shadow 0.3s ease;
  &:hover {
    background-color: #45a049;
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
  &:active {
    background-color: #45a049;
    transform: translateY(1px);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }
  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
`;

const CancelButton = styled.button`
  padding: 15px;
  background-color: #f44336;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s ease, transform 0.2s ease,
    box-shadow 0.3s ease;
  &:hover {
    background-color: #e53935;
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
  &:active {
    background-color: #e53935;
    transform: translateY(1px);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }
`;

export {
  CancelButton,
  SubmitButton,
  InputField,
  FormWrapper,
  PaymentContainer,
  TransactionDetail,
  TransactionDetails,
};
