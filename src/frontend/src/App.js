import React, { useState } from 'react';
import axios from 'axios';
import './styles.css';

const App = () => {
    const [orderId, setOrderId] = useState(''); // Estado para el ID del pedido
    const [orderStatus, setOrderStatus] = useState(null); // Estado para los detalles del pedido
    const [loading, setLoading] = useState(false); // Estado para el indicador de carga
    const [error, setError] = useState(null); // Estado para manejar errores

    // Maneja la búsqueda del estado del pedido
    const handleSearch = async () => {
        if (!orderId) {
            alert('Por favor, ingresa un ID de pedido.');
            return;
        }

        setLoading(true);
        setError(null);

        try {
            // Envía el ID del pedido al backend
            const response = await axios.get(`http://localhost:3001/api/order-status/${orderId}`);
            setOrderStatus(response.data); // Guarda los detalles del pedido
        } catch (error) {
            console.error('Error al obtener el estado del pedido:', error);
            setError('Hubo un error al obtener el estado del pedido. Por favor, intenta de nuevo.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="app">
            <h1>Inditex Order Tracker</h1>
            <p>Consulta el estado de tu pedido de Lefties.</p>

            <div className="search-section">
                <input
                    type="text"
                    placeholder="Ingresa el ID del pedido"
                    value={orderId}
                    onChange={(e) => setOrderId(e.target.value)}
                />
                <button onClick={handleSearch} disabled={loading}>
                    {loading ? 'Buscando...' : 'Buscar'}
                </button>
            </div>

            {error && <p className="error">{error}</p>}

            {orderStatus && (
                <div className="order-details">
                    <h2>Detalles del Pedido</h2>
                    <p><strong>ID del Pedido:</strong> {orderStatus.id}</p>
                    <p><strong>Estado:</strong> {orderStatus.status.summary}</p>
                    <p><strong>Fecha y Hora:</strong> {orderStatus.status.dateTime}</p>

                    <h3>Seguimiento</h3>
                    {orderStatus.trackings.map((tracking, index) => (
                        <div key={index} className="tracking">
                            <p><strong>Tracking ID:</strong> {tracking.trackingId}</p>
                            <p><strong>Estado:</strong> {tracking.status.summary}</p>
                            <p><strong>Fecha y Hora:</strong> {tracking.status.dateTime}</p>

                            <h4>Historial</h4>
                            {tracking.history.map((event, i) => (
                                <div key={i} className="history-event">
                                    <p><strong>Fecha y Hora:</strong> {event.dateTime}</p>
                                    <p><strong>Estado:</strong> {event.summary}</p>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default App;