import EcommerceLayout from "@/components/nft-ecommerce/ecommerce-layout/ecommerce-layout";
import Products from "@/components/nft-ecommerce/products/products";
import Sellers from "@/components/nft-ecommerce/sellers/sellers";

const products : React.FC = () =>{
    return (
        <EcommerceLayout>
            <Products/>
        </EcommerceLayout>
    )
}
export default products;