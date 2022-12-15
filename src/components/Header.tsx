import React, { useEffect, useState } from 'react';
import { FcCurrencyExchange } from 'react-icons/fc';
import { useNavigate } from 'react-router-dom';

export const Header = () => {
  const navigate = useNavigate();
  const navigation_elems: INavigation[] = [
    {
      id: 1,
      title: 'Конвертёр валют',
      navigate: '/',
    },
    {
      id: 2,
      title: 'Курсы валют',
      navigate: '/exchange_rates',
    },
  ];
  const [current_navigate, setCurrentNavigate] = useState<number | null>(null);
  useEffect(() => {
    const current_nav = navigation_elems.filter(
      (navigate: INavigation) =>
        navigate.navigate.split('/')[1] === window.location.pathname.split('/')[1]
    )[0].id;
    console.log(current_nav);
    if (current_nav) {
      setCurrentNavigate(current_nav);
    } else setCurrentNavigate(1);
    console.log(current_navigate);
  }, []);

  return (
    <div className={'header'}>
      <div className="logo header__logo">
        <FcCurrencyExchange
          onClick={() => {
            setCurrentNavigate(1);
            navigate('/');
          }}
        />
      </div>
      <div className="navigate header__navigate">
        {navigation_elems.map((elem: INavigation) => (
          <div
            key={elem.id}
            onClick={() => {
              setCurrentNavigate(elem.id);
              navigate(elem.navigate);
            }}
            className={`current_navigate ${
              current_navigate === elem.id && 'current_navigate__active'
            }`}
          >
            {elem.title}
          </div>
        ))}
      </div>
    </div>
  );
};

interface INavigation {
  id: number;
  title: string;
  navigate: string;
}
