import { useEffect, useState } from "react";
import { getProducts } from "../../api/ApiConnection";
import { Container } from "react-bootstrap";
import ProductCard from "../ProductCard/ProductCard";
import { addToCart } from "../../utils/cart";
import ProductsMenu from "../ProductsMenu/ProductsMenu";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categorySelected, setCategorySelected] = useState(null);

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

  useEffect(() => {
    if (categorySelected) {
      const filtered = products.filter(
        (product) => product.category === categorySelected
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(products);
    }
  }, [categorySelected, products]);

  const handleAddToCart = (product) => {
    addToCart(product);
    alert(`${product.name} agregado al carrito`);
  };

  return (
    <Container>
      <div className="row">
        <h2 className="h3 card-title mb-4 text-center">Nuestros Productos</h2>
        <div className="col-md-2">
          <ProductsMenu setCategorySelected={setCategorySelected} />
        </div>
        <div className="col-md-10">
          <div className="row">
            {filteredProducts.map((product) => (
              <div key={product.id} className="col-md-6 col-lg-4 mb-4">
                <ProductCard product={product} handleAdd={handleAddToCart} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Products;
