import axios from 'axios';


const instance =axios.create({
    baseURL : 'https://react-cloth-shop.firebaseio.com/'
})

export default instance;
