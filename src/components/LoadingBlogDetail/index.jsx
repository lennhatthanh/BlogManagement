import Lottie from "lottie-react";
import loading from "@/assets/loading.json"

export default function LoadingBlogDetail() {
    return (
        <div style={{ width: 400, height: 400, display: "flex", alignItems: "center" }}>
            <Lottie animationData={loading} loop={true} />
        </div>
    );
}
