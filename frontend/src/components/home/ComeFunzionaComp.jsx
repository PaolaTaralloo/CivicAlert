import { Container, Row, Col } from 'react-bootstrap';

// Sposta i dati fuori dal componente per evitare ricreazioni ad ogni render
const steps = [
  {
    numero: '1',
    titolo: 'REGISTRATI',
    testo: 'Crea un account in pochi secondi.'
  },
  {
    numero: '2',
    titolo: 'INVIA SEGNALAZIONE',
    testo: 'Compila il modulo con descrizione, posizione e foto.'
  },
  {
    numero: '3',
    titolo: 'SEGUI LO STATO',
    testo: 'Controlla l\'avanzamento nella tua dashboard.'
  }
];

const ComeFunziona = () => {
  return (
    <Container className="text-center py-5 mb-5">
      <h3 className="mb-4 fw-semibold">Come funziona?</h3>
      <Row className="g-4">
        {steps.map((step, i) => (
          <Col md={4} key={i}>
            <div className="p-4 bg-light rounded shadow-sm h-100 position-relative" style={{ marginTop: '30px'}}>
              <div 
                className="rounded-circle text-white fw-bold mx-auto mb-3 position-absolute" 
                style={{ 
                  width: 60, 
                  height: 60, 
                  lineHeight: '60px',
                  backgroundColor: '#413CB8',
                  top: '-30px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  zIndex: 1
                }}
              >
                {step.numero}
              </div>
              <div style={{ marginTop: '20px' }}>
                <h5 className="fw-bold">{step.titolo}</h5>
                <p className='mb-0'>{step.testo}</p>
              </div>
            </div>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default ComeFunziona;