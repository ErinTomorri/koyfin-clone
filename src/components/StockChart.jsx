import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import Chart from 'react-apexcharts';
import styled from 'styled-components';

const DetachableWindow = styled.div`
  position: fixed;
  background-color: #1e1e1e;
  border: 1px solid #444;
  border-radius: 4px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  overflow: hidden;
  resize: both;
  min-width: 300px;
  min-height: 200px;
`

const WindowHeader = styled.div`
  background-color: #333;
  padding: 5px;
  cursor: move;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StockChart = ({ data }) => {
  const [isDetached, setIsDetached] = useState(false);
  const [position, setPosition] = useState({ x: 100, y: 100 });
  const [size, setSize] = useState({ width: 600, height: 400 });
  const windowRef = useRef(null);

  const options = {
    // ... your chart options ...
  };

  const series = [
    {
      data: data,
    },
  ];

  useEffect(() => {
    if (isDetached) {
      const handleMouseMove = (e) => {
        if (e.buttons === 1 && e.target.closest('.window-header')) {
          setPosition((prevPosition) => ({
            x: prevPosition.x + e.movementX,
            y: prevPosition.y + e.movementY,
          }));
        }
      };

      const handleResize = () => {
        if (windowRef.current) {
          setSize({
            width: windowRef.current.offsetWidth,
            height: windowRef.current.offsetHeight,
          });
        }
      };

      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleResize);

      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleResize);
      };
    }
  }, [isDetached]);

  const handleDetach = () => {
    setIsDetached(true);
  };

  const handleAttach = () => {
    setIsDetached(false);
  };

  const chartContent = (
    <Chart
      options={options}
      series={series}
      type="candlestick"
      width={size.width}
      height={size.height - 30} // Subtract header height
    />
  );

  const detachedWindow = (
    <DetachableWindow
      ref={windowRef}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        width: `${size.width}px`,
        height: `${size.height}px`,
      }}
    >
      <WindowHeader className="window-header">
        <span>Stock Chart</span>
        <button onClick={handleAttach}>Attach</button>
      </WindowHeader>
      {chartContent}
    </DetachableWindow>
  );

  return (
    <>
      {!isDetached && (
        <div>
          <button onClick={handleDetach}>Detach</button>
          {chartContent}
        </div>
      )}
      {isDetached && createPortal(detachedWindow, document.body)}
    </>
  );
};

export default StockChart;
