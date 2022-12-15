import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import useClickOutSide from '../../hooks/useClickOutSide';
import { setCurrentCurrency } from '../../redux/reducers/exchange_rates/ExchangeSlice';
import { HiSelector } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';

export const SelectCurrencyList = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { currency_list, current_currency } = useAppSelector((state) => state.exchange);
  const [is_visible_options, setIsVisibleOptions] = useState<boolean>(false);
  const select_ref = useClickOutSide(() => {
    setIsVisibleOptions(false);
  });
  return (
    <div>
      <div onClick={() => setIsVisibleOptions(true)} className="custom_select">
        <div className="currency_list__select" title="Курс по умолчанию">
          {current_currency}
        </div>
        {is_visible_options && (
          <div ref={select_ref} className="currency_list__options">
            {currency_list?.length > 0 &&
              currency_list.map((item: string, index: number) => (
                <div
                  key={item + index}
                  className="currency_list__option"
                  onClick={() => dispatch(setCurrentCurrency({ currency: item, navigate }))}
                >
                  {item}
                </div>
              ))}
          </div>
        )}
        <HiSelector className="icons currency_list__icons" />
      </div>
    </div>
  );
};
