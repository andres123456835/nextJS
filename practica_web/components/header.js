
import Link from 'next/link';
export default function Header() {
    return (
        <header>
            <nav>
                <a href="/">Inicio</a>
                <a href="/about">Acerca de</a>
                <Link href="/login">Login</Link>
            </nav>
        </header>
    );
}
