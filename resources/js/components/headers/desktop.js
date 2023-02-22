/** Component. */
import Icon from '../icons';

const Desktop = () => {
    return (
        <div id="header">
            <div className="explorer">
                <span><Icon id="stock" /> Stock Explorer</span>
                <span><Icon id="crypto" /> Crypto Explorer</span>
            </div>
            <div className="brand">
                <span><Icon id="logo" /> Orion Trade</span>
            </div>
            <div className="auth">
                <span><Icon id="profile" /> Login</span>
                <span><Icon id="login" /> Register</span>
            </div>
        </div>
    );
}

export default Desktop;