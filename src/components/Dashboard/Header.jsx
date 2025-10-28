import logo from "../../assets/logo.webp";

const Header = () => {
  return (
    <>
      <nav class="navbar bg-body-tertiary">
        <div class="container-fluid d-flex justify-content-start align-items-center">
          <a class="navbar-brand" href="#">
            <img
              src={logo}
              alt="Logo"
              width="84"
              height="80"
              class="d-inline-block align-text-top"
            />
          </a>

          <h3>MGNREGA</h3>
        </div>
      </nav>
    </>
  );
};

export default Header;
