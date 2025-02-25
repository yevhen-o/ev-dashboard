import Toast from "./Toast";
import "./Toast.scss";
import { useSelector } from "react-redux";
import { toastsToDisplaySelector } from "../toastsSlice";

const ToastProvider: React.FC = () => {
  const toastsToDisplay = useSelector(toastsToDisplaySelector);

  return (
    <div className={"toasts"}>
      {toastsToDisplay &&
        toastsToDisplay.map((toast) => (
          <div key={toast.id} className={"toasts-container"}>
            <Toast toast={toast} />
          </div>
        ))}
    </div>
  );
};

export default ToastProvider;
