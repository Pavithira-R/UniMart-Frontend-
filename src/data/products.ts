import type { Product } from "../types/products";

const loadCustomProducts = (): Product[] => {
    const raw = localStorage.getItem("unimart_custom_products");
    return raw ? JSON.parse(raw) : [];
};

export const products: Product[] = [
    ...loadCustomProducts(),
    {
        id: 1,
        title: "Gaming Laptop (ASUS ROG)",
        price: "Rs. 180,000",
        category: "Electronics",
        image: "https://picsum.photos/400/300?random=1",
        location: "University of Kelaniya",
        description: "High performance gaming laptop in excellent condition. Intel i7, 16GB RAM, RTX 3060. Perfect for gaming and coding/development tasks. Selling because I am upgrading.",
        condition: "Good",
        seller: {
            id: "user_1",
            name: "Amal Silva",
            email: "amal@student.kln.ac.lk",
            phone: "0712345678"
        },
        university: "University of Kelaniya",
        postedDate: "2026-08-01",
        images: [
            "https://picsum.photos/400/300?random=1",
            "https://picsum.photos/400/300?random=11",
            "https://picsum.photos/400/300?random=12"
        ]
    },
    {
        id: 2,
        title: "Engineering Mathematics Textbook",
        price: "Rs. 4,500",
        category: "Books",
        image: "https://picsum.photos/400/300?random=2",
        location: "University of Colombo",
        description: "K.A. Stroud Engineering Mathematics 7th edition. Extremely useful for first and second year engineering students. No highlighted pages, clean pages.",
        condition: "Like New",
        seller: {
            id: "user_2",
            name: "Nimali Perera",
            email: "nimali@student.cmb.ac.lk",
            phone: "0771234567"
        },
        university: "University of Colombo",
        postedDate: "2026-08-03"
    },
    {
        id: 3,
        title: "Wooden Study Table with Drawer",
        price: "Rs. 8,000",
        category: "Furniture",
        image: "https://picsum.photos/400/300?random=3",
        location: "University of Moratuwa",
        description: "Sturdy wooden study table with a side drawer. Ideal for student dorm rooms. Minor scratches on the surface but structurally in perfect shape.",
        condition: "Good",
        seller: {
            id: "user_3",
            name: "Kasun Jayasuriya",
            email: "kasun@student.mrt.ac.lk"
        },
        university: "University of Moratuwa",
        postedDate: "2026-08-05"
    },
    {
        id: 4,
        title: "iPhone 13 - 128GB",
        price: "Rs. 145,000",
        category: "Mobile Phones",
        image: "https://picsum.photos/400/300?random=4",
        location: "University of Kelaniya",
        description: "Factory unlocked iPhone 13, Midnight black color. Battery health is at 88%. No face ID issues or repairs done. Comes with the original box and charging cable.",
        condition: "Like New",
        seller: {
            id: "user_1",
            name: "Amal Silva",
            email: "amal@student.kln.ac.lk",
            phone: "0712345678"
        },
        university: "University of Kelaniya",
        postedDate: "2026-08-06"
    },
    {
        id: 5,
        title: "Winter Jacket / Hoodie",
        price: "Rs. 3,200",
        category: "Clothing",
        image: "https://picsum.photos/400/300?random=5",
        location: "University of Peradeniya",
        description: "Thick blue hoodie, perfect for cold mornings in Peradeniya. Size L. Worn only a few times, washed and clean.",
        condition: "Good",
        seller: {
            id: "user_4",
            name: "Sanduni Cooray",
            email: "sanduni@student.pdn.ac.lk",
            phone: "0769876543"
        },
        university: "University of Peradeniya",
        postedDate: "2026-08-04"
    },
    {
        id: 6,
        title: "PlayStation 4 Console",
        price: "Rs. 48,000",
        category: "Gaming",
        image: "https://picsum.photos/400/300?random=6",
        location: "University of Colombo",
        description: "PS4 Slim 500GB console. Package includes 1 DualShock controller and 3 games (GTA V, FIFA 22, Horizon Zero Dawn). Works flawlessly.",
        condition: "Good",
        seller: {
            id: "user_2",
            name: "Nimali Perera",
            email: "nimali@student.cmb.ac.lk",
            phone: "0771234567"
        },
        university: "University of Colombo",
        postedDate: "2026-08-07"
    },
    {
        id: 7,
        title: "Sony Noise Cancelling Headphones",
        price: "Rs. 25,000",
        category: "Accessories",
        image: "https://picsum.photos/400/300?random=7",
        location: "University of Moratuwa",
        description: "Sony WH-CH710N Wireless Noise Cancelling Over-Ear Headphones. Excellent battery life (up to 35 hours). Very comfortable for long study sessions.",
        condition: "Like New",
        seller: {
            id: "user_3",
            name: "Kasun Jayasuriya",
            email: "kasun@student.mrt.ac.lk"
        },
        university: "University of Moratuwa",
        postedDate: "2026-08-02"
    }
];

export const addCustomProduct = (newProduct: Product) => {
    const current = loadCustomProducts();
    localStorage.setItem("unimart_custom_products", JSON.stringify([newProduct, ...current]));
    products.unshift(newProduct);
};

export const updateCustomProduct = (updatedProduct: Product) => {
    const current = loadCustomProducts();
    const next = current.map((p) => (p.id === updatedProduct.id ? updatedProduct : p));
    localStorage.setItem("unimart_custom_products", JSON.stringify(next));
    const index = products.findIndex((p) => p.id === updatedProduct.id);
    if (index !== -1) {
        products[index] = updatedProduct;
    }
};

export const deleteCustomProduct = (id: number) => {
    const current = loadCustomProducts();
    const next = current.filter((p) => p.id !== id);
    localStorage.setItem("unimart_custom_products", JSON.stringify(next));
    const index = products.findIndex((p) => p.id === id);
    if (index !== -1) {
        products.splice(index, 1);
    }
};