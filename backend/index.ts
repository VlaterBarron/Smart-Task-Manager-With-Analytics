import app from './src/app.ts';
import 'dotenv/config';

const port = process.env.PORT || 8080;

app.listen(port, () => {
    console.log(`Server is listening on port: http://localhost:${port}`);
});