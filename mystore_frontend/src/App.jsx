import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import "./App.css";
import superstoreimg from "./superstore.png";
import CategoryList from "./CategoryList";

export const App = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [updateList, setUpdateList] = useState(false); // Estado para manejar la actualización

  const handleSubmit = (event) => {
    event.preventDefault();
    // Realizar petición POST con los campos "name" y "description"
    fetch("http://localhost:4000/categories/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, description }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setUpdateList(!updateList); // Cambia el estado para forzar la actualización de la lista
      })
      .catch((error) => console.error("Error:", error));
  };

  return (
    <div className="App">
      <img src={superstoreimg} alt="Super Store" className="imagen" />
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formDescription">
          <Form.Label>Description</Form.Label>
          <Form.Control
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Send
        </Button>
      </Form>

      {/* Aquí incluimos el componente CategoryList */}
      <h2>Category List</h2>
      {/* Pasamos el updateList como prop al componente CategoryList */}
      <CategoryList updateList={updateList} />
    </div>
  );
};
