import {useSetRecoilState} from "recoil";
import {isDarkAtom} from "../atom";

const Header = () => {
    const setDarkAtom = useSetRecoilState(isDarkAtom); // settingFn
    console.log(isDarkAtom, "Atom??");
    const toggleModeFn = () => setDarkAtom(prev => !prev);
    return (
        <div>
            <button onClick={toggleModeFn}>Toggle Mode</button>
        </div>
    )
}
export default Header