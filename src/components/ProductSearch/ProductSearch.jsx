import { useEffect, useState } from "react";
import { getProducts } from "../../api/ApiConnection";
import { Container, Card, ListGroup, Button } from "react-bootstrap";
import { addToCart } from "../../utils/cart";
import PropTypes from "prop-types";
import ProductCard from "../ProductCard/ProductCard";

const ProductSearch = ({ searchProduct }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data.$values || []);
      } catch (error) {
        console.error("fetch products failed!!!", error);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    if (searchProduct) {
      const filtered = products.filter((p) =>
        p.name.toLowerCase().includes(searchProduct.toLowerCase())
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(products);
    }
  }, [searchProduct, products]);

  const handleAddToCart = (product) => {
    if (product.stockQuantity > 0) {
      addToCart(product);
      alert(`${product.name} agregado al carrito`);
    } else {
      alert(`Lo sentimos, ${product.name} está fuera de stock`);
    }
  };

  return (
    <Container>
      <h2>Resultados de la busqueda</h2>
      <div className="row">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div key={product.id} className="col-md-6 col-lg-4 mb-4">
              <ProductCard product={product} handleAdd={handleAddToCart} />
            </div>
          ))
        ) : (
          <div className="col-12">
            <h3>Producto no encontrado</h3>
          </div>
        )}
      </div>
    </Container>
  );
};

ProductSearch.propTypes = {
  searchProduct: PropTypes.string,
};

export default ProductSearch;
