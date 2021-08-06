import React, { useEffect, useRef, useState, useCallback } from 'react';
import { IconBaseProps } from 'react-icons';
import { FiAlertCircle } from 'react-icons/fi';
import { useField } from '@unform/core';
import CurrencyInput, { CurrencyInputProps } from 'react-currency-input-field';

import { Container, Error } from './styles';

interface InputProps extends CurrencyInputProps {
  name: string;
  Icon?: React.ComponentType<IconBaseProps>;
}

const Input: React.FC<InputProps> = ({ name, Icon, ...rest }: InputProps) => {
  const [isFocused, setIsFocused] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  const { fieldName, defaultValue, error, registerField } = useField(name);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);
  }, []);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);

  return (
    <Container haveError={!!error} isFocused={isFocused}>
      {Icon && <Icon size={20} />}

      <CurrencyInput
        defaultValue={defaultValue}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        ref={inputRef}
        decimalsLimit={2}
        intlConfig={{ locale: 'pt-BR', currency: 'BRL' }}
        {...rest}
      />

      {error && (
        <Error title={error}>
          <FiAlertCircle color="#c53030" size={20} />
        </Error>
      )}
    </Container>
  );
};

export default Input;
