const FooterComponent = () => {
  return (
    <footer>
      <p className="my-footer">
        <span>Hotel</span>
        &nbsp;·&nbsp; All Rights Reserved © {new Date().getFullYear()}
        &nbsp;·&nbsp; Luxury stays, unforgettable memories
      </p>
    </footer>
  );
};

export default FooterComponent;