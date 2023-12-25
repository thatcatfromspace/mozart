import { createContext, useContext, useEffect, useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

export default function DropdownComponent({
  userName,
  userProfile,
  profileURL,
  signOutFunction,
}) {

  const [isOpen, setIsOpen] = useState(false);

  function useOnClickOutside(ref, handler) {
    useEffect(() => {
      const listener = (event) => {
        if (!ref.current || ref.current.contains(event.target)) {
          return;
        }
        handler(event);
      };

      document.addEventListener("mousedown", listener);
      document.addEventListener("touchstart", listener);

      return () => {
        document.removeEventListener("mousedown", listener);
        document.removeEventListener("touchstart", listener);
      };
    }, [ref, handler]);
  }

  // dropdown components
  const DropdownContext = createContext(null);

  function Dropdown(props) {

    const As = props.as;
    const ref = useRef(null);

    useOnClickOutside(ref, () => setIsOpen(false));

    return (
      <DropdownContext.Provider value={{ isOpen, setIsOpen }}>
        <As ref={ref} {...props}>
          {props.children}
        </As>
      </DropdownContext.Provider>
    );
  }

  function Button(props) {
    const { setIsOpen, isOpen } = useContext(DropdownContext);

    return (
      <button onClick={() => setIsOpen(!isOpen)} {...props}>
        {props.children}
      </button>
    );
  }

  function Items(props) {
    const { isOpen } = useContext(DropdownContext);
    return isOpen ? <div {...props}>{props.children}</div> : null;
  }

  function Item(props) {
    const As = props.as;

    return <As {...props}>{props.children}</As>;
  }

  Dropdown.Button = Button;
  Dropdown.Items = Items;
  Dropdown.Item = Item;

  const RenderChevron = () =>
    !isOpen ? (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="feather feather-chevron-up"
      >
        <polyline points="6 9 12 15 18 9"></polyline>
      </svg>
    ) : (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="feather feather-chevron-down"
      >
        <polyline points="18 15 12 9 6 15"></polyline>
      </svg>
    );

  return (
    <div>
      <Dropdown as="div" className="relative inline-block">
        <Dropdown.Button className="flex px-4 items-center hover:opacity-75 bg-keppel-700 transition-colors active:bg-keppel-500 py-2 rounded-full shadow-sm text-black font-medium">
          <Image
            src={userProfile}
            alt="user profile picture"
            width={32}
            height={32}
            className="rounded-full me-4 max-md:me-2"
          ></Image>
          <span className="me-2 max-md:hidden"> {userName} </span>
          <RenderChevron />
        </Dropdown.Button>
        <Dropdown.Items className="absolute text-sm w-40 text-black bg-keppel-700 p-1 shadow-lg rounded-md right-0 mt-2">
          <Link href={profileURL} target="_blank">
            <Dropdown.Item
              as="button"
              className="w-full rounded-md text-center py-2 hover:bg-keppel-500"
            >
              Spotify Profile
            </Dropdown.Item>
          </Link>
          <Dropdown.Item
            as="button"
            className="w-full rounded-md text-center py-2 hover:bg-keppel-500"
            onClick={signOutFunction}
          >
            Sign Out
          </Dropdown.Item>
        </Dropdown.Items>
      </Dropdown>
    </div>
  );
}
