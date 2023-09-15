import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Image from 'react-bootstrap/Image';
import { Col, Container, Row, Card } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Badge from 'react-bootstrap/Badge';

const GameDescriptionModal = ({ game, onHide, show }) => {
  const stripHTMLTags = (html) => {
    return html ? html.replace(/<\/?[^>]+(>|$)/g, '') : '';
  };

  return (
    <Modal show={show} onHide={onHide} size="lg" centered style={{color:'whitesmoke'}}>
      <Modal.Header closeButton style={{ background: `#${game.dominant_color}` }}>
        <Modal.Title id="contained-modal-title-vcenter">
          <h3>About</h3>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ background: `#${game.dominant_color}` }}>
        <p>{stripHTMLTags(game.description_raw)}</p>
      </Modal.Body>
      <Modal.Footer style={{ background: `#${game.dominant_color}` }}>
        <Button onClick={onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

const GameDetail = () => {
  const { id } = useParams();
  const [game, setGame] = useState({});
  const [modalShow, setModalShow] = useState(false);

  useEffect(() => {
    axios
      .get(`https://api.rawg.io/api/games/${id}?key=e7bd58d67dec47208da3c0c7d85b0dbe`)
      .then((response) => {
        console.log("This is the .then function ", response.data);
        setGame(response.data);
      })
      .catch((error) => {
        console.log("This is the error message ", error);
      });

    console.log("Running before data is received");
  }, [id]);

  return (
    <div className='main' style={{ overflow: 'hidden' }}>
      {game && (
        <div style={{ color: 'whitesmoke', height: '100%', position: 'relative' }}>
          {/* Background image covering entire screen */}
          {/* <Container style={{ position: 'relative', zIndex: 1 }}> */}
            {/* Image covering entire screen */}
            
            <Image
              src={game.background_image || "https://fakeimg.pl/880x640/ff0000,128/000,255/?text=Image+Loading"}
              style={{
                width: '100vw',
                height: '100vh',
                objectFit: 'cover',
              }}
            />
            {/* Text content */}
            <div style={{ position: 'absolute', top: '50%', left: '50%', height:'100%', width:'100%', transform: 'translate(-50%, -50%)', backgroundColor: 'rgba(0,0,0,0.4)'}}>
            <h1 style={{ fontSize: '60px' }}>{game.name}</h1>
             
                  <Container fluid className="d-flex align-items-center justify-content-center ">
      <Row>
      <Col md={12} className="text-center mb-3">
          <Card className='detail-card' style={{backgroundColor:'rgba(0,0,0,0.5)', color:'whitesmoke', width:'60rem', borderRadius:'20px'}}>
            <h1 >About</h1>
            
            <h6>
                    <Link style={{ color: 'whitesmoke' }} onClick={() => setModalShow(true)}>
                      Click to View
                    </Link>
                
            </h6>
            <br/>
      
            <h1>Platforms</h1>
            <h6>
              {Array.isArray(game.platforms) && game.platforms.length > 0
                ? game.platforms.map((platformObj) => platformObj.platform.name).join(', ')
                : 'N/A'}
            </h6>
            <br/>
     
            <h1>Genres</h1>
            <h6>
              {Array.isArray(game.genres) && game.genres.length > 0
                ? game.genres.map((genre) => genre.name).join(', ')
                : 'N/A'}
            </h6>
            <br/>
        
            <h1>Rating</h1>
            <h6>
            {game.esrb_rating && game.esrb_rating.name ? game.esrb_rating.name : 'N/A'}
            </h6>
            <br/>
          
            <h1>Developers</h1>
            <h6>
              {Array.isArray(game.developers) && game.developers.length > 0
                ? game.developers.map((developer) => developer.name).join(', ')
                : 'N/A'}
            </h6>
            <br/>
     
            <h1>Publishers</h1>
            <h6>
              {Array.isArray(game.publishers) && game.publishers.length > 0
                ? game.publishers.map((publisher) => publisher.name).join(', ')
                : 'N/A'}
            </h6>
            <br/>
          </Card>
        </Col>
      </Row>
    </Container>


            </div>
            
          {/* </Container> */}
          <GameDescriptionModal game={game} show={modalShow} onHide={() => setModalShow(false)} />
          
        </div>
        
      )}
    </div>
  );
};

export default GameDetail;
