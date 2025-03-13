import { product, reviews } from "../utils/api.js";

export const viewLogin = (req, res) => {
  res.render("login/login",{layout: "auth"});
};
export const viewSignup = (req, res) => {
  res.render("signup/signup",{layout: "auth"});
};
export const viewForgotPassword = (req, res) => {
  res.render("forgotPassword/forgot-password",{layout: "auth"});
};
export const viewOTP = (req, res) => {
  res.render("otp/otp",{layout: "auth"});
};
export const viewSuccessful = (req, res) => {
  res.render("successful/successful",{layout: "auth"});
};

const orders = [
  {
    img: "/assets/images/dress.png",
    name: "Girls Pink Moana Printed Dress",
    size: "S",
    qty: 1,
    price: 80,
    status: "Delivered",
    statusClass: "delivered",
    showReview: true,
  },
  {
    img: "/assets/images/dress.png",
    name: "Women Textured Handheld Bag",
    size: "Regular",
    qty: 1,
    price: 80,
    status: "In Process",
    statusClass: "in-process",
    showCancel: true,
  },
  {
    img: "/assets/images/dress.png",
    name: "Tailored Cotton Casual Shirt",
    size: "M",
    qty: 1,
    price: 40,
    status: "In Process",
    statusClass: "in-process",
    showCancel: true,
  },
];

export const viewMyOrder = (req, res) => {
  res.render("my-orders", { orders });
};
export const viewDetailProdct = (req, res) => {
  res.render("detailProduct", { title: "Giới thiệu", layout: "productPage" });
};
export const viewManageAddress = (req, res) => {
  res.render("manageAddress/manageAddress", {
    title: "Giới thiệu",
    layout: "productPage",
  });
};
export const viewMyWishList = (req, res) => {
  res.render("myWishList/myWishList", {
    title: "Giới thiệu",
    layout: "productPage",
  });
};
export const viewSaveCard = (req, res) => {
  res.render("saveCard/saveCard", {
    title: "Giới thiệu",
    layout: "productPage",
  });
};

