import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../hooks/redux'
import useClickOutSide from '../hooks/useClickOutSide'
import { GetExchangeRates } from '../redux/reducers/exchange_rates/ActionExchange'
import { HiSelector } from 'react-icons/hi'
import { setCurrentCurrency } from '../redux/reducers/exchange_rates/ExchangeSlice'
export const ExchangeRates = () => {
  const dispatch = useAppDispatch()
  const {currency_list_group, currency_list, current_currency, loading} = useAppSelector((state)=> state.exchange)
  const [is_visible_options, setIsVisibleOptions] = useState<boolean>(false)
  const select_ref = useClickOutSide(()=> {
    setIsVisibleOptions(false)
  })
  useEffect(() => {
    if(currency_list_group.length === 0){
      dispatch(GetExchangeRates())
    }
  }, [])
  
  return (
    <div className='exchange_rates'>
      {loading && <div className='loading_line'></div>}
      <div className='custom_select'>
        <div className='currency_list__select' onClick={()=> setIsVisibleOptions(true)}>{current_currency}</div>
        {is_visible_options &&
          <div ref={select_ref} className='currency_list__options'>
            {currency_list?.length > 0 && currency_list.map((item: string)=>
              <div className='currency_list__option' onClick={()=> dispatch(setCurrentCurrency({currency: item}))}>
                {item}
              </div>)}  
          </div>
          }
        <HiSelector className='icons currency_list__icons'/>
      </div>
    </div>
  )
}
