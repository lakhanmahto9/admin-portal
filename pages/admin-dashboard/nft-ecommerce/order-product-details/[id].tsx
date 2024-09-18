import BuyerPurchasedProducts from "@/components/nft-ecommerce/buyers/buyerPurchasedProducts";
import EcommerceLayout from "@/components/nft-ecommerce/ecommerce-layout/ecommerce-layout";
import OrderProductDetails from "@/components/nft-ecommerce/orders/orderProductDetails";

const orderProductDetails : React.FC = () =>{
    return (
        <EcommerceLayout>
            <OrderProductDetails/>
        </EcommerceLayout>
    )
}
export default orderProductDetails;