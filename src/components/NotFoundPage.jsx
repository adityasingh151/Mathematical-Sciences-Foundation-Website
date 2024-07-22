import React, { useEffect, useRef, useState } from 'react';
import Howler from 'react-howler';

const NotFoundPage = () => {
  const canvasRef = useRef(null);
  const gameRef = useRef({
    character: { x: 50, y: 150, size: 20, vy: 0 },
    gravity: 0.6,
    jumpPower: -10,
    groundLevel: 180,
    isJumping: false,
    obstacles: [],
    score: 0,
    speed: 2,
    frame: 0,
    gameOver: false,
  });
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  const jumpSound = new Audio('/sounds/jump.mp3');
  const collisionSound = new Audio('/sounds/collision.mp3');
  const backgroundMusic = new Audio('/sounds/background.mp3');

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    const game = gameRef.current;

    const draw = () => {
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.fillStyle = 'skyblue';
      context.fillRect(0, 0, canvas.width, canvas.height);

      // Draw ground
      context.fillStyle = 'green';
      context.fillRect(0, game.groundLevel, canvas.width, canvas.height - game.groundLevel);

      // Draw character
      context.fillStyle = 'red';
      context.fillRect(game.character.x, game.character.y, game.character.size, game.character.size);

      // Draw obstacles
      context.fillStyle = 'black';
      game.obstacles.forEach(obstacle => {
        context.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
      });

      // Draw score
      context.fillStyle = 'black';
      context.font = '20px Arial';
      context.fillText(`Score: ${game.score}`, 10, 20);

      if (game.gameOver) {
        context.fillStyle = 'rgba(0, 0, 0, 0.5)';
        context.fillRect(0, 0, canvas.width, canvas.height);
        context.fillStyle = 'white';
        context.font = '30px Arial';
        context.fillText('Game Over', canvas.width / 2 - 75, canvas.height / 2 - 20);
        context.font = '20px Arial';
        context.fillText(`Final Score: ${game.score}`, canvas.width / 2 - 75, canvas.height / 2 + 20);
      } else {
        requestAnimationFrame(draw);
      }
    };

    const update = () => {
      if (game.gameOver) return;

      const char = game.character;
      const speed = game.speed;

      if (game.isJumping) {
        char.vy += game.gravity;
        char.y += char.vy;

        if (char.y >= game.groundLevel - char.size) {
          char.y = game.groundLevel - char.size;
          char.vy = 0;
          game.isJumping = false;
        }
      }

      // Move obstacles
      game.obstacles.forEach(obstacle => {
        obstacle.x -= speed;
      });

      // Remove off-screen obstacles
      game.obstacles = game.obstacles.filter(obstacle => obstacle.x + obstacle.width > 0);

      // Add new obstacles
      if (game.frame % 100 === 0) {
        const height = Math.random() * 50 + 10;
        game.obstacles.push({ x: canvas.width, y: game.groundLevel - height, width: 20, height });
      }

      // Check collisions
      game.obstacles.forEach(obstacle => {
        if (
          char.x < obstacle.x + obstacle.width &&
          char.x + char.size > obstacle.x &&
          char.y < obstacle.y + obstacle.height &&
          char.y + char.size > obstacle.y
        ) {
          // Game over
          collisionSound.play();
          game.gameOver = true;
          setGameOver(true);
        }
      });

      // Update score and speed
      game.score += 1;
      game.speed += 0.001;
      setScore(game.score);

      game.frame += 1;
    };

    const handleKeyUp = (e) => {
      if (e.keyCode === 32 && !game.isJumping && !game.gameOver) { // Space bar
        game.character.vy = game.jumpPower;
        game.isJumping = true;
        jumpSound.play();
      }
    };

    const handleRestart = () => {
      gameRef.current = {
        character: { x: 50, y: 150, size: 20, vy: 0 },
        gravity: 0.6,
        jumpPower: -10,
        groundLevel: 180,
        isJumping: false,
        obstacles: [],
        score: 0,
        speed: 2,
        frame: 0,
        gameOver: false,
      };
      setGameOver(false);
      setScore(0);
      backgroundMusic.play();
      draw();
    };

    window.addEventListener('keyup', handleKeyUp);
    draw();
    const intervalId = setInterval(update, 20);
    backgroundMusic.play();

    return () => {
      window.removeEventListener('keyup', handleKeyUp);
      clearInterval(intervalId);
      backgroundMusic.pause();
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-5">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">404 - Page Not Found</h1>
      <img src="https://media.giphy.com/media/14uQ3cOFteDaU/giphy.gif" alt="Confused Travolta" className="w-64 mb-4" />
      <p className="text-xl text-gray-600 mb-4">It seems like you've found a page that doesn't exist. But don't worry, even the best explorers get lost sometimes!</p>
      <p className="text-lg text-gray-500 mb-4">While you're here, why not play a quick jumping game?</p>
      <canvas ref={canvasRef} width={600} height={200} className="border border-gray-300"></canvas>
      <p className="text-lg text-gray-700">Score: {score}</p>
      {gameOver && (
        <button
          className="mt-4 px-6 py-3 text-white bg-blue-500 hover:bg-blue-700 rounded"
          onClick={handleRestart}
        >
          Restart Game
        </button>
      )}
      <button
        className="mt-4 px-6 py-3 text-white bg-blue-500 hover:bg-blue-700 rounded"
        onClick={() => window.location.href = '/'}
      >
        Go to Homepage
      </button>
      <Howler src='/sounds/background.mp3' playing={!gameOver} loop={true} />
    </div>
  );
};

export default NotFoundPage;
