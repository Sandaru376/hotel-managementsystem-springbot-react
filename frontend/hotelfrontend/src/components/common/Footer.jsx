const FooterComponent = () => {
  return (
    <footer>
      <p className="my-footer">
        <span>PHEGON HOTEL</span> · All Rights Reserved © {new Date().getFullYear()}
      </p>
    </footer>
  );
};

export default FooterComponent;