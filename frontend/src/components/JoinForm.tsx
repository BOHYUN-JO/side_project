import React, { useCallback, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { NATIONAL_TAX_SERVICE_STATUS_API_URL } from '../api';
import { IForm } from '../types/join';
import {
  SUCCESS_AUTHENTICATION_BUSINESSNUMBER,
  SHUTDOWN_BUSINESSNUMBER,
  CLOSURE_BUSINESSNUMBER,
  NOT_CORRECT_PASSWORD_MESSAGE,
  SUCCESS_AUTHENTICATION_BUSINESSNUMBER_MESSAGE,
  SHUTDOWN_BUSINESSNUMBER_MESSAGE,
  INVALID_BUSINESSNUMBER_MESSAGE,
  EMAIL_REQUEST_MESSAGE,
  NICKNAME_REQUEST_MESSAGE,
  PASSWORD_REQUEST_MESSAGE,
  PASSWORD_RE_REQUEST_MESSAGE,
  PHONENUMBER_REQUEST_MESSAGE,
  BUSINESSNUMBER_REQUEST_MESSAGE,
} from '../utils/JoinConstants';

const JoinForm = () => {
  const navigate = useNavigate();

  const [isChecked, setIsChecked] = useState(false);
  const [confirmBusinessNumber, setConfirmBusinessNumber] = useState(false);
  const [businessNumber, setBusinessNumber] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    setValue,
  } = useForm<IForm>();

  const JoinMutation = useMutation(
    ({ email, nickname, password, passwordConfirm, phoneNumber, businessNumber }: IForm) =>
      axios.post('', {
        email,
        nickname,
        password,
        passwordConfirm,
        phoneNumber,
        businessNumber,
      }),
    {
      onSuccess: (response) => {
        console.log(response);
        navigate('/');
      },
      onError: (error) => {
        console.log(error);
      },
    },
  );

  const onValid = (data: IForm) => {
    const { email, nickname, password, passwordConfirm, phoneNumber } = data;

    if (password !== passwordConfirm) {
      setError('passwordConfirm', { message: NOT_CORRECT_PASSWORD_MESSAGE }, { shouldFocus: true });
      setValue('password', '');
      setValue('passwordConfirm', '');
    }

    JoinMutation.mutate({
      email,
      nickname,
      password,
      passwordConfirm,
      phoneNumber,
      businessNumber,
    });
  };

  const onChangeBusinessCheckBox = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setIsChecked(e.currentTarget.checked);
      if (!e.currentTarget.checked) {
        setBusinessNumber('');
      }
    },
    [isChecked],
  );

  const onChangeBusinessNumber = useCallback(
    (e: React.FormEvent<HTMLInputElement>) => {
      e.preventDefault();
      setBusinessNumber(e.currentTarget.value);
    },
    [businessNumber],
  );

  const onClickBusinessBtn = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();

    axios
      .post(NATIONAL_TAX_SERVICE_STATUS_API_URL, {
        b_no: [businessNumber],
      })
      .then((response) => {
        const statusNumber = response.data.data[0].b_stt_cd;

        if (statusNumber === SUCCESS_AUTHENTICATION_BUSINESSNUMBER) {
          alert(SUCCESS_AUTHENTICATION_BUSINESSNUMBER_MESSAGE);
          setConfirmBusinessNumber(true);
        } else if (statusNumber === SHUTDOWN_BUSINESSNUMBER || statusNumber === CLOSURE_BUSINESSNUMBER) {
          alert(SHUTDOWN_BUSINESSNUMBER_MESSAGE);
          setBusinessNumber('');
        } else {
          alert(INVALID_BUSINESSNUMBER_MESSAGE);
          setBusinessNumber('');
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <JoinFormBox onSubmit={handleSubmit(onValid)}>
      <JoinInput
        {...register('email', {
          required: EMAIL_REQUEST_MESSAGE,
          pattern: {
            value: /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/,
            message: EMAIL_REQUEST_MESSAGE,
          },
        })}
        placeholder={EMAIL_REQUEST_MESSAGE}
        type="email"
      />
      <ErrorBox>{errors.email?.message}</ErrorBox>

      <JoinInput
        {...register('nickname', { required: NICKNAME_REQUEST_MESSAGE })}
        placeholder={NICKNAME_REQUEST_MESSAGE}
      />

      <JoinInput
        {...register('password', { required: PASSWORD_REQUEST_MESSAGE })}
        placeholder={PASSWORD_REQUEST_MESSAGE}
        type="password"
      />

      <JoinInput
        {...register('passwordConfirm', { required: PASSWORD_RE_REQUEST_MESSAGE })}
        placeholder={PASSWORD_RE_REQUEST_MESSAGE}
        type="password"
      />
      <ErrorBox>{errors?.passwordConfirm?.message}</ErrorBox>

      <JoinInput
        {...register('phoneNumber', {
          required: PHONENUMBER_REQUEST_MESSAGE,
          pattern: {
            value: /\d{3}\d{4}\d{4}$/,
            message: PHONENUMBER_REQUEST_MESSAGE,
          },
          maxLength: { value: 11, message: PHONENUMBER_REQUEST_MESSAGE },
        })}
        placeholder={PHONENUMBER_REQUEST_MESSAGE}
      />
      <ErrorBox>{errors?.phoneNumber?.message}</ErrorBox>

      {!confirmBusinessNumber && (
        <label>
          <CheckBox type="checkbox" checked={isChecked} onChange={onChangeBusinessCheckBox} />
          <span>사장님이신가요?</span>
        </label>
      )}

      {isChecked && (
        <>
          <JoinInput
            {...register('businessNumber', {
              required: BUSINESSNUMBER_REQUEST_MESSAGE,
              pattern: {
                value: /\d{3}\d{2}\d{5}/,
                message: BUSINESSNUMBER_REQUEST_MESSAGE,
              },
              maxLength: { value: 10, message: BUSINESSNUMBER_REQUEST_MESSAGE },
            })}
            placeholder={BUSINESSNUMBER_REQUEST_MESSAGE}
            value={businessNumber}
            onChange={onChangeBusinessNumber}
            disabled={confirmBusinessNumber}
          />
          <ErrorBox>{errors?.businessNumber?.message}</ErrorBox>
          {!confirmBusinessNumber && <BusinessButton onClick={onClickBusinessBtn}>인증</BusinessButton>}
        </>
      )}
      <JoinInput value="회원가입" type="submit" />
    </JoinFormBox>
  );
};
export default JoinForm;

const JoinFormBox = styled.form`
  width: 35%;
  display: flex;
  flex-direction: column;
`;

const JoinInput = styled.input`
  padding: 1rem;
  border-radius: 0.5rem;
  border: 1px solid rgba(0, 0, 0, 0.1);
  margin: 0.25rem;

  &:last-child {
    cursor: pointer;
  }
`;

const CheckBox = styled.input`
  padding: 1rem;
  border-radius: 0.5rem;
  border: 1px solid rgba(0, 0, 0, 0.1);
  margin: 1rem 1rem;
`;

const BusinessButton = styled.button`
  padding: 1rem;
  border-radius: 0.5rem;
  border: 1px solid rgba(0, 0, 0, 0.1);
  margin: 0.25rem;
`;

const ErrorBox = styled.div`
  color: red;
  font-size: 0.5rem;
  margin: 0.25rem;
  padding-left: 0.25rem;
`;
