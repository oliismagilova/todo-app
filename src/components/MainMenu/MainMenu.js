import { Link } from "react-router-dom";
import "./MainMenuStyle.scss";

export default function MainMenu() {
    return (
        <div>
            <nav className="nav">
                <Link to="/" className="tasksMenu">Tasks</Link>
                <Link to="/help" className="help">Help</Link>
            </nav>
        </div>
    );
}