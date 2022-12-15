import React, { useEffect, useRef } from 'react'
import { CurrencyList } from '../components/exchange_rates/CurrencyList'
import { SelectCurrencyList } from '../components/exchange_rates/SelectCurrencyList'
import { useAppDispatch, useAppSelector } from '../hooks/redux'
import { GetCurrentExchangeRates, GetExchangeRates } from '../redux/reducers/exchange_rates/ActionExchange'
export const ExchangeRates = () => {
  const dispatch = useAppDispatch()
  const {currency_list_group, current_currency, loading} = useAppSelector((state)=> state.exchange)
  const intervaExchange:any = useRef(null)
  useEffect(() => {
    if(currency_list_group.length === 0){
      dispatch(GetExchangeRates())
    }
     dispatch(GetCurrentExchangeRates())
     intervaExchange.current = setInterval(()=> {
        dispatch(GetExchangeRates())
     }, 60000)
     return ()=> {
      clearInterval(intervaExchange.current)
     }
  }, [current_currency])
  
  return (
    <div className='exchange_rates'>
      {loading && <div className='loading_line'></div>}
      <SelectCurrencyList />
      <CurrencyList />
    </div>
  )
}
