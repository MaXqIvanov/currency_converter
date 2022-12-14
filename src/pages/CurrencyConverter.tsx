import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../hooks/redux'
import { GetCurrentRate } from '../redux/reducers/converter/ActionConverter'
import { FaEquals } from 'react-icons/fa'
import { clearCurrentCurrencyValue } from '../redux/reducers/converter/ConverterSlice'
import { ImSpinner } from 'react-icons/im'
export const CurrencyConverter = () => {
  const [currency_value, setCurrencyValue] = useState<string>('')
  const dispatch = useAppDispatch()
  const {current_currency_value, loading_currency, error} = useAppSelector((state)=> state.converter)

  const handlerCurrencyValue = (value: string)=> {
    let input_value = value.split(' ')
    if(input_value.length === 1){
      if(Number(input_value[0]) || input_value[0] === ''){
        setCurrencyValue(value)
      }
    }else if(input_value.length === 2){
      if(input_value[1].length >= 3){
        let alp = input_value[1].split('')
        setCurrencyValue(input_value[0] + " " + alp[0]+alp[1]+alp[2] + ' in ')
      }else {
        setCurrencyValue(value)
      }
    }else if(input_value[1] === ''){
      setCurrencyValue(input_value[0] + " ")
    }else if(input_value[2] === ''){
      setCurrencyValue(input_value[0] + " " + input_value[1] + " in ")
    }
    else if(input_value[2].length === 1){
      setCurrencyValue(input_value[0] + " " + input_value[1])
    }else if(input_value[3]?.length > 3){}
    else if(input_value.length >4){
    }else setCurrencyValue(value)

    if(input_value.length >= 4 && input_value[3].length === 3){
      dispatch(GetCurrentRate({value1: input_value[1], value2: input_value[3]}))
    }else{
      dispatch(clearCurrentCurrencyValue())
    }
  }

  
  
  return (
    <div className='currency_converter'>
      <div className='currency_converter__wrapper'>
        <input value={currency_value} onChange={(e)=> handlerCurrencyValue(e.target.value)} className='custom_input' placeholder='15 usd in eth'/>
        <FaEquals className='icon_equals'/>
        <div className='currency_converter__results'>{current_currency_value}
          {loading_currency && <ImSpinner className='spinner'/>}
        </div>
      </div>
      {error && <div className='error'>{error}</div>}
    </div>
  )
}
