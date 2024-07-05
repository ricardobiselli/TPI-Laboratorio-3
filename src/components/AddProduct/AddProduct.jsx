// import  { useState } from 'react';
// import { Form, Button, Container } from 'react-bootstrap';
// import { addProduct } from '../../api/ApiConnection';

// /*ProductManager ahora tiene un form que permite agregar productos sin necesidad de este componente*/
// /*ProductManager ahora tiene un form que permite agregar productos sin necesidad de este componente*/
// /*ProductManager ahora tiene un form que permite agregar productos sin necesidad de este componente*/

// const AddProductForm = () => {
//     const [name, setName] = useState('');
//     const [description, setDescription] = useState('');
//     const [category, setCategory] = useState('');
//     const [price, setPrice] = useState('');
//     const [stockQuantity, setStockQuantity] = useState('');
//     const [powerConsumption, setPowerConsumption] = useState('');
//     const [isLoading, setIsLoading] = useState(false);

//     const handleNameChange = (e) => setName(e.target.value);
//     const handleDescriptionChange = (e) => setDescription(e.target.value);
//     const handleCategoryChange = (e) => setCategory(e.target.value);
//     const handlePriceChange = (e) => setPrice(e.target.value);
//     const handleStockQuantityChange = (e) => setStockQuantity(e.target.value);
//     const handlePowerConsumptionChange = (e) => setPowerConsumption(e.target.value);

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setIsLoading(true);
//         const newProduct = {
//             name,
//             description,
//             category,
//             price: parseFloat(price),
//             stockQuantity: parseInt(stockQuantity),
//             powerConsumption: parseInt(powerConsumption)
//         };

//         try {
//             await addProduct(newProduct);
//             setName('');
//             setDescription('');
//             setCategory('');
//             setPrice('');
//             setStockQuantity('');
//             setPowerConsumption('');
//         } catch (error) {
//             console.error('Add Product has failded', error);
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     return (
//         <Container>
//             <h2>Add Product</h2>
//             <Form onSubmit={handleSubmit}>
//                 <Form.Group controlId="formProductName">
//                     <Form.Label>Name</Form.Label>
//                     <Form.Control type="text" value={name} onChange={handleNameChange} required />
//                 </Form.Group>
//                 <Form.Group controlId="formProductDescription">
//                     <Form.Label>Description</Form.Label>
//                     <Form.Control type="text" value={description} onChange={handleDescriptionChange} required />
//                 </Form.Group>
//                 <Form.Group controlId="formProductCategory">
//                     <Form.Label>Category</Form.Label>
//                     <Form.Control type="text" value={category} onChange={handleCategoryChange} required />
//                 </Form.Group>
//                 <Form.Group controlId="formProductPrice">
//                     <Form.Label>Price</Form.Label>
//                     <Form.Control type="number" value={price} onChange={handlePriceChange} required />
//                 </Form.Group>
//                 <Form.Group controlId="formProductStockQuantity">
//                     <Form.Label>Stock Quantity</Form.Label>
//                     <Form.Control type="number" value={stockQuantity} onChange={handleStockQuantityChange} required />
//                 </Form.Group>
//                 <Form.Group controlId="formProductPowerConsumption">
//                     <Form.Label>Power Consumption</Form.Label>
//                     <Form.Control type="number" value={powerConsumption} onChange={handlePowerConsumptionChange} required />
//                 </Form.Group>
//                 <Button variant="primary" type="submit" disabled={isLoading}>
//                     {isLoading ? 'Adding...' : 'Add Product'}
//                 </Button>
//             </Form>
//         </Container>
//     );
// };

// export default AddProductForm;