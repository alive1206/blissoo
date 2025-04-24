'use client'

import { Header } from '@/components'
import { useGSAP } from '@gsap/react'
import { IMG_1, IMG_2, IMG_3, IMG_4 } from '@public/index'
import gsap from 'gsap'
import { useCallback, useEffect, useRef, useState } from 'react'

export const Home = () => {
  const boxRef = useRef<HTMLDivElement>(null)
  const figRef = useRef<HTMLDivElement>(null)
  const bgRef = useRef<HTMLUListElement>(null)
  gsap.registerPlugin(useGSAP)

  const [active, setActive] = useState(0)
  const [isScrolling, setIsScrolling] = useState(false)

  const goToSection = useCallback(
    (index: number) => {
      if (index >= 0 && index < 5 && !isScrolling) {
        setIsScrolling(true)
        setActive(index)
        setTimeout(() => {
          setIsScrolling(false)
        }, 500)
      }
    },
    [isScrolling]
  )

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (!isScrolling) {
        if (e.deltaY > 0) {
          goToSection(active + 1)
        } else {
          goToSection(active - 1)
        }
      }
    }

    if (typeof window !== 'undefined') {
      window.addEventListener('wheel', handleWheel, { passive: true })
    }
    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('wheel', handleWheel)
      }
    }
  }, [active, goToSection, isScrolling])

  useEffect(() => {
    if (!figRef.current || !boxRef.current || !bgRef.current) return

    const images = Array.from(figRef.current.children) as HTMLElement[]
    const backgrounds = Array.from(bgRef.current.children) as HTMLElement[]

    if (active === 0 || active === 1) {
      images.forEach((img, index) => {
        gsap.to(img, {
          opacity: index === 0 ? 1 : 0,
          duration: 0.5,
          ease: 'none',
        })
      })
    } else {
      images.forEach((img, index) => {
        gsap.to(img, {
          opacity: index === active - 1 ? 1 : 0,
          duration: 0.5,
          ease: 'none',
        })
      })
    }

    if (active === 0 || active === 1) {
      backgrounds.forEach((bg, index) => {
        gsap.to(bg, {
          opacity: index === 0 ? 1 : 0,
          duration: 0.5,
          ease: 'none',
        })
      })
    } else {
      backgrounds.forEach((bg, index) => {
        gsap.to(bg, {
          opacity: index === active - 1 ? 1 : 0,
          duration: 0.5,
          ease: 'none',
        })
      })
    }

    const currentWidth = window.innerWidth
    const currentHeight = window.innerHeight

    // gsap.to(figRef.current, {
    //   clipPath:
    //     active === 0
    //       ? `path("M 0 0 L ${currentWidth} 0 L ${currentWidth} 476.5 C ${currentWidth} 476.5 ${currentWidth} 476.5 ${currentWidth} 476.5 C ${currentWidth} 476.5 ${currentWidth} 476.5 ${currentWidth} 476.5 C ${currentWidth} 476.5 ${currentWidth} 476.5 ${currentWidth} 476.5 L ${currentWidth} 476.5 L ${currentWidth} 953 L 0 953 Z")`
    //       : `path("M 0 0 L ${currentWidth / 2} 0 L ${currentWidth / 2} 449.082 C ${currentWidth / 2} 467.898 945.216 475.962 939.84 475.962 C 938.765 475.962 938.765 477.038 939.84 477.038 C 945.216 477.038 ${currentWidth / 2} 485.102 ${currentWidth / 2} 503.918 L ${currentWidth / 2} 503.918 L ${currentWidth / 2} 953 L 0 953 Z")`,
    //   duration: 0.5,
    //   ease: 'none',
    // })

    gsap.to(boxRef.current, {
      width: active !== 0 ? '50%' : '100%',
      borderRadius: active !== 0 ? '0 29px 29px 0' : '0',
      duration: 0.5,
      ease: 'none',
    })
  }, [active])

  return (
    <>
      <Header active={active} />
      <main className="relative">
        <section className="relative mx-auto my-0 w-full">
          <div className="absolute top-0 left-0 h-screen w-full overflow-hidden">
            <div className="relative h-full">
              <div className="absolute top-0 left-0 h-full w-full">
                <div
                  className="fixed top-0 h-full w-full overflow-hidden"
                  style={{ transition: active === 0 ? 'border-radius 1s' : '' }}
                  ref={boxRef}
                >
                  <figure
                    className="relative h-full max-h-screen w-full overflow-hidden"
                    ref={figRef}
                    // style={{
                    //   clipPath:
                    //     'path("M 0 0 L ${currentWidth} 0 L ${currentWidth} 476.5 C ${currentWidth} 476.5 ${currentWidth} 476.5 ${currentWidth} 476.5 C ${currentWidth} 476.5 ${currentWidth} 476.5 ${currentWidth} 476.5 C ${currentWidth} 476.5 ${currentWidth} 476.5 ${currentWidth} 476.5 L ${currentWidth} 476.5 L ${currentWidth} 953 L 0 953 Z")',
                    // }}
                  >
                    <img
                      className="absolute top-0 left-0 h-full max-h-screen w-full origin-[38%_0] scale-100 object-cover object-[0_64.5%] transition-opacity duration-300 ease-linear"
                      src={IMG_1}
                      alt="BLISSO"
                      style={{ opacity: 1, scale: active === 0 ? 1.24 : 1, transition: 'scale .5s linear' }}
                    />
                    <img
                      className="absolute top-0 left-0 h-full max-h-screen w-full object-cover transition-opacity duration-300 ease-linear"
                      src={IMG_2}
                      alt="JISOO"
                      style={{ opacity: 0 }}
                    />
                    <img
                      className="absolute top-0 left-0 h-full max-h-screen w-full object-cover transition-opacity duration-300 ease-linear"
                      src={IMG_3}
                      alt="FILMOGRAPHY"
                      style={{ opacity: 0 }}
                    />
                    <img
                      className="absolute top-0 left-0 h-full max-h-screen w-full object-cover transition-opacity duration-300 ease-linear"
                      src={IMG_4}
                      alt="NEWS"
                      style={{ opacity: 0 }}
                    />
                  </figure>
                  <ul
                    className="absolute top-1/2 right-[38px] z-[101] list-none text-right text-[20px] font-medium text-white"
                    style={{
                      opacity: active !== 0 ? 1 : 0,
                      transition: active !== 0 ? '.5s opacity linear' : '',
                      transitionDelay: active !== 0 ? '.5s' : '0s',
                    }}
                  >
                    <li className="-translate-y-1/2">BLISSO</li>
                    <li>JISOO</li>
                    <li>FILMOGRAPHY</li>
                    <li>NEWS</li>
                  </ul>
                </div>
              </div>

              <div className="relative top-0 left-0 h-full w-full">
                <div className="absolute top-0 left-0 h-full w-full">
                  <ul className="sticky top-0 left-0 -z-50 h-full w-full list-none text-right" ref={bgRef}>
                    <li
                      className="absolute top-0 left-0 h-full w-full overflow-hidden bg-[#E4E2EE]"
                      style={{ opacity: 1 }}
                    ></li>
                    <li
                      className="absolute top-0 left-0 h-full w-full overflow-hidden bg-[#9c98b9]"
                      style={{ opacity: 0 }}
                    ></li>
                    <li
                      className="absolute top-0 left-0 h-full w-full overflow-hidden bg-[#E4E2EE]"
                      style={{ opacity: 0 }}
                    ></li>
                    <li
                      className="absolute top-0 left-0 h-full w-full overflow-hidden bg-[#E4E2EE]"
                      style={{ opacity: 0 }}
                    ></li>
                  </ul>
                </div>

                <div></div>
              </div>
            </div>
          </div>

          <div></div>
        </section>
      </main>
    </>
  )
}
