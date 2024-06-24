import { Button, Card, ListGroup, ListGroupItem } from "react-bootstrap";
import ProductsMenu from "../ProductsMenu/ProductsMenu";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { addToCart } from "../../utils/cart";

const products = [
  {
    id: 1,
    name: "Laptop",
    description: "High-performance laptop",
    price: 1200.5,
    stockQuantity: 50,
    category: "Electronics",
    compatibilities: [],
    powerConsumption: 90,
  },
  {
    id: 2,
    name: "Laptop",
    description: "High-performance laptop",
    price: 1200.5,
    stockQuantity: 50,
    category: "Electronics",
    compatibilities: [],
    powerConsumption: 90,
  },
  {
    id: 3,
    name: "Intel Core i9-11900K",
    description: "11th Gen Intel Core i9 processor",
    price: 499.99,
    stockQuantity: 100,
    category: "Processor",
    compatibilities: [
      {
        ram: "DDR4",
        socket: "INTEL",
        series: ["Intel 500 Series", "Intel 400 Series"],
      },
    ],
    powerConsumption: 125,
  },
  {
    id: 4,
    name: "AMD Ryzen 9 5900X",
    description: "12-core, 24-thread unlocked desktop processor",
    price: 549.99,
    stockQuantity: 80,
    category: "Processor",
    compatibilities: [
      {
        ram: "DDR4",
        socket: "AM4",
        series: ["AMD 500 Series", "AMD 400 Series"],
      },
    ],
    powerConsumption: 105,
  },
  {
    id: 5,
    name: "ASUS ROG Strix Z590-E",
    description: "ATX Gaming Motherboard",
    price: 299.99,
    stockQuantity: 60,
    category: "Motherboard",
    compatibilities: [
      {
        ram: "DDR4",
        socket: "INTEL",
        series: ["Intel 500 Series"],
      },
    ],
    powerConsumption: 60,
  },
  {
    id: 6,
    name: "MSI MPG B550 Gaming Edge WiFi",
    description: "ATX Gaming Motherboard",
    price: 179.99,
    stockQuantity: 70,
    category: "Motherboard",
    compatibilities: [
      {
        ram: "DDR4",
        socket: "AM4",
        series: ["AMD 500 Series", "AMD 400 Series"],
      },
    ],
    powerConsumption: 55,
  },
  {
    id: 7,
    name: "NVIDIA GeForce RTX 3080",
    description: "Graphics card with 10GB GDDR6X memory",
    price: 699.99,
    stockQuantity: 40,
    category: "GPU",
    compatibilities: [],
    powerConsumption: 320,
  },
  {
    id: 8,
    name: "AMD Radeon RX 6800 XT",
    description: "Graphics card with 16GB GDDR6 memory",
    price: 649.99,
    stockQuantity: 50,
    category: "GPU",
    compatibilities: [],
    powerConsumption: 300,
  },
  {
    id: 9,
    name: "Corsair Vengeance LPX 16GB",
    description: "16GB (2 x 8GB) DDR4 DRAM 3200MHz C16 memory kit",
    price: 89.99,
    stockQuantity: 200,
    category: "RAM",
    compatibilities: [{ ram: "DDR4" }],
    powerConsumption: 10,
  },
  {
    id: 10,
    name: "G.Skill Trident Z RGB 32GB",
    description: "32GB (2 x 16GB) DDR4 DRAM 3600MHz C18 memory kit",
    price: 179.99,
    stockQuantity: 150,
    category: "RAM",
    compatibilities: [{ ram: "DDR4" }],
    powerConsumption: 12,
  },
  {
    id: 11,
    name: "Corsair RM850x",
    description: "850W 80 PLUS Gold Certified Fully Modular PSU",
    price: 139.99,
    stockQuantity: 120,
    category: "PSU",
    compatibilities: [],
    powerConsumption: 850,
  },
  {
    id: 12,
    name: "EVGA SuperNOVA 750 G5",
    description: "750W 80 PLUS Gold Certified Fully Modular PSU",
    price: 129.99,
    stockQuantity: 100,
    category: "PSU",
    compatibilities: [],
    powerConsumption: 750,
  },
  {
    id: 13,
    name: "NZXT H510",
    description: "ATX Mid Tower Case",
    price: 69.99,
    stockQuantity: 80,
    category: "Case",
    compatibilities: [],
    powerConsumption: 0,
  },
  {
    id: 14,
    name: "Fractal Design Meshify C",
    description: "ATX Mid Tower Case",
    price: 89.99,
    stockQuantity: 70,
    category: "Case",
    compatibilities: [],
    powerConsumption: 0,
  },
  {
    id: 17,
    name: "Samsung 970 Evo 1TB",
    description: "NVMe M.2 Internal SSD",
    price: 149.99,
    stockQuantity: 100,
    category: "Storage",
    compatibilities: [],
    powerConsumption: 5,
  },
  {
    id: 18,
    name: "WD Blue 1TB",
    description: "3.5 inch Internal HDD",
    price: 49.99,
    stockQuantity: 150,
    category: "Storage",
    compatibilities: [],
    powerConsumption: 6,
  },
  {
    id: 19,
    name: "Seagate Barracuda 2TB",
    description: "3.5 inch Internal HDD",
    price: 69.99,
    stockQuantity: 130,
    category: "Storage",
    compatibilities: [],
    powerConsumption: 8,
  },
  {
    id: 20,
    name: "Crucial MX500 500GB",
    description: "2.5 inch SATA Internal SSD",
    price: 59.99,
    stockQuantity: 140,
    category: "Storage",
    compatibilities: [],
    powerConsumption: 4,
  },
  {
    id: 21,
    name: "Intel Core i7-12700K",
    description: "12th Gen Intel Core i7 processor",
    price: 449.99,
    stockQuantity: 90,
    category: "Processor",
    compatibilities: [
      {
        ram: "DDR5",
        socket: "INTEL",
        series: ["Intel 600 Series", "Intel 500 Series"],
      },
    ],
    powerConsumption: 120,
  },
  {
    id: 22,
    name: "AMD Ryzen 7 5800X",
    description: "8-core, 16-thread unlocked desktop processor",
    price: 399.99,
    stockQuantity: 70,
    category: "Processor",
    compatibilities: [
      {
        ram: "DDR4",
        socket: "AM4",
        series: ["AMD 500 Series", "AMD 400 Series"],
      },
    ],
    powerConsumption: 105,
  },
  {
    id: 23,
    name: "ASUS TUF Gaming B660-PLUS WIFI",
    description: "ATX Gaming Motherboard",
    price: 179.99,
    stockQuantity: 55,
    category: "Motherboard",
    compatibilities: [
      {
        ram: "DDR4",
        socket: "INTEL",
        series: ["Intel 600 Series"],
      },
    ],
    powerConsumption: 50,
  },
  {
    id: 24,
    name: "GIGABYTE B550 AORUS ELITE",
    description: "ATX Gaming Motherboard",
    price: 159.99,
    stockQuantity: 65,
    category: "Motherboard",
    compatibilities: [
      {
        ram: "DDR4",
        socket: "AM4",
        series: ["AMD 500 Series", "AMD 400 Series"],
      },
    ],
    powerConsumption: 55,
  },
  {
    id: 25,
    name: "MSI GeForce RTX 3070 Ti GAMING X TRIO",
    description: "Graphics card with 8GB GDDR6X memory",
    price: 599.99,
    stockQuantity: 35,
    category: "GPU",
    compatibilities: [],
    powerConsumption: 290,
  },
  {
    id: 26,
    name: "ZOTAC GAMING GeForce RTX 3060 Twin Edge",
    description: "Graphics card with 12GB GDDR6 memory",
    price: 399.99,
    stockQuantity: 45,
    category: "GPU",
    compatibilities: [],
    powerConsumption: 170,
  },
  {
    id: 27,
    name: "Corsair Vengeance RGB PRO 32GB",
    description: "32GB (2 x 16GB) DDR4 DRAM 3600MHz C18 memory kit",
    price: 189.99,
    stockQuantity: 130,
    category: "RAM",
    compatibilities: [{ ram: "DDR4" }],
    powerConsumption: 12,
  },
  {
    id: 28,
    name: "Crucial Ballistix 16GB",
    description: "16GB (2 x 8GB) DDR5 DRAM 4800MHz C18 memory kit",
    price: 99.99,
    stockQuantity: 180,
    category: "RAM",
    compatibilities: [{ ram: "DDR5" }],
    powerConsumption: 10,
  },
  {
    id: 29,
    name: "EVGA SuperNOVA 850 G6",
    description: "850W 80 PLUS Gold Certified Fully Modular PSU",
    price: 159.99,
    stockQuantity: 110,
    category: "PSU",
    compatibilities: [],
    powerConsumption: 850,
  },
  {
    id: 30,
    name: "Seasonic FOCUS GX-750",
    description: "750W 80 PLUS Gold Certified Fully Modular PSU",
    price: 139.99,
    stockQuantity: 95,
    category: "PSU",
    compatibilities: [],
    powerConsumption: 750,
  },
  {
    id: 31,
    name: "NZXT H710i",
    description: "ATX Mid Tower Case",
    price: 149.99,
    stockQuantity: 60,
    category: "Case",
    compatibilities: [],
    powerConsumption: 0,
  },
  {
    id: 32,
    name: "Phanteks Eclipse P500A",
    description: "ATX Mid Tower Case",
    price: 129.99,
    stockQuantity: 75,
    category: "Case",
    compatibilities: [],
    powerConsumption: 0,
  },
  {
    id: 33,
    name: "Samsung 980 Pro 2TB",
    description: "NVMe M.2 Internal SSD",
    price: 299.99,
    stockQuantity: 80,
    category: "Storage",
    compatibilities: [],
    powerConsumption: 6,
  },
  {
    id: 34,
    name: "Seagate IronWolf 4TB",
    description: "3.5 inch Internal HDD for NAS",
    price: 99.99,
    stockQuantity: 120,
    category: "Storage",
    compatibilities: [],
    powerConsumption: 7,
  },
  {
    id: 35,
    name: "Western Digital Black SN850 1TB",
    description: "NVMe M.2 Internal SSD",
    price: 199.99,
    stockQuantity: 100,
    category: "Storage",
    compatibilities: [],
    powerConsumption: 5,
  },
  {
    id: 36,
    name: "Crucial BX500 1TB",
    description: "2.5 inch SATA Internal SSD",
    price: 79.99,
    stockQuantity: 150,
    category: "Storage",
    compatibilities: [],
    powerConsumption: 3,
  },
  {
    id: 37,
    name: "ASUS ROG Strix Z690-E Gaming WiFi",
    description: "ATX Gaming Motherboard",
    price: 379.99,
    stockQuantity: 50,
    category: "Motherboard",
    compatibilities: [
      {
        ram: "DDR5",
        socket: "INTEL",
        series: ["Intel 700 Series"],
      },
    ],
    powerConsumption: 60,
  },
  {
    id: 38,
    name: "MSI MPG B660 Gaming Carbon WiFi",
    description: "ATX Gaming Motherboard",
    price: 249.99,
    stockQuantity: 60,
    category: "Motherboard",
    compatibilities: [
      {
        ram: "DDR5",
        socket: "INTEL",
        series: ["Intel 700 Series"],
      },
    ],
    powerConsumption: 55,
  },
  {
    id: 39,
    name: "Corsair Dominator Platinum RGB 32GB",
    description: "32GB (2 x 16GB) DDR5 DRAM 4800MHz C18 memory kit",
    price: 299.99,
    stockQuantity: 100,
    category: "RAM",
    compatibilities: [{ ram: "DDR5" }],
    powerConsumption: 12,
  },
  {
    id: 40,
    name: "G.SKILL Trident Z5 RGB 64GB",
    description: "64GB (2 x 32GB) DDR5 DRAM 5200MHz C22 memory kit",
    price: 599.99,
    stockQuantity: 80,
    category: "RAM",
    compatibilities: [{ ram: "DDR5" }],
    powerConsumption: 15,
  },
  {
    id: 41,
    name: "Intel Core i7-15000K",
    description: "15th Gen Intel Core i7 processor with DDR5 support",
    price: 599.99,
    stockQuantity: 50,
    category: "Processor",
    compatibilities: [
      {
        ram: "DDR5",
        socket: "INTEL",
        series: ["Intel 600 Series"],
      },
    ],
    powerConsumption: 130,
  },
  {
    id: 42,
    name: "AMD Ryzen 9 7900X",
    description:
      "16-core, 32-thread unlocked desktop processor with DDR5 support",
    price: 699.99,
    stockQuantity: 40,
    category: "Processor",
    compatibilities: [
      {
        ram: "DDR5",
        socket: "AM5",
        series: ["AMD 600 Series"],
      },
    ],
    powerConsumption: 120,
  },
  {
    id: 43,
    name: "ASUS ROG Crosshair Z690",
    description: "ATX Gaming Motherboard for AMD with DDR5 support",
    price: 349.99,
    stockQuantity: 60,
    category: "Motherboard",
    compatibilities: [
      {
        ram: "DDR5",
        socket: "AM5",
        series: ["AMD 600 Series"],
      },
    ],
    powerConsumption: 70,
  },
  {
    id: 44,
    name: "Generic PSU",
    description: "150W",
    price: 139.99,
    stockQuantity: 95,
    category: "PSU",
    compatibilities: [],
    powerConsumption: 150,
  },
];

