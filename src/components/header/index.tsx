import { Logo } from '@/components'
import { MENU_LIST } from '@/utils'

type Props = {
  active: number
}

export const Header: React.FC<Props> = ({ active }) => {
  return (
    <header
      className="fixed top-0 z-50 h-[90px] w-full"
      style={{ color: active === 0 ? '#fff' : '', transition: active === 0 ? 'color 1s' : '' }}
    >
      <section className="mx-auto my-0 flex h-full w-full items-center justify-between p-[0_54px]">
        <div className="w-[135px]" style={{ fill: active === 0 ? '#fff' : '', transition: active === 0 ? 'fill 1s' : '' }}>
          <Logo />
        </div>
        <div className="flex items-center gap-[60px] text-[18px] font-medium uppercase">
          {MENU_LIST.map((menu) => (
            <div key={menu.id}>{menu.title}</div>
          ))}
          <div className="relative flex items-center gap-2">
            <div className="px-[.4vw] opacity-50">KR</div>
            <div className="">EN</div>
            <div className="absolute -bottom-[.2vw] h-[1.5px] w-[29px] bg-white p-[0_.2vw]"></div>
          </div>
        </div>
      </section>
    </header>
  )
}
