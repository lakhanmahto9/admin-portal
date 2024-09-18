import EcommerceLayout from "@/components/nft-ecommerce/ecommerce-layout/ecommerce-layout";
import Orders from "@/components/nft-ecommerce/orders/orders";

const products : React.FC = () =>{
    return (
        <EcommerceLayout>
            <Orders/>
        </EcommerceLayout>
    )
}
export default products;