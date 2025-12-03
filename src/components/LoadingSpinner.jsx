import { useState, useEffect } from "react";
import { Container, Spinner, Alert, Card } from "react-bootstrap";

export const LoadingSpinner = ({ 
  text = "Cargando...", 
  timeout = 3000,
  showNotification = true 
}) => {
  const [showTimeoutMessage, setShowTimeoutMessage] = useState(false);
  const [timer, setTimer] = useState(null);

  useEffect(() => {
    if (timer) clearTimeout(timer);

    const newTimer = setTimeout(() => {
      if (showNotification) setShowTimeoutMessage(true);
    }, timeout);

    setTimer(newTimer);

    return () => {
      clearTimeout(newTimer);
      setShowTimeoutMessage(false);
    };
  }, [timeout, showNotification]);

  const handleCloseNotification = () => {
    setShowTimeoutMessage(false);
    if (timer) clearTimeout(timer);
  };

  return (
    <Container className="py-5 text-center">
      <Spinner 
        animation="border" 
        variant="primary" 
        style={{ 
          width: '5rem', 
          height: '5rem',  
          borderWidth: '0.4rem' 
        }}
      />
      <p className="mt-2">{text}</p>
      
      {showTimeoutMessage && (
        <div className="mt-4 mx-auto" style={{ maxWidth: '650px' }}>
          <Card border="primary" className="shadow-sm">
            <Card.Header className="bg-primary text-white fw-bold">
              <span className="me-2">⚡</span> Información sobre el tiempo de carga
            </Card.Header>
            <Card.Body>
              <Card.Title className="text-primary">
                El backend está "despertando"
              </Card.Title>
              <Card.Text className="mb-4">
              <strong>Demora esperada:</strong> El servidor backend se está iniciando desde suspensión.<br />
              Esto se debe al tipo de plan elegido en Render que suspende instancias inactivas.              
              </Card.Text>
              
              <div className="text-start">
                <p className="fw-bold mb-2">📋 CONTEXTO TÉCNICO:</p>
                <div className="ms-3">
                  <p className="mb-1">
                    <span className="badge bg-secondary me-2">Backend</span>
                    Hosteado en Render (Free Tier)
                  </p>
                  <p className="mb-1">
                    <span className="badge bg-secondary me-2">Comportamiento</span>
                    Se suspende tras 15 min de inactividad
                  </p>
                  <p className="mb-1">
                    <span className="badge bg-secondary me-2">Wake-up time</span>
                    Aproximadamente 1 minuto
                  </p>
                  <p className="mb-1">
                    <span className="badge bg-secondary me-2">Post-activación</span>
                    Funcionamiento óptimo
                  </p>
                  <p className="mb-3">
                    <span className="badge bg-secondary me-2">Nota</span>
                    Luego de 15 min sin usar se duerme nuevamente
                  </p>
                </div>            
              </div>
              
              <Card.Text className="mt-4 fst-italic">
                ⏳ Un momento más y podrás explorar la aplicación completa.
              </Card.Text>
            </Card.Body>
            <Card.Footer className="text-muted">
              <button 
                className="btn btn-sm btn-outline-primary fw-bold"
                onClick={handleCloseNotification}
              >
                Entendido, seguir esperando
              </button>
            </Card.Footer>
          </Card>
        </div>
      )}
    </Container>
  );
};