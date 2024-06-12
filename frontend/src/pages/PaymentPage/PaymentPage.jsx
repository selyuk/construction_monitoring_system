import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import {
  cancelPayment,
  getPayment,
  payPayment,
} from '../../redux/Projects/operations';
import { selectPaymentInfo } from '../../redux/Projects/selectors';
import {
  CancelButton,
  FormWrapper,
  InputField,
  PaymentContainer,
  TransactionDetail,
  TransactionDetails,
  SubmitButton,
} from './PaymentPage.styled';
import moment from 'moment-timezone';

export const PaymentPage = () => {
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [cardHolder, setCardHolder] = useState('');
  const [error, setError] = useState('');
  const { project_id } = useParams();
  const navigate = useNavigate();
  const paymentInfo = useSelector(selectPaymentInfo);
  const dispatch = useDispatch();
// console.log(paymentInfo);
  const converTime = date => {
    if (!date) {
      return 'No Time';
    }

    const formattedTime = moment
      .unix(date)
      .tz('Europe/Kiev')
      .format('DD.MM.YYYY HH:mm');
    return formattedTime;
  };

  useEffect(() => {
    dispatch(getPayment(project_id));
  }, [dispatch, project_id, ]);

  const handleSubmit = e => {
    e.preventDefault();

    if (cardNumber.length !== 16) {
      setError('Номер карти повинен містити 16 цифр.');
      return;
    }

    if (!/^\d{2}\/\d{2}$/.test(expiryDate)) {
      setError('Срок дії повинен бути у форматі MM/YY.');
      return;
    }

    if (cvv.length !== 3) {
      setError('CVV повинен містити 3 цифри.');
      return;
    }

    if (!cardHolder) {
      setError("Ім'я власника карти є обов'язковим.");
      return;
    }

    setError('');
    dispatch(payPayment(project_id));
    alert('Сплачено');
    navigate('/diploma_front/');
  };

  return (
    <PaymentContainer>
      <FormWrapper onSubmit={handleSubmit}>
        <TransactionDetails>
          <TransactionDetail>{`Сума: ${
            paymentInfo && paymentInfo.price
          } грн`}</TransactionDetail>
          <TransactionDetail>{`Дата: ${
            paymentInfo && converTime(paymentInfo.creation_time)
          }`}</TransactionDetail>
          <TransactionDetail>{`ID Транзакції: ${
            paymentInfo && paymentInfo._id
          }`}</TransactionDetail>
        </TransactionDetails>

        <InputField
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          placeholder="Номер карти"
          value={cardNumber}
          onChange={e => setCardNumber(e.target.value)}
          maxLength={16}
          required
        />
        <InputField
          type="text"
          placeholder="Срок дії (MM/YY)"
          value={expiryDate}
          onChange={e => setExpiryDate(e.target.value)}
          pattern="\d{2}/\d{2}"
          maxLength={5}
          required
        />
        <InputField
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          placeholder="CVV"
          value={cvv}
          onChange={e => setCvv(e.target.value)}
          maxLength={3}
          required
        />
        <InputField
          type="text"
          placeholder="Ім'я власника"
          value={cardHolder}
          onChange={e => setCardHolder(e.target.value)}
          required
        />
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <SubmitButton type="submit">Сплатити</SubmitButton>
        <CancelButton
          type="button"
          onClick={() => {
            dispatch(cancelPayment(project_id));
            navigate('/diploma_front/');
          }}
        >
          Відміна
        </CancelButton>
      </FormWrapper>
    </PaymentContainer>
  );
};
