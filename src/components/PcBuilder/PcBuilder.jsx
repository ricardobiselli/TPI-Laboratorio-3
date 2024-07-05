import { Button, Card, ListGroup, ListGroupItem } from "react-bootstrap";
import ProductsMenu from "../ProductsMenu/ProductsMenu";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { addToCart } from "../../utils/cart";
import ProductCard from "../ProductCard/ProductCard";
import { getProducts } from "../../api/ApiConnection";

const PcBuilder = () => {
  const navigate = useNavigate();

  const [categorySelected, setCategorySelected] = useState("CPU");
  const [productsSelected, setProductsSelected] = useState([]);
  const [productList, setProductList] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        console.log("data", data);
        setProductList(data.$values || []);
        setProductList(
          productList.filter((product) => product.category == categorySelected)
        );
      } catch (error) {
        console.error("fetch products failed!!!", error);
      }
    };

    fetchProducts();
  }, []);

  const handleAddProduct = (product) => {
    setProductsSelected((prevProducts) => [...prevProducts, product]);
    console.log(productsSelected);
    switch (product.category) {
      case "CPU":
        const compatibleMotherboards = productList.filter(
          (p) =>
            p.category == "Motherboard" &&
            p.compatibilities.some(
              (compatibility) =>
                compatibility.socket == product.compatibilities[0].socket &&
                compatibility.ram == product.compatibilities[0].ram
            )
        );
        setCategorySelected("Motherboard");
        setProductList(compatibleMotherboards);

        break;
      case "Motherboard":
        const compatibleRAMS = productList.filter(
          (p) =>
            p.category == "RAM" &&
            p.compatibilities.some(
              (compatibility) =>
                compatibility.ram == product.compatibilities[0].ram
            )
        );
        setCategorySelected("RAM");
        setProductList(compatibleRAMS);
        break;
      case "RAM":
        const storage = productList.filter((p) => p.category == "Storage");
        setCategorySelected("Storage");
        setProductList(storage);
        break;
      case "Storage":
        const gpu = productList.filter((p) => p.category == "GPU");
        setCategorySelected("GPU");
        setProductList(gpu);
        break;
      case "GPU":
        const compatiblePSUs = productList.filter(
          (p) =>
            p.category === "PSU" &&
            p.powerConsumption > product.powerConsumption
        );
        setCategorySelected("PSU");
        setProductList(compatiblePSUs);
        break;
      case "PSU":
        const cases = productList.filter((p) => p.category == "Case");
        setCategorySelected("Case");
        setProductList(cases);
        break;
      default:
        navigate("/shopping-cart");
        break;
    }
    addToCart(product);
  };

  return (
    <div className="container">
      <div style={{ width: "100%" }}>
        <h2>{categorySelected}:</h2>
      </div>
      {/* <ProductsMenu setCategorySelected={setCategorySelected}></ProductsMenu> */}
      <div className="row">
        <div className="col-md-9">
          <div className="row">
            {productList.map((product) => (
              <div key={product.id} className="col-md-6 col-lg-4 mb-4">
                <ProductCard product={product} handleAdd={handleAddProduct} />
              </div>
            ))}
          </div>
        </div>
        <div className="col-md-3">
          <h3>Your pc:</h3>
          <ul>
            {productsSelected.map((selected) => {
              return <li key={selected.id}>{selected.name}</li>;
            })}
          </ul>
          Total: ${" "}
          {productsSelected.reduce(
            (total, product) => total + product.price,
            0
          )}
        </div>
      </div>
    </div>
  );
};

export default PcBuilder;
