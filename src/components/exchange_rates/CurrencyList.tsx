import React from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'

export const CurrencyList = () => {
    const {currency_list_with_value} = useAppSelector((state)=> state.exchange)

  return (
    <div className='currency_list'>
        {currency_list_with_value?.length > 0 && currency_list_with_value.map((item: string, index: number)=>
        <div key={item[0] + index} className='currency_item'>
            <div>1 {item[0].split('')[0]+item[0].split('')[1]+item[0].split('')[2]} </div>
            <div> = {item[1]} {item[0].split('')[3]+item[0].split('')[4]+item[0].split('')[5]}</div>
        </div>)}
    </div>
  )
}
