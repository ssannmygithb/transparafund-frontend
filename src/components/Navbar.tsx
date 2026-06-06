import { ConnectButton } from "./ConnectButton"
import { Logo } from "./Logo"

export function Navbar() {
  return (
    <header className="navbar">
      <div className="container nav-inner">
        <Logo />
        <div className="nav-right">
          <span className="net-pill">
            <span className="net-dot" /> Sepolia
          </span>
          <ConnectButton />
        </div>
      </div>
    </header>
  )
}
