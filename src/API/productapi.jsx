import { Axios } from "../config/config"

const apiUrl = "user" 

export const GetProduct =async ()=>{
    const response = await Axios.get(`${apiUrl}/get-products`);
    return response.data;
}



export const GetBanners = async () => {
  const response = await Axios.get(`${apiUrl}/get-banners`);
  return response.data;
};


export const GetProfile = async () => {
  const response = await Axios.get(`${apiUrl}/get-profile`);
  return response.data;
};


export const updateProfile = async (id,data) => {
  const response = await Axios.put(`${apiUrl}/update-profile/${id}`,data);
  return response.data;
};

export const CreateOrder = async (orderData) => {
  const response = await Axios.post("payment/create-order", orderData);
  console.log("oreder creat payment",response.data);
  return response.data;
}

export const VerifyPayment = async (paymentData) => {
  const response = await Axios.post("payment/verify-payment", paymentData);
  console.log("veryfy payment",response.data);
  return response.data;
}

export const getOrderHistory = async () => {
  const response = await Axios.get(`${apiUrl}/order-history`);
  console.log("order", response.data);
  return response.data;
}

export async function ChangePassword(payload) {
    const response = await Axios.put(`${apiUrl}/change-password`, payload);
    return response.data;
}

export async function GetOffers() {
    const response = await Axios.get(`${apiUrl}/get-offer`);
    return response.data;
}

export const GetBestSelling = async () => {
  try {
    const response = await Axios.get(`${apiUrl}/get-best-seller-product`);
    console.log("Best selling API response:", response.data);

    return response.data; 
  } catch (error) {
    console.error("Error fetching best selling products:", error);
    throw error;
  }
};


export const addReviewApi = (payload) => {
  return Axios.post(`${apiUrl}/add-rating-review`, payload)
}

export const GetReviewApi = (productId) => {
  return Axios.get(`${apiUrl}/get-rating-review/${productId}`)
}

export const addFeedback = (payload) => {
  return Axios.post(`${apiUrl}/feedback`, payload)
}

export const GetFeedback = async() => {
  return  Axios.get(`${apiUrl}/feedback`)
}

export const addLike = (userId, ProductId) => {
  return Axios.post(`${apiUrl}/like`,{userId,ProductId});
}


export const GetLike = async (productId, userId) => {
  return Axios.get(`${apiUrl}/getlike/${productId}/${userId}`);
};

export const getOrders = async () => {
  const response = await Axios.get(`${apiUrl}/order-history`);
  console.log("order", response.data);
  return response.data;
}

export const GetAddress = async(userId) => {
  return Axios.get (`${apiUrl}/getuseraddress/${userId}`)
}