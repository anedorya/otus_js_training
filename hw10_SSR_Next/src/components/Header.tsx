
import Link from "next/link";

export default function Header() {

    return (
    <header className="flex justify-between bg-cyan-900  p-5 text-white">
        <Link href="/">Logo</Link>
        <nav className="flex gap-5">
            <Link href="/">Главная</Link>
            <Link href="/catalog">Каталог</Link>
            <Link href="/cart">Корзина</Link>
        </nav>
        
    </header>

    )
 }