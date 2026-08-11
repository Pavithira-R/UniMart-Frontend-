import ProductCard from "./ProductCard";
import type { Product } from "../../types/products";

interface ProductGridProps {
    products: Product[];
    wishlistIds?: number[];
    onWishlistToggle?: (id: number) => void;
}

function ProductGrid({ products, wishlistIds = [], onWishlistToggle }: ProductGridProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
                <ProductCard
                    key={product.id}
                    id={product.id}
                    image={product.image}
                    title={product.title}
                    price={product.price}
                    category={product.category}
                    location={product.location}
                    condition={product.condition}
                    isWishlisted={wishlistIds.includes(product.id)}
                    onWishlistToggle={onWishlistToggle ? (e) => {
                        e.preventDefault();
                        onWishlistToggle(product.id);
                    } : undefined}
                />
            ))}
        </div>
    );
}

export default ProductGrid;