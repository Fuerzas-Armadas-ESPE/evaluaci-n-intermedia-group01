// ProductCard.jsx
import { Card, Button, Form } from 'react-bootstrap';
import { useState } from 'react';
import { supabase } from './supabaseClient';
import './App.css'; // Asegúrate de importar el CSS

function ProductCard({ product }) {
    const [editing, setEditing] = useState(false);
    const [name, setName] = useState(product.name);
    const [stock, setStock] = useState(product.stock);
    const [cantidad, setCantidad] = useState(product.cantidad);
    const [description, setDescription] = useState(product.description);

    async function updateProduct() {
        try {
            const { data, error } = await supabase
                .from("products")
                .update({
                    name,
                    description,
                    stock,
                    cantidad
                })
                .eq("id", product.id);
            
            if (error) throw error;
            // Consider using state management or context for live updates without reloading.
            window.location.reload();
        } catch (error) {
            alert(error.message);
        }
    }

    async function deleteProduct() {
        try {
            const { data, error } = await supabase
                .from("products")
                .delete()
                .eq("id", product.id);
            
            if (error) throw error;
            // Consider using state management or context for live updates without reloading.
            window.location.reload();
        } catch (error) {
            alert(error.message);
        }
    }

    return (
        <Card className="product-card">
            <Card.Body>
                {!editing ? (
                    <>
                        <Card.Title>{product.name}</Card.Title>
                        <Card.Text>{product.description}</Card.Text>
                        <Card.Text>ESTADO: {product.stock}</Card.Text>
                        <Card.Text>NRC: {product.cantidad}</Card.Text>
                        <Button variant="danger" onClick={deleteProduct}>Borrar Tema</Button>
                        <Button variant="secondary" onClick={() => setEditing(true)}>Editar Tema</Button>
                    </>
                ) : (
                    <>
                        <h4>Editar Tema</h4>
                        <Button size="sm" onClick={() => setEditing(false)}>Volver</Button>
                        <Form.Label>Nombre del Tema</Form.Label>
                        <Form.Control
                            type="text"
                            defaultValue={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <Form.Label>Descripción del Tema</Form.Label>
                        <Form.Control
                            type="text"
                            defaultValue={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                       <Form.Label>ESTADO</Form.Label>
<Form.Select 
  defaultValue={stock} 
  onChange={(e) => setStock(e.target.value)}
>
  <option value="">Seleccione el estado</option>
  <option value="PENDIENTE❓" selected={stock === "PENDIENTE❓"}>PENDIENTE❓</option>
  <option value="REALIZADA✅" selected={stock === "REALIZADA✅"}>REALIZADA✅</option>
</Form.Select>

                        <Form.Label>NRC</Form.Label>
                        <Form.Control
                            type="text"
                            defaultValue={cantidad}
                            onChange={(e) => setCantidad(e.target.value)}
                        />
                        <br />
                        <Button onClick={updateProduct}>Actualizar TEMA</Button>
                    </>
                )}
            </Card.Body>
        </Card>
    );
}

export default ProductCard;