const PcBuilder = () => {
  const navigate = useNavigate();

  const [categorySelected, setCategorySelected] = useState("Processor");
  const [productsSelected, setProductsSelected] = useState([]);
  const [productList, setProductList] = useState(products);

  useEffect(() => {
    setProductList(
      products.filter((product) => product.category == categorySelected)
    );
  }, []);

  const handleAddProduct = (product) => {
    setProductsSelected((prevProducts) => [...prevProducts, product]);
    console.log(productsSelected);
    switch (product.category) {
      case "Processor":
        const compatibleMotherboards = products.filter(
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
        const compatibleRAMS = products.filter(
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
        const storage = products.filter((p) => p.category == "Storage");
        setCategorySelected("Storage");
        setProductList(storage);
        break;
      case "Storage":
        const gpu = products.filter((p) => p.category == "GPU");
        setCategorySelected("GPU");
        setProductList(gpu);
        break;
      case "GPU":
        const compatiblePSUs = products.filter(
          (p) =>
            p.category === "PSU" &&
            p.powerConsumption > product.powerConsumption
        );
        setCategorySelected("PSU");
        setProductList(compatiblePSUs);
        break;
      case "PSU":
        const cases = products.filter((p) => p.category == "Case");
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
              <div key={product.id} className="col mb-4">
                <Card style={{ width: "250px" }}>
                  <Card.Body>
                    <Card.Title>{product.name}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">
                      {product.category}
                    </Card.Subtitle>
                    <Card.Text>{product.description}</Card.Text>
                  </Card.Body>
                  <ListGroup className="list-group-flush">
                    <ListGroup.Item>Price: ${product.price}</ListGroup.Item>
                    <ListGroup.Item>
                      Stock: {product.stockQuantity} unidades
                    </ListGroup.Item>
                    <ListGroup.Item>
                      Power Consumption: {product.powerConsumption} Wats
                    </ListGroup.Item>
                  </ListGroup>
                  <Button onClick={() => handleAddProduct(product)}>Add</Button>
                </Card>
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
