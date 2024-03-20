const socket = io(); // Establishes a connection between the client and the server using Socket.IO in a client-side web application.

socket.on("products", (products) => {
    const productList = document.getElementById("productsList");
    productList.innerHTML = ""
    products.forEach((product) => {
        const listItem = document.createElement("li");
        listItem.textContent = `ID: ${product._id},
                                        Title: ${product.title},
                                        Description: ${product.description},
                                        Code: ${product.code},
                                        Price: ${product.price},
                                        Stock: ${product.stock},
                                        Category: ${product.category},
                                        Status: ${product.status},
                                        Thumbnail: ${product.thumbnail}`
        productList.appendChild(listItem);
    });
})

document.getElementById("newProductForm").addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const newProduct = {
        title: formData.get("title"),
        description: formData.get("description"),
        code: formData.get("code"),
        price: formData.get("price"),
        stock: formData.get("stock"),
        category: formData.get("category"),
        status: formData.get("status")
    };
    socket.emit("newProduct", newProduct);
});