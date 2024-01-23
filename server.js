/* eslint-disable import/extensions */
import app from './src/app.js';

const PORT = process.env.PORT || 8080;
const BASE_URL = process.env.BASE_URL || 'http://localhost';

app.listen(PORT, () => console.log(`Listening at ${BASE_URL}:${PORT}`));
