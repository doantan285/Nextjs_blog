import Link from 'next/link'
import style from '@/styles/app.module.css'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Home',
  description: 'Description bla bla',
}

export default function Home() {

  return (
    <div>
      <ul>
        <li>
          <Link className={style['red']} href={'/'}>
            <span>Facebook</span>
          </Link>
        </li>
        <li style={{ margin: "20px 0" }} >
          <Link className={style['green']} href={'/'}>
            <span>youtube</span>
          </Link>
        </li>
        <li style={{ margin: "20px 0" }} >
          <Link href={'/'}>
            <span>tiktok</span>
          </Link>
        </li>
      </ul>
    </div>
  )
}
