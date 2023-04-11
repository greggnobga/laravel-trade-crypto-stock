/** React */
import { Fragment, useState } from "react";

/** Hook. */
import useScreen from "../../hooks/use-screen";

/** Helper. */
import helpNotice from "../../helpers/help-notice";

/** Components */
import Desktop from "./desktop";
import Mobile from "./mobile";
import Messengers from "../../components/messengers";

const Header = () => {
    /** Use notice helper. */
    const { notified, setNotified } = helpNotice();

    /** Use screen helper. */
    const { isMobile } = useScreen();

    /** Use state. */
    const [menu, setMenu] = useState();

    /** Dashboard menu. */
    const menuHandler = () => {
        setMenu(!menu);
    };
    /** Return something. */
    return (
        <Fragment>
            {notified && <Messengers onShow={setNotified} />}
            {isMobile ? (
                <Mobile menu={menu} onMenu={menuHandler} />
            ) : (
                <Desktop menu={menu} onMenu={menuHandler} />
            )}
        </Fragment>
    );
};

export default Header;
