"use client";
import {
  ElementRef,
  forwardRef,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";

const MenuButton = forwardRef<
  HTMLElement,
  {
    isThereOwnIcon?: boolean;
    children: ReactNode;
    defaultShow?: boolean;
    child?: any;
  }
>(function MenuButton(
  { isThereOwnIcon = false, defaultShow = false, children, child },
  ref,
) {
  const iconRef = useRef<ElementRef<"i">>(null);
  const [show, setShow] = useState(false);
  useEffect(() => {
    const icon = iconRef.current;
    if (!icon) return;

    function handleClick() {
      setShow(false);
    }

    function mouseLeave() {
      document.addEventListener("click", handleClick);
    }

    function mouseEnter() {
      document.removeEventListener("click", handleClick);
    }

    icon.addEventListener("mouseleave", mouseLeave);
    icon.addEventListener("mouseenter", mouseEnter);
    return () => {
      icon.removeEventListener("mouseleave", mouseLeave);
      icon.removeEventListener("mouseenter", mouseEnter);
    };
  }, []);
  return (
    <div className="relative m-auto">
      <div className="w-full h-full"></div>
      <span className="absolute top-0 right-0 flex flex-row-reverse w-auto rounded  z-20 cursor-pointer">
        {!isThereOwnIcon ? (
          <>
            <i
              ref={iconRef}
              onClick={() => setShow(!show)}
              className="fa-solid px-3 fa-ellipsis-vertical"
            ></i>
          </>
        ) : (
          <>
            {child}
            <i ref={ref}></i>
          </>
        )}
        {(show || defaultShow) && (
          <div className="min-w-[300px] w-full">{children}</div>
        )}
      </span>
    </div>
  );
});

// MenuButton.Child = function Child() {
//   return <p>I'm child</p>;
// };
export default MenuButton;
