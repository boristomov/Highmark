import React from "react";
import Header from '../header';

export default function Navbar(props) {
  const [isWhite, setIsWhite] = React.useState(false);
  const containerRef = React.useRef(null);
  const [offsetHeight, setOffsetHeight] = React.useState(0);

  React.useEffect(() => {
    const handleScroll = () => {
      const threshold = window.innerHeight || 0;
      setIsWhite(window.scrollY >= threshold);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  React.useEffect(() => {
    const measure = () => {
      const root = containerRef.current;
      const headerEl = root ? root.querySelector('.wpo-site-header') : null;
      const h = headerEl ? headerEl.offsetHeight : 0;
      setOffsetHeight(h);
      if (typeof document !== 'undefined') {
        const fallback = h && h > 0 ? `${h}px` : '100px';
        document.documentElement.style.setProperty('--nav-offset-height', fallback);
      }
    };
    measure();
    window.addEventListener('resize', measure);
    return () => {
      window.removeEventListener('resize', measure);
      if (typeof document !== 'undefined') {
        document.documentElement.style.setProperty('--nav-offset-height', '0px');
      }
    };
  }, []);

  const forceWhite = !!props.alwaysWhite;
  const className = (forceWhite || isWhite) ? "fixed-navbar white" : "fixed-navbar";

  return (
    <>
      <div ref={containerRef} className={className}>
        <Header Logo={props.Logo} topbarNone={props.topbarNone} hclass={`sm-logo ${props.hclass || ''}`} hideDropdowns />
      </div>
      {props.withOffsetBand && (
        <div className="nav-offset-band" style={{ height: offsetHeight || 100 }} aria-hidden="true" />
      )}
    </>
  );
}