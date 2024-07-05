import { useContext } from "react";
import Products from "../ProductList/ProductList";
import AuthContext from "../../services/authentication/AuthContext";

const Home = () => {
  const { user, userRole } = useContext(AuthContext);

  console.log(userRole);

  return (
    <>
      {userRole != "admin" && userRole != "superadmin" ? (
        <div className="container-fluid py-5 bg-light">
          <div className="container">
            <div className="row mb-5">
              <div className="col-lg-8 mx-auto text-center">
                <h1 className="display-4 mb-3">Bienvenido a nuestra tienda</h1>
                <p className="lead text-muted">
                  Descubre nuestra selección de productos de alta calidad.
                </p>
              </div>
            </div>

            <div className="row">
              <div className="col-12">
                <div className="card shadow-sm">
                  <div className="card-body">
                    <Products />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="container-fluid py-5 bg-light">
          <div className="container">
            <div className="row mb-5">
              <div className="col-lg-8 mx-auto text-center">
                <h1 className="display-4 mb-3">Bienvenido {user.userName}</h1>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
