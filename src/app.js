import express from "express";

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const PORT = 8000;

const server = app.listen(PORT, () => {
	console.log(`Server up on http://localhost:${PORT}`);
});

app.get('/', (req, res) => {
	res.send('funcionando')
})