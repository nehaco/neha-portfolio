import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import BackgroundGrid from '@/showcase/effects/BackgroundGrid'

const data = [
  {
    id: 1,
    title: 'Image Fade',
    image: '/images/ui/image-fade.png',
    link: '/effects/image-fade',
  },
  {
    id: 2,
    title: 'Gradients',
    image: '/images/ui/gradients.png',
    link: '/effects/gradients',
  },
  {
    id: 3,
    title: 'Background Grid',
    preview: (
      <BackgroundGrid
        className="relative z-0"
        color="#FB3A5D"
        size="25px"
        strokeWidth="3px"
      />
    ),
    link: '/effects/background-grid',
  },
]

const EffectCards = () => {
  return (
    <div>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {data.map((item) => (
          <Link href={item.link} key={item.id}>
            <div className="overflow group rounded-xl border border-white ring-1 ring-zinc-200 transition-all ease-in-out hover:cursor-pointer">
              <div className="flex h-[9rem] items-center justify-center overflow-hidden rounded-t-xl border-b bg-gray-50 text-xs text-gray-400 transition-all ease-in-out group-hover:bg-gray-100 md:h-[12rem]">
                {item.image ? (
                  <Image
                    width={200}
                    height={200}
                    src={item.image}
                    alt={item.title}
                    className="h-auto w-[150px] duration-300 ease-in-out group-hover:scale-110"
                  />
                ) : (
                  item.preview
                )}
              </div>
              <div className="w-full p-4 text-sm font-medium text-gray-800">
                {item.title}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default EffectCards
