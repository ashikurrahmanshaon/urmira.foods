import { CheckCircle2, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';

function Toast() {
  const { toastMessage, setToastMessage, setIsCartDrawerOpen } = useCart();

  if (!toastMessage) return null;

  const handleOpenDrawer = () => {
    setToastMessage(null);
    setIsCartDrawerOpen(true);
  };

  return (
    <div className="ios-toast-floating">
      <div className="ios-toast-icon">
        <CheckCircle2 size={20} color="#10b981" />
      </div>
      <div className="ios-toast-body">
        <span className="ios-toast-title">Added to your Bag!</span>
        <span className="ios-toast-sub">{toastMessage.name} ({toastMessage.quantity}x)</span>
      </div>
      <button className="ios-toast-action-btn" onClick={handleOpenDrawer}>
        <span>View Bag</span>
        <ArrowRight size={14} />
      </button>
    </div>
  );
}

export default Toast;
