export interface Product {
    id: number;
    title: string;
    price: string; // e.g. "Rs. 180,000" or just number. Since existing is "Rs. 180,000" string, let's keep string.
    category: string;
    image: string;
    location: string;
    description: string;
    condition: "New" | "Like New" | "Good" | "Fair";
    seller: {
        id: string;
        name: string;
        email: string;
        phone?: string;
    };
    university: string;
    postedDate: string;
    images?: string[];
    status?: "Available" | "Sold";
}