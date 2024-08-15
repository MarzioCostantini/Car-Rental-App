import "./Header.css"
import Herz from "../../assets/svg/Herz";
import Notification from "../../assets/svg/Notification";
import Settings from "../../assets/svg/Settings";
import Searchbar from "../Searchbar/Searchbar";

const Header = () => {
    return (
        <header>
            <div className="left">
                <h2 className="logo">MORENT</h2>
                <Searchbar />
            </div>
            <div className="right">
                <Herz />
                <Notification />
                <Settings />
                <img src="./img/user.png" alt="" />
            </div>

        </header>
    );
}

export default Header;