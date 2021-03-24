import app from './app';

const PORT = process.env.PORT || 3333;

app.listen(process.env.PORT || 3333, () => {
  console.info(`Server running on port ${PORT}...`);
});
