'use client'

import { Header } from '@/components'
import { useGSAP } from '@gsap/react'
import { IMG_1, IMG_2, IMG_3, IMG_4 } from '@public/index'
import gsap from 'gsap'
import { useCallback, useEffect, useRef, useState } from 'react'

export const Home = () => {
  const boxRef = useRef<HTMLDivElement>(null)
  const figRef = useRef<HTMLDivElement>(null)
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
      window.addEventListener('wheel', handleWheel)
    }
    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('wheel', handleWheel)
      }
    }
  }, [active, goToSection, isScrolling])

  useEffect(() => {
    if (!figRef.current || !boxRef.current) return

    const images = Array.from(figRef.current.children) as HTMLElement[]

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

    gsap.to(boxRef.current, {
      width: active !== 0 ? '50%' : '100%',
      borderRadius: active !== 0 ? '0 29px 29px 0' : '0',
      duration: 0.5,
      ease: 'power2.out',
    })
  }, [active])

  return (
    <>
      <Header active={active} />
      <main className="relative">
        <section className="relative mx-auto my-0 w-full">
          <div className="absolute top-0 left-0 h-[953px] w-full overflow-hidden">
            <div className="relative">
              <div className="absolute top-0 left-0 h-full w-full">
                <div
                  className="fixed top-0 h-full w-full overflow-hidden"
                  style={{ transition: active === 0 ? 'border-radius 1s' : '' }}
                  ref={boxRef}
                >
                  <figure
                    className="transition-clip-path relative h-full max-h-screen w-full overflow-hidden duration-500 ease-out"
                    ref={figRef}
                    style={{
                      clipPath:
                        active === 0
                          ? 'none'
                          : 'path("M 0 0 L 478.5 0 L 478.5 388.334 C 478.5 397.713 471.131 401.732 468.452 401.732 C 467.916 401.732 467.916 402.268 468.452 402.268 C 471.131 402.268 478.5 406.287 478.5 415.666 L 478.5 415.666 L 478.5 804 L 0 804 Z")',
                    }}
                  >
                    <img
                      className="absolute top-0 left-0 h-full max-h-screen w-full origin-[38%_0] object-cover object-[0_64.5%] transition-opacity duration-500 ease-out"
                      src={IMG_1}
                      alt="BLISSO"
                      style={{ opacity: 1, scale: active === 0 ? 1.24 : 1 }}
                    />
                    <img
                      className="absolute top-0 left-0 h-full max-h-screen w-full object-cover transition-opacity duration-500 ease-out"
                      src={IMG_2}
                      alt="JISOO"
                      style={{ opacity: 0 }}
                    />
                    <img
                      className="absolute top-0 left-0 h-full max-h-screen w-full object-cover transition-opacity duration-500 ease-out"
                      src={IMG_3}
                      alt="FILMOGRAPHY"
                      style={{ opacity: 0 }}
                    />
                    <img
                      className="absolute top-0 left-0 h-full max-h-screen w-full object-cover transition-opacity duration-500 ease-out"
                      src={IMG_4}
                      alt="NEWS"
                      style={{ opacity: 0 }}
                    />
                  </figure>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
