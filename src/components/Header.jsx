import mainLogo from "../assets/logo.svg";

export default function Header() {
    return (
        <header>
            <img src={mainLogo} alt="CookWithUs Logo" />
            <h1>CookWithUs</h1>
        </header>
    )
}