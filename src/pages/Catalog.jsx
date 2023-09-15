import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Modal from 'react-bootstrap/Modal';
import { Row, Col, Spinner, Badge, Container } from 'react-bootstrap';
import axios from 'axios'; // Import Axios for making API requests
import Pagination from 'react-bootstrap/Pagination';

const Pages = ({ currentPage, setCurrentPage }) => {
const totalPages=2;

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <Pagination className='justify-content-center mt-3'>
      <Pagination.First onClick={() => handlePageChange(1)} disabled={currentPage === 1} />
      <Pagination.Prev onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} />
      {[...Array(totalPages).keys()].map((page) => (
        <Pagination.Item
          key={page + 1}
          active={page + 1 === currentPage}
          onClick={() => handlePageChange(page + 1)}
        >
          {page + 1}
        </Pagination.Item>
      ))}
      <Pagination.Next onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} />
      <Pagination.Last onClick={() => handlePageChange(totalPages)} disabled={currentPage === totalPages} />
    </Pagination>
  );
};

const Catalog = () => {
  const [games, setGames] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedGame, setSelectedGame] = useState(null);
  const [loading, setLoading] = useState(true);

  const apiKey = process.env.REACT_APP_API_KEY;

  useEffect(() => {
    // Fetch games based on the currentPage
    // Replace this with your API call logic
    const apiUrl = `https://api.rawg.io/api/games?key=${apiKey}&dates=2023-09-15,2025-12-31&ordering=-added&page=${currentPage}`;
    
    setLoading(true); // Set loading to true while fetching data

    // Perform the API request
    axios
      .get(apiUrl)
      .then((res) => {
        console.log(res.data);
        setGames(res.data.results);
        setLoading(false); // Set loading to false when data is received
      })
      .catch((err) => {
        console.log(err);
        setLoading(false); // Set loading to false on error as well
      });
  }, [apiKey, currentPage]);

  // Function to handle opening the modal and fetch additional details
  const handleGameClick = (game) => {
    const apiKey = process.env.REACT_APP_API_KEY;
    // Set the selected game in the state
    setSelectedGame(game);

    // Fetch additional details based on the selected game's ID
    axios
      .get(`https://api.rawg.io/api/games/${game.id}?key=${apiKey}`)
      .then((response) => {
        setSelectedGame({ ...game, ...response.data }); // Merge the existing game data with additional details
      })
      .catch((error) => {
        console.log("Error fetching additional details: ", error);
      });
  };

  // Function to close the modal
  const handleCloseModal = () => {
    setSelectedGame(null);
  };

  const MAX_PLATFORMS_PER_LINE = 3;

  return (
    <Container className='browse' style={{ marginBottom: '20px' }}>
      <h1 style={{ color: 'whitesmoke', marginTop:'20px' }}>Unreleased & Highly Anticipated</h1>
      {loading ? (
      <Spinner animation='border' variant='primary'/>
    ) : (
      
          <Row >
     
        {games.map((game, idx) => (
          <Col sm={12} md={6} lg={4} xl={4} key={idx} >
            <Card className='game-card' style={{ height: '375px', border: '2px solid black', marginBottom: '10px', backgroundColor: 'black' }}>
              <Card.Img
                variant='top'
                src={game.background_image}
                style={{ maxWidth: '100%', maxHeight: '200px', border: '2px solid black' }}
              />
              <Card.Body
                style={{ display: 'flex', flexDirection: 'column', height: '100%' }}
              >
                {/* Make the title clickable to open the modal */}
                <Card.Title
                  style={{ color: 'whitesmoke', textDecoration: 'underline', cursor: 'pointer' }}
                  onClick={() => handleGameClick(game)}
                >
                  {game.name}
                </Card.Title>
               
                <Card.Text style={{ color: 'grey', fontSize:'17px', marginTop:'5px' }}>
                  <Badge pill bg='dark' text='light'>Releases: {game.released}</Badge> 
                </Card.Text>
                <Card.Text style={{ color: 'grey' }}>
                <Badge pill bg='dark' text='light'>{Array.isArray(game.platforms) && game.platforms.length > 0 ? (
      <div>
        {game.platforms
          .slice(0, MAX_PLATFORMS_PER_LINE)
          .map((platformObj) => platformObj.platform.name)
          .join(', ')}
        {game.platforms.length > MAX_PLATFORMS_PER_LINE && (
          <div>
            {game.platforms
              .slice(MAX_PLATFORMS_PER_LINE)
              .map((platformObj) => platformObj.platform.name)
              .join(', ')}
          </div>
        )}
      </div>
    )
     : (
      'N/A'
    )}</Badge>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
      ))}
      </Row>
 
    )}
    
    
      <Pages currentPage={currentPage} setCurrentPage={setCurrentPage} />
    
      {/* Game details modal */}
      <Modal show={selectedGame !== null} onHide={handleCloseModal} size='lg' centered style={{ color: 'whitesmoke' }}>
        <Modal.Header closeButton style={{ background: `#${selectedGame?.dominant_color}` }}>
          <Modal.Title id='contained-modal-title-vcenter'>
            <h3>About {selectedGame?.name}</h3>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ background: `#${selectedGame?.dominant_color}` }}>
          <p>{selectedGame?.description_raw}</p>
        </Modal.Body>
        {/*  */}
        <Modal.Footer style={{ background: `#${selectedGame?.dominant_color}` }}>
          <Button onClick={handleCloseModal}>Close</Button>
        </Modal.Footer>
      </Modal>
      
    </Container>
  );
};

export default Catalog;
