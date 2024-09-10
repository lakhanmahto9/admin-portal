import EcommerceLayout from "@/components/nft-ecommerce/ecommerce-layout/ecommerce-layout";
import { ESellerProfile } from "@/components/nft-ecommerce/seller-profile/seller-profile";

const ecommerceDashboard : React.FC = () =>{
    return (
        <EcommerceLayout>
            <ESellerProfile/>
        </EcommerceLayout>
    )
}
export default ecommerceDashboard;