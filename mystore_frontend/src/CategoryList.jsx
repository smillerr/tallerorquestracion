import React, { useEffect, useState } from "react";

const CategoryList = ({ updateList }) => {
  // Recibimos la prop "updateList"
  const [categories, setCategories] = useState([]);
  const [error] = useState(null); // Estado para manejar errores

  useEffect(() => {
    // Hacemos la petición GET a la API cuando el componente se monta y cuando "updateList" cambia
    fetch("http://localhost:4000/categories/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error en la petición: " + response.statusText);
        }
        return response.json();
      })
      .then((data) => {
        setCategories(data);
      });
  }, [updateList]);

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <table className="table table-bordered">
      {" "}
      {/* Clase Bootstrap para añadir bordes */}
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        {categories.map((category) => (
          <tr key={category.id}>
            <td>{category.id}</td>
            <td>{category.name}</td>
            <td>{category.description}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CategoryList;
