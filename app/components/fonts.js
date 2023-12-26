/*  
 * Font classes stored in separate files elsewhere are not accessible
 * for some reason. This is a known problem with Next.js on dev mode and is awaiting
 * resolution. Until production rollout, fonts
 * have to be imported to every page separately. 
 */
import { Playfair_Display, Dynalight, Zeyada, Satisfy, Poppins, Comforter_Brush, Noto_Sans } from 'next/font/google';

export const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['500'],
  preload: true,
})

export const dynalight = Dynalight({
  subsets: ['latin'],
  weight: '400',
})

export const zeyada = Zeyada({
  subsets: ['latin'],
  weight: ['400'],
})

export const satisfy = Satisfy({
  subsets: ['latin'],
  weight: ['400'],
})

export const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  preload: true,
})

export const comforterBrush = Comforter_Brush({
  subsets: ['latin'],
  weight: '400',
})

export const notoSans = Noto_Sans({
  subsets: ['latin'],
  weight: ['400', '500'],
})