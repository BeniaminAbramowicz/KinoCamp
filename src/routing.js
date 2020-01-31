import express from 'express';
import App from './App';

const application = express();

application.get('/', (req, res) => {
    res.send(App);
});

application.listen(3000, () => console.log('Website server started'));