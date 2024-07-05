import { useEffect, useState } from "react";
import { getProducts } from "../../api/ApiConnection";
import { Container } from "react-bootstrap";
import ProductCard from "../ProductCard/ProductCard";
import { addToCart } from "../../utils/cart";

const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        console.log("data", data);
        setProducts(data.$values || []);
      } catch (error) {
        console.error("fetch products failed!!!", error);
      }
    };

    fetchProducts();
  }, []);

  const handleAddToCart = (product) => {
    addToCart(product);
    alert(`${product.name} agregado al carrito`);
  };

  return (
    <Container>
      <h1 className="my-4">Product List - no login required</h1>
      <div className="row">
        {products.map((product) => (
          <div key={product.id} className="col-md-6 col-lg-4 mb-4">
            <ProductCard product={product} handleAdd={handleAddToCart} />
          </div>
        ))}
      </div>
    </Container>
  );
};

export default Products;