export const viewHome = async (req, res) => {
try {
  const productData = await product()
  const reviewData = await reviews()
  
  res.render("home/home",{title: "Trang chủ",products:productData.data, ratings: reviewData.data})
} catch (error) {
  console.log(error);
}

// export const commentsHome = async (req, res) => {
// try {
//   const data = await reviews()
//   res.render
// } catch (error) {
//   console.log(error);
// }



  // res.render("home/home", {  
    // title: "Trang chủ",
    // products: [
    //     { name: "Roadstar", image: "https://5.imimg.com/data5/VU/PH/FZ/SELLER-71697535/ladies-fashion-hand-bag-500x500.jpg", description: "Printed Cotton T-Shirt", price: 38, oldPrice: 40 },
    //     { name: "Allen Solly", image: "https://5.imimg.com/data5/VU/PH/FZ/SELLER-71697535/ladies-fashion-hand-bag-500x500.jpg", description: "Women Textured Bag", price: 80, oldPrice: 100 },
    //     { name: "Louis Philippe", image: "https://5.imimg.com/data5/VU/PH/FZ/SELLER-71697535/ladies-fashion-hand-bag-500x500.jpg", description: "Polo Collar T-Shirt", price: 50, oldPrice: 65 },
    //     { name: "Adidas", image: "https://5.imimg.com/data5/VU/PH/FZ/SELLER-71697535/ladies-fashion-hand-bag-500x500.jpg", description: "Men Running Shoes", price: 60, oldPrice: 75 },
    //     { name: "Trendyol", image: "https://5.imimg.com/data5/VU/PH/FZ/SELLER-71697535/ladies-fashion-hand-bag-500x500.jpg", description: "Floral Embroidered Dress", price: 35, oldPrice: 45 },
    //     { name: "YK Disney", image: "https://5.imimg.com/data5/VU/PH/FZ/SELLER-71697535/ladies-fashion-hand-bag-500x500.jpg", description: "Girls Pink Moana Dress", price: 80, oldPrice: 100 },
    //     { name: "US Polo", image: "https://5.imimg.com/data5/VU/PH/FZ/SELLER-71697535/ladies-fashion-hand-bag-500x500.jpg", description: "Tailored Cotton Shirt", price: 40, oldPrice: 50 },
    //     { name: "Zyla", image: "https://5.imimg.com/data5/VU/PH/FZ/SELLER-71697535/ladies-fashion-hand-bag-500x500.jpg", description: "Women Sandals", price: 35, oldPrice: 40 }
    // ],
    // categories: [
    //   { name: "Casual Wear", image: "https://img.freepik.com/premium-photo/style-everyday-mens-casual-shirt-photoshoot-poses-boys-shirt_463958-96.jpg" },
    //   { name: "Western Wear", image: "https://img.freepik.com/premium-photo/style-everyday-mens-casual-shirt-photoshoot-poses-boys-shirt_463958-102.jpg?w=360" },
    //   { name: "Ethnic Wear", image: "https://img.freepik.com/premium-photo/style-everyday-mens-casual-shirt-photoshoot-poses-boys-shirt_463958-97.jpg?w=360" },
    //   { name: "Kids Wear", image: "https://images.squarespace-cdn.com/content/v1/555243eae4b08eb084d60440/1673714156665-XJ5S7LUMCI79VBRZ94LP/heron_017.jpg?format=500w" },
    //   { name: "Sports Wear", image: "https://cdn.pixabay.com/photo/2016/10/07/19/29/woman-1721066_960_720.jpg" },
    //   { name: "Formal Wear", image: "https://cdn.pixabay.com/photo/2017/08/06/00/11/fashion-2598261_960_720.jpg" },
    //   { name: "Accessories", image: "https://cdn.pixabay.com/photo/2015/03/26/10/01/watch-690091_960_720.jpg" },
    //   { name: "Footwear", image: "https://cdn.pixabay.com/photo/2016/11/29/13/10/adult-1867743_960_720.jpg" }
    // ],
    // ratings: [
    //   {
    //      "user_id": {
            // "email": "user@gmail.com",
            // "name": "nguyenkhoanhathuy",
            // "role": "customer",
            // "avatar": "../upload/avatar.jpg",
    // },
    //       review: "It is a long established fact that a reader will be distracted by readable content...",
    //       rating: 5
    //   },
    //   {
    //       name: "Jacob Jones",
    //       role: "Co-Founder",
    //       image: "https://randomuser.me/api/portraits/men/32.jpg",
    //       review: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
    //       rating: 4
    //   },
    //   {
    //       name: "Jenny Wilson",
    //       role: "Fashion Designer",
    //       image: "https://randomuser.me/api/portraits/women/68.jpg",
    //       review: "Contrary to popular belief, Lorem Ipsum is not simply random text.",
    //       rating: 5
    //   },
    //   {
    //     name: "Michael Scott",
    //     role: "Manager",
    //     image: "https://randomuser.me/api/portraits/men/45.jpg",
    //     review: "Amazing experience! The service was top-notch and exceeded my expectations.",
    //     rating: 4
    //   },
    //   {
    //     name: "Daniel Carter",
    //     role: "Software Engineer",
    //     image: "https://randomuser.me/api/portraits/men/50.jpg",
    //     review: "A very well-thought-out product. Customer service was also very responsive!",
    //     rating: 4
    // },
    // {
    //     name: "Sophia Martinez",
    //     role: "Entrepreneur",
    //     image: "https://randomuser.me/api/portraits/women/30.jpg",
    //     review: "Exceeded my expectations! Will definitely be purchasing again.",
    //     rating: 5
    // }
    // ],
    // instagramStories: [
    //   { image: "/images/story1.jpg", alt: "Story 1" },
    //   { image: "/images/story2.jpg", alt: "Story 2" },
    //   { image: "/images/story3.jpg", alt: "Story 3" },
    //   { image: "/images/story4.jpg", alt: "Story 4" }
    // ],
    // delivery: [
    //   { icon: "fa-solid fa-truck", title: "Free Shipping", description: "Free shipping for orders above $150" },
    //   { icon: "fa-solid fa-hand-holding-dollar", title: "Money Guarantee", description: "Within 30 days for an exchange" },
    //   { icon: "fa-solid fa-headset", title: "Online Support", description: "24 hours a day, 7 days a week" },
    //   { icon: "fa-solid fa-credit-card", title: "Flexible Payment", description: "Pay with multiple credit cards" }
    // ]
  // });
}
