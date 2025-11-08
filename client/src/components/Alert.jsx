import { useAlert } from '../context/AlertContext';

const Alert = () => {
  const { alert, hideAlert } = useAlert();

  if (!alert) return null;

  const alertStyles = {
    success: 'bg-green-100 border-green-400 text-green-700',
    error: 'bg-red-100 border-red-400 text-red-700',
    warning: 'bg-yellow-100 border-yellow-400 text-yellow-700',
    info: 'bg-blue-100 border-blue-400 text-blue-700',
  };

  return (
    <div
      className={`fixed top-4 right-4 z-50 border px-4 py-3 rounded shadow-lg max-w-md ${
        alertStyles[alert.type] || alertStyles.success
      }`}
      role="alert"
    >
      <div className="flex items-center justify-between">
        <span>{alert.message}</span>
        <button
          onClick={hideAlert}
          className="ml-4 text-lg font-bold hover:opacity-75"
          aria-label="Close alert"
        >
          ×
        </button>
      </div>
    </div>
  );
};

export default Alert;

