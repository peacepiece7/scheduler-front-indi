import React from 'react'

type Props = {
  type: 'rest' | 'used'
  ticket: number
}
export default function Ticket({ type, ticket }: Props) {
  const options = {
    rest: {
      src: '/dots.svg',
      alt: 'dots image',
      title: '남은 티켓',
      ticketStyle: 'text-3xl font-bold text-main',
      imageStyle: 'w-12 h-12 my-auto'
    },
    used: {
      src: '/user.svg',
      alt: 'user image',
      title: '사용한 티켓',
      ticketStyle: 'text-3xl font-bold text-point',
      imageStyle: 'w-12 h-12 my-auto'
    }
  }

  return (
    <div className='flex border-[1px] mx-4 py-2 px-8 rounded-2xl'>
      <img className={options[type].imageStyle} src={options[type].src} alt={options[type].alt} />
      <div className='flex flex-col items-center py-2 px-4 whitespace-nowrap'>
        <div className='text-2xl px-4'>{options[type].title}</div>
        <div className={options[type].ticketStyle}>{ticket}</div>
      </div>
    </div>
  )
}