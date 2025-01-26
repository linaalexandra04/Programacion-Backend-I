import express from 'express';
import mongoose from 'mongoose';
import mocksRouter from './routes/mocks.router.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const mongoUri = 'mongodb+srv://alexa999:29oO4cbPUrXPIdUg@cluster1.mh8bk.mongodb.net/tiendaCafe?retryWrites=true&w=majority&appName=Cluster1';

mongoose
  .connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Conectado a MongoDB');
  })
  .catch((err) => {
    console.error('Error al conectar a MongoDB:', err);
  });

// Rutas
app.use('/api/mocks', mocksRouter);

app.get('/', (req, res) => {
  res.send('API funcionando correctamente. Usa las rutas /api/mocks.');
});

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});

