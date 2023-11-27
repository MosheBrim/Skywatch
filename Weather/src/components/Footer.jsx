function Footer() {
    let date = new Date();
    return (
      <footer>
        <p>Copyright ⓒ {date.getFullYear()}</p>
      </footer>
    );
  }
  export default Footer;