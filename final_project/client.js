const axios = require("axios");

// 1. Get all books - Using async callback function
const getAllBooks = async () => {
  try {
    const response = await axios.get("http://localhost:3098/");
    console.log("All Books:", response.data);
  } catch (error) {
    console.error(
      "Error fetching all books:",
      error.response?.data || error.message
    );
  }
};

// 2. Search by ISBN - Using Promises
const searchByISBN = (isbn) => {
  return axios
    .get(`http://localhost:3098/isbn/${isbn}`)
    .then((response) => {
      console.log(`Book with ISBN ${isbn}:`, response.data);
      return response.data;
    })
    .catch((error) => {
      console.error(
        `Error searching by ISBN ${isbn}:`,
        error.response?.data || error.message
      );
    });
};

// 3. Search by Author - Using async/await
const searchByAuthor = async (author) => {
  try {
    const response = await axios.get(`http://localhost:3098/author/${author}`);
    console.log(`Books by Author ${author}:`, response.data);
  } catch (error) {
    console.error(
      `Error searching by author ${author}:`,
      error.response?.data || error.message
    );
  }
};

// 4. Search by Title - Using async/await
const searchByTitle = async (title) => {
  try {
    const response = await axios.get(`http://localhost:3098/title/${title}`);
    console.log(`Books with Title "${title}":`, response.data);
  } catch (error) {
    console.error(
      `Error searching by title "${title}":`,
      error.response?.data || error.message
    );
  }
};

getAllBooks(); // Usando função assíncrona para obter todos os livros
searchByISBN("8"); // Usando Promises para buscar por ISBN
searchByAuthor("Chinua Achebe"); // Usando async/await para buscar por autor
searchByTitle("Things Fall Apart"); // Usando async/await para buscar por título
