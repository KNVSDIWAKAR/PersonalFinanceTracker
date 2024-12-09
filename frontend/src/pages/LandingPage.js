import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import * as THREE from "three";
import "./LandingPage.css";

const LandingPage = () => {
  const canvasRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);

  useEffect(() => {
    // Initialize Three.js scene
    const initScene = () => {
      // Scene setup
      sceneRef.current = new THREE.Scene();
      cameraRef.current = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      );
      rendererRef.current = new THREE.WebGLRenderer({
        canvas: canvasRef.current,
        antialias: true,
        alpha: true,
      });
      rendererRef.current.setSize(window.innerWidth, window.innerHeight);

      // Create particles
      const particlesGeometry = new THREE.BufferGeometry();
      const particlesCount = 1500;
      const posArray = new Float32Array(particlesCount * 3);

      for (let i = 0; i < particlesCount * 3; i++) {
        posArray[i] = (Math.random() - 0.5) * 10;
      }

      particlesGeometry.setAttribute(
        "position",
        new THREE.BufferAttribute(posArray, 3)
      );

      const particlesMaterial = new THREE.PointsMaterial({
        size: 0.005,
        color: "#888888",
        transparent: true,
        opacity: 0.8,
      });

      const particlesMesh = new THREE.Points(
        particlesGeometry,
        particlesMaterial
      );
      sceneRef.current.add(particlesMesh);

      // Create charts
      const createBarChart = () => {
        const group = new THREE.Group();
        const barMaterial = new THREE.MeshPhongMaterial({ color: 0x888888 });
        const data = [2, 3.5, 1.8, 4.2, 3.1];

        data.forEach((height, index) => {
          const barGeometry = new THREE.BoxGeometry(0.3, height, 0.3);
          const bar = new THREE.Mesh(barGeometry, barMaterial);
          bar.position.x = index - 2;
          bar.position.y = height / 2 - 2;
          group.add(bar);
        });

        return group;
      };

      const createLineChart = () => {
        const group = new THREE.Group();
        const lineMaterial = new THREE.LineBasicMaterial({ color: 0xe0e0e0 });

        const points = [
          new THREE.Vector3(-2, -1, 0),
          new THREE.Vector3(-1, 1, 0),
          new THREE.Vector3(0, 0.5, 0),
          new THREE.Vector3(1, 2, 0),
          new THREE.Vector3(2, 1.5, 0),
        ];

        const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);
        const line = new THREE.Line(lineGeometry, lineMaterial);

        points.forEach((point) => {
          const sphere = new THREE.Mesh(
            new THREE.SphereGeometry(0.05, 16, 16),
            new THREE.MeshPhongMaterial({ color: 0xe0e0e0 })
          );
          sphere.position.copy(point);
          group.add(sphere);
        });

        group.add(line);
        group.position.set(3, 0, 0);
        return group;
      };

      const createPieChart = () => {
        const group = new THREE.Group();
        const radius = 1;
        const segments = 32;
        const data = [0.3, 0.2, 0.25, 0.25];
        let startAngle = 0;
        const colors = [0x888888, 0xa0a0a0, 0xb8b8b8, 0xd0d0d0];

        data.forEach((proportion, index) => {
          const angle = proportion * Math.PI * 2;
          const pieGeometry = new THREE.CircleGeometry(
            radius,
            segments,
            startAngle,
            angle
          );
          const pieMaterial = new THREE.MeshPhongMaterial({
            color: colors[index],
            side: THREE.DoubleSide,
          });
          const pie = new THREE.Mesh(pieGeometry, pieMaterial);
          group.add(pie);
          startAngle += angle;
        });

        group.rotation.x = -Math.PI / 2;
        group.position.set(-3, 2, 0);
        return group;
      };

      // Add charts to scene
      const barChart = createBarChart();
      const lineChart = createLineChart();
      const pieChart = createPieChart();

      sceneRef.current.add(barChart);
      sceneRef.current.add(lineChart);
      sceneRef.current.add(pieChart);

      // Lighting
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
      const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
      directionalLight.position.set(5, 5, 5);

      sceneRef.current.add(ambientLight);
      sceneRef.current.add(directionalLight);

      cameraRef.current.position.z = 8;

      // Animation
      const animate = () => {
        requestAnimationFrame(animate);

        particlesMesh.rotation.x += 0.001;
        particlesMesh.rotation.y += 0.001;

        barChart.rotation.y += 0.002;
        lineChart.rotation.y += 0.002;
        pieChart.rotation.z += 0.002;

        rendererRef.current.render(sceneRef.current, cameraRef.current);
      };

      animate();
    };

    // Handle window resize
    const handleResize = () => {
      if (cameraRef.current && rendererRef.current) {
        cameraRef.current.aspect = window.innerWidth / window.innerHeight;
        cameraRef.current.updateProjectionMatrix();
        rendererRef.current.setSize(window.innerWidth, window.innerHeight);
      }
    };

    initScene();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      // Cleanup Three.js resources
      if (sceneRef.current) {
        sceneRef.current.clear();
      }
      if (rendererRef.current) {
        rendererRef.current.dispose();
      }
    };
  }, []);

  return (
    <div className="landing-container">
      <canvas ref={canvasRef} className="three-canvas" />
      <nav className="navbar">
        <ul className="navbar-list">
          <li className="navbar-item">
            <Link to="/login">Login</Link>
          </li>
          <li className="navbar-item">
            <Link to="/signup">Signup</Link>
          </li>
          <li className="navbar-item">
            <Link to="/dashboard">Dashboard</Link>
          </li>
        </ul>
      </nav>
      <div className="content">
        <h1>Track Your Wealth Journey</h1>
        <p>
          Visualize your financial growth with our intuitive tracker. Make
          smarter decisions with real-time insights and beautiful analytics.
        </p>
        <Link to="/signup" className="cta-button">
          Get Started
        </Link>
      </div>
    </div>
  );
};

export default LandingPage;
