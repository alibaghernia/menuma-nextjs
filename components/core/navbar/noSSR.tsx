import dynamic from "next/dynamic"
import { INavBar } from "./types"

export const Navbar: INavBar = (props) => {
    const Nav = dynamic(import('./navbar'), { ssr: false });

    return <Nav {...props} />
}