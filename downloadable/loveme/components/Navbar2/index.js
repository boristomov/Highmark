import React from "react";
import Header2 from '../header2';

export default function Navbar2(props) {
  const [isWhite, setIsWhite] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      const threshold = window.innerHeight || 0;
      setIsWhite(window.scrollY >= threshold);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const className = isWhite ? "fixed-navbar white" : "fixed-navbar";

  return (
    <div className={className}>
      <Header2 Logo={props.Logo} hclass={props.hclass} />
    </div>
  );
}