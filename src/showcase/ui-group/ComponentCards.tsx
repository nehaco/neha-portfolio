import OrbitingLoader from '@/showcase/components/loaders/OrbitingLoader'
import { TextTicker } from '@/showcase/components/text/text-ticker/TextTicker'
import SimpleToggle from '@/showcase/components/toggle/SimpleToggle'
import Image from 'next/image'
import Link from 'next/link'
import HeartbeatButton from '../components/button/HeartbeatButton'
import AnimatedLogoCloud from '../components/logo-cloud/AnimatedLogoCloud'

const data = [
  {
    title: 'Button',
    component: <HeartbeatButton />,
    link: '/components/button',
  },
  {
    title: 'Features',
    image: '/images/ui/features.svg',
    link: '/components/features',
  },
  {
    title: 'Pricing',
    image: '/images/ui/pricing.svg',
    link: '/components/pricing',
  },
  {
    title: 'Loaders',
    component: <OrbitingLoader />,
    link: '/components/loaders',
  },
  {
    title: 'Testimonial',
    image: '/images/ui/testimonial.svg',
    link: '/components/testimonial',
  },
  {
    title: 'Text',
    component: <TextTicker />,
    link: '/components/text',
  },
  {
    title: 'Footer',
    image: '/images/ui/footer.svg',
    link: '/components/footer',
  },
  {
    title: 'Input',
    image: '/images/ui/input.png',
    link: '/components/input',
  },
  {
    title: 'Tab',
    image: '/images/ui/tabs.png',
    link: '/components/tabs',
  },
  {
    title: 'Toggle',
    component: <SimpleToggle />,
    link: '/components/toggle',
  },
  {
    title: 'Logo Cloud',
    component: <AnimatedLogoCloud />,
    link: '/components/logo-cloud',
  },
]

const ComponentCards = () => {
  return (
    <div>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {data.map((item, index) => (
          <Link href={item.link} key={index} className="no-underline">
            <div className="overflow group rounded-xl border border-white ring-1 ring-zinc-200 transition-all ease-in-out hover:cursor-pointer dark:border-gray-600 dark:ring-gray-600">
              <div className="flex h-[9rem] items-center justify-center overflow-hidden rounded-t-xl border-b bg-gray-50 text-xs text-gray-400 transition-all ease-in-out group-hover:bg-gray-100 md:h-[12rem]">
                {item.image ? (
                  <Image
                    width={200}
                    height={200}
                    src={item.image}
                    alt={item.title}
                    className="h-auto w-[150px] duration-300 ease-in-out group-hover:scale-110 md:w-[200px]"
                  />
                ) : item.component ? (
                  item.component
                ) : null}
              </div>
              <div className="w-full p-4 text-sm font-medium text-gray-800 dark:text-white">
                {item.title}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default ComponentCards
